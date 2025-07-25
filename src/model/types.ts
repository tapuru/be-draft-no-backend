import type { Character, DraftAction, Map, STAGE, Team } from "../lib";

export type AppActions = {
  createRoom: (data: {
    teamOneName: string;
    teamTwoName: string;
    timer: number;
  }) => void;
  flipCoin: (winnerIndex: 0 | 1) => void;
  chooseFirst: (choice: "maps-first" | "characters-first") => void;
  switchStage: (stage: STAGE) => void;
  setCurrentTeamIndex: (i: 0 | 1) => void;
  toggleCurrentTeamIndex: () => void;
  pickMap: (map: Map) => void;
  setRound: (round: number) => void;
  setCurrentDraftStage: (stage: number) => void;
  pushActionsQueue: (action: DraftAction) => void;
  popActionsQueue: () => void;
  setSelectedCharacters: (characters: Character[]) => void;
  setWinner: (i: 0 | 1) => void;
  resetDraft: () => void;
};

export type AppState = {
  teams: Team[];
  stage: STAGE;
  coinResult?: {
    winnerIndex: 0 | 1;
    looserIndex: 0 | 1;
    choice?: "maps-first" | "characters-first";
  };
  round: number;
  currentTeamIndex: 0 | 1;
  timer: number;
  draftQueue: DraftAction[];
  actions: AppActions;
  availableMaps: Map[];
  pickedMaps: Map[];
  currnetDraftStage: number;
  selectedCharacters: Character[];
};
