import Image from "../../Image/Image.jsx";
import ProfileUpdateModal from "../ProfileUpdateModal/ProfileUpdateModal";

import { useState } from "react";
import { createPortal } from "react-dom";

import styles from "./UserSidebar.module.css";
import { MdSettings } from "react-icons/md";

const UserSidebar = ({ user }) => {
  const [changeUsername, setChangeUsername] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => setShowSettings((prev) => !prev);
  const openProfileModal = () => {
    setChangeUsername(true);
    setOpenModal(true);
  };
  const closeProfileModal = () => setOpenModal(false);

  return (
    <>
      <div className={styles.module}>
        {/* Sezione profilo */}
        <div className={styles.profile}>
          <Image src={user.avatar} alt="Avatar utente" variant="avatar" />

          <div className={styles.username}>
            <h6>Username:</h6>
            <h2>{user.username}</h2>
          </div>

          <div className={styles.email}>
            <h6>Email:</h6>
            <h5>{user.email}</h5>
          </div>
        </div>

        {/* Pulsante impostazioni */}
        <h3 className={styles.settingsToggle} onClick={toggleSettings}>
          <MdSettings /> Impostazioni <MdSettings />
        </h3>

        {/* Menu impostazioni */}
        {showSettings && (
          <div className={`${styles.settings} ${styles.show}`}>
            <p onClick={openProfileModal}>Cambia username e avatar</p>
          </div>
        )}
      </div>

      {/* Modal di aggiornamento profilo */}
      {openModal &&
        createPortal(
          <ProfileUpdateModal
            isOpen={openModal}
            onClose={closeProfileModal}
            change={changeUsername}
          />,
          document.body
        )}
    </>
  );
};

export default UserSidebar;
