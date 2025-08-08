import { useState, useRef, useEffect } from "react";

const useRichInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== initialValue) {
      ref.current.innerHTML = initialValue;
      setValue(initialValue);
    }
  }, [initialValue]);

  const handleInput = (e) => {
    setValue(e.currentTarget.innerHTML);
  };

  const setRichContentValue = (newContent) => {
    setValue(newContent);
    if (ref.current) {
      ref.current.innerHTML = newContent;
    }
  };

  return { value, setRichContentValue, handleInput, ref };
};

export default useRichInput;