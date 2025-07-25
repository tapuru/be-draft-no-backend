import s from "./coin.module.css";

export const FirstChoiceButton = ({
  description,
  onClick,
  title,
}: {
  title: string;
  description: string;
  onClick: () => void;
}) => {
  return (
    <button className={s.firstChoiceButton} onClick={onClick}>
      <span className={s.firstChoiceButtonTitle}>{title}</span>
      <span className={s.firstChoiceButtonDescription}>{description}</span>
    </button>
  );
};
