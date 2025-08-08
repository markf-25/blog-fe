import { useEffect, useContext, useState } from "react";
import { getPosts } from "../../../services/post.service.js";
import { postsSelector, setPosts } from "../../../reducers/posts.slice.js";
import { useSelector, useDispatch } from "react-redux";
import { createPortal } from "react-dom";
import { SocketContext } from "../../../contexts/SocketProvider";
import styles from "./ContentPage.module.css";

import useSocketEmit from "../../../hooks/useSocketEmit.js";

import PostsList from "../PostsList/PostsList";
import PostModal from "../PostModal/PostModal";


const ContentPage = () => {
  const dispatch = useDispatch();

  const { createPost } = useSocketEmit();

  const [isModalOpened, setIsModalOpened] = useState(false);

  const [lazyState, setLazyState] = useState({
    cursor: null,
    direction: "prev",
    limit: 10,
  });


  const { socket, socketReady } = useContext(SocketContext);
  const posts = useSelector(postsSelector);

  const retrievePosts = async () => {
    const data = await getPosts(lazyState);

    if (data) {
      console.log("I DATA DEL RETRIEVE", data);
      dispatch(setPosts(data));

      setLazyState((prev) => ({
      ...prev,
      nextCursor: data.nextCursor,
      prevCursor: data.prevCursor,
    }));

    }
  };

  const onConfirm = (payload) => {
    setIsModalOpened(false);
    if (payload) {
      createPost(payload)
        .then(() => retrievePosts())
        .catch((error) => console.error(error));
    }
  };

useEffect(() => {
  if (!socketReady) return;

  retrievePosts();
}, [socketReady, socket]);

  return <>
    <div className={styles.content}>
      <button
        className={styles.addPostButton}
        onClick={() => setIsModalOpened(true)}
      >
        AGGIUNGI POST
      </button>

      {isModalOpened &&
        createPortal(
          <PostModal
            isOpen={isModalOpened}
            onConfirm={onConfirm}
            onClose={() => setIsModalOpened(false)}
          />,
          document.body
        )}
      <PostsList posts={posts} />
    </div>
    
  </>

};

export default ContentPage;
