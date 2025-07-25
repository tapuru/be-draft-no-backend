import { CharactersDraft } from "./components/characters-draft/characters-draft";
import { ChooseWinner } from "./components/choose-winner/choose-winner";
import { Coin } from "./components/coin/coin";
import { CreateRoomForm } from "./components/create-room-form/create-room-form";
import { MapDraft } from "./components/map-draft/map-draft";
import { STAGE } from "./lib";
import { useAppStore } from "./model";

function App() {
  const { stage } = useAppStore();

  switch (stage) {
    case STAGE.PENDING:
      return <CreateRoomForm />;
    case STAGE.COIN:
      return <Coin />;
    case STAGE.MAPS_DRAFT:
      return <MapDraft />;
    case STAGE.CHARACTERS_DRAFT_PENDING:
    case STAGE.CHARACTERS_DRAFT:
    case STAGE.GAME:
      return <CharactersDraft />;
    case STAGE.CHOOSE_WINNER:
      return <ChooseWinner />;
  }
}

export default App;
