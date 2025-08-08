import { SocketContext } from "../../../contexts/SocketProvider";
import { useContext } from "react";
import { useState, useEffect } from "react";

import Input from "../../Input/Input";
import useInput from "../../../hooks/useInput.js";

import useSocketEmit from "../../../hooks/useSocketEmit.js";

const TagFinder = ({addTag, tagsAlreadyAdded}) => {

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

const millisecondsToWait = 500

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
      console.log("ASPETTIAMO...");
      tagsRetriever(payload);
    }, millisecondsToWait);

    return () => clearTimeout(timer);
  }
  tagsRetriever(payload);

}, [socketReady, checkNewTag]);

const filteredTags = tags.filter(tag => !tagsAlreadyAdded.includes(tag));


  return <>
      <Input
        id="tagFilter"
        label="Tag:"
        value={checkNewTag}
        onChange={checkNewTagChange}
        onEnter={() => {addTag(checkNewTag), resetValue("")}}
      />
      {filteredTags.length > 0 ? (
        filteredTags.map((tag) => (
          <button
            key={tag}
            className="tagList"
            id={`checkbox-${tag}`}
            type="button"
            placeholder={tag}
            defaultChecked={false}
            onClick={() => {addTag(tag),
              console.log("IL TAG", tag);
            }}
          >
            #{tag}
          </button>
        ))
      ) : (<>
        <p>Aggiungi un nuovo tag</p>
        <button
            key={checkNewTag}
            className="tagList"
            id={`checkbox-${checkNewTag}`}
            type="button"
            placeholder={checkNewTag}
            defaultChecked={false}
            onClick={() => {addTag(checkNewTag),
              console.log("IL TAG", checkNewTag);
            }}
          >
            #{checkNewTag}
          </button>
          </>
      )}
    </>
};

export default TagFinder;
