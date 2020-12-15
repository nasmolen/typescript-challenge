import React from "react";

type WeatherProps = {
    weather: string
}

const DisplayFetch: React.FunctionComponent <WeatherProps> = (props) => {
    return (
        <div>
            <h1>The weather in your area is {props.weather}</h1>
        </div>
    )
}

export default DisplayFetch;