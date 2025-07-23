import UserSideBar from "../UserSidebar/Usersidebar"
import Counter from "../../../Counter"
import styles from "./UserProfilePage.module.css"

const UserProfilePage = () => {
return <>
<div className={styles.mainDiv}>
<div className={styles.sidebar}>
<UserSideBar/>
</div>
<div className={styles.posts}>
<Counter/>
</div>
</div>
</>
}

export default UserProfilePage