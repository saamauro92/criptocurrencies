import Axios from 'axios';
import { RENDER_CRYPTOS, RENDER_CRYPTOS_FAILED, RENDER_CRYPTOS_REQUEST } from './constants';

export const allthecoins = () => async (dispatch) => {
    dispatch({
        type: RENDER_CRYPTOS_REQUEST
    });
    try {
        const { data } = await Axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d")
        dispatch({ type: RENDER_CRYPTOS, payload: data })

    }
    catch (e) {
        dispatch({ type: RENDER_CRYPTOS_FAILED, payload: e.message })
    }
}





