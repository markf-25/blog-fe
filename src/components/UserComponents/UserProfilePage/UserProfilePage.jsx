import UserSideBar from "../UserSidebar/Usersidebar"
import {useSelector} from "react-redux";
import {userSelector} from "../../../reducers/user.slice.js"
import styles from "./UserProfilePage.module.css"

import { postsSelector } from "../../../reducers/posts.slice.js"

import PostsList from "../../Content/PostsList/PostsList"

const UserProfilePage = () => {
const user = useSelector(userSelector)

const posts = useSelector(postsSelector);

return <>
<div className={styles.userPageMainDiv}>
<div className={styles.sidebar}>
<UserSideBar user={user}/>
</div>
<div className={styles.posts}>
<PostsList posts={posts} authorId={user.id}/>
</div>
</div>
</>
}

export default UserProfilePage