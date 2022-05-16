import {ISwapPopupState, IUiActionsTypes} from "../reducers/uiReducer";
import {RootState} from "../store";
import {IContentTypes} from "../reducers/contentReducer";
import {api} from "../../api/api";
import {ThunkAction} from "redux-thunk"
import {Action} from "redux"
import {IClearServerError, IErrorContentTypes, IServerError} from "../reducers/errorReducer";

export const swapPopup = ():ISwapPopupState => {
    return {
        type: IUiActionsTypes.SWAP_POPUP_STATE
    }
}


export const fetchCards = (): ThunkAction<Promise<void>, RootState , any, Action> => async (dispatch) => {
    const data = await api.apiGetCards()
    typeof (data) === "string"
        ? dispatch({
            type: IErrorContentTypes.SERVER_ERROR,
            payload: data
        })
        : dispatch({
            type: IContentTypes.FETCH_CARDS,
            payload: data
        })

}


export const postCheapest = (payload: {[key: string]: string}): ThunkAction<Promise<void>, RootState , any, Action> => async (dispatch) => {
    const data = await api.apiPostCheapest(payload)
    if (typeof (data) === "string") {
        dispatch({
            type: IErrorContentTypes.SERVER_ERROR,
            payload: data
        })
    }
}

export const setServerError = (payload: string): IServerError => {
    return {
        type: IErrorContentTypes.SERVER_ERROR,
        payload
    }
}

export const clearServerError = (): IClearServerError => {
    return {
        type: IErrorContentTypes.CLEAR_ERROR,
    }
}