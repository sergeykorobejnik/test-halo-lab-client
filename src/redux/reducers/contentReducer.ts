import produce from "immer";

export interface IProduct {
    _id: string,
    category: string,
    name: string,
    price: number,
}

interface IState {
    productArr: IProduct[]
    cheapestProduct: IProduct
}


export enum IContentTypes {
    FETCH_CARDS = "FETCH_CARDS",
    BUY_ITEM = "BUY_ITEM"
}

export interface IFetchCards {
    type: IContentTypes.FETCH_CARDS
    payload?: {
        products: IProduct[],
        cheapestProduct: IProduct
    }
}

export interface IBuyItem {
    type: IContentTypes.BUY_ITEM
    payload?: any[]
}

export type ContentAction = IFetchCards | IBuyItem


const initialState: IState = {
    productArr: [],
    cheapestProduct: {
        _id: "",
        category: "",
        name: "",
        price: 0
    }
}


export const contentReducer = (state = initialState, action: ContentAction): IState => {
    switch (action.type) {
        case IContentTypes.FETCH_CARDS: {
            return produce(state, draft => {
                if (action.payload) {
                    draft.productArr = [...action.payload.products]
                    draft.cheapestProduct = action.payload.cheapestProduct
                }
                    else return state
            })
        }
        default: return state
    }
}