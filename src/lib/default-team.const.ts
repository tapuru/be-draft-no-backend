import { CHARACTERS_LIST } from "./characters-list.const";
import type { Team } from "./types";

export const DEFAULT_TEAM: Omit<Team, "name"> = {
  bannedCharacters: [],
  pickedCharacters: [],
  score: 0,
  availableCharacters: CHARACTERS_LIST,
};
