import styles from "./CommentItem.module.css"
import { useSelector } from "react-redux"
import { userSelector } from "../../../reducers/user.slice.js"
import { useState } from "react"
import useInput from "../../../hooks/useInput.js"
import useSocketEmit from "../../../hooks/useSocketEmit.js"

import Input from "../../Input/Input"
import useMockUsernames from "../../../hooks/useMockUsernames.js"

const CommentItem = ({comment, onDeleteComment, refresh}) => {

    const user = useSelector(userSelector)

    const { getUsernameById } = useMockUsernames();
    const authorName = getUsernameById(comment.authorId) || `Id: ${comment.authorId}`;

    const thisCommentIsMine = user.id === comment.authorId
    const { value: commentValue, handleChange: commentValueChange } = useInput(comment.text? comment.text : "");  
    const [ showInput, setShowInput ] = useState(false)

    const { editComment } = useSocketEmit()

    const commentUpdate = async (commentId) =>{
  const updatedComment = {
    commentId: commentId,
    text: commentValue
  }
  try {
    console.log("ID comment", updatedComment);
    const data = await editComment(updatedComment);
    console.log("DATA E PAYLOAD", data, updatedComment);
    if (data) {
      refresh()
    }
  } catch (error) {
    console.error("Errore nella modifica del commento:", error);
  }
}

const onCommentEdit = (commentId) => {
  commentUpdate(commentId)
    .then(() => {
      setShowInput(false);
    })
    .catch((error) => {
      console.error("Errore durante la modifica:", error);
    })
    .finally(() => {
      console.log("Modifica commento gestita.");
    });
}

    return <>
    <div className={styles.card}>
    {!showInput && <div className={styles.commentWrapper}>
        <h3 className={styles.author}>{authorName}</h3>
        <p className={styles.commentText}>{comment.text}</p>
        </div>}
    {showInput && <> <Input id={comment.id} label ="Modifica il commento"
              onChange={commentValueChange}
              onEnter={() => {onCommentEdit(comment.id)}}
              value={commentValue}/>
              <button onClick={() => {onCommentEdit(comment.id)}}>Modifica</button></>}
        {thisCommentIsMine && !showInput &&
    <div className={styles.editComment}>
        <p className={styles.updateCommentButton} onClick={()=> setShowInput(true)}>Modifica commento</p>
        <p className={styles.updateCommentButton} onClick={onDeleteComment}>Elimina commento</p>
    </div>}
    </div>
    </>
}

export default CommentItem