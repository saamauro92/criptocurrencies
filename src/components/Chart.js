import React, { useEffect, useState } from "react";
import HistoryChart from "./HistoryChart";


const Chart = (props) => {
    const [coinData, setCoinData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    // this will change the format of how the hook is saved
    const formatData = (data) => {
        return data.map((el) => {
            return {
                t: el[0],
                y: el[1].toFixed(2),
            };
        });
    };
    let id = props.id;

    useEffect(() => {
        const chartFecthData = async () => {
            setIsLoading(true);
            const res = await Promise.all([
                fetch(
                    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1`
                ),
                fetch(
                    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`
                ),
                fetch(
                    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=365`
                ),
            ]);
            const data = await Promise.all(res.map((r) => r.json()));

            const dataday = data[0].prices;
            const dataweek = data[1].prices;
            const datayear = data[2].prices;

            setCoinData({
                day: formatData(dataday),
                week: formatData(dataweek),
                year: formatData(datayear),
                detail: id,
            });

            setIsLoading(false);
        };

        chartFecthData();
    }, [id]);

    const renderChart = () => {
        if (isLoading) {
            return <></>;
        }
        return (
            <>

                <HistoryChart data={coinData} />
            </>
        );
    };

    return renderChart();
};

export default Chart;
