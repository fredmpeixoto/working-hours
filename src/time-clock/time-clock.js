import React from 'react';
import './time-clock.scss';


class TimeClock extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date() };
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tickTac(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tickTac() {
        this.setState({ date: new Date() });
    }

    render() {
        return (
            <div>
                <h2> {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}


export default TimeClock;