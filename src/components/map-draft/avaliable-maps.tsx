import { Card, Flex, Typography } from "antd";
import s from "./map-draft.module.css";
import {
  useActions,
  useSelectAvailableMaps,
  useSelectCurrentTeamIndex,
  useSelectPickedMaps,
} from "../../model";
import clsx from "clsx";
import { STAGE, type Map } from "../../lib";

export const AvailableMaps = () => {
  const availableMaps = useSelectAvailableMaps();
  const currentTeamIndex = useSelectCurrentTeamIndex();
  const { pickMap, toggleCurrentTeamIndex, switchStage } = useActions();
  const pickedMaps = useSelectPickedMaps();

  const handlePickMap = (map: Map) => {
    if (pickedMaps.length === 1) {
      toggleCurrentTeamIndex();
    }
    pickMap(map);
    if (availableMaps.length < 3) {
      switchStage(STAGE.CHARACTERS_DRAFT_PENDING);
    }
  };

  return (
    <Card className={clsx(s.card, s.bottomCard)}>
      <Typography.Title level={3} style={{ marginBottom: "32px" }}>
        Доступные карты
      </Typography.Title>
      <Flex wrap gap={"24px"} justify="center" align="center">
        {availableMaps.map((map) => (
          <Card
            size="small"
            hoverable
            key={map.name}
            className={clsx(
              s.mapCard,
              currentTeamIndex === 0 ? s._blue : s._red,
            )}
            style={{ width: 180 }}
            cover={
              <img
                alt={map.name}
                src={`${import.meta.env.BASE_URL}assets/maps/${map.name}.png`}
              />
            }
            onClick={() => handlePickMap(map)}
          >
            <Card.Meta title={map.name} />
          </Card>
        ))}
      </Flex>
    </Card>
  );
};
