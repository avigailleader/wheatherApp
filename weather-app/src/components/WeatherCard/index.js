import React, { Component } from "react";


export default class WeatherCard extends Component {
    render() {
        const { weather ,className} = this.props;
        var iconurl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
        return (
            <div className="card" className={"card "+className}>
                <div className="card-body">
                    <p className="card-text">{weather.city}<sup className="countryIcon">{weather.country}</sup></p>
                    <h2>{weather.temp}&#8451;</h2>
                </div>
                <img src={iconurl} alt="Card image cap" />
                <p className="card-text">{weather.description}</p>
            </div>
        );
    }
}

