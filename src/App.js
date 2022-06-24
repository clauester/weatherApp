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
const [open, setOpen] = useState('close')
  const [dataApi, setDataApi] = useState("");
  const [coordenadas, setCoordenadas] = useState({
    lat: ciudadesCoor.guayaquil.lat,
    lon: ciudadesCoor.guayaquil.lon
  });
  const key = process.env.REACT_APP_API_KEY;
console.log(open)
  function changeCity(city) {

    setCoordenadas(ciudadesCoor[city])
    console.log(ciudadesCoor[city])
    setOpen('close')

  }

  const funcionInit = async() => {
    if ("geolocation" in navigator) {
      const val = (respuesta) => {
        console.log(respuesta);
        const la = respuesta.coords.latitude;
        const lo = respuesta.coords.longitude;
      setCoordenadas({ lat: la, lon: lo });

      };

      const onErrorDeUbicacion = (err) => {
        alert("Error obteniendo ubicación: ",err);
      };

      const opcionesDeSolicitud = {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 1000
      };

     await navigator.geolocation.getCurrentPosition(
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
  }, [coordenadas]);
  return (
    <div className="App">
      {dataApi !== "" ? (
        <>
          <div className="leftSide">
            <div className="botonesIzquierda">
              <button
               
                className="btnplaces"
                onClick={() => setOpen('sidenav')}
              >
                Search for places
              </button>
              <button
              className="btnsimbolo"
                onClick={() => funcionInit()}
                
              >
                <BiCurrentLocation
                 className='locationLogo'
                />
              </button>
            </div>
            <div id="mySidenav" className={open}>
              <div className="sideContent">
                <div style={{ textAlign: "end" }}>
                  <span className="closebtn" onClick={() => setOpen('close')} >
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
                      fontSize: "80%",
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
                  <p className="p1">España</p>
                  <p className="p2" > {">"} </p>
                </div>

                <div
                  onClick={() => changeCity("londres")}
                  className="ciudad"
                >
                  <p className="p1">Londres</p>
                  <p className="p2" > {">"} </p>
                </div>

                <div
                  onClick={() => changeCity('nuevaYork')}
                  className="ciudad"
                >
                  <p className="p1" >Nueva York</p>
                  <p className="p2" > {">"} </p>
                </div>
              </div>
            </div>

            <div className="imageleft">
              {/* <div className="nube">
                <AiOutlineCloud />
              </div> */}
              <img
                src={`http://openweathermap.org/img/wn/${dataApi.current.weather[0].icon}@2x.png`}
                
                className="image1"
                alt="img"
              />
              {/* <div className="nube2">
                <AiOutlineCloud style={{}} />
              </div> */}
            </div>
            <div className="leftContent">
              <div className="temp">
                <div
                className="leftTemp"
                 
                >
                  {Math.round(cambioFar(dataApi.current.temp))}
                  <p
                   
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
