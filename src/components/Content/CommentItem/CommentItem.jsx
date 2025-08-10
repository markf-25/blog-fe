import { useSelector } from "react-redux";
import { userSelector } from "../../../reducers/user.slice.js";
import { useState } from "react";
import useInput from "../../../hooks/useInput.js";
import useSocketEmit from "../../../hooks/useSocketEmit.js";

import useMockUsernames from "../../../hooks/useMockUsernames.js";

import { Box, Button, TextField, Typography } from "@mui/material";

const CommentItem = ({ comment, onDeleteComment, refresh }) => {
  const user = useSelector(userSelector);
  const { getUsernameById } = useMockUsernames();
  const authorName = getUsernameById(comment.authorId) || `Id: ${comment.authorId}`;

  const thisCommentIsMine = user.id === comment.authorId;
  const { value: commentValue, handleChange: commentValueChange } = useInput(
    comment.text ? comment.text : ""
  );
  const [showInput, setShowInput] = useState(false);

  const { editComment } = useSocketEmit();

  const commentUpdate = async (commentId) => {
    const updatedComment = {
      commentId: commentId,
      text: commentValue,
    };
    try {
      const data = await editComment(updatedComment);
      if (data) {
        refresh();
      }
    } catch (error) {
      console.error("Errore nella modifica del commento:", error);
    }
  };

  const onCommentEdit = (commentId) => {
    commentUpdate(commentId)
      .then(() => {
        setShowInput(false);
      })
      .catch((error) => {
        console.error("Errore durante la modifica:", error);
      });
  };

  return (
    <Box
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
        p: 2,
        mb: 2,
        backgroundColor: "background.paper",
      }}
    >
      {!showInput && (
        <Box>
          <Typography variant="subtitle2" gutterBottom sx={{ textAlign: "left" }}>
            {authorName}
          </Typography>
          <Typography
            variant="body1"
            color="primary.main"
            sx={{ whiteSpace: "pre-wrap", textAlign: "left" }}
          >
            {comment.text}
          </Typography>
        </Box>
      )}

      {showInput && (
        <Box sx={{ mt: 1, mb: 1 }}>
          <TextField
            id={`edit-comment-${comment.id}`}
            label="Modifica il commento"
            multiline
            fullWidth
            minRows={2}
            value={commentValue}
            onChange={commentValueChange}
            variant="outlined"
            sx={{ mb: 1 }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onCommentEdit(comment.id);
              }
            }}
          />
          <Button variant="contained" size="small" onClick={() => onCommentEdit(comment.id)}>
            Modifica
          </Button>
        </Box>
      )}

      {thisCommentIsMine && !showInput && (
        <Box sx={{ mt: 1, display: "flex", gap: 1, justifyContent: "flex-end" }}>
          <Typography
            variant="button"
            sx={{
              cursor: "pointer",
              color: "rgba(25, 118, 210, 0.7)",
              fontSize: "0.65rem",
              opacity: 0.7,
              border: "1px solid rgba(25, 118, 210, 0.4)",
              borderRadius: "4px",
              padding: "2px 6px",
              userSelect: "none",
              transition: "opacity 0.2s ease",
              "&:hover": {
                opacity: 1,
                borderColor: "rgba(25, 118, 210, 0.8)",
              },
            }}
            onClick={() => setShowInput(true)}
          >
            Modifica commento
          </Typography>
          <Typography
            variant="button"
            sx={{
              cursor: "pointer",
              color: "rgba(211, 47, 47, 0.7)",
              fontSize: "0.65rem",
              opacity: 0.7,
              border: "1px solid rgba(211, 47, 47, 0.4)",
              borderRadius: "4px",
              padding: "2px 6px",
              userSelect: "none",
              transition: "opacity 0.2s ease",
              "&:hover": {
                opacity: 1,
                borderColor: "rgba(211, 47, 47, 0.8)",
              },
            }}
            onClick={onDeleteComment}
          >
            Elimina commento
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default CommentItem;
