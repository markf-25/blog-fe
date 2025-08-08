import useInput from "../../../hooks/useInput.js";

import Modal from "../../Modal/Modal";
import Input from "../../Input/Input";
import RichTextInput from "../../RichTextComponent/RichTextComponent.jsx"
import TagFinder from "../TagFinder/TagFinder"

import { useState, useEffect } from "react"

import useRichInput from "../../../hooks/useRichInput.js"

import styles from "./PostModal.module.css";

const PostModal = ({ isOpen, onClose, onConfirm, existingPost}) => {

  const date = Date.now();

  const { value: titleValue, handleChange: titleValueChange } = useInput(existingPost?.title ? existingPost.title : "");
  const [ tagsArray, SetTagsArray ] = useState(existingPost?.tags ? existingPost.tags : [])

const tagListHandler = (newTag) => {
  SetTagsArray(prev => [...prev, newTag]);
}

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
      tags: tagsArray,
    };

    if(existingPost){
      post.postId = existingPost.id
    }

    console.log("IL POST COMPLETO", post);

   onConfirm(post)
  };

  useEffect(()=> {
    console.log("I TAG IN LISTA", tagsArray)
  }, [tagsArray])

  const removeTag = (tagToRemove) => {
  SetTagsArray(prev => prev.filter(tag => tag !== tagToRemove));

};

  return (
    <>
      <form onSubmit={savePost}>
        <div className={styles.overlay} onClick={onClose} />
        <div className={styles.modal}>
          <Modal isOpen={isOpen} onClose={onClose} header="Post">
            <div className={styles.inputAndTagsDiv}>
            <div className={styles.inputDiv}>
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
      </div>
           {/*  <Input
              id="image"
               error={updatesErrors.avatar}
              name="image"
              placeholder="Inserisci il link all'immagine del post"
              maxLength={100}
              onChange={imageUrlChange}
              value={imageUrl}
            /> */}
            <div className={styles.tagsDiv}>
            <div onClick={(e) => e.stopPropagation()}>
  {tagsArray.length > 0
    ? tagsArray.map((tag) => (
        <button
          key={tag}
          onClick={(e) => {
            e.stopPropagation();
            removeTag(tag);
          }}
        >
          #{tag}
        </button>
      ))
    : null}
</div>
            <TagFinder addTag={tagListHandler} tagsAlreadyAdded={tagsArray}/>
            </div>
            </div>
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
