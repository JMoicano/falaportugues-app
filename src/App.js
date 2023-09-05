import './App.css';
import { useState, useCallback, useEffect } from 'react';
const FALA_PORTUGUES_API_URL = "http://localhost:4000/api"

function App() {

  const [noun, setNoun] = useState(null)
  const [adjective, setAdjective] = useState(null)

  const fetchNoun = useCallback(async () => {
    const nounResponse = await fetch(`${FALA_PORTUGUES_API_URL}/trend-noun`)
    const selectedNoun = await nounResponse.json()
    setNoun(selectedNoun[0])
  }, [])

  const fetchAdjective = useCallback(async () => {
    const adjectiveResponse = await fetch(`${FALA_PORTUGUES_API_URL}/trend-adjective`)
    const selectedAdjective = await adjectiveResponse.json()
    setAdjective(selectedAdjective[0])
  }, [])

  useEffect(() => {
    fetchNoun()
  }, [fetchNoun]) 

  useEffect(() => {
    fetchAdjective()
  }, [fetchAdjective]) 

  return (
    <div className="App">
      <body>
        <div>
          <WordContainer word={adjective}/>
          <WordContainer word={noun}/>
        </div>
        <div>
          <UpdateButton buttonLabel="Update Adjective" onUpdateRequested={fetchAdjective}/>
          <UpdateButton buttonLabel="Update Noun" onUpdateRequested={fetchNoun}/>
          <UpdateButton buttonLabel="New trend" onUpdateRequested={() => {
            fetchNoun(); 
            fetchAdjective()
          }}/>
        </div>
      </body>
    </div>
  );
}

function WordContainer({ word }) {
  return (
    <h1>{word}</h1>
  )
}

function UpdateButton({ buttonLabel, onUpdateRequested }) {
  return (
    <button onClick={onUpdateRequested}>{buttonLabel}</button>
  )
}

export default App;
