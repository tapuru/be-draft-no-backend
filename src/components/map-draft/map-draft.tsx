import { Card, Flex, Typography } from "antd";
import s from "./map-draft.module.css";
import {
  useActions,
  useSelectAvailableMaps,
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
  const availableMaps = useSelectAvailableMaps();

  return (
    <Flex align="center" justify="center" className={s.root}>
      <div className={s.content}>
        <Card className={clsx(s.card, s.top)}>
          <Typography.Title>Выбор карт</Typography.Title>
          <Typography style={{ fontSize: 18 }}>
            {" "}
            Сейчас выбирают {teams[currentTeamIndex].name}{" "}
          </Typography>
        </Card>
        <Flex gap={"18px"}>
          <Card className={clsx(s.card, s.bottomCard)}>
            <Typography.Title level={3}>Выбранные карты</Typography.Title>
            {[0, 1, 2].map((i) => (
              <PickedMapCard
                i={i}
                name={pickedMaps[i]?.name ?? undefined}
                key={i}
              />
            ))}
          </Card>
          {availableMaps.length > 1 && <AvailableMaps />}
        </Flex>
      </div>
    </Flex>
  );
};
