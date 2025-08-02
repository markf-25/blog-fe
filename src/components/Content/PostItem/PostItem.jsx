import styles from "./PostItem.module.css";
import Image from "../../Image/Image";

import { useNavigate } from "react-router";

const PostItem = ({ post }) => {
  const navigate = useNavigate();

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

  return (
    <>
      <div className={styles.item}>
        <div className="date">
          Data di pubblicazione: {date}
          Ora di pubblicazione: {hour}
        </div>
        <div className="title">Titolo: {post.title}</div>
        <div className="author">Autore: {post.authorId}</div>
        Immagine:
        <img src={post.image} width="200px" height="auto" />
        <div
          className="text-area"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
        <div>
          {post.tags.length > 0 ? (
            post.tags?.map((tag) => <li key={tag}>#{tag}</li>)
          ) : (
            <div>Nessun tag presente</div>
          )}
        </div>
        <div>
          {post.total_comments > 0 ? (
            `Ci sono ${post.total_comments} commenti`
          ) : (
            <div>Nessun commento</div>
          )}
        </div>
        <div className={styles.showDetails} onClick={() => goToDetail()}>
          Mostra dettagli
        </div>
      </div>
    </>
  );
};

export default PostItem;
