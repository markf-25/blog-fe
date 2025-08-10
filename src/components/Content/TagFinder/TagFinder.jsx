import { useContext, useState, useEffect } from "react";
import { SocketContext } from "../../../contexts/SocketProvider";
import useInput from "../../../hooks/useInput.js";
import useSocketEmit from "../../../hooks/useSocketEmit.js";
import { TextField, Chip, Stack, Typography } from "@mui/material";

const TagFinder = ({ addTag, tagsAlreadyAdded }) => {
  const [tags, setTags] = useState([]);
  const { value: checkNewTag, setValue: resetValue, handleChange: checkNewTagChange } = useInput("");
  const { socketReady } = useContext(SocketContext);
  const { getTags } = useSocketEmit();

  const tagsRetriever = async (payload) => {
    try {
      const tagList = await getTags(payload);
      tagList.tags.sort((a, b) => a.localeCompare(b));
      setTags(tagList.tags);
    } catch (error) {
      console.error("Errore durante il caricamento tag:", error);
    }
  };

  const millisecondsToWait = 500;

  useEffect(() => {
    if (!socketReady) return;

    const payload = {
      name: checkNewTag || "",
      cursor: null,
      direction: "next",
      limit: 5,
    };

    if (checkNewTag !== "") {
      const timer = setTimeout(() => {
        tagsRetriever(payload);
      }, millisecondsToWait);
      return () => clearTimeout(timer);
    }
    tagsRetriever(payload);
  }, [socketReady, checkNewTag]);

  const filteredTags = tags.filter(tag => !tagsAlreadyAdded.includes(tag));

  return (
    <>
      <TextField
        id="tagFilter"
        label="Tag"
        value={checkNewTag}
        onChange={checkNewTagChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTag(checkNewTag);
            resetValue("");
          }
        }}
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
      />

      {filteredTags.length > 0 ? (
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {filteredTags.map((tag) => (
            <Chip
              key={tag}
              label={`#${tag}`}
              onClick={() => addTag(tag)}
              variant="outlined"
              clickable
            />
          ))}
        </Stack>
      ) : (
        <>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Aggiungi un nuovo tag
          </Typography>
          {checkNewTag && (
            <Chip
              key={checkNewTag}
              label={`#${checkNewTag}`}
              onClick={() => addTag(checkNewTag)}
              color="primary"
              clickable
            />
          )}
        </>
      )}
    </>
  );
};

export default TagFinder;
