import PostItem from "../PostItem/PostItem";
import { Stack, Typography } from "@mui/material";
import styles from "./PostsList.module.css"

const PostsList = ({ posts, authorId = null }) => {
  const filteredPosts = authorId
    ? posts.filter(post => post.authorId === authorId)
    : posts;

  return (
    <div className={styles.postsListContainer}>
    <Stack spacing={2}>
      {filteredPosts && filteredPosts.length > 0 ? (
        filteredPosts.map(post => (
          <PostItem post={post} key={post.id} />
        ))
      ) : (
        <Typography>Nessuno ha ancora postato nulla</Typography>
      )}
    </Stack>
    </div>
  );
};

export default PostsList;
