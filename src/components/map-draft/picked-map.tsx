import { Typography } from "antd";
import s from "./picked-map.module.css";
import clsx from "clsx";
import { useSelectAvailableMaps, useSelectCurrentTeamIndex } from "../../model";

export const PickedMapCard = ({
  name,
  i,
}: {
  name?: string;
  teamIndex?: number;
  i: number;
}) => {
  const availableMaps = useSelectAvailableMaps();
  const currentTeamIndex = useSelectCurrentTeamIndex();

  let status: "pending" | "picked" | "active" = "pending";
  if (name) {
    status = "picked";
  } else if (i === 0) {
    status = "active";
  } else if (i === 1) {
    status = availableMaps.length > 2 ? "pending" : "active";
  } else if (i === 2) {
    status = availableMaps.length > 3 ? "pending" : "active";
  }

  return (
    <div
      className={clsx(
        s.pickedMapCard,
        currentTeamIndex === 0 ? s._blue : s._red,
        status === "active" && s._active,
        status === "pending" && s._pending,
      )}
    >
      <Typography.Text className={s.leftText}>Карта {i + 1}</Typography.Text>
      {status === "pending" && (
        <Typography.Text className={s.rightText}>Ожидание</Typography.Text>
      )}
      {status === "active" && (
        <Typography.Text className={s.rightText}>
          Выберите карту
        </Typography.Text>
      )}
      {status === "picked" && (
        <Typography.Text className={s.rightText}>{name}</Typography.Text>
      )}
    </div>
  );
};
