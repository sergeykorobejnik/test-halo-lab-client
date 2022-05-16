import produce from "immer";

interface IState {
    isPopup: boolean
    isOverlay: boolean
}

export enum IUiActionsTypes {
    SWAP_POPUP_STATE = "SWAP_POPUP_STATE"
}

export interface ISwapPopupState {
    type: IUiActionsTypes.SWAP_POPUP_STATE
}

type UiAction = ISwapPopupState


const initialState: IState = {
    isPopup: false,
    isOverlay: false
}


export const uiReducer = (state = initialState, action: UiAction): IState => {
    switch (action.type) {
        case IUiActionsTypes.SWAP_POPUP_STATE: {
            return produce(state, draft => {
                draft.isPopup = !state.isPopup
                draft.isOverlay = !state.isOverlay
            })
        }
        default: return state
    }
}