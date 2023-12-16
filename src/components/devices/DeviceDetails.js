import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Button, Typography, Paper, Grid } from "@mui/material";
import "./DeviceDetails.css";

const DeviceDetails = () => {
  const [device, setDevice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { deviceId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/device/getDeviceById/${deviceId}`)
      .then((response) => {
        setDevice(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [deviceId]);

  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <Paper elevation={3} className="device-details-container">
      <Link to={"/devices"} style={{ margin: "10px 0", display: "block" }}>
        <Button variant="outlined">Back</Button>
      </Link>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <div className="device-image">
            <img
              src={
                "https://media.wired.com/photos/5b22c5c4b878a15e9ce80d92/master/pass/iphonex-TA.jpg"
              }
              alt={`${device.make} ${device.model}`}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <div className="device-text">
            <Typography variant="h6">{`Make: ${device.make}`}</Typography>
            <Typography variant="h6">{`Model: ${device.model}`}</Typography>
            <Typography variant="h6">{`Cost: $${device.cost}`}</Typography>
            <Typography variant="body1">
              {`Description: 
              Apple predstavlja svoju novu seriju mobilnih telefona, koja nudi
              vrhunsku tehnologiju, moderni dizajn i funkcije prilagođene potrebama
              modernog korisnika. Svaki telefon iz ove serije dolazi s inovativnim
              značajkama koje omogućavaju korisniku da u potpunosti iskoristi njegov
              potencijal. Ovi mobilni telefoni imaju veličinu ekrana od 6,1 inča,
              što omogućuje ugodno gledanje video zapisa i fotografija. Apple iPhone
              13 ima snažan procesor i veliku memoriju, što omogućuje glatko
              izvođenje svih aplikacija. Pohranjivanje datoteka nikada nije bilo
              lakše, jer ovi mobilni telefoni dolaze s velikom internom memorijom od
              128 GB, proširivom do 1 TB pomoću microSD kartice. Apple iPhone 13 ima
              snažnu bateriju od 3240 mAh koja omogućuje cijelodnevno korištenje bez
              potrebe za punjenjem, što je izuzetno praktično za osobe koje su
              stalno u pokretu. Kada je u pitanju kamera, Apple iPhone 13 ima zadnju
              kameru od 12 MP, te prednju kameru od 12 MP, koja omogućava izuzetno
              kvalitetne fotografije i video zapise. Apple iPhone 13 također ima
              zaštitu zaslona, otpornost na vodu i prašinu, te podržava bežično
              punjenje. Korisnici također mogu koristiti vlastite preferirane metode
              otključavanja telefona, kao što su otisak prsta ili prepoznavanje
              lica. Ukratko, mobilni telefoni iz ove serije idealni su za korisnike
              koji traže visoku razinu tehnologije i dizajna, kao i praktičnost i
              mogućnost da koriste uređaj cijeli dan bez potrebe za punjenjem.
              `}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DeviceDetails;
