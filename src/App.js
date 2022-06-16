import "./App.css";

import React, { useEffect, useState } from "react";
import RightContent from "./components/rightContent";
import customHook from "./components/customhook.js";
import { BiCurrentLocation } from "react-icons/bi";
import { AiOutlineCloud } from "react-icons/ai";
import { ciudadesCoor } from './coordenadas'

export default function App() {
  const { formatDate, openNav, closeNav } = customHook();
  const [tipoGrado, setTipoGrado] = useState("celcius");

  const [dataApi, setDataApi] = useState("");
  const [coordenadas, setCoordenadas] = useState({
    lat: ciudadesCoor.guayaquil.lat,
    lon: ciudadesCoor.guayaquil.lon
  });
  const key = process.env.REACT_APP_API_KEY;

  function changeCity(city) {

    setCoordenadas(ciudadesCoor[city])
    closeNav()

  }

  const funcionInit = () => {
    if ("geolocation" in navigator) {
      const val = (respuesta) => {
        console.log(respuesta);
        const la = respuesta.coords.latitude;
        const lo = respuesta.coords.longitude;
        setCoordenadas({ lat: la, lon: lo });

      };

      const onErrorDeUbicacion = (err) => {
        alert("Error obteniendo ubicación: ");
      };

      const opcionesDeSolicitud = {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 1000
      };

      navigator.geolocation.getCurrentPosition(
        val,
        onErrorDeUbicacion,
        opcionesDeSolicitud
      );
    } else {
      return alert(
        "Tu navegador no soporta el acceso a la ubicación. Intenta con otro"
      );
    }
  };

  const prueba = (respuesta) => {
    setTipoGrado(respuesta);
  };
  const cambioFar = (data) => {
    if (tipoGrado === "fahrenheit") {
      return (data * 9) / 5 + 32;
    } else {
      return data;
    }
  };


  useEffect(() => {
    async function loadApi() {
      await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${coordenadas.lat}&lon=${coordenadas.lon}&exclude=minutely,hourly,alerts&appid=${key}&lang=en&units=metric`
      )
        .then((response) => response.json())
        .then((data) => setDataApi(data));
    }

    loadApi()
  }, []);
  return (
    <div className="App">
      {dataApi !== "" ? (
        <>
          <div className="leftSide">
            <div className="botonesIzquierda">
              <button
                style={{
                  width: "11vw",
                  height: "2.8vw",
                  fontSize: "1vw",
                  border: "none",
                  background: "gray",
                  color: "white"
                }}
                onClick={openNav}
              >
                Search for places
              </button>
              <button
                onClick={() => funcionInit()}
                style={{
                  borderRadius: "50%",
                  height: "2.8vw",
                  width: "2.8vw",
                  border: "none",
                  background: "gray",
                  color: "white"
                }}
              >
                <BiCurrentLocation
                  style={{
                    alignSelf: "center",
                    height: "1.5vw",
                    width: "1.5vw"
                  }}
                />
              </button>
            </div>
            <div id="mySidenav" className="sidenav">
              <div className="sideContent">
                <div style={{ textAlign: "end" }}>
                  <span className="closebtn" onClick={closeNav}>
                    &times;
                  </span>
                </div>
                <div className="busqueda">
                  <input
                    placeholder="  search location"
                    className="searchInput"
                    style={{ color: "white" }}
                  />
                  <button
                    style={{
                      fontSize: "1vw",
                      background: "#463BF5",
                      border: "none",
                      color: "white"
                    }}
                  >
                    Search
                  </button>
                </div>

                <div
                  onClick={() => changeCity('spain')}
                  className="ciudad"
                >
                  <p>España</p>
                  <p> {">"} </p>
                </div>

                <div
                  onClick={() => changeCity("londres")}
                  className="ciudad"
                >
                  <p>Londres</p>
                  <p> {">"} </p>
                </div>

                <div
                  onClick={() => changeCity('nuevaYork')}
                  className="ciudad"
                >
                  <p>Nueva York</p>
                  <p> {">"} </p>
                </div>
              </div>
            </div>

            <div className="imageleft">
              <div className="nube">
                <AiOutlineCloud />
              </div>
              <img
                src={`http://openweathermap.org/img/wn/${dataApi.current.weather[0].icon}@2x.png`}
                style={{ height: "40%", position: "relative" }}
                alt="img"
              />
              <div className="nube2">
                <AiOutlineCloud />
              </div>
            </div>
            <div className="leftContent">
              <div className="temp">
                <div
                  style={{
                    fontSize: "4vw",
                    display: "flex",
                    justifyContent: "center"
                  }}
                >
                  {Math.round(cambioFar(dataApi.current.temp))}
                  <p
                    style={{
                      fontSize: "3vw",
                      margin: "0px",
                      alignSelf: "center"
                    }}
                  >
                    {tipoGrado === "celcius" ? "°C" : "°F"}
                  </p>
                </div>
              </div>
              <div className="clima">
                {dataApi.current.weather[0].description}
              </div>
              <div className="fecha">Today ° {formatDate(0)}</div>
              <div className="ciudad1">{dataApi.timezone}</div>
            </div>
          </div>
          <>
            <RightContent
              dataApi={dataApi}
              prueba={prueba}
              tipoGrado={tipoGrado}
            />
          </>
        </>
      ) : null}
    </div>
  );
}
