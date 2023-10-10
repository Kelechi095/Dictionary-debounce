import { useEffect, useState } from "react"
import axios from 'axios'
import useDebounce from "./hooks/useDebounce"
import { debounce } from "lodash"



const URL = "https://api.dictionaryapi.dev/api/v2/entries/en"

function App() {
  const [query, setQuery] = useState("")
  const [word, setWord] = useState("")
  const [error, setError] = useState(false)
  const [definition, setDefinition] = useState("")
  const debounceValue = useDebounce(query, 500)

  const fetchDefinition = async() => {
    try {
      const response = await axios.get(`${URL}/${debounceValue}`)
      setDefinition(response.data[0].meanings[0].definitions[0].definition)
      setWord(response.data[0].word.toUpperCase())
      setError(false)
    } catch (err) {
      setError(true)
      console.log(err)
      setDefinition('')
      setWord("")
    }
  }


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  
  useEffect(() => {
    if(debounceValue.length)fetchDefinition()
  }, [debounceValue])

  return (
    <section>
    <input type="text" value={query} onChange={handleChange} />
    {error && debounceValue && <p>Word not found</p>}
      {debounceValue && <h4>{word}</h4>}
      {debounceValue && <p>{definition}</p>}
    </section>
  )
}

export default App
