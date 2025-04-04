import {random} from "lodash";

const dict = require("res/job-nouns.json");

export const getAdjective = () => {
  const {adjectives} = dict
  return adjectives[random(0, adjectives.length - 1, false)];
};

export const getNoun = () => {
  const {nouns} = dict
  return nouns[random(0, nouns.length - 1, false)];
};
