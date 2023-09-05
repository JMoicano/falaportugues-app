import "./App.css";
import { useState, useCallback, useEffect } from "react";

const FALA_PORTUGUES_API_URL = "http://localhost:4000/api";

function App() {
  const [noun, setNoun] = useState(null);
  const [adjective, setAdjective] = useState(null);

  const fetchNoun = useCallback(async () => {
    const nounResponse = await fetch(`${FALA_PORTUGUES_API_URL}/trend-noun`);
    const selectedNoun = await nounResponse.json();
    setNoun(selectedNoun[0]);
  }, []);

  const fetchAdjective = useCallback(async () => {
    const adjectiveResponse = await fetch(
      `${FALA_PORTUGUES_API_URL}/trend-adjective`
    );
    const selectedAdjective = await adjectiveResponse.json();
    setAdjective(selectedAdjective[0]);
  }, []);

  useEffect(() => {
    fetchNoun();
  }, [fetchNoun]);

  useEffect(() => {
    fetchAdjective();
  }, [fetchAdjective]);

  return (
    <div className="h-screen bg-slate-950">
      <div className="flex flex-col h-full overflow-hidden">
        <header className="font-['Rajdhani'] text-2xl absolute w-full text-center text-white mt-6">
          Fala português…
        </header>

        <main className="flex flex-auto flex-col justify-center items-center  text-white">
          <span className="font-['Rajdhani'] mb-4">
            A nova tendência do mercado é:
          </span>
          <WordContainer>
            {adjective} {noun}
          </WordContainer>

          <div className="flex flex-col mt-12 gap-2 lg:gap-6 max-w-lg">
            <div className="flex gap-2 lg:gap-6">
              <Button onClick={fetchAdjective}>Update Adjective</Button>
              <Button onClick={fetchNoun}>Update Noun</Button>
            </div>

            <Button
              onClick={() => {
                fetchNoun();
                fetchAdjective();
              }}
            >
              New trend
            </Button>
          </div>
        </main>

        <footer className="flex justify-between text-sm text-white bg-slate-900 px-12 py-8">
          <span>
            Created by{" "}
            <Link href="https://www.github.com/jmoicano">@JMoicano</Link> and{" "}
            <Link href="https://www.github.com/savioserra">@savioserra</Link>
          </span>

          <span>☭</span>
        </footer>
      </div>
    </div>
  );
}

const Link = ({ children, ...props }) => {
  return (
    <a className="text-cyan-600" {...props}>
      {children}
    </a>
  );
};

function WordContainer({ children }) {
  return (
    <h1 className="font-['Abril_Fatface'] text-lg lg:text-4xl px-4 py-2 lg:py-4 rounded lg:rounded-xl text-white">
      {children}
    </h1>
  );
}

function Button({ children, ...props }) {
  return (
    <button
      className="transition-all bg-white hover:bg-cyan-400 text-black text-sm lg:text-lg border rounded lg:rounded-lg border-transparent hover:border-cyan-300 px-4 py-2 "
      {...props}
    >
      {children}
    </button>
  );
}

export default App;
