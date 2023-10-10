import axios from "axios";
import { useState, useEffect } from "react";

const useFetch = (debounceValue: string) => {
  const [word, setWord] = useState("");
  const [isError, setIsError] = useState(false);
  const [definition, setDefinition] = useState("");

  const URL = "https://api.dictionaryapi.dev/api/v2/entries/en";

  const fetchDefinition = async () => {
    try {
      const response = await axios.get(`${URL}/${debounceValue}`);
      setDefinition(response.data[0].meanings[0].definitions[0].definition);
      setWord(response.data[0].word.toUpperCase());
      setIsError(false);
    } catch (err) {
      setIsError(true);
      console.log(err);
      setDefinition("");
      setWord("");
    }
  };

  useEffect(() => {
    if (debounceValue.length) fetchDefinition();
  }, [debounceValue]);

  return { isError, word, definition };
};

export default useFetch;
