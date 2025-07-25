import { v4 } from "uuid";
import { Character } from "../lib/types/character.type";
import {User} from "./user.entity";

export class Team {
  id: string;
  name: string;
  captain?: User;
  pickedCharacters: Character[];
  //TODO: add map type
  pickedMaps: string[];
  score: number;

  constructor({ name }: { name: string }) {
    this.id = v4();
    this.pickedCharacters = [];
    this.pickedMaps = [];
    this.score = 0;
    this.name = name;
  }
}
