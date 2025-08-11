import { Button, Box } from "@mui/material";
import { createPortal } from "react-dom";
import { useEffect, useContext, useState } from "react";
import { getPosts } from "../../../services/post.service.js";
import { postsSelector, setPosts } from "../../../reducers/posts.slice.js";
import { useSelector, useDispatch } from "react-redux";
import { SocketContext } from "../../../contexts/SocketProvider";
import useSocketEmit from "../../../hooks/useSocketEmit.js";
import PostsList from "../PostsList/PostsList";
import PostModal from "../PostModal/PostModal";


import { keyframes } from "@mui/system";

const ContentPage = () => {

  const pulse = keyframes`
  0% {
    box-shadow: 0px 4px 12px rgba(25, 118, 210, 0.4);
  }
  50% {
    box-shadow: 0px 4px 20px rgba(25, 118, 210, 0.8);
  }
  100% {
    box-shadow: 0px 4px 12px rgba(25, 118, 210, 0.4);
  }
`;
/* const firstPostId = "684b0f02f5b962f22eb945a1" */

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
      console.log("POST", data)
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




  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "20vh",
        overflowY: "auto",
      }}
    >
      <Button
  variant="contained"
  sx={{
    position: "fixed",
    top: "83px",
    left: "50%",
    transform: "translateX(-50%)",
    height: "50px",
    width: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    borderRadius: "8px",
    backgroundColor: "#1976d2",
    transition: "all 0.3s ease",
    // Pulse se ci sono pochi post
    animation:
      `${pulse} 2s infinite ease-in-out`,
    "&:hover": {
      backgroundColor: "#1565c0",
      transform: "translateX(-50%) translateY(-2px)",
      boxShadow: "0px 6px 18px rgba(0,0,0,0.3)",
    },
    "&:active": {
      transform: "translateX(-50%) translateY(0px)",
      boxShadow: "0px 3px 8px rgba(0,0,0,0.2)",
    },
  }}
  onClick={() => setIsModalOpened(true)}
>
  AGGIUNGI POST
</Button>

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
    </Box>
  );
};

export default ContentPage;
