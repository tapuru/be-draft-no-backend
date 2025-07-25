import type { Team } from "./types";

export const DEFAULT_TEAM: Omit<Team, "name"> = {
  bannedCharacters: [],
  pickedCharacters: [],
  score: 0,
};
