export enum CHARACTER_TYPE {
  SCOUT = "SCOUT",
  SHOTGUN = "SHOTGUN",
  TANK = "TANK",
  SNIPER = "SNIPER",
  TROOPER = "TROOPER",
}

export enum STAGE {
  PENDING = "pending",
  COIN = "coin",
  MAPS_DRAFT = "maps-draft",
  CHARACTERS_DRAFT = "characters-draft",
  CHARACTERS_DRAFT_PENDING = "characters-draft-pending",
  GAME = "game",
  CHOOSE_WINNER = "choose-winner",
}

export enum DRAFT_ACTION_TYPE {
  PICK = "pick",
  BAN = "ban",
  DOUBLE_PICK = "double-pick",
  DOUBLE_BAN = "double-ban",
}

export type Map = {
  name: string;
  imageUrl: string;
};

export type Character = {
  id: string;
  name: string;
  image_url: string;
  type: CHARACTER_TYPE;
};

export type Team = {
  name: string;
  score: number;
  pickedCharacters: Character[];
  bannedCharacters: Array<Character | "empty">;
  availableCharacters: Character[];
};

export type DraftAction = {
  type: DRAFT_ACTION_TYPE;
  characters: Array<Character | "empty">;
  teamIndex: 0 | 1;
};
