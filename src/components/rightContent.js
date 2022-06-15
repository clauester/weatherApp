import "../App.css";
import "./rightContent.css";
import useHook from "./customhook";
import React from "react";
import { WiWindDeg } from "react-icons/wi";

const RightContent = ({ dataApi, prueba, tipoGrado }) => {
  const { formatDate } = useHook();

  

  const cambioFar = (data) => {
    if (tipoGrado === "fahrenheit") {
      return (data * 9) / 5 + 32;
    } else {
      return data;
    }
  };

  function redondear(val) {
    return Math.round(val);
  }

  return (
    <div className="rightSide">
      <div className="rightContent">
        <div className="botones">
          <span
            onClick={() => prueba("celcius")}
            className="dot"
            style={tipoGrado === "celcius" ? { background: "gray" } : null}
          >
            °C
          </span>
          <span
            onClick={() => prueba("fahrenheit")}
            className="dot"
            style={tipoGrado === "fahrenheit" ? { background: "gray" } : null}
          >
            °F
          </span>
        </div>
        <div className="arriba">
          {dataApi.daily.map(
            (value, index) =>
              index < 5 && (
                <div className="cuadro2" key={index}>
                  <div className="encabezadoA">
                    {index === 0 ? "Tomorrow" : formatDate(index + 1)}
                  </div>
                  <img
                    className="image"
                    src={`http://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png`}
                    alt={value.weather[0].icon}
                  />
                  <div className="contenidoA">
                    <div className="tempMax">
                      {redondear(cambioFar(value.temp.max))}
                      {tipoGrado === "celcius" ? "°C" : "°F"}
                    </div>
                    <div
                      style={{ color: "gray", fontSize: "0.8vw" }}
                      className="tempMin"
                    >
                      {redondear(cambioFar(value.temp.min))}
                      {tipoGrado === "celcius" ? "°C" : "°F"}
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
        <div style={{ fontSize: "2vw" }}>Today's Highlights </div>

        <div className="abajo">
          <div className="cuadro1">
            <div className="encabezado">Wind status</div>
            <div className="contenido">
              {dataApi.current.wind_speed}
              <p className="medida">m/s</p>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <WiWindDeg
                style={{ fontSize: "3vw", transform: "rotate(220deg)" }}
              />
            </div>
          </div>
          <div className="cuadro1">
            <div className="encabezado">Humidity</div>
            <div className="contenido">
              {dataApi.current.humidity}
              <p className="medida"> %</p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <progress
                style={{ width: "10vw", height: "1.5vw" }}
                max="100"
                value={dataApi.current.humidity}
              ></progress>
              <p className="medida"> %</p>
            </div>
          </div>
          <div className="cuadro1">
            <div className="encabezado">Visibility</div>
            <div className="contenido">
              {dataApi.current.visibility * 0.001}
              <p className="medida">Km</p>
            </div>
          </div>
          <div className="cuadro1">
            <div className="encabezado">Air pressure</div>
            <div className="contenido">
              {dataApi.current.pressure}
              <p className="medida">mb</p>
            </div>
          </div>
        </div>
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            marginTop: "0.5vw",
            textAlign: "center",
            fontSize: "1vw"
          }}
        >
          Created by Miguel davila - devChallenges.io
        </div>
      </div>
    </div>
  );
};
export default RightContent;
