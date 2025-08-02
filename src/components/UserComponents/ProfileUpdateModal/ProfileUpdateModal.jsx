import Modal from "../../Modal/Modal";

import Input from "../../Input/Input";

import styles from "../AuthModal/AuthModal.module.css";

import useInput from "../../../hooks/useInput.js";
import { editProfile } from "../../../services/profile.service.js";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelector, updateUser } from "../../../reducers/user.slice.js";
import { isAlphaNum, hasMinLength, hasMaxLength, hasNoSpaces } from "../../../utils/validators.jsx"
import { usernameAvailable } from "../../../services/registration.service.js";

const ProfileUpdateModal = ({ isOpen, onClose }) => {

  const dispatch = useDispatch();

  const { value: usernameValue, handleChange: handleUsernameChange } =
    useInput("");
  const { value: avatarUrlValue, handleChange: handleAvatarUrlChange } =
    useInput("");

  const user = useSelector(userSelector);
  const currentUsername = user.username
  const currentAvatar = user.avatar
  const accessToken = user.accessToken

  useEffect(() => {
    const avatarUrlLength = 100;
    if (avatarUrlValue.length === avatarUrlLength) {
      handleErrorsChange("avatar", `Numero massimo di caratteri raggiunto`);
    } else {
      handleErrorsChange("avatar", ``);
    }
  }, [avatarUrlValue]);

  const [updatesErrors, setUpdatesErrors] = useState({
    username: "",
    avatar: "",
  });

  const handleErrorsChange = (key, value) => {
    setUpdatesErrors((prevState) => ({ ...prevState, [key]: value }));
  };

  const updateProfileDatas = async (event) => {
    event.preventDefault();

    handleErrorsChange("username", "", "avatar", "");

    const areBothInputEmpty = usernameValue === "" && avatarUrlValue === ""
    const usernameIsEmpty = usernameValue === ""
    
    if (areBothInputEmpty) {
      onClose();
    }

    const areUsernameCharactersValid = isAlphaNum(usernameValue) && hasNoSpaces(usernameValue)
    const isUsernameLengthValid = hasMinLength(usernameValue, 3) && hasMaxLength(usernameValue, 30);
    
    if(!usernameIsEmpty){
    if(!areUsernameCharactersValid || !isUsernameLengthValid){
        handleErrorsChange('username', `Inserisci uno username fra i 3 e i 30 caratteri alfanumerici, senza spazi`);
        return
        }
    }


    if(usernameValue !== currentUsername && !usernameIsEmpty) {

        const usernameChosen = await usernameAvailable(usernameValue)

          if(!usernameChosen.available) {
            handleErrorsChange('username', 'Username non disponibile');
            return
          }
    }

    const payload = {
      username: usernameValue !== "" ? usernameValue : currentUsername,
      avatar: avatarUrlValue !== "" ? avatarUrlValue : currentAvatar,
      token: accessToken
    };

    console.log("ECCO IL PAYLOAD", payload);

    try {
      const profileUpdated = await editProfile(payload);

      if (profileUpdated) {
        dispatch(updateUser(profileUpdated));
        onClose();
      }
    } catch (error) {
      console.error("Errore durante l'aggiornamento del profilo:", error);
    }
  };

  return (
    <>
      <form onSubmit={updateProfileDatas}>
        <div className={styles.overlay} onClick={onClose} />
        <div className={styles.modal}>
          <Modal isOpen={isOpen} onClose={onClose} header="Modifica il profilo">
              <Input
                id="username"
                error={updatesErrors.username}
                name="password"
                maxLength={30}
                placeholder="Inserisci il nuovo username"
                onChange={handleUsernameChange}
                value={usernameValue}
              />
                <Input
                  id="avatar"
                  error={updatesErrors.avatar}
                  name="avatar"
                  type="url"
                  maxLength={100}
                  placeholder="Inserisci l'url del tuo nuovo avatar"
                  onChange={handleAvatarUrlChange}
                  value={avatarUrlValue}
                />
          </Modal>
          <button type="submit" className="submit_button">
            Conferma
          </button>
        </div>
      </form>
    </>
  );
};

export default ProfileUpdateModal;
