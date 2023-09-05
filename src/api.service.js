import { random } from "lodash";

const nouns = require("res/job-nouns.json");

export const fetchAdjective = async () => {
  const url = "https://random-word-form.repl.co/random/adjective";
  const response = await fetch(url, { cache: "no-store" });
  const [adjective] = await response.json();
  return adjective;
};

export const fetchNoun = async () => {
  return new Promise((resolve) => {
    const [noun] = nouns.sort(() => random(-1, 1, false));
    setTimeout(() => resolve(noun), random(0, 2e3, false));
  });
};
