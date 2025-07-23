import Modal from "../../Modal/Modal";

import Input from "../../Input/Input"

import styles from "../AuthModal/AuthModal.module.css"

import useInput from "../../../hooks/useInput.js";
import { editProfile } from "../../../services/profile.service.js"
import { useState, useEffect } from "react"
import {useDispatch, useSelector} from "react-redux";
import {userSelector, updateUser} from "../../../reducers/user.slice.js"
import { usernameAvailable } from "../../../services/registration.service.js"

const ProfileUpdateModal = ({isOpen, onClose, change}) => {

    const changeUsername = change

    const dispatch = useDispatch()

    const {value: usernameValue, handleChange: handleUsernameChange} = useInput("");
    const {value: avatarUrlValue, handleChange: handleAvatarUrlChange} = useInput("");
    const userInitialState = useSelector(userSelector)

    
    const [user, setUser] = useState(userInitialState)
    const [newUsername, setNewUsername] = useState(usernameValue)
    const [newAvatarUrl, setNewAvatarUrl] = useState(avatarUrlValue)

    useEffect(()=>{
        const avatarUrlLength = 100
        if(avatarUrlValue.length === avatarUrlLength){
            handleErrorsChange('avatar', `Numero massimo di caratteri raggiunto`);
        }
        else{
            handleErrorsChange('avatar', ``);
        }

    }, [avatarUrlValue])

    const [updatesErrors, setUpdatesErrors] = useState({
        username: "",
        avatar: ''
  });

    const handleErrorsChange = (key, value) => {
        setUpdatesErrors(prevState => ({...prevState, [key]: value}));
    }

    const updateProfileDatas = async (event) => {
        console.log("USER PRIMA DELLA CHIAMATA e NUMERO", user)
        event.preventDefault();

        handleErrorsChange('username', '', 'avatar', '');

        if(usernameValue === ""){
            handleErrorsChange('username', 'Username non inserito. Inserisci uno username valido oppure torna alla home')
            console.log("ENTRATO IN USERNAME", newUsername)
        }

        if(avatarUrlValue === ""){
            handleErrorsChange('avatar', 'Url non inserito. Inserisci uno url valido oppure torna alla home')
            console.log("ENTRATO IN AVATAR", newAvatarUrl)
        }

        if(usernameValue === "" && avatarUrlValue === ""){
            return
        }

        const payload = {
        username: usernameValue !== "" ? usernameValue : user.username,
        avatar: avatarUrlValue !== "" ? avatarUrlValue : user.avatar,
        token : user.accessToken
    }

    console.log("ECCO IL PAYLOAD", payload)

        try {
    const profileUpdated = await editProfile(payload);

    if (profileUpdated) {
        dispatch(updateUser(profileUpdated));
        console.log("PROFILE UPDATED POI E user", profileUpdated, user);
        onClose()
    }
} catch (error) {
    console.error("Errore durante l'aggiornamento del profilo:", error);
}
    }

    return <>
    <form onSubmit={updateProfileDatas}>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        
        <Modal isOpen={isOpen} onClose={onClose}>
            
          {changeUsername? <Input id="username" label="username" error={updatesErrors.username} name="password" maxLength={30} placeholder="Inserisci il nuovo username" onChange={handleUsernameChange} value={usernameValue}/>
    : 
    <><Input id="avatar" label="avatar" error={updatesErrors.avatar} name="avatar" maxLength={100} placeholder="Inserisci l'url del tuo nuovo avatar" onChange={handleAvatarUrlChange} value={avatarUrlValue}/>
    <p>(nota: puoi mantenere il tuo avatar lasciato vuoto questo spazio)</p></>}

        </Modal>
        <button type="submit" className="submit_button">Conferma</button>
      </div>
    </form>
    </>
}

export default ProfileUpdateModal