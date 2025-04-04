import { random } from "lodash";

const nouns = require("res/job-nouns.json");

export const fetchAdjective = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_ADJECTIVES_API, {
    cache: "no-store",
  });

  const adjectives = await response.json();
  return adjectives.map((res) => res.word);
};

export const fetchNoun = async () => {
  return new Promise((resolve) => {
    const randomizedResults = [
      ...Array.from({ length: 3 }).map(
        () => nouns[random(0, nouns.length - 1, false)]
      ),
    ];

    setTimeout(() => resolve(randomizedResults), random(0, 1e3, false));
  });
};
