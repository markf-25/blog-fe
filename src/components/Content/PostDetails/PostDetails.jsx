import styles from "./PostDetails.module.css";
import Image from "../../Image/Image";
import PostModal from "../PostModal/PostModal";
import LikeComponent from "../LikeComponent/LikeComponent"
import CommentsSection from "../CommentsSection/CommentsSection.jsx"
import ConfirmDialog from "../../ConfirmDialog/ConfirmDialog"

import { useParams } from "react-router";
import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "../../../reducers/user.slice.js";

import useSocketEmit from "../../../hooks/useSocketEmit.js";
import useMockUsernames from "../../../hooks/useMockUsernames.js"

import { getPostById } from "../../../services/post.service.js";

import { removePost } from "../../../reducers/posts.slice.js";

import { createPortal } from "react-dom";

const PostDetails = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpened, setIsModalOpened] = useState(false);

  const [post, setPost] = useState(null);

  const { deletePost, editPost } = useSocketEmit();
   const { getUsernameById } = useMockUsernames();

  const params = useParams();

  const dispatch = useDispatch();

  const user = useSelector(userSelector);

 const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onConfirm = (payload) => {
    setIsModalOpened(false);
    if (payload) {
      editPost(payload)
        .then((data) => setPost(data))
        .catch((error) => console.error(error));
    }
  };

  const getThisPost = async (id) => {
    try {
      const data = await getPostById(id);
      console.log("DATTAAAAAA", data)
      setPost({ ...data, id: data._id });
      console.log("IL POST?", data)
    } catch (error) {
      console.error("Errore nel recupero del post:", error);
    } finally {
      setIsLoading(false);
    }
  };

    const cancelPost = () => {
    setIsDialogOpen(true);
  };

  const handleConfirmDialogOk = async () => {
    setIsDialogOpen(false);
    try {
      const data = await deletePost({ postId: post._id });
      dispatch(removePost(data));
    } catch (e) {
      console.error(e);
    }
  };

  const handleConfirmDialogCancel = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    if (params.id) {
      setIsLoading(true);
      getThisPost(params.id);
    }
  }, [params.id]);

  if (isLoading) return <p>Caricamento...</p>;
  if (!post) return <p>Nessun post trovato.</p>;

  const date = new Date(post.publishDate).toLocaleString("it-IT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const hour = new Date(post.publishDate).toLocaleString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const thisPostIsEditable = post.authorId === user.id;

  const authorName = getUsernameById(post.authorId) || `ID: ${post.authorId}`;

  return <>
  {thisPostIsEditable && (
        <div className={styles.editDeletePost}>
          <button className={styles.editButton} onClick={() => setIsModalOpened(true)}>
            Modifica il post
          </button>
          <button className={styles.deleteButton} onClick={() => cancelPost()}>Elimina il post</button>
        </div>
      )}
      {post? 
      <div className={styles.postLayout}>
        <div className={styles.detail}>
          <header className={styles.header}>
<p>{<strong>{authorName}</strong>}</p>

<p> <strong>{date}</strong> alle{" "}
                <strong>{hour}</strong>
              </p>
          </header>
<h1 className={styles.title}>{post.title}</h1>
{/* sarebbe "post.image", ma il not verrà aggiunto quando avremo image restituita dal backend */}
          {!post.image && (
              <Image
                src={post.image}
                alt={`Immagine di copertina per ${post.title}`}
              />
          )}

          <section
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></section>

          <section>
            {post.tags?.length > 0 ? (
              <div className={styles.tags}>
                {post.tags.map((tag) => (
                  <p key={tag}>#{tag}</p>
                ))}
              </div>
            ) : (
              <i>Nessun tag presente</i>
            )}
          </section>
          <div className={styles.likesWrapper}>
              {post.total_likes> 0 ? <p>Questo post ha {post.total_likes} like</p> : <p>Questo post non ha like! Mettine tu uno per primo!</p>}
         <LikeComponent id={post.id} renderizeAgain={()=> getThisPost(post.id)}/>
        </div>
        </div>
                  <div className={styles.commentsContainer}>
            < CommentsSection postId={post.id}/>
          </div>
      </div>
      :
        <p>Nessun post trovato</p>}

        <ConfirmDialog
  open={isDialogOpen}
  message="Sei sicuro di voler eliminare il post?"
  onConfirm={handleConfirmDialogOk}
  onCancel={handleConfirmDialogCancel}
/>

      {isModalOpened &&
        createPortal(
          <PostModal
            existingPost={post}
            isOpen={isModalOpened}
            onConfirm={onConfirm}
            onClose={() => setIsModalOpened(false)}
          />,
          document.body
        )}
    </>;
};

export default PostDetails;
