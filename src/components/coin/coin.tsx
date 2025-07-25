import { Button, Card, Flex, Typography } from "antd";
import { useAppStore } from "../../model";
import s from "./coin.module.css";
import { FirstChoiceButton } from "./first-choice-button";
import { useRef, useState } from "react";
import { STAGE } from "../../lib";

export const Coin = () => {
  const {
    coinResult,
    teams,
    actions: { flipCoin, chooseFirst, switchStage },
  } = useAppStore();

  const [isFlipping, setIsFlipping] = useState(false);
  const coinRef = useRef<HTMLDivElement>(null);

  const handleFlip = () => {
    if (isFlipping || teams.length < 2) return;

    const winnerIndex = Math.random() > 0.5 ? 0 : 1;

    setIsFlipping(true);

    const rotation = winnerIndex === 0 ? 360 * 5 : 360 * 5 + 180;

    if (coinRef.current) {
      coinRef.current.style.transform = `rotateY(${rotation}deg)`;
    }

    setTimeout(() => {
      flipCoin(winnerIndex);
      setIsFlipping(false);
    }, 4000);
  };

  const handleFirstDraft = () => {
    chooseFirst("characters-first");
    switchStage(STAGE.MAPS_DRAFT);
  };

  const handleFirstMaps = () => {
    chooseFirst("maps-first");
    switchStage(STAGE.MAPS_DRAFT);
  };

  const teamOneName = teams[0]?.name ?? "Team 1";
  const teamTwoName = teams[1]?.name ?? "Team 2";

  return (
    <Flex align="center" justify="center" className={s.root}>
      <Card className={s.card}>
        <div className={s.cardContent}>
          <Typography.Title className={s.title}>
            Бросок монетки
          </Typography.Title>
          <div className={s.coin}>
            <div ref={coinRef} className={s.coinInner}>
              <div className={s.heads}>{teamOneName}</div>
              <div className={s.tails}>{teamTwoName}</div>
            </div>
          </div>
          {!coinResult && (
            <Button
              variant="solid"
              color="blue"
              size="large"
              onClick={handleFlip}
              disabled={isFlipping}
            >
              Бросить монетку
            </Button>
          )}
          {coinResult && !coinResult.choice && (
            <>
              <Typography.Title level={4}>
                {teams[coinResult.winnerIndex].name} выиграли бросок монетки!
              </Typography.Title>
              <div className={s.firstChoiceButtons}>
                <FirstChoiceButton
                  title="Первый пик"
                  description="на 1-й и 3-й картах"
                  onClick={handleFirstDraft}
                />
                <FirstChoiceButton
                  title="Выбор карт"
                  description="1-я и 3-я карта"
                  onClick={handleFirstMaps}
                />
              </div>
            </>
          )}
        </div>
      </Card>
    </Flex>
  );
};
