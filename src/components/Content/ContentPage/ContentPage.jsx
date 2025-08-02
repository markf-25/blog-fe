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
    limit: 100,
  });

  const { socket, socketReady } = useContext(SocketContext);
  const posts = useSelector(postsSelector);

  const retrievePosts = async () => {
    const data = await getPosts(lazyState);

    if (data) {
      console.log("I DATA DEL RETRIEVE", data);
      dispatch(setPosts(data));
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
    console.log("LANCIO EFFECT");
    retrievePosts();
    console.log("ECCO I POST", posts);
  }, [socketReady, socket]);

  return (
    <div className={styles.content}>
      <button onClick={() => setIsModalOpened(true)}>AGGIUNGI POST</button>
      {isModalOpened &&
        createPortal(
          <PostModal
            isOpen={isModalOpened}
            onConfirm={onConfirm}
            onClose={() => setIsModalOpened(false)}
          />,
          document.body
        )}
      {<PostsList posts={posts} />}
    </div>
  );
};

export default ContentPage;
