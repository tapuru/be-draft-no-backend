import { Card, Flex, Typography } from "antd";
import {
  useActions,
  useSelectPickedMaps,
  useSelectRound,
  useSelectTeams,
} from "../../model";
import s from "./choose-winner.module.css";
import { STAGE } from "../../lib";
import clsx from "clsx";

export const ChooseWinner = () => {
  const teams = useSelectTeams();
  const round = useSelectRound();
  const maps = useSelectPickedMaps();
  const { setWinner, resetDraft, setRound, switchStage } = useActions();

  const handleChooseWinner = (winnerIndex: 0 | 1) => {
    setWinner(winnerIndex);
    resetDraft();
    setRound(round + 1);
    switchStage(STAGE.CHARACTERS_DRAFT_PENDING);
  };

  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      <Card className={s.card}>
        <Typography.Title>Карта {round + 1} завершена</Typography.Title>
        <Typography.Title level={3} style={{ color: "#52c41a" }}>
          {maps[round].name}
        </Typography.Title>
        <Typography.Title level={3}>
          Выберите победителя карты:
        </Typography.Title>
        <div className={s.winners}>
          {teams.map((t, i) => (
            <div
              className={clsx(s.winner, i === 0 ? s._blue : s._red)}
              onClick={() => handleChooseWinner(i as 0 | 1)}
            >
              {t.name}
            </div>
          ))}
        </div>
      </Card>
    </Flex>
  );
};
