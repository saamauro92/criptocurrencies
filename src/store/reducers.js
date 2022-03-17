import { RENDER_CRYPTOS, RENDER_CRYPTOS_FAILED, RENDER_CRYPTOS_REQUEST } from "./constants";



export const cryptosReducer = (
    state = { loading: true, cryptos: {} }, action) => {
    switch (action.type) {
        case RENDER_CRYPTOS_REQUEST:
            return { loading: true }
        case RENDER_CRYPTOS:
            return { loading: false, cryptos: action.payload }
        case RENDER_CRYPTOS_FAILED:
            return { loading: false, error: action.payload }


        default:
            return state;
    }
}