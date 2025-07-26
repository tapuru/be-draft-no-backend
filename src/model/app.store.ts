import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  CHARACTERS_LIST,
  DEFAULT_TEAM,
  DRAFT_ACTION_TYPE,
  MAPS_LIST,
  STAGE,
} from "../lib";
import type { AppState } from "./types";

export const useAppStore = create<AppState>()(
  immer((set) => ({
    teams: [],
    timer: 60,
    stage: STAGE.PENDING,
    draftQueue: [],
    currentTeamIndex: 0,
    availableMaps: MAPS_LIST,
    pickedMaps: [],
    round: 0,
    currnetDraftStage: -1,
    selectedCharacters: [],
    actions: {
      setSelectedCharacters: (characters) =>
        set((state) => {
          state.selectedCharacters = characters;
        }),
      setCurrentDraftStage: (stage) =>
        set((state) => {
          state.currnetDraftStage = stage;
        }),
      createRoom: (data) =>
        set((state) => {
          state.teams = [
            {
              ...DEFAULT_TEAM,
              name: data.teamOneName,
              availableCharacters: CHARACTERS_LIST,
            },
            {
              ...DEFAULT_TEAM,
              name: data.teamTwoName,
              availableCharacters: CHARACTERS_LIST,
            },
          ];
          state.timer = data.timer;
        }),
      flipCoin: (winnerIndex) =>
        set((state) => {
          if (state.coinResult || state.teams.length < 2) return;
          state.coinResult = {
            winnerIndex,
            looserIndex: winnerIndex === 0 ? 1 : 0,
          };
        }),
      chooseFirst: (choice) =>
        set((state) => {
          if (!state.coinResult || state.coinResult.choice) return;
          state.coinResult.choice = choice;

          if (choice === "maps-first") {
            state.currentTeamIndex = state.coinResult.winnerIndex;
          } else {
            state.currentTeamIndex = state.coinResult.looserIndex;
          }
        }),
      switchStage: (stage) =>
        set((state) => {
          state.stage = stage;
        }),
      setCurrentTeamIndex: (i) =>
        set((state) => {
          state.currentTeamIndex = i;
        }),
      toggleCurrentTeamIndex: () =>
        set((state) => {
          state.currentTeamIndex = state.currentTeamIndex === 0 ? 1 : 0;
        }),
      pickMap: (map) =>
        set((state) => {
          state.availableMaps = state.availableMaps.filter(
            (m) => m.name !== map.name,
          );
          switch (state.pickedMaps.length) {
            case 0:
              state.pickedMaps.push(map);
              break;
            case 1:
              state.pickedMaps[2] = map;
              break;
            case 3:
              state.pickedMaps[1] = map;
              break;
            default:
              return;
          }
        }),
      setRound: (round) =>
        set((state) => {
          state.round = round;
        }),
      setWinner: (i) =>
        set((state) => {
          state.teams[i].score++;
        }),
      resetDraft: () =>
        set((state) => {
          state.draftQueue = [];
          state.currnetDraftStage = -1;
          state.teams.forEach((t) => {
            t.availableCharacters = CHARACTERS_LIST;
            t.bannedCharacters = [];
            t.pickedCharacters = [];
          });
          state.selectedCharacters = [];
        }),
      pushActionsQueue: (action) =>
        set((state) => {
          state.draftQueue.push(action);

          const isBan = new Set([
            DRAFT_ACTION_TYPE.BAN,
            DRAFT_ACTION_TYPE.DOUBLE_BAN,
          ]).has(action.type);

          if (isBan) {
            //update banned characters
            action.characters.forEach((c) => {
              state.teams[action.teamIndex].bannedCharacters.push(c);
            });
            //update available characters for each team only if character is not empty
            state.teams.forEach((t) => {
              t.availableCharacters = t.availableCharacters.filter(
                (c) =>
                  !action.characters
                    .map((ch) => {
                      if (ch !== "empty") {
                        return ch.id;
                      }
                    })
                    .includes(c.id),
              );
            });
          } else {
            //update picked characters
            action.characters.forEach((c) => {
              if (c === "empty") return;
              state.teams[action.teamIndex].pickedCharacters.push(c);
            });
            //update available characters for each team
            state.teams.forEach((t, i) => {
              if (i !== action.teamIndex) {
                t.availableCharacters = t.availableCharacters.filter(
                  (c) =>
                    !action.characters
                      .map((ch) => {
                        if (ch !== "empty") {
                          return ch.id;
                        }
                      })
                      .includes(c.id) ||
                    c.id.toLowerCase() === "alice" ||
                    c.id.toLowerCase() === "raven" ||
                    c.id.toLowerCase() === "dragoon",
                );
              } else {
                t.availableCharacters = t.availableCharacters.filter(
                  (c) =>
                    !action.characters
                      .map((ch) => {
                        if (ch !== "empty") return ch.id;
                      })
                      .includes(c.id),
                );
              }
            });
          }
        }),
      popActionsQueue: () =>
        set((state) => {
          const poppedAction = state.draftQueue.pop();
          if (!poppedAction) return;

          const isBan = new Set([
            DRAFT_ACTION_TYPE.BAN,
            DRAFT_ACTION_TYPE.DOUBLE_BAN,
          ]).has(poppedAction.type);

          if (isBan) {
            poppedAction.characters.forEach(() => {
              state.teams[poppedAction.teamIndex].bannedCharacters.pop();
            });
            state.teams.forEach((t) => {
              poppedAction.characters.forEach((c) => {
                if (c !== "empty") {
                  t.availableCharacters.push(c);
                }
              });
            });
          } else {
            poppedAction.characters.forEach(() => {
              state.teams[poppedAction.teamIndex].pickedCharacters.pop();
            });
            state.teams.forEach((t) => {
              poppedAction.characters.forEach((c) => {
                if (c !== "empty") {
                  t.availableCharacters.push(c);
                }
              });
            });
          }
        }),
    },
  })),
);
