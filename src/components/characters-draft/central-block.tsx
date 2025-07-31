import { Button, Card, Typography } from "antd";
import s from "./central-block.module.css";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import {
  CHARACTERS_LIST,
  DRAFT_ACTION_TYPE,
  STAGE,
  type Character,
} from "../../lib";
import {
  useActions,
  useSelectCurrentDraftStage,
  useSelectCurrentTeamIndex,
  useSelectPickedMaps,
  useSelectRound,
  useSelectSelectedCharacters,
  useSelectStage,
  useSelectTeams,
  useSelectTimer,
} from "../../model";
import { DRAFT_ACTIONS } from "../../lib/draft-actions.const";

export const CentralBlock = () => {
  const currentDraftStage = useSelectCurrentDraftStage();
  const currentTeamIndex = useSelectCurrentTeamIndex();
  const teams = useSelectTeams();
  const stage = useSelectStage();
  const selectedCharacters = useSelectSelectedCharacters();
  const defaultTimer = useSelectTimer();
  const pickedMaps = useSelectPickedMaps();
  const round = useSelectRound();

  const {
    switchStage,
    pushActionsQueue,
    toggleCurrentTeamIndex,
    setCurrentDraftStage,
    setSelectedCharacters,
  } = useActions();

  const [timer, setTimer] = useState(defaultTimer);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const selectedCharactersRef = useRef(selectedCharacters);

  useEffect(() => {
    if (stage === STAGE.GAME && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [stage]);

  useEffect(() => {
    selectedCharactersRef.current = selectedCharacters;
  }, [selectedCharacters]);

  useEffect(() => {
    if (stage !== STAGE.CHARACTERS_DRAFT) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setTimer(defaultTimer);
    let time = defaultTimer;

    intervalRef.current = setInterval(() => {
      time--;
      setTimer(time);

      if (time <= 0) {
        clearInterval(intervalRef.current!);

        const currentAction = DRAFT_ACTIONS[currentDraftStage];
        const available = teams[currentTeamIndex].availableCharacters;

        const characters: Array<Character | "empty"> = [
          ...selectedCharactersRef.current,
        ];

        switch (currentAction) {
          case DRAFT_ACTION_TYPE.BAN:
            while (characters.length < 1) {
              characters.push("empty");
            }
            break;
          case DRAFT_ACTION_TYPE.DOUBLE_BAN:
            while (characters.length < 2) {
              characters.push("empty");
            }
            break;
          case DRAFT_ACTION_TYPE.PICK:
            while (characters.length < 1) {
              characters.push(
                available[Math.floor(Math.random() * available.length)],
              );
            }
            break;
          case DRAFT_ACTION_TYPE.DOUBLE_PICK:
            while (characters.length < 2) {
              characters.push(
                available[Math.floor(Math.random() * available.length)],
              );
            }
            break;
        }

        pushActionsQueue({
          characters,
          type: currentAction,
          teamIndex: currentTeamIndex,
        });

        toggleCurrentTeamIndex();
        setSelectedCharacters([]);
        setCurrentDraftStage(currentDraftStage + 1);
        if (currentDraftStage >= DRAFT_ACTIONS.length - 1) {
          switchStage(STAGE.GAME);
        }
      }
    }, 1000);

    return () => {
      clearInterval(intervalRef.current!);
    };
  }, [currentDraftStage]);

  const handleCharacterClick = (character: Character) => {
    switch (DRAFT_ACTIONS[currentDraftStage]) {
      case DRAFT_ACTION_TYPE.BAN:
      case DRAFT_ACTION_TYPE.PICK:
        if (selectedCharacters.map((c) => c.id).includes(character.id)) {
          setSelectedCharacters(
            selectedCharacters.filter((c) => c.id !== character.id),
          );
          return;
        }
        setSelectedCharacters([character]);
        break;
      case DRAFT_ACTION_TYPE.DOUBLE_BAN:
      case DRAFT_ACTION_TYPE.DOUBLE_PICK:
        if (selectedCharacters.map((c) => c.id).includes(character.id)) {
          setSelectedCharacters(
            selectedCharacters.filter((c) => c.id !== character.id),
          );
          return;
        }
        if (selectedCharacters.length < 2) {
          setSelectedCharacters([...selectedCharacters, character]);
        } else {
          setSelectedCharacters([selectedCharacters[0], character]);
        }
        break;
    }
  };

  const handleStartDraft = () => {
    if (stage === STAGE.CHARACTERS_DRAFT_PENDING) {
      switchStage(STAGE.CHARACTERS_DRAFT);
      setCurrentDraftStage(0);
    }
  };

  const handleSubmitAction = () => {
    if (selectedCharacters.length < 1) return;
    if (
      (DRAFT_ACTIONS[currentDraftStage] === DRAFT_ACTION_TYPE.DOUBLE_BAN ||
        DRAFT_ACTIONS[currentDraftStage] === DRAFT_ACTION_TYPE.DOUBLE_PICK) &&
      selectedCharacters.length < 2
    )
      return;
    const currentAction = DRAFT_ACTIONS[currentDraftStage];
    pushActionsQueue({
      characters: selectedCharacters,
      type: currentAction,
      teamIndex: currentTeamIndex,
    });
    toggleCurrentTeamIndex();
    setSelectedCharacters([]);
    setCurrentDraftStage(currentDraftStage + 1);
    if (currentDraftStage >= DRAFT_ACTIONS.length - 1) {
      switchStage(STAGE.GAME);
    }
  };

  const handleChooseWinner = () => {
    if (stage !== STAGE.GAME) return;
    toggleCurrentTeamIndex();
    switchStage(STAGE.CHOOSE_WINNER);
  };

  return (
    <div className={s.root}>
      <div className={s.topCardWrapper}>
        <Card className={s.topCard}>
          <div className={s.topCardContent}>
            <div className={s.currentAction}>
              {stage !== STAGE.GAME ? (
                <>
                  <Typography.Text
                    className={clsx(
                      s.text,
                      currentTeamIndex === 0 ? s._blue : s._red,
                    )}
                  >
                    {teams[currentTeamIndex].name}
                  </Typography.Text>
                  <Typography.Text className={s.text}>
                    {DRAFT_ACTIONS[currentDraftStage] ===
                      DRAFT_ACTION_TYPE.BAN ||
                    DRAFT_ACTIONS[currentDraftStage] ===
                      DRAFT_ACTION_TYPE.DOUBLE_BAN
                      ? "Запрещает"
                      : "Выбирает"}
                  </Typography.Text>
                </>
              ) : (
                <Typography.Text className={clsx(s.text)}>
                  Драфт завершён
                </Typography.Text>
              )}
            </div>
            {stage !== STAGE.GAME && (
              <Typography.Text className={s.timer}>
                {timer.toString().padStart(2, "0")}
              </Typography.Text>
            )}

            <div className={s.action}>
              {stage === STAGE.CHARACTERS_DRAFT_PENDING && (
                <Button
                  color="green"
                  variant="solid"
                  onClick={handleStartDraft}
                >
                  Начать драфт
                </Button>
              )}
              {stage === STAGE.CHARACTERS_DRAFT && (
                <Button
                  type="primary"
                  disabled={
                    selectedCharacters.length === 0 ||
                    ((DRAFT_ACTIONS[currentDraftStage] ===
                      DRAFT_ACTION_TYPE.DOUBLE_BAN ||
                      DRAFT_ACTIONS[currentDraftStage] ===
                        DRAFT_ACTION_TYPE.DOUBLE_PICK) &&
                      selectedCharacters.length < 2)
                  }
                  onClick={handleSubmitAction}
                >
                  {selectedCharacters.length > 0
                    ? `Выбрать: ${selectedCharacters.map((c) => c.name).join(", ")}`
                    : "Персонаж не выбран"}
                </Button>
              )}
              {stage === STAGE.GAME && (
                <Button
                  color="default"
                  variant="filled"
                  onClick={handleChooseWinner}
                >
                  Выбрать победителя
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>

      {stage === STAGE.GAME && (
        <div className={s.mapWrapper}>
          <img
            alt={pickedMaps[round].name}
            src={`${import.meta.env.BASE_URL}assets/maps/${pickedMaps[round].name}.png`}
          />
        </div>
      )}

      {(stage === STAGE.CHARACTERS_DRAFT ||
        stage === STAGE.CHARACTERS_DRAFT_PENDING) && (
        <div className={s.charactersList}>
          {CHARACTERS_LIST.map((character) => (
            <Card
              size="small"
              hoverable
              className={clsx(
                s.characterCard,
                selectedCharacters.map((c) => c.id).includes(character.id) &&
                  s._selected,
                (!teams[currentTeamIndex].availableCharacters
                  .map((c) => c.id)
                  .includes(character.id) ||
                  stage === STAGE.CHARACTERS_DRAFT_PENDING) &&
                  s._disabled,
                currentTeamIndex === 0 ? s._blue : s._red,
              )}
              style={{ width: 128, padding: 0 }}
              key={character.id}
              onClick={() => handleCharacterClick(character)}
              cover={
                <div className={s.characterImageWrapper}>
                  <img
                    alt={character.name}
                    src={`${import.meta.env.BASE_URL}assets/characters/${character.id}.png`}
                    className={s.characterImage}
                  />
                  <div className={s.characterOverlay} />
                  <div className={s.characterName}>{character.name}</div>
                </div>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};
