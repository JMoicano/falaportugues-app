import { random } from "lodash";

const nouns = require("res/job-nouns.json");

export const fetchAdjective = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_ADJECTIVES_API, {
    cache: "no-store",
  });

  const [adjective] = await response.json();
  return adjective;
};

export const fetchNoun = async () => {
  return new Promise((resolve) => {
    const [noun] = nouns.sort(() => random(-1, 1, false));
    setTimeout(() => resolve(noun), random(0, 2e3, false));
  });
};
