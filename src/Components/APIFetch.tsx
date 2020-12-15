import React from 'react';
import DisplayFetch from './DisplayFetch'

type LocationState = {
    latNum: number,
    lngNum: number,
    weather: string,
    didMount: boolean
}

class Location extends React.Component<{}, LocationState> {
    constructor(props: LocationState) {
        super(props);
        this.state = {
            latNum: 0,
            lngNum: 0,
            weather: "",
            didMount: false
        }
    }

    componentDidMount() {
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position)
                this.setState({
                    latNum: position.coords.latitude,
                    lngNum: position.coords.longitude,
                })

                let url = `http://api.openweathermap.org/data/2.5/weather?lat=${this.state.latNum}&lon=${this.state.lngNum}&APPID=6d53dd87926cfb1ab42742ea2ebe1d25`;

                fetch(url)
                    .then(res => res.json())
                    .then(data => {
                        this.setState({
                            weather: data.weather[0].description
                        })
                        console.log(this.state.weather)
                    })
                    .catch(error => console.log(error))

                this.setState({
                    didMount: true
                })
            },
            (error) => {
                console.error("Error Code = " + error.code + " - " + error.message)
            }
        )

        
    }


    render() {
        return(
            <div>
                {this.state.didMount && 
                <DisplayFetch weather={this.state.weather} />}
            </div>
        )
    }
}

export default Location;