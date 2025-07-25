enum CHARACTER_TYPE {
  SCOUT = "SCOUT",
  SHOTGUN = "SHOTGUN",
  TANK = "TANK",
  SNIPER = "SNIPER",
  TROOPER = "TROOPER",
}

export type Character = {
  id: string;
  image_url: string;
  type: CHARACTER_TYPE;
};
