import { useAppStore } from "./app.store";
import type { AppState } from "./types";

export const useActions = () => useAppStore((state) => state.actions);

export const useSelectStage = () => useAppStore((state) => state.stage);

export const useSelectTeams = () =>
  useAppStore((state: AppState) => state.teams);
export const useSelectCurrentTeamIndex = () =>
  useAppStore((state: AppState) => state.currentTeamIndex);

export const useSelectAvailableMaps = () =>
  useAppStore((state) => state.availableMaps);

export const useSelectPickedMaps = () =>
  useAppStore((state) => state.pickedMaps);

export const useSelectRound = () => useAppStore((state) => state.round);

export const useSelectCurrentDraftStage = () =>
  useAppStore((state) => state.currnetDraftStage);

export const useSelectDraftQueue = () =>
  useAppStore((state) => state.draftQueue);

export const useSelectSelectedCharacters = () =>
  useAppStore((state) => state.selectedCharacters);

export const useSelectTimer = () => useAppStore((state) => state.timer);
