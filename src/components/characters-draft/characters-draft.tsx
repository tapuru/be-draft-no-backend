import { Flex } from "antd";
import s from "./characters-draft.module.css";
import { Header } from "./header";
import { TeamDraft } from "./team-draft";
import { CentralBlock } from "./central-block";

export const CharactersDraft = () => {
  return (
    <div className={s.root}>
      <Header />
      <Flex className={s.flex} justify="space-between" align="start" gap={20}>
        <TeamDraft index={0} />
        <CentralBlock />
        <TeamDraft index={1} />
      </Flex>
    </div>
  );
};
