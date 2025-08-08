import styles from "./CommentsSection.module.css"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { userSelector } from "../../../reducers/user.slice.js"
import { getComments } from "../../../services/post.service.js"
import useSocketEmit from "../../../hooks/useSocketEmit.js";
import CommentItem from "../CommentItem/CommentItem.jsx"

import useInput from "../../../hooks/useInput.js"

const CommentsSection = ({postId}) => {

   const user = useSelector(userSelector)

    const [comments, setComments] = useState([])
    const { value: commentValue, setValue: setCommentValue, handleChange: commentValueChange } = useInput(""); 

    const { createComment, deleteComment } = useSocketEmit()

    const [lazyState, setLazyState] = useState({
    cursor: null,
    direction: "prev",
    limit: 100,
  });

  const retrieveComments = async (postId) => {
    const data = await getComments(postId, lazyState);

    if (data) {
      setComments(data.comments)
    }
  };

    const commentCreation = async () => {
      const payload = {
        postId: postId,
        text: commentValue,
        authorId: user.id
    }
     const data = await createComment(payload)
     console.log("DATA E PAYLOAD", data, payload)
     if(data){
    retrieveComments(postId)
    setCommentValue("")
     }
     else{
      commentValueChange("QUALCOSA È ANDATO STORTO!")
     }
  }

  const commentElimination = async (commentId) => {
    const conferma = window.confirm("Sei sicuro di voler eliminare il commento?");
  if (!conferma) return;
  try {
    console.log("ID comment", commentId);
    const data = await deleteComment(commentId);
    console.log("DATA E PAYLOAD", data, commentId);
    if (data) {
      retrieveComments(postId);
    }
  } catch (error) {
    console.error("Errore nell'eliminazione commento:", error);
  }
};

    useEffect(()=>{
        retrieveComments(postId)
    }, [])

        useEffect(()=>{
        console.log("COMMENTI", comments)
    }, [comments])

    return <>
    {user.accessToken && <>
    <p>Aggiungi un commento</p>
    <textarea id={postId} className={styles.commentInput} placeholder="Cosa ne pensi?"
              onChange={commentValueChange}
              value={commentValue}/>
              <button onClick={commentCreation}>Commenta!</button></>}
    <div className={styles.list}>
            {comments.length > 0 ?
                comments.map(comment => (<CommentItem comment={comment} refresh={()=> retrieveComments(postId)} onDeleteComment={()=>commentElimination(comment.id)}/>)) : <p>Questo post non ha ancora commenti</p>}
        </div>
    </>
}

export default CommentsSection