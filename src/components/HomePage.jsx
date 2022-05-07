import React, { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import "../styles/homepage.css";
import axios from "axios";
// import millify from "millify";
import CryptoCurrencies from "./CryptoCurrencies";
import News from "./News";

const HomePage = () => {
  let [cryptoData, setCryptoData] = useState([]);

  const fetchData = useCallback(() => {
    axios({
      method: "GET",
      url: "https://coinranking1.p.rapidapi.com/coins",
      params: {
        referenceCurrencyUuid: "yhjMzLPhuIDl",
        timePeriod: "24h",
        "tiers[0]": "1",
        orderBy: "marketCap",
        orderDirection: "desc",
        limit: "50",
        offset: "0",
      },
      headers: {
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
        "X-RapidAPI-Key": `${process.env.REACT_APP_CryptoData_Key}`,
      },
    })
      .then((response) => {
        console.log(process.env);
        console.log(response.data);
        setCryptoData(response?.data?.data);
        console.log(response?.data?.data);
      })
      .catch((error) => {
        console.log(`Error is ${error}`);
      });
  });
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Box className="grid-item" sx={{ flexGrow: 1 }}>
        <h1>Global Currencies Data</h1>
        <Grid className="grid-item" container spacing={2}>
          <Grid item xs={6}>
            <div>
              <h4>Total Currencies</h4>
              <p>{cryptoData?.stats?.totalCoins}</p>
            </div>
            <div>
              <h4>Total Market Cap</h4>
              <p>{cryptoData?.stats?.totalMarketCap}</p>
            </div>
            <div>
              <h4>Total CryptoCurrencies</h4>
              <p>{cryptoData?.stats?.total} </p>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div>
              <h4>Total Currencies</h4>
              <p>{cryptoData?.stats?.total24hVolume}</p>
            </div>
            <div>
              <h4>Total Market Cap</h4>
              <p>{cryptoData?.stats?.totalMarketCap}</p>
            </div>
            <div>
              <h4>Total CryptoCurrencies</h4>
              <p>{cryptoData?.stats?.totalExchanges}</p>
            </div>
          </Grid>
        </Grid>
        <h1>Top 10 Crypto Currencies in the World</h1>
        {<CryptoCurrencies />}
        <br />
        <h1>Latest Crypto News</h1>
        <News />
      </Box>
    </div>
  );
};

export default HomePage;
