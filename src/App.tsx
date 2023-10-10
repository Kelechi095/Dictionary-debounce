import { useEffect, useState } from "react"
import axios from 'axios'


const URL = "https://api.dictionaryapi.dev/api/v2/entries/en"

function App() {
  const [query, setQuery] = useState("word")
  const [word, setWord] = useState("")
  const [definition, setDefinition] = useState("")

  const fetchDefinition = async() => {
    try {
      const response = await axios.get(`${URL}/${query}`)
      setDefinition(response.data[0].meanings[0].definitions[0].definition)
      setWord(response.data[0].word.toUpperCase())
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  useEffect(() => {
    fetchDefinition()
  }, [query])

  return (
    <>
    <input type="text" value={query} onChange={handleChange} />
      <h4>{word}</h4>
      <p>{definition}</p>
    </>
  )
}

export default App
