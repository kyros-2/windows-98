import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
    openedApps: []
}

const appsReduder = createSlice({
    name: 'openApp',
    initialState,
    reducers: {
        openApp(state, action) {
            state.openedApps.push({id: action.payload.id, divId: action.payload.divId, appTitle: action.payload.appTitle});
        },
        closeApp(state, action) {
            state.openedApps = action.payload.newState;
        }
    }
})

export const actions = appsReduder.actions;

const store = configureStore({
    reducer: appsReduder.reducer
})

export default store;