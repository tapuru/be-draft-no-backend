import { v4 } from "uuid";

export enum ROLES {
  ADMIN = "admin",
  CAPTAIN = "captain",
}

export class User {
  id: string;
  role: ROLES;

  constructor({ role }: { role: ROLES }) {
    this.role = role;
    this.id = v4();
  }
}
