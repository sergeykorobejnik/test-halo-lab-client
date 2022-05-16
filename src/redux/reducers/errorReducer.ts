import produce from "immer";


interface IState {
    serverError: {
        errorState: boolean,
        errorText: string
    },
}


export enum IErrorContentTypes {
    SERVER_ERROR = "SERVER_ERROR",
    CLEAR_ERROR = "CLEAR_ERROR"
}

export interface IServerError {
    type: IErrorContentTypes.SERVER_ERROR
    payload?: string
}

export interface IClearServerError  {
    type: IErrorContentTypes.CLEAR_ERROR
}


export type ContentAction = IServerError | IClearServerError


const initialState: IState = {
    serverError: {
        errorState: false,
        errorText: ""
    }
}


export const errorReducer = (state = initialState, action: ContentAction): IState => {
    switch (action.type) {
        case IErrorContentTypes.SERVER_ERROR: {
            return produce(state, draft => {
                if (action.payload) {
                    draft.serverError.errorText = action.payload
                    draft.serverError.errorState = true
                }
            })
        }
        case IErrorContentTypes.CLEAR_ERROR: {
            return produce(state, draft => {
                draft.serverError.errorState = false
            })
        }
        default: return state
    }
}