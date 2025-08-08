import { useContext } from "react";
import { SocketContext } from "../contexts/SocketProvider.jsx";
import {
  createPostAction,
  editPostAction,
  deletePostAction,
  toggleLikeAction,
  getTagsAction,
  createCommentAction,
  deleteCommentAction,
  updateCommentAction
} from "../config";

const useSocketEmit = () => {
  const { socket } = useContext(SocketContext);

  const emitSocketEvent = (action, payload) => {
    return new Promise((resolve, reject) => {
      socket.emit(action, payload, (response) => {
        if (response.success) {
          resolve(response.data);
        } else {
          reject(response.error);
        }
      });
    });
  };

  const deleteComment = (commentId) => {
    return new Promise((resolve, reject) => {
      socket.emit(deleteCommentAction, { commentId }, (response) => {
        if (response.deleted) {
          resolve(response.comment);
        } else {
          reject(response.error);
        }
      });
    });
  }

  return {
    createPost: (post) => emitSocketEvent(createPostAction, post),
    deletePost: (post) => emitSocketEvent(deletePostAction, post),
    editPost: (post) => emitSocketEvent(editPostAction, post),
    likeToggler: (postId) => emitSocketEvent(toggleLikeAction, postId),
    getTags: (payload) => emitSocketEvent(getTagsAction, payload),
    createComment: (payload) => emitSocketEvent(createCommentAction, payload),
    editComment: (commentId) => emitSocketEvent(updateCommentAction, commentId),
    
    deleteComment
  };
};

export default useSocketEmit;
