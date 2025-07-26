import { Button, Typography } from "antd";
import s from "./characters-draft-header.module.css";
import { LeftOutlined } from "@ant-design/icons";
import clsx from "clsx";
import {
  useActions,
  useSelectCurrentDraftStage,
  useSelectPickedMaps,
  useSelectRound,
  useSelectStage,
  useSelectTeams,
} from "../../model";
import { STAGE } from "../../lib";

export const Header = () => {
  const round = useSelectRound();
  const pickedMaps = useSelectPickedMaps();
  const teams = useSelectTeams();
  const currentDraftStage = useSelectCurrentDraftStage();
  const stage = useSelectStage();
  const {
    popActionsQueue,
    setSelectedCharacters,
    toggleCurrentTeamIndex,
    setCurrentDraftStage,
  } = useActions();

  const handleCancelAction = () => {
    popActionsQueue();
    toggleCurrentTeamIndex();
    setCurrentDraftStage(currentDraftStage - 1);
    setSelectedCharacters([]);
  };

  return (
    <header className={s.header}>
      <div className={s.left}>
        <Button
          type="text"
          icon={<LeftOutlined />}
          className={s.backButton}
          onClick={handleCancelAction}
          disabled={stage !== STAGE.CHARACTERS_DRAFT}
        />
      </div>

      <div className={s.center}>
        <Typography.Text className={s.team}>{teams[0]?.name}</Typography.Text>
        <Typography.Text>
          <Typography.Text className={clsx(s.score, s.scoreBlue)}>
            {teams[0]?.score}
          </Typography.Text>
          <Typography.Text className={s.score}> : </Typography.Text>
          <Typography.Text className={clsx(s.score, s.scoreRed)}>
            {teams[1]?.score}
          </Typography.Text>
        </Typography.Text>
        <Typography.Text className={s.team}>{teams[1]?.name}</Typography.Text>
      </div>

      <div className={s.right}>
        <Typography.Text className={s.mapTitle}>
          Карта {round + 1}:{" "}
          <Typography.Text
            style={{ fontSize: "20px", fontWeight: 900, marginLeft: 2 }}
          >
            {pickedMaps[round].name}
          </Typography.Text>
        </Typography.Text>
      </div>
    </header>
  );
};
