import PostItem from "../PostItem/PostItem"
import styles from "./PostsList.module.css"

const PostsList = ({posts, /* onLoadMore, hideButton */}) => {

/*     const loadMoreHandler = () => {
        onLoadMore();
    } */

    return (
        <div className={styles.list}>
            {posts?
                posts.map(post => (
                    <PostItem post={post}/>
                )) : <div>Nessuno ha ancora postato nulla</div>}
            <div className="Qualcosa">
                {/* {!hideButton && <button className="text" onClick={loadMoreHandler}>Vedi altri post;</button>} */}
            </div>
        </div>
    )
}

export default PostsList;