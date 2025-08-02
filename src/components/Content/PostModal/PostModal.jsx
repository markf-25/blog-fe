import useInput from "../../../hooks/useInput.js";

import { useDispatch } from "react-redux"
import useSocketEmit from "../../../hooks/useSocketEmit.js"
import { updatePost } from "../../../reducers/posts.slice.js"

import Modal from "../../Modal/Modal";
import Input from "../../Input/Input";
import RichTextInput from "../../RichTextComponent/RichTextInput.jsx"

import useRichInput from "../../../hooks/useRichInput.js"

import styles from "../../UserComponents/AuthModal/AuthModal.module.css";

const PostModal = ({ isOpen, onClose, onConfirm, existingPost}) => {

  const date = Date.now();

  const { value: titleValue, handleChange: titleValueChange } = useInput(existingPost?.title ? existingPost.title : "");

const {
  value: richContentValue,
  handleInput: handleRichContentInput,
  ref
} = useRichInput(existingPost ? existingPost.content : "");


  const savePost = async (event) => {
    event.preventDefault();

    const post = {
      title: titleValue,
      content: richContentValue,
      publishDate: date,
      tags: [],
    };

    if(existingPost){
      post.postId = existingPost.id
    }

    console.log("IL POST COMPLETO", post);

   onConfirm(post)
  };

  return (
    <>
      <form onSubmit={savePost}>
        <div className={styles.overlay} onClick={onClose} />
        <div className={styles.modal}>
          <Modal isOpen={isOpen} onClose={onClose} header="Post">
            <Input
              id="title"
              /*  error={updatesErrors.username} */
              name="title"
              placeholder="Il titolo del tuo post"
              onChange={titleValueChange}
              value={titleValue}
            />
            <RichTextInput
        id="content"
        label="Contenuto"
        value={richContentValue}
        onInput={handleRichContentInput}
        ref={ref}
      />
           {/*  <Input
              id="image"
               error={updatesErrors.avatar}
              name="image"
              placeholder="Inserisci il link all'immagine del post"
              maxLength={100}
              onChange={imageUrlChange}
              value={imageUrl}
            /> */}
            <p>TODO: AGGIUNGERE I TAG</p>
          </Modal>
          <button type="submit" className="submit_button">
            Invia
          </button>
        </div>
      </form>
    </>
  );
};

export default PostModal;
