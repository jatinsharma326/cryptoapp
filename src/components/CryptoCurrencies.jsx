import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, Typography, Avatar, Input } from "@mui/material";
import "../styles/cryptocurrencies.css";
import axios from "axios";

const ariaLabel = { "aria-label": "Description" };

const CryptoCurrencies = () => {
  const [searchTerm, setSearchTerm] = useState("");
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
      <Input
        placeholder="Type The Text"
        inputProps={ariaLabel}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="allCryptoDisplay">
        {cryptoData?.coins
          ?.filter((crypto) => {
            if (searchTerm === "") {
              return crypto;
            } else if (
              crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return crypto;
            }
          })
          .map((crypto) => (
            <ol className="makeOlUnordered" key={crypto?.uuid} type="1">
              <li>
                <Card sx={{ minWidth: 275 }} col-xs={4} className="card-value">
                  <CardContent>
                    <Avatar
                      className="avatar"
                      src={crypto?.iconUrl}
                      alt="Dr Strange"
                    />
                    <Typography variant="h5" component="h2">
                      {crypto?.name}
                    </Typography>
                    <Typography variant="body2" component="p">
                      Price: {crypto?.price}
                    </Typography>
                    <Typography variant="body2" component="p">
                      Market Cap: {crypto?.marketCap}
                    </Typography>
                    <Typography variant="body2" component="p">
                      Daily Exchange: {crypto?.change}
                    </Typography>
                  </CardContent>
                </Card>
              </li>
            </ol>
          ))}
      </div>
    </div>
  );
};

export default CryptoCurrencies;
