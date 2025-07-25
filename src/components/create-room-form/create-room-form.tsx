import { Button, Card, Flex, Input, Typography } from "antd";
import s from "./create-room-form.module.css";
import { useAppStore } from "../../model";
import type React from "react";
import { useState } from "react";
import { STAGE } from "../../lib";

export const CreateRoomForm = () => {
  const [teamOne, setTeamOne] = useState("");
  const [teamTwo, setTeamTwo] = useState("");
  const [timer, setTimer] = useState("60");

  const {
    actions: { createRoom, switchStage },
  } = useAppStore();

  const handleTeamOneChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTeamOne(e.target.value);
  const handleTeamTwoChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTeamTwo(e.target.value);
  const handleTimerChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTimer(e.target.value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(typeof timer);
    createRoom({
      teamOneName: teamOne || "Команда 1",
      teamTwoName: teamTwo || "Команда 2",
      timer: parseInt(timer),
    });
    switchStage(STAGE.COIN);
  };

  return (
    <Flex align="center" justify="center" className={s.root}>
      <Card className={s.card}>
        <form className={s.form}>
          <Typography.Title>Настройка матча</Typography.Title>
          <Input
            placeholder="Команда 1..."
            size="large"
            onChange={handleTeamOneChange}
            value={teamOne}
          />
          <Input
            placeholder="Команда 2..."
            size="large"
            onChange={handleTeamTwoChange}
            value={teamTwo}
          />
          <Input
            placeholder="Таймер (default 60)"
            size="large"
            onChange={handleTimerChange}
            value={timer}
          />
          <Button
            color="blue"
            variant="solid"
            size="large"
            onClick={handleSubmit}
          >
            Далее
          </Button>
        </form>
      </Card>
    </Flex>
  );
};
