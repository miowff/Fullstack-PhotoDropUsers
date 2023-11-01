import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LetsGetStartedStages } from "../../enums/letsGetStartedStages";

export interface StageContent {
  currentStage: LetsGetStartedStages;
  enteredNumber: string;
}
interface StageState {
  letsGetStartedStages: StageContent;
}
const initialState: StageState = {
  letsGetStartedStages: {
    currentStage: LetsGetStartedStages.INPUT_NUMBER,
    enteredNumber: "",
  },
};
const letsGetStartedStageSlice = createSlice({
  name: "letsGetStartedStages",
  initialState,
  reducers: {
    setCurrentStage(state, action: PayloadAction<StageContent>) {
      state.letsGetStartedStages = action.payload;
    },
  },
});
export const { setCurrentStage } = letsGetStartedStageSlice.actions;
export default letsGetStartedStageSlice.reducer;
