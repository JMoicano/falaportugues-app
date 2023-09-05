"use client";

import classNames from "classnames";
import { useState, useCallback, useEffect } from "react";

import * as apiService from "../api.service";
import { abril, rajdhani } from "./fonts";

function App() {
  const [noun, setNoun] = useState("");
  const [adjective, setAdjective] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const withLoader = useCallback(
    (worker) => async () => {
      setIsLoading(true);

      try {
        return await worker();
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const fetchAdjective = useCallback(async () => {
    const adjective = await apiService.fetchAdjective();
    setAdjective(adjective);
    return adjective;
  }, []);

  const fetchNoun = useCallback(async () => {
    const noun = await apiService.fetchNoun();
    setNoun(noun);
    return noun;
  }, []);

  const fetchAll = useCallback(
    withLoader(() => Promise.all([fetchNoun(), fetchAdjective()])),
    [withLoader, fetchNoun, fetchAdjective]
  );

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <>
      <span className={classNames("mb-4", rajdhani.className)}>
        A nova tendência do mercado é:
      </span>

      <WordContainer className={classNames({ "opacity-0": isLoading })}>
        {adjective} {noun}
      </WordContainer>

      <div className="transition-all flex flex-col mt-12 gap-2 lg:gap-6 w-6/12">
        <div className="flex flex-col lg:flex-row gap-2 lg:gap-6">
          <Button
            className="flex-1"
            disabled={isLoading}
            onClick={withLoader(fetchAdjective)}
          >
            Novo adjetivo
          </Button>

          <Button
            className="flex-1"
            disabled={isLoading}
            onClick={withLoader(fetchNoun)}
          >
            Novo substantivo
          </Button>
        </div>

        <Button className="flex-1" onClick={fetchAll} disabled={isLoading}>
          Nova trend
        </Button>
      </div>
    </>
  );
}

function WordContainer({ children, className }) {
  return (
    <h1
      className={classNames(
        abril.className,
        className,
        "text-3xl lg:text-8xl text-center px-4 my-8 lg:py-4 rounded lg:rounded-xl text-white"
      )}
    >
      {children}
    </h1>
  );
}

function Button({ children, className, ...props }) {
  return (
    <button
      className={classNames(
        className,
        "transition-all opacity-100 text-white hover:text-slate-900 border-white hover:bg-cyan-400 text-sm lg:text-lg border rounded lg:rounded-lg border-transparent hover:border-cyan-300 px-4 py-2 shadow-lg shadow-slate-900"
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default App;
