"use client";

import classNames from "classnames";
import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import * as apiService from "../api.service";
import { abril, rajdhani } from "./fonts";

const bufferThresholder = 2;

function App() {
  const [nounsBuffer, setNoun] = useState([]);
  const [adjectivesBuffer, setAdjective] = useState([]);

  const nextNoun = () => setNoun(([, ...prev]) => prev);
  const nextAdjective = () => setAdjective(([, ...prev]) => prev);

  useEffect(() => {
    if (adjectivesBuffer.length <= bufferThresholder) {
      apiService
        .fetchAdjective()
        .then((adjectives) => setAdjective((prev) => [...prev, ...adjectives]));
    }
  }, [adjectivesBuffer]);

  useEffect(() => {
    if (nounsBuffer.length <= bufferThresholder) {
      apiService
        .fetchNoun()
        .then((nouns) => setNoun((prev) => [...prev, ...nouns]));
    }
  }, [nounsBuffer]);

  const fetchAll = useCallback(async () => {
    const [nouns, adjectives] = await Promise.all([
      apiService.fetchNoun(),
      apiService.fetchAdjective(),
    ]);

    setNoun(nouns);
    setAdjective(adjectives);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const currentNoun = nounsBuffer[0];
  const currentAdjective = adjectivesBuffer[0];

  const isWaitingBuffer =
    nounsBuffer.length <= 1 || adjectivesBuffer.length <= 1;

  return (
    <>
      <span className={classNames("mb-4", rajdhani.className)}>
        A nova tendência do mercado é:
      </span>

      <WordContainer>
        <AnimatePresence mode="popLayout" presenceAffectsLayout>
          <motion.span
            layout
            key={currentAdjective}
            className="inline-block"
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "20%", opacity: 0 }}
            initial={{ y: "-20%", opacity: 0 }}
          >
            {currentAdjective}
          </motion.span>
          <span> </span>
          <motion.span
            layout
            key={currentNoun}
            className="inline-block"
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "20%", opacity: 0 }}
            initial={{ y: "-20%", opacity: 0 }}
          >
            {currentNoun}
          </motion.span>
        </AnimatePresence>
      </WordContainer>

      <div
        className={classNames(
          { "opacity-5": isWaitingBuffer },
          "transition-all opacity-100 flex flex-col mt-12 gap-2 lg:gap-6 w-6/12 2xl:w-4/12"
        )}
      >
        <div className="flex flex-col lg:flex-row gap-2 lg:gap-6">
          <Button
            className="flex-1"
            disabled={isWaitingBuffer}
            onClick={() => nextAdjective()}
          >
            Novo adjetivo
          </Button>

          <Button
            className="flex-1"
            onClick={() => nextNoun()}
            disabled={isWaitingBuffer}
          >
            Novo substantivo
          </Button>
        </div>

        <Button
          className="flex-1"
          onClick={() => fetchAll()}
          disabled={isWaitingBuffer}
        >
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
        className,
        abril.className,
        "text-3xl lg:text-8xl text-center px-4 my-8 lg:py-4 rounded lg:rounded-xl text-white lowercase"
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
        "transition-all text-white hover:text-slate-900 border-white hover:bg-cyan-400 text-sm lg:text-lg border rounded lg:rounded-lg border-transparent hover:border-cyan-300 px-4 py-2"
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default App;
