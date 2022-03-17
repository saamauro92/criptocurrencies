import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import LoadingBox from './LoadingBox';
import { MoneyFormat } from '../utils/utils';
import { allthecoins } from '../store/actions';
import TableSkeleton from './TableSkeleton';


export default function Main() {

    const dispatch = useDispatch();
    const cryptoList = useSelector(state => state.cryptoslist);
    const { cryptos, loading, error } = cryptoList;
    const webCurrency = { currency: "usd", symbol: "$" }

    useEffect(() => {

        dispatch(allthecoins())

    }, [dispatch])

    return (
        <>

            <div className="header">
                <h4>  Cryptocurrency Prices & Coin Market Caps</h4>
                <h3>Top 100 coins</h3>
            </div>

            {loading ? <TableSkeleton /> :
                <table className="table">
                    <tr>

                        <th> #</th>
                        <th> Coin</th>
                        <th> Price </th>
                        <th> 1h </th>
                        <th> 24h </th>
                        <th> 7d </th>
                        <th> Volume (24hs)  </th>
                        <th> Market Cap </th>
                        <th className="td-chart"> Last 7 days  </th>
                    </tr>

                    {
                        loading ? <LoadingBox></LoadingBox>
                            : error ? <div >{error.message} </div>
                                :
                                cryptos.slice(0, 100).map((item) =>


                                    <tr key={item.market_cap_rank}>

                                        {!item.market_cap_rank || item.market_cap_rank === null ? <td> <p> ... </p>  </td> : <td> {item.market_cap_rank}   </td>}

                                        <Link to={`/coin/${item.id}`}>
                                            <td>


                                                <div className="td-icon">

                                                    <img src={item.image} style={{ width: "24px", height: "24px" }} alt="" />

                                                    <div>
                                                        <p>{item.name} </p>

                                                    </div>
                                                    <div>
                                                        <p> {item.symbol}</p>
                                                    </div>

                                                </div>

                                            </td>
                                        </Link>


                                        {!item.current_price || item.current_price === null ? <td> <p> ? </p> </td> : <td> {webCurrency.symbol}{item.current_price.toFixed(2)} </td>}

                                        {!item.price_change_percentage_1h_in_currency || item.price_change_percentage_1h_in_currency === null ? <td> <p> ? </p> </td> : <td> <p style={{ color: Math.sign(item.price_change_percentage_1h_in_currency) === -1 ? "red" : "green" }}>{item.price_change_percentage_1h_in_currency.toFixed(1)} % </p> </td>}

                                        {!item.price_change_percentage_24h || item.price_change_percentage_24h === null ? <td> <p> ? </p> </td> : <td >  <p style={{ color: Math.sign(item.price_change_percentage_24h) === -1 ? "red" : "green" }}>  {item.price_change_percentage_24h.toFixed(1)} %  </p> </td>}


                                        {!item.price_change_percentage_7d_in_currency || item.price_change_percentage_7d_in_currency === null ? <td> <p> ? </p> </td> : <td> <p style={{ color: Math.sign(item.price_change_percentage_7d_in_currency) === -1 ? "red" : "green" }}>{item.price_change_percentage_7d_in_currency.toFixed(1)} % </p> </td>}

                                        {!item.total_volume || item.total_volume === null ? <td> <p> ? </p> </td> : <td> {webCurrency.symbol}{item.total_volume.toFixed(1)} </td>}
                                        <td> {webCurrency.symbol}{MoneyFormat(item.market_cap)} </td>


                                        {!item.sparkline_in_7d || item.sparkline_in_7d === null ? <td> <p> ? </p> </td> : <td className="td-chart">
                                            <Sparklines data={item.sparkline_in_7d.price} limit={200} width={15} height={5} margin={0}>
                                                <SparklinesLine style={{ fill: "none", strokeWidth: "0.15" }} color={Math.sign(item.price_change_percentage_7d_in_currency) === -1 ? "red" : "green"} />
                                            </Sparklines></td>}
                                    </tr>
                                )

                    }


                </table>
            }

        </>
    )

}
