import useInput from "../../../hooks/useInput.js";
import useRichInput from "../../../hooks/useRichInput.js";

import { hasMinLength } from "../../../utils/validators"

import Modal from "../../Modal/Modal";
import Input from "../../Input/Input";
import RichTextInput from "../../RichTextComponent/RichTextComponent.jsx";
import TagFinder from "../TagFinder/TagFinder";

import { useState, useEffect, useMemo } from "react";
import { Box, Button, Chip, Stack, FormHelperText } from "@mui/material";

const PostModal = ({ isOpen, onClose, onConfirm, existingPost }) => {
  const date = Date.now();

  const { value: titleValue, handleChange: titleValueChange } = useInput(
    existingPost?.title ? existingPost.title : ""
  );

  const [tagsArray, setTagsArray] = useState(existingPost?.tags ? existingPost.tags : []);

  const tagListHandler = (newTag) => {
    if (!newTag) return;
    setTagsArray((prev) => (prev.includes(newTag) ? prev : [...prev, newTag]));
  };

  const { value: richContentValue, setRichContentValue, handleInput: handleRichContentInput, ref } =
  useRichInput("");

useEffect(() => {
  if (existingPost?.content) {
    setRichContentValue(existingPost.content);
  }
}, [existingPost, setRichContentValue]);

  useEffect(() => {
    
    console.log("I TAG IN LISTA", tagsArray);
  }, [tagsArray]);

  const removeTag = (tagToRemove) => setTagsArray((prev) => prev.filter((t) => t !== tagToRemove));

  const formId = useMemo(() => (existingPost ? `post-form-${existingPost.id}` : "post-form-new"), [existingPost]);

  const [postErrors, setPostErrors] = useState({
    title: "",
    content: "",
    general: "",
  });


  const handlePostErrorsChange = (key, value) => {
    setPostErrors((prevState) => ({ ...prevState, [key]: value }));
  };

  const savePost = (event) => {
    event.preventDefault();

    handlePostErrorsChange({title: "", content: "", general: ""})

    const minTitleLength = 3
    const minContentLength = 10

    const titleAcceptable = hasMinLength(titleValue, minTitleLength)
    const contentAcceptable = richContentValue !== ""

    if(!titleAcceptable){
      handlePostErrorsChange("title", `Il titolo non può avere meno di ${minTitleLength} caratteri`)  
    }

    if(!contentAcceptable){
      handlePostErrorsChange("content", `Il contenuto del post non può avere meno di ${minContentLength} caratteri`)
        
    }

    if(!titleAcceptable || !contentAcceptable){
      return
    }

    const post = {
      title: titleValue,
      content: richContentValue,
      publishDate: date,
      tags: tagsArray,
    };

    if (existingPost) post.postId = existingPost.id;

    console.log("IL POST COMPLETO", post);
    onConfirm(post);
  };

  const actions = (
    <>
      <Button onClick={onClose}>Annulla</Button>
      <Button type="submit" form={formId} variant="contained">
        Invia
      </Button>
    </>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} header={existingPost ? "Modifica Post" : "Nuovo Post"} actions={actions}>
      <Box component="form" id={formId} onSubmit={savePost} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Input
          id="title"
          label="Titolo"
          name="title"
          placeholder="Il titolo del tuo post"
          error={postErrors.title}
          onChange={titleValueChange}
          value={titleValue}
        />

        <RichTextInput id="content" label="Contenuto" value={richContentValue} onInput={handleRichContentInput} ref={ref} />
       <FormHelperText id="title-error-text" error={Boolean(postErrors.content)}>
    {postErrors.content}
  </FormHelperText>
        <Box>
          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
            {tagsArray.map((tag) => (
              <Chip key={tag} label={`#${tag}`} onDelete={() => removeTag(tag)} />
            ))}
          </Stack>

          <Box mt={1}>
            <TagFinder addTag={tagListHandler} tagsAlreadyAdded={tagsArray} />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default PostModal;