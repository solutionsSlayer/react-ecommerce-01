import { shopActionTypes } from "./shop.types";

const INITIAL_STATE = {
    collections: {}
}

const shopReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case shopActionTypes.UPDATE_SHOP_COLLECTIONS:
            return {
                ...state,
                collections: action.payload
            }
        default:
            return state;
    }
}

export default shopReducer;