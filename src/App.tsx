import { useState } from "react";
import useDebounce from "./hooks/useDebounce";
import useFetch from "./hooks/useFetch";


function App() {
  const [query, setQuery] = useState("");
  const debounceValue = useDebounce(query, 700);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const {word, definition, isError} = useFetch(debounceValue)

  return (
    <section>
      <input type="text" value={query} onChange={handleChange} />
      {isError && debounceValue && <p>Word not found</p>}
      {debounceValue && <h4>{word}</h4>}
      {debounceValue && <p>{definition}</p>}
    </section>
  );
}

export default App;
