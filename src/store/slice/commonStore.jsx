import { createSlice } from  "@reduxjs/toolkit";

const initialState = {
    type: "admin"
}

export const CommonSlice = createSlice({
    name: "commonSlice",
    initialState,
    reducers: {
        changeType: (state, action) => {
            state.type = action.payload;
        },
        resetType: (state) => {
            state.type = "admin"
        }
    }
});

// eslint-disable-next-line react-refresh/only-export-components
export const {changeType,resetType} = CommonSlice.actions;