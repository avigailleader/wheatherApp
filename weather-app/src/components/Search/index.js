import React, { Component } from "react";
import { connect } from 'react-redux';
import { actions } from '../../Store/actions'
import WeatherCard from "../WeatherCard";
import Weather from '../WeatherCard';

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
        weather: state.weatherReducer.weather,
    };
}

const mapDispatchToProps = (dispatch) => ({
    setWeather: (weather) => dispatch(actions.setWeather(weather)),
    setWeatherHistory: (weather) => dispatch(actions.setWeatherHistory(weather)),
})

export default connect(mapStateToProps, mapDispatchToProps)(class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            cityForSearch: ""
        };
    }
    search = () => {
        const { uid } = this.props.user;
        const { setWeather } = this.props;
        const {setNewSearch, setWeatherHistory } = this.props;
        fetch('http://localhost:4000/api/' + uid)
            .then(response => response.json())
            .then((data) => {
                setWeatherHistory(data)
                setNewSearch(data);
            });
        fetch('http://localhost:4000/api/' + uid + '/' + this.state.cityForSearch)
            .then(response => response.json())
            .then((data) => {
                setWeather(data);
                // setWeatherHistory(data);
                // setNewSearch();
                this.setState({ redirect: true })
            }
            );
    }
    render() {
        const { weather } = this.props;
        return (
            <div className="container search-container">
                <h1>Simple Weather App</h1>
                <input className="search" placeholder="Search for a city" onChange={(e) => { this.setState({ cityForSearch: e.target.value }) }}></input>
                 <button className="btn btn-danger" onClick={this.search}>submit</button>
                <br></br>
                {this.state.redirect ? <WeatherCard className="big" weather={weather}></WeatherCard> : ''}
            </div>

        );
    }
})
