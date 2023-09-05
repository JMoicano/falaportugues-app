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
    setTimeout(
      () => resolve(nouns[random(0, nouns.length - 1, false)]),
      random(0, 1e3, false)
    );
  });
};
