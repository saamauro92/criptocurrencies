import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingBox from "./LoadingBox";
import { MoneyFormat } from "../utils/utils";
import Chart from "./Chart";

const Coin = () => {
    let { id } = useParams();
    const [data, setData] = useState([{}]);
    useEffect(() => {
        async function showCryptoData() {
            const data = await fetch(
                `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`
            )
                .then((res) => res.json())
                .then((data) => data);
            setData(data);
        }
        showCryptoData();
    }, [id]);

    return (
        <>
            <div className="coin-display">
                {data.image ? (
                    <div className="crypto-card">
                        <div className="crypto-card-title">
                            <img src={data.image.small} alt="" />
                            <h2>
                                {data.name} ({data.symbol}){" "}
                            </h2>
                            <h5> #{data.market_cap_rank} </h5>
                        </div>

                        <h2>
                            {" "}
                            $
                            {data.market_data.current_price.usd ? (
                                data.market_data.current_price.usd.toFixed(2)
                            ) : (
                                <LoadingBox />
                            )}{" "}
                            USD
                        </h2>

                        <div className="crypto-card-data">
                            <span> Market Cap</span>
                            <span> ${MoneyFormat(data.market_data.market_cap.usd)} </span>
                        </div>

                        <div className="crypto-card-data">
                            <span> Vol(24h) </span>
                            <span> ${data.market_data.total_volume.usd} </span>
                        </div>
                        <div className="crypto-card-data">
                            <span> C. Supply </span>
                            <span> ${data.market_data.circulating_supply.toFixed(2)} </span>
                        </div>
                        <div className="crypto-card-data">
                            <span>1h</span>
                            <span
                                style={{
                                    color:
                                        Math.sign(
                                            data.market_data.price_change_percentage_1h_in_currency
                                                .usd
                                        ) === -1
                                            ? "red"
                                            : "green",
                                }}
                            >
                                {" "}
                                {
                                    data.market_data.price_change_percentage_1h_in_currency.usd
                                }%{" "}
                            </span>
                        </div>
                        <div className="crypto-card-data">
                            <span>24h</span>
                            <span
                                style={{
                                    color:
                                        Math.sign(
                                            data.market_data.price_change_24h_in_currency.usd
                                        ) === -1
                                            ? "red"
                                            : "green",
                                }}
                            >
                                {" "}
                                {data.market_data.price_change_24h_in_currency.usd}%{" "}
                            </span>
                        </div>

                        <div className="crypto-card-data">
                            <span>week</span>

                            <span
                                style={{
                                    color:
                                        Math.sign(
                                            data.market_data.price_change_percentage_7d_in_currency
                                                .usd
                                        ) === -1
                                            ? "red"
                                            : "green",
                                }}
                            >
                                {data.market_data.price_change_percentage_7d_in_currency.usd} %{" "}
                            </span>
                        </div>
                    </div>
                ) : (
                    <>


                    </>
                )}

                <div className="crypto-chart-container">

                    <Chart id={id} />
                </div>
            </div>
        </>
    );
};

export default Coin;
