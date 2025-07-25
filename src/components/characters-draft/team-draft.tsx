import { Card } from "antd";
import { useSelectTeams } from "../../model";
import s from "./team-draft.module.css";
import clsx from "clsx";

const MAX_PICKS = 5;
const MAX_BANS = 3;

export const TeamDraft = ({ index }: { index: 0 | 1 }) => {
  const teams = useSelectTeams();
  const team = teams[index];

  const filledPicks = [
    ...team.pickedCharacters,
    ...Array.from(
      { length: MAX_PICKS - team.pickedCharacters.length },
      () => null,
    ),
  ];

  const filledBans = [
    ...team.bannedCharacters,
    ...Array.from(
      { length: MAX_BANS - team.bannedCharacters.length },
      () => null,
    ),
  ];

  return (
    <Card size="small" className={s.card}>
      <div className={clsx(s.teamName, index === 1 ? s.red : s.blue)}>
        {team.name}
      </div>

      <div className={s.picks}>
        {filledPicks.map((character, i) =>
          character ? (
            <div className={s.pickSquare} key={i}>
              <img alt="example" src="/src/assets/4ByP3hRLEZo.jpg" />
              <span className={s.overlayName}>{character.id}</span>
            </div>
          ) : (
            <div className={clsx(s.pickSquare, s.placeholder)} key={i} />
          ),
        )}
      </div>

      <div className={s.bans}>
        {filledBans.map((character, i) => {
          if (!character) {
            return <div className={clsx(s.banSquare, s.placeholder)} key={i} />;
          }
          return (
            <div
              className={clsx(s.banSquare, character === "empty" && s._empty)}
              key={i}
            >
              {character !== "empty" && (
                <>
                  <img alt="example" src="/src/assets/4ByP3hRLEZo.jpg" />
                  <span className={s.overlayName}>{character.id}</span>
                </>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};
