import React, { Component } from "react";
import { connect } from 'react-redux';
import Search from "../Search";
import WeatherCard from "../WeatherCard";
import { actions } from '../../Store/actions'

function mapStateToProps(state) {
    return {
        weather: state.weatherReducer.weather,
        weatherHistory: state.weatherReducer.weatherHistory,
        user: state.userReducer.user
    };
}
const mapDispatchToProps = (dispatch) => ({
    setWeatherHistory: (weather) => dispatch(actions.setWeatherHistory(weather)),
})
export default connect(mapStateToProps, mapDispatchToProps)(class WeatherPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weatherHistory: [],
            from: 0,
            to: 0,
            newSearch: false,
            prev: true,
            next: false
        }
        this.setNewSearch = this.setNewSearch.bind(this);
    }
    componentDidMount() {
        const { uid } = this.props.user;
        const { weatherHistory, setWeatherHistory } = this.props;
        fetch('http://localhost:4000/api/' + uid)
            .then(response => response.json())
            .then((data) => {
                const to = data.length > 3 ? 3 : data.length;
                console.log(to)
                this.setState({ to: to }, () => {
                    if (this.state.to === data.length)
                        this.setState({ next: true })
                })
                setWeatherHistory(data);

            });

    }

    prev() {
        this.setState({ next: false })
        let { from, to } = this.state;
        this.setState({ from: from - 1 }, () => {
            this.setState({ to: to - 1 });
            if (this.state.from === 0)
                this.setState({ prev: true })
        })

    }
    next() {
        this.setState({ prev: false })
        const { weatherHistory } = this.props;
        let { from, to } = this.state;
        this.setState({ to: to + 1 }, () => {
            this.setState({ from: from + 1 })
            if (this.state.to === weatherHistory.length)
                this.setState({ next: true })
        })

    }
    setNewSearch(data) {
        debugger;
        let { from, to } = this.state;
        if (data.length < 3)
            this.setState({ to: to + 1 })
        if (to < data.length) {
            this.setState({ next: false });

        }
        debugger;
        // console.log("new search");
        // this.setState({ newSearch: true })
        // const { uid } = this.props.user;
        // fetch('http://localhost:4000/api/' + uid)
        //     .then(response => response.json())
        //     .then((data) => {
        //         const joined = this.state.weatherHistory.concat(data);
        //         this.setState({ weatherHistory: joined })
        //     });
        // const { weather } = this.props;
        // const joined = this.state.weatherHistory.concat(weather);
        // this.setState({ weatherHistory: joined })
        // this.setState({ newSearch: false });
    }
    render() {
        const { weatherHistory } = this.props;
        const { from, to } = this.state;
        return (
            <>
                <Search setNewSearch={this.setNewSearch}></Search>
                <footer className="fixed-bottom">
                    <h4>Recent Searches</h4>
                    <button disabled={this.state.prev} className="previous round arrow" onClick={() => this.prev()}>&#8249;</button>
                    {weatherHistory.slice(0).reverse().slice(from, to).map((weather, i) => {
                        return <WeatherCard className="mini" key={i} weather={weather}></WeatherCard>
                    })}
                    <button disabled={this.state.next} className="next round arrow" onClick={() => this.next()}>&#8250;</button>
                </footer>
            </>
        );
    }
})