
import {configureStore} from "@reduxjs/toolkit";
import {uiReducer} from "./reducers/uiReducer";
import {contentReducer} from "./reducers/contentReducer";
import {errorReducer} from "./reducers/errorReducer";

const store = configureStore({
    reducer: {
        ui: uiReducer,
        content: contentReducer,
        error: errorReducer,
    },
})

export type RootState = ReturnType<typeof  store.getState>
export type AppDispatch = typeof store.dispatch

export {store}