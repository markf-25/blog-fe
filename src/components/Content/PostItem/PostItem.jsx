import styles from "./PostItem.module.css";
import Image from "../../Image/Image";

import { useNavigate } from "react-router";
import useMockUsernames from "../../../hooks/useMockUsernames.js";

const PostItem = ({ post }) => {
  const navigate = useNavigate();

  const { getUsernameById } = useMockUsernames();

  const authorName = getUsernameById(post.authorId) || `ID: ${post.authorId}`;

  const goToDetail = () => {
    navigate(`/posts/${post.id}`);
  };

  const date = new Date(post.publishDate).toLocaleString("it-IT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const hour = new Date(post.publishDate).toLocaleString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return <>
  
      <div className={styles.item}>
        
        <div className={styles.header}>
        <p>{authorName}</p>
        <p>
          {date}, {hour}
        </p>
        </div>

        <div className={styles.title}>{post.title}</div>
        <Image />
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
        <div className={styles.tags}>
          {post.tags.length > 0 ? (
            post.tags?.map((tag) => <p key={tag}>#{tag}</p>)
          ) : (
            <div>Nessun tag presente</div>
          )}
        </div>
          <div className={styles.likesAndComments}>
        {post.total_likes> 0 ? <p>Questo post ha {post.total_likes} like</p> : <i>Questo post non ha like! Mettine tu uno per primo!</i>}
          {post.total_comments === 0
            ? "Nessun commento"
            : post.total_comments === 1
            ? "1 commento"
            : `${post.total_comments} commenti`}
      </div>
      <div className={styles.showDetails} onClick={() => goToDetail()}>
          Mostra dettagli
        </div>
      </div>
    </>;
};

export default PostItem;
