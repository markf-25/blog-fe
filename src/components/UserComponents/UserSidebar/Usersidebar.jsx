import Image from "../../Image/Image.jsx"
import ProfileUpdateModal from "../ProfileUpdateModal/ProfileUpdateModal"

import {useSelector} from "react-redux";
import {userSelector} from "../../../reducers/user.slice.js"
import { useState } from "react";
import {createPortal} from "react-dom";

import styles from "./UserSidebar.module.css"

const UserSidebar = () => {
    const user = useSelector(userSelector)
    const [changeUsername, setChangeUsername] = useState(true);
    const [openModal, setOpenModal] = useState(false);

    return <>
    <div className={styles.module}>
    <Image src={user.avatar} className="avatar" onClick={()=> {setOpenModal(true), setChangeUsername(false)}}/>
    <button onClick={()=> {setOpenModal(true), setChangeUsername(true)}}>{user.username}</button>
    <p>{user.email}</p>
    </div>
{openModal && createPortal(
            <ProfileUpdateModal isOpen={openModal} onClose={()=>setOpenModal(false)} change={changeUsername}/>,
            document.body
        )}
    </>
}

export default UserSidebar