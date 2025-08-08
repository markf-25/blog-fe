import Image from "../../Image/Image.jsx"
import ProfileUpdateModal from "../ProfileUpdateModal/ProfileUpdateModal"

import { useState } from "react";
import {createPortal} from "react-dom";

import styles from "./UserSidebar.module.css"

import { MdSettings } from "react-icons/md";

const UserSidebar = ({user}) => {
    
    const [changeUsername, setChangeUsername] = useState(true);
    const [openModal, setOpenModal] = useState(false);

    const [showSettings, setShowSettings] = useState(false)

    return <>
    <div className={styles.module}>
    <div className={styles.profile}>
      <Image src={user.avatar} className="avatar" alt="Avatar utente" />
      <div className={styles.username}>
        <h6>Username:</h6>
        <h2>{user.username}</h2>
      </div>
      <div className={styles.email}>
      <h6>Email:</h6>
      <h5>{user.email}</h5>
      </div>
    </div>

    <h3
      className={styles.settingsToggle}
      onClick={() => setShowSettings(!showSettings)}
    >
      <MdSettings /> Impostazioni <MdSettings />
    </h3>

    <div className={`${styles.settings} ${showSettings ? styles.show : ""}`}>
      <p onClick={() => { setOpenModal(true); setChangeUsername(true); }}>
        Cambia username e avatar
      </p>
    </div>
  </div>

{openModal && createPortal(
            <ProfileUpdateModal isOpen={openModal} onClose={()=>setOpenModal(false)} change={changeUsername}/>,
            document.body
        )}
    </>
}

export default UserSidebar