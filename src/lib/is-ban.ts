import { DRAFT_ACTIONS } from "./draft-actions.const";
import { DRAFT_ACTION_TYPE } from "./types";

export const isBan = (i: number) => {
  return (
    DRAFT_ACTIONS[i] === DRAFT_ACTION_TYPE.BAN ||
    DRAFT_ACTIONS[i] === DRAFT_ACTION_TYPE.DOUBLE_BAN
  );
};

export const isDoubleBan = (i: number) => {
  return DRAFT_ACTIONS[i] === DRAFT_ACTION_TYPE.DOUBLE_BAN;
};
export const isPick = (i: number) => {
  return (
    DRAFT_ACTIONS[i] === DRAFT_ACTION_TYPE.DOUBLE_PICK ||
    DRAFT_ACTIONS[i] === DRAFT_ACTION_TYPE.PICK
  );
};

export const isDoublePick = (i: number) => {
  return DRAFT_ACTIONS[i] === DRAFT_ACTION_TYPE.DOUBLE_PICK;
};
