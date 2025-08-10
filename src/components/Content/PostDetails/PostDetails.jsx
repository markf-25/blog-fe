import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Paper,
  Chip,
  Stack,
} from "@mui/material";

import Image from "../../Image/Image"; 
import PostModal from "../PostModal/PostModal";
import LikeComponent from "../LikeComponent/LikeComponent";
import CommentsSection from "../CommentsSection/CommentsSection.jsx";

import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";

import { userSelector } from "../../../reducers/user.slice.js";
import useSocketEmit from "../../../hooks/useSocketEmit.js";
import useMockUsernames from "../../../hooks/useMockUsernames.js";
import { getPostById } from "../../../services/post.service.js";
import { removePost } from "../../../reducers/posts.slice.js";

const PostDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [post, setPost] = useState(null);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const { deletePost, editPost } = useSocketEmit();
  const { getUsernameById } = useMockUsernames();

  const params = useParams();
  const dispatch = useDispatch();

  const user = useSelector(userSelector);

  useEffect(() => {
    if (!params.id) return;

    let isMounted = true;
    setIsLoading(true);
    setError(null);

    getPostById(params.id)
      .then((data) => {
        if (isMounted) setPost({ ...data, id: data._id });
      })
      .catch(() => setError("Errore nel recupero del post."))
      .finally(() => isMounted && setIsLoading(false));

    return () => {
      isMounted = false;
    };
  }, [params.id]);

  const onConfirm = (payload) => {
    setIsModalOpened(false);
    if (payload) {
      editPost(payload)
        .then((data) => setPost(data))
        .catch(console.error);
    }
  };

  const handleDeleteClick = (post) => {
    setPostToDelete(post);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsConfirmOpen(false);
    try {
      const data = await deletePost({ postId: postToDelete._id });
      dispatch(removePost(data));
    } catch (e) {
      console.error(e);
      alert("Errore durante la cancellazione del post.");
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmOpen(false);
    setPostToDelete(null);
  };

  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Typography color="error" align="center" mt={4}>
        {error}
      </Typography>
    );

  if (!post)
    return (
      <Typography align="center" mt={4}>
        Nessun post trovato.
      </Typography>
    );

  const publishDate = new Date(post.publishDate);
  const date = publishDate.toLocaleString("it-IT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const hour = publishDate.toLocaleString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const thisPostIsEditable = post.authorId === user.id;
  const authorName = getUsernameById(post.authorId) || `ID: ${post.authorId}`;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 4,
        height: "95vh",
        px: 3,
        pt: "15vh",
      }}
    >
      {/* CARD POST - metà sinistra, 50% */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          width: "50vw",
          display: "flex",
          flexDirection: "column",
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: "0 0 20px var(--border)",
          backgroundColor: "var(--card-bg)",
          border: "5px double var(--bg)",
        }}
      >
        {/* HEADER */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
            color: "var(--text-muted)",
            fontSize: "0.85rem",
          }}
        >
          <Typography>{authorName}</Typography>
          <Typography>
            {date} alle {hour}
          </Typography>
        </Box>

        {/* TITLE */}
        <Typography
          variant="h4"
          component="h1"
          fontWeight={600}
          color="var(--text)"
          sx={{
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            textAlign: "center",
            mb: 3,
          }}
        >
          {post.title}
        </Typography>

        {/* IMAGE */}
        {!post.image && (
          <Box
  sx={{
    mb: 3,
    width: "100%",   
    maxHeight: "30vh",  
    overflow: "hidden",
    borderRadius: 2,
    marginX: "auto",
  }}
>
  <Image
  src={post.image}
  alt={`Immagine di copertina per ${post.title}`}
  variant="post-image"
/>
</Box>
        )}

        {/* CONTENT */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            minHeight: 50,
            maxHeight: 600,
            backgroundColor: "var(--bg)",
            borderRadius: 2,
            p: 1,
            mb: 3,
            mt: -2,
          }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* TAGS */}
        <Box sx={{ mb: 2 }}>
          {post.tags?.length > 0 ? (
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {post.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={`#${tag}`}
                  sx={{ fontSize: "0.8rem", padding: "0.3rem 0.6rem" }}
                />
              ))}
            </Stack>
          ) : (
            <Typography fontStyle="italic" fontSize="0.8rem">
              Nessun tag presente
            </Typography>
          )}
        </Box>

        {/* LIKES */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography>
            {post.total_likes > 0
              ? `Questo post ha ${post.total_likes} like`
              : "Questo post non ha like! Mettine tu uno per primo!"}
          </Typography>
          <LikeComponent
            id={post.id}
            renderizeAgain={() => getPostById(post.id).then(setPost)}
          />
        </Box>

        {/* EDIT / DELETE */}
        {thisPostIsEditable && (
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 3 }}>
            <Button
              variant="outlined"
              onClick={() => setIsModalOpened(true)}
              sx={{
                color: "var(--text)",
                borderRadius: 2,
                fontWeight: 500,
                "&:hover": { color: "var(--text-muted)" },
              }}
            >
              Modifica il post
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDeleteClick(post)}
              sx={{ borderRadius: 2 }}
            >
              Elimina il post
            </Button>
          </Box>
        )}
      </Paper>

      {/* COMMENTS SECTION - metà destra, 30% */}
      <Box
        sx={{
          width: "35vw",
          height: "50vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontWeight: "bold",
        }}
      >
        <CommentsSection postId={post.id} />
      </Box>

      {/* MODAL */}
      {isModalOpened && (
  <PostModal
    existingPost={post}
    isOpen={isModalOpened}
    onConfirm={onConfirm}
    onClose={() => setIsModalOpened(false)}
  />
)}

      {/* CONFIRM DELETE DIALOG */}
      <ConfirmDialog
        open={isConfirmOpen}
        title="Conferma cancellazione"
        message="Sei sicuro di voler cancellare il post?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmText="Elimina"
        cancelText="Annulla"
        confirmColor="error"
      />
    </Box>
  );
};

export default PostDetails;
