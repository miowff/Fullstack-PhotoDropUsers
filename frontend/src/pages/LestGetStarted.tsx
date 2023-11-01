import { Header } from "../components/Header";
import { NumberInput } from "../components/LetsGetStarted/NumberInput";
import { WhatsTheCode } from "../components/LetsGetStarted/WhatsTheCode";
import { LetsGetStartedStages } from "../enums/letsGetStartedStages";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
export function LestGetStarted() {
  const { currentStage } = useSelector(
    (state: RootState) => state.letsGetStartedStages.letsGetStartedStages
  );

  return (
    <div>
      <Header />
      {currentStage === LetsGetStartedStages.INPUT_NUMBER && <NumberInput />}
      {currentStage === LetsGetStartedStages.CONFIRM_NUMBER && <WhatsTheCode />}
    </div>
  );
}
