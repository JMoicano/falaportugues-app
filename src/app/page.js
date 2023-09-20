"use client";

import classNames from "classnames";
import { motion } from "framer-motion";
import { useState, useEffect, startTransition } from "react";

import * as apiService from "../api.service";
import { abril, rajdhani } from "./fonts";

const bufferThresholder = 6;

function App() {
  const [nounsBuffer, setNounsBuffer] = useState([]);
  const [adjectivesBuffer, setAdjectivesBuffer] = useState([]);

  const currentNoun = nounsBuffer[0];
  const currentAdjective = adjectivesBuffer[0];

  const nextNoun = () =>
    startTransition(() => {
      setNounsBuffer(([, ...prev]) => prev);
    });

  const nextAdjective = () =>
    startTransition(() => {
      setAdjectivesBuffer(([, ...prev]) => prev);
    });

  const nextTrend = () => {
    startTransition(() => {
      nextNoun();
      nextAdjective();
    });
  };

  useEffect(() => {
    if (adjectivesBuffer.length <= bufferThresholder) {
      apiService
        .fetchAdjective()
        .then((adjectives) =>
          setAdjectivesBuffer((prev) => [...prev, ...adjectives])
        );
    }
  }, [adjectivesBuffer]);

  useEffect(() => {
    if (nounsBuffer.length <= bufferThresholder) {
      apiService
        .fetchNoun()
        .then((nouns) => setNounsBuffer((prev) => [...prev, ...nouns]));
    }
  }, [nounsBuffer]);

  const isWaitingBuffer =
    nounsBuffer.length <= 1 || adjectivesBuffer.length <= 1;

  return (
    <>
      <span className={rajdhani.className}>A nova tendência do mercado é:</span>

      <h1
        className={classNames(
          abril.className,
          "text-3xl lg:text-8xl text-center my-12 lg:my-24 lg:py-4 text-white lowercase mx-6"
        )}
      >
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
      </h1>

      <div
        className={classNames(
          { "opacity-5": isWaitingBuffer },
          "transition-all opacity-100 flex flex-col gap-2 lg:gap-6 w-6/12 2xl:w-4/12"
        )}
      >
        <Button
          autoFocus
          className="flex-1"
          onClick={() => nextTrend()}
          disabled={isWaitingBuffer}
        >
          Nova trend
        </Button>

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
      </div>
    </>
  );
}

function Button({ children, className, ...props }) {
  return (
    <button
      className={classNames(
        className,
        "transition-all text-white hover:text-slate-900 border-white hover:bg-cyan-400 focus:bg-cyan-400 text-sm lg:text-lg border border-transparent hover:border-cyan-300 px-4 py-2 rounded"
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default App;
