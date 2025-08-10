import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../../reducers/user.slice.js";
import { getComments } from "../../../services/post.service.js";
import useSocketEmit from "../../../hooks/useSocketEmit.js";
import CommentItem from "../CommentItem/CommentItem.jsx";

import useInput from "../../../hooks/useInput.js";

import { Box, Button, List, TextField, Typography } from "@mui/material";

import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";

const CommentsSection = ({ postId }) => {
  const user = useSelector(userSelector);

  const [comments, setComments] = useState([]);
  const {
    value: commentValue,
    setValue: setCommentValue,
    handleChange: commentValueChange,
  } = useInput("");

  const { createComment, deleteComment } = useSocketEmit();

  const [lazyState, setLazyState] = useState({
    cursor: null,
    direction: "prev",
    limit: 5,
  });

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  const retrieveComments = async (postId) => {
    const data = await getComments(postId, lazyState);
    if (data) {
      console.log("LOS COMMENTOS POR FAVOR", data)
      setComments(data.comments);
    }
  };

  const commentCreation = async () => {
    if (!commentValue.trim()) return;

    const payload = {
      postId: postId,
      text: commentValue,
      authorId: user.id,
    };
    const data = await createComment(payload);
    if (data) {
      retrieveComments(postId);
      setCommentValue("");
    } else {
      setCommentValue("Qualcosa è andato storto!");
    }
  };

  const askDeleteComment = (commentId) => {
    setCommentToDelete(commentId);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const data = await deleteComment(commentToDelete);
      if (data) {
        retrieveComments(postId);
      }
    } catch (error) {
      console.error("Errore nell'eliminazione commento:", error);
    }
    setConfirmOpen(false);
    setCommentToDelete(null);
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setCommentToDelete(null);
  };

  useEffect(() => {
    retrieveComments(postId);
  }, [postId]);

  return (
    <Box
      sx={{
        width: "100%",
        // nessun background o bordo, prende il colore di main page
        padding: 2,
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {user.accessToken && (
        <>
          <Typography variant="h6" gutterBottom>
            Aggiungi un commento
          </Typography>
          <TextField
            id={`comment-${postId}`}
            multiline
            fullWidth
            minRows={3}
            placeholder="Cosa ne pensi?"
            value={commentValue}
            onChange={commentValueChange}
            variant="outlined"
          
          />
          <Button variant="contained" onClick={commentCreation} sx={{ alignSelf: "flex-end" }}>
            Commenta!
          </Button>
        </>
      )}

      <List
  sx={{
    padding: 0,
    maxHeight: "40vh",
    overflowY: "auto",
    scrollbarWidth: "thin", // Firefox
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,0.2)",
      borderRadius: "3px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "rgba(0,0,0,0.4)",
    },
    "& .MuiListItem-root": {
      marginBottom: 1,
    },
  }}
>
  {comments.length > 0 ? (
    comments.map((comment) => (
      <CommentItem
        key={comment.id}
        comment={comment}
        refresh={() => retrieveComments(postId)}
        onDeleteComment={() => askDeleteComment(comment.id)}
      />
    ))
  ) : (
    <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 2 }}>
      Questo post non ha ancora commenti
    </Typography>
  )}
</List>


      <ConfirmDialog
        open={confirmOpen}
        title="Elimina commento"
        message="Sei sicuro di voler eliminare questo commento?"
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        confirmText="Elimina"
        cancelText="Annulla"
        confirmColor="error"
      />
    </Box>
  );
};

export default CommentsSection;
