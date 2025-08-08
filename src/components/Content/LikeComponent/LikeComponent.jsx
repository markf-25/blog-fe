import styles from "./LikeComponent.module.css"
import { useState } from "react"
import { useSelector } from "react-redux"
import { userSelector } from "../../../reducers/user.slice.js"

import useSocketEmit from "../../../hooks/useSocketEmit.js";

const LikeComponent = ({id, renderizeAgain}) => {

const { likeToggler } = useSocketEmit();

const user = useSelector(userSelector)

const [isAlreadyLiked, setIsAlreadyLiked] = useState(false) 
/* mocking: servirebbe una funzione per sapere se l'utente ha già messo like */

const likeToggle = (id) => {
    const payload = {
        postId: id
    }
    likeToggler(payload).then(renderizeAgain)
        .catch((error) => console.error(error));
}

if(!user.accessToken) return null

return <>
<div className={styles.container}>
<button className={styles.likeButton}onClick={() => {likeToggle(id), setIsAlreadyLiked(!isAlreadyLiked)}}>{isAlreadyLiked? <p>❤</p> : <p>🤍</p>}</button>
</div>
</>
}

export default LikeComponent