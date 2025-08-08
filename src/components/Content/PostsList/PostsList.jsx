import PostItem from "../PostItem/PostItem"
import styles from "./PostsList.module.css"

const PostsList = ({ posts, authorId = null }) => {
  
    const filteredPosts = authorId
    ? posts.filter(post => post.authorId === authorId)
    : posts;

  return <>
    <div className={styles.list}>
      {filteredPosts && filteredPosts.length > 0 ? (
        filteredPosts.map(post => (
          <PostItem post={post} key={post.id} />
        ))
      ) : (
        <div>Nessuno ha ancora postato nulla</div>
      )}
    </div>
  </>;
};

export default PostsList;