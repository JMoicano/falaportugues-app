"use client";

import Head from "next/head";
import classNames from "classnames";
import {motion} from "framer-motion";
import {useState, startTransition} from "react";

import {abril, rajdhani} from "./fonts";
import {getNoun, getAdjective} from '@/words'


function App() {
  const [noun, setNoun] = useState(getNoun);
  const [adjective, setAdjective] = useState(getAdjective);

  const currentNoun = noun;
  const currentAdjective = adjective;

  const nextNoun = () =>
      startTransition(() => setNoun(getNoun()));

  const nextAdjective = () =>
      startTransition(() => setAdjective(getAdjective()));

  const nextTrend = () => {
    startTransition(() => {
      setNoun(getNoun())
      setAdjective(getAdjective())
    });
  };

  const onShare = () => {
    navigator.share?.({
      url: "https://falaportugues.vercel.app",
      text: `A nova tendência de mercado é: ${currentAdjective} ${currentNoun}.\nDescubra você também o que mais o mercado reserva:`,
    });
  };

  return (
      <>
        <Head>
          <meta
              property="og:image"
              content={`/api/og?adjective=${currentAdjective}&noun=${currentNoun}`}
          />
        </Head>

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
              animate={{y: 0, opacity: 1}}
              exit={{y: "20%", opacity: 0}}
              initial={{y: "-20%", opacity: 0}}
          >
            {currentAdjective}
          </motion.span>
          <span> </span>
          <motion.span
              layout
              key={currentNoun}
              className="inline-block"
              animate={{y: 0, opacity: 1}}
              exit={{y: "20%", opacity: 0}}
              initial={{y: "-20%", opacity: 0}}
          >
            {currentNoun}
          </motion.span>
        </h1>

        <div className="transition-all opacity-100 flex flex-col gap-2 lg:gap-6 w-6/12 2xl:w-4/12">
          <div className="flex gap-2 lg:gap-6">
            <Button className="flex-1" onClick={nextTrend}>
              Nova trend
            </Button>

            <Button onClick={onShare} className="border-none">
              <svg
                  height="1em"
                  fill="white"
                  viewBox="0 0 448 512"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <path
                    d="M352 224c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96c0 4 .2 8 .7 11.9l-94.1 47C145.4 170.2 121.9 160 96 160c-53 0-96 43-96 96s43 96 96 96c25.9 0 49.4-10.2 66.6-26.9l94.1 47c-.5 3.9-.7 7.8-.7 11.9c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-25.9 0-49.4 10.2-66.6 26.9l-94.1-47c.5-3.9 .7-7.8 .7-11.9s-.2-8-.7-11.9l94.1-47C302.6 213.8 326.1 224 352 224z"/>
              </svg>
            </Button>
          </div>

          <div className="flex flex-col lg:flex-row gap-2 lg:gap-6">
            <Button className="flex-1" onClick={nextAdjective}>
              Novo adjetivo
            </Button>

            <Button className="flex-1" onClick={nextNoun}>
              Novo substantivo
            </Button>
          </div>
        </div>
      </>
  );
}

function Button({children, className, ...props}) {
  return (
      <button
          className={classNames(
              className,
              "transition-all text-white hover:text-slate-900 border border-white hover:bg-cyan-400 focus:bg-cyan-400 text-sm lg:text-lg  hover:border-cyan-300 px-4 py-2 rounded"
          )}
          {...props}
      >
        {children}
      </button>
  );
}

export default App;
