import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface StageContent {
  enteredNumber: string | null;
}
interface StageState {
  letsGetStarted: StageContent;
}
const initialState: StageState = {
  letsGetStarted: {
    enteredNumber: null,
  },
};
const letsGetStartedStageSlice = createSlice({
  name: "letsGetStartedStages",
  initialState,
  reducers: {
    setCurrentStage(state, action: PayloadAction<StageContent>) {
      state.letsGetStarted = action.payload;
    },
  },
});
export const { setCurrentStage } = letsGetStartedStageSlice.actions;
export default letsGetStartedStageSlice.reducer;
