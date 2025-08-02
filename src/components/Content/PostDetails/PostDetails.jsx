import styles from "./PostDetails.module.css";
import Image from "../../Image/Image";
import PostModal from "../PostModal/PostModal";

import { useParams } from "react-router";
import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "../../../reducers/user.slice.js";

import useSocketEmit from "../../../hooks/useSocketEmit.js";

import { getPostById } from "../../../services/post.service.js";

import { removePost } from "../../../reducers/posts.slice.js";

import { createPortal } from "react-dom";

const PostDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpened, setIsModalOpened] = useState(false);

  const [post, setPost] = useState(null);

  const { deletePost, editPost } = useSocketEmit();

  const params = useParams();

  const dispatch = useDispatch();

  const user = useSelector(userSelector);

  const onConfirm = (payload) => {
    setIsModalOpened(false);
    if (payload) {
      editPost(payload)
        .then((data) => setPost(data))
        .catch((error) => console.error(error));
    }
  };

  useEffect(() => {
    console.log("QUESTO E' USE EFFECT POST", post);
  }, [post]);

  const getThisPost = async (id) => {
    try {
      const data = await getPostById(id);
      setPost({ ...data, id: data._id });
    } catch (error) {
      console.error("Errore nel recupero del post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const cancelPost = async (post) => {
    const confirmDelete = window.confirm(
      "Sei sicuro di voler cancellare il post?"
    );
    if (!confirmDelete) return;

    //TODO GESTIRE CON TOAST//

    try {
      console.log("CANCELLAZIONE IN CORSO?", post);
      const data = await deletePost({ postId: post._id });
      dispatch(removePost(data));
    } catch (e) {
      console.error(e);
    }
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

  return (
    <>
      <div className={styles.body}>
        <div className={styles.detail}>
          <header className={styles.header}>
            <h1 className={styles.title}>{post.title}</h1>
            <div className={styles.meta}>
              <span>
                Pubblicato il: <strong>{date}</strong> alle{" "}
                <strong>{hour}</strong>
              </span>
              <span>
                Autore: <strong>{post.authorId}</strong>
              </span>
            </div>
          </header>

          {post.image && (
            <div className={styles.imageWrapper}>
              <Image
                src={post.image}
                alt={`Immagine di copertina per ${post.title}`}
              />
            </div>
          )}

          <section
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></section>

          <section className={styles.tags}>
            <h4>Tag:</h4>
            {post.tags?.length > 0 ? (
              <ul>
                {post.tags.map((tag) => (
                  <li key={tag}>#{tag}</li>
                ))}
              </ul>
            ) : (
              <p>Nessun tag presente</p>
            )}
          </section>

          <footer className={styles.footer}>
            {post.total_comments > 0 ? (
              <p>Ci sono {post.total_comments} commenti</p>
            ) : (
              <p>Nessun commento</p>
            )}
          </footer>
        </div>
      </div>
      {thisPostIsEditable && (
        <>
          <button onClick={() => setIsModalOpened(true)}>
            Modifica il post
          </button>
          <button onClick={() => cancelPost(post)}>Elimina il post</button>
        </>
      )}

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
    </>
  );
};

export default PostDetails;
