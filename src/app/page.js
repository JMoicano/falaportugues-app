"use client";

import classNames from "classnames";
import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
    withLoader(async () => {
      const [noun, adjective] = await Promise.all([
        apiService.fetchNoun(),
        apiService.fetchAdjective(),
      ]);

      setNoun(noun);
      setAdjective(adjective);
    }),
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

      <WordContainer>
        <AnimatePresence mode="popLayout" presenceAffectsLayout>
          <motion.span
            layout
            key={adjective}
            className="inline-block"
            exit={{ y: "20%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            initial={{ y: "-20%", opacity: 0 }}
          >
            {adjective}
          </motion.span>
          <span> </span>
          <motion.span
            layout
            key={noun}
            className="inline-block"
            exit={{ y: "20%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            initial={{ y: "-20%", opacity: 0 }}
          >
            {noun}
          </motion.span>
        </AnimatePresence>
      </WordContainer>

      <div
        className={classNames(
          "transition-all opacity-100 flex flex-col mt-12 gap-2 lg:gap-6 w-6/12 2xl:w-4/12",
          { "opacity-5": isLoading }
        )}
      >
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
