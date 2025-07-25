
import { Team } from "./team.entity";
import { User } from "./user.entity";
import {ROOM_STAGE} from "./room-stage.type.ts";

export class Room {
  id: string;
  owner: User;
  teams: Team[];
  stage: ROOM_STAGE;

  constructor({
    owner,
    teams,
    id,
  }: {
    owner: User;
    teams: Team[];
    id: string;
  }) {
    this.owner = owner;
    this.teams = teams;
    this.id = id;
    this.stage = ROOM_STAGE.PENDING;
  }
}
