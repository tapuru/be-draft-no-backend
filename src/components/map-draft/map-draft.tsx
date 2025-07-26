import { Card, Flex, Typography } from "antd";
import s from "./map-draft.module.css";
import {
  useSelectCurrentTeamIndex,
  useSelectPickedMaps,
  useSelectTeams,
} from "../../model";
import clsx from "clsx";
import { PickedMapCard } from "./picked-map";
import { AvailableMaps } from "./avaliable-maps";

export const MapDraft = () => {
  const currentTeamIndex = useSelectCurrentTeamIndex();
  const teams = useSelectTeams();
  const pickedMaps = useSelectPickedMaps();

  return (
    <Flex align="center" justify="center" className={s.root}>
      <div className={s.content}>
        <Card className={clsx(s.card, s.top)}>
          <Typography.Title>Выбор карт</Typography.Title>
          <Typography className={s.currentTeam}>
            Сейчас выбирают{" "}
            <Typography.Text
              className={clsx(
                s.currentTeam,
                currentTeamIndex === 0 ? s._blue : s._red,
              )}
            >
              {teams[currentTeamIndex].name}
            </Typography.Text>
          </Typography>
        </Card>
        <Flex gap={"18px"}>
          <Card className={clsx(s.card, s.bottomCard)}>
            <Typography.Title level={3}>Выбранные карты</Typography.Title>
            <div className={s.pickedMaps}>
              {[0, 1, 2].map((i) => (
                <PickedMapCard
                  i={i}
                  name={pickedMaps[i]?.name ?? undefined}
                  key={i}
                />
              ))}
            </div>
          </Card>
          <AvailableMaps />
        </Flex>
      </div>
    </Flex>
  );
};
