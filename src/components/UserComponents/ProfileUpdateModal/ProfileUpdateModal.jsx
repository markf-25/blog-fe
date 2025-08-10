import Modal from "../../Modal/Modal";
import Input from "../../Input/Input";
import styles from "../AuthModal/AuthModal.module.css";

import useInput from "../../../hooks/useInput.js";
import { editProfile } from "../../../services/profile.service.js";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelector, updateUser } from "../../../reducers/user.slice.js";

import { isAlphaNum, hasMinLength, hasMaxLength, hasNoSpaces, isNotEmpty } from "../../../utils/validators.jsx";
import { usernameAvailable } from "../../../services/registration.service.js";

import { useTheme } from "@mui/material/styles";

const ProfileUpdateModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const { value: usernameValue, handleChange: handleUsernameChange } = useInput("");
  const { value: avatarUrlValue, handleChange: handleAvatarUrlChange } = useInput("");

  const user = useSelector(userSelector);
  const currentUsername = user.username;
  const currentAvatar = user.avatar;
  const accessToken = user.accessToken;

  const [updatesErrors, setUpdatesErrors] = useState({
    username: "",
    avatar: "",
  });

  useEffect(() => {
    const avatarUrlLength = 100;
    if (avatarUrlValue.length === avatarUrlLength) {
      handleErrorsChange("avatar", "Numero massimo di caratteri raggiunto");
    } else {
      handleErrorsChange("avatar", "");
    }
  }, [avatarUrlValue]);

  const handleErrorsChange = (key, value) => {
    setUpdatesErrors((prevState) => ({ ...prevState, [key]: value }));
  };

  const updateProfileDatas = async (event) => {
    event.preventDefault();

    // Reset errori
    setUpdatesErrors({ username: "", avatar: "" });

    const username = usernameValue.trim();
    const avatar = avatarUrlValue.trim();

    const nothingChanged = username === "" && avatar === "";
    if (nothingChanged) {
      onClose();
      return;
    }

    if (isNotEmpty(username)) {
      const usernameValid =
        isAlphaNum(username) &&
        hasNoSpaces(username) &&
        hasMinLength(username, 3) &&
        hasMaxLength(username, 30);

      if (!usernameValid) {
        handleErrorsChange(
          "username",
          "Inserisci uno username fra i 3 e i 30 caratteri alfanumerici, senza spazi"
        );
        return;
      }

      if (username !== currentUsername) {
        const { available } = await usernameAvailable(username);
        if (!available) {
          handleErrorsChange("username", "Username non disponibile");
          return;
        }
      }
    }

    if (isNotEmpty(avatar)) {
      if (!hasMaxLength(avatar, 100)) {
        handleErrorsChange("avatar", "L’URL dell’avatar è troppo lungo");
        return;
      }
    }

    const payload = {
      username: isNotEmpty(username) ? username : currentUsername,
      avatar: isNotEmpty(avatar) ? avatar : currentAvatar,
      token: accessToken,
    };

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
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <Modal isOpen={isOpen} onClose={onClose} header="Modifica il profilo">
          <form onSubmit={updateProfileDatas}>
            <Input
              id="username"
              error={updatesErrors.username}
              name="username"
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
            <button
              type="submit"
              className="submit_button"
              style={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                border: "none",
                padding: "10px 20px",
                borderRadius: 6,
                cursor: "pointer",
                marginTop: 12,
                fontWeight: "bold",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = theme.palette.primary.dark)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = theme.palette.primary.main)}
            >
              Conferma
            </button>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default ProfileUpdateModal;