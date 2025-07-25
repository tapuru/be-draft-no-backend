import { Typography } from "antd";
import s from "./map-draft.module.css";
import clsx from "clsx";
import { useSelectAvailableMaps } from "../../model";

export const PickedMapCard = ({
  name,
  i,
}: {
  name?: string;
  teamIndex?: number;
  i: number;
}) => {
  const availableMaps = useSelectAvailableMaps();

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
    <div className={clsx(s.pickedMapCard, status === "active" && s._active)}>
      <Typography>Карта {i + 1}</Typography>
      {status === "pending" && <Typography>Ожидание</Typography>}
      {status === "active" && <Typography>Выберите карту</Typography>}
      {status === "picked" && <Typography>{name}</Typography>}
    </div>
  );
};
