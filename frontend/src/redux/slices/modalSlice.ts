import { createSlice } from "@reduxjs/toolkit";

// import {} from './types'

type InitialState = {
  showSignInModal: boolean;
  showSignUpModal: boolean;
};

const initialState: InitialState = {
  showSignInModal: false,
  showSignUpModal: false,
};

const modalSlice = createSlice({
  name: "Modal",
  initialState,
  reducers: {
    setShowSignInModal: (state, action: { type: string; payload: boolean }) => {
      state.showSignInModal = action.payload;
    },
    setShowSignUpModal: (state, action: { type: string; payload: boolean }) => {
      state.showSignUpModal = action.payload;
    },
  },
});

export const { setShowSignInModal, setShowSignUpModal } = modalSlice.actions;

export default modalSlice;
