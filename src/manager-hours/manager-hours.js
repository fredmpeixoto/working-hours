import React from 'react';
import Icon from '@material-ui/core/Icon';

import './manager-hours.scss';
import RequestService from '../services/request.services';

const request = new RequestService();

class ManagerHours extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            iconWork: 'play_arrow',
            iconLunch: 'fastfood',
            textInfo: '', name: '',
            hours: [{
                start: '',
                end: ''
            }]
        };

        this.updateHours = this.updateHours.bind(this);
        this.requestHours = this.requestHours.bind(this);
        this.getDataFromUser = this.getDataFromUser.bind(this);

        this.handleClickWork = this.handleClickWork.bind(this);
        this.handleClickLunch = this.handleClickLunch.bind(this);
    }


    componentDidMount() {
        this.getDataFromUser();
    }

    getDataFromUser() {
        var that = this;

        request.getDataByUser(1)
            .then((res) => that.setState(() => ({ ...res.data })))
    }

    updateHours(kindBreak) {

        var circlesComplete = this.state.hours.every(hour => (hour.start && hour.end));

        const lastHourCircle = this.state.hours[this.state.hours.length - 1];

        var notIsSomeKindBreak = false;

        if (lastHourCircle)
            notIsSomeKindBreak = (lastHourCircle.kindBreak !== kindBreak);

        if (circlesComplete)
            this.createNewCircle(kindBreak);
        else if (notIsSomeKindBreak) {
            this.setHoursStartOrEnd(lastHourCircle, lastHourCircle.kindBreak);
            this.createNewCircle(kindBreak);
        } else
            this.setHoursStartOrEnd(lastHourCircle, kindBreak);


        this.requestHours();
    }

    createNewCircle(kindBreak) {
        this.state.hours.push({ start: '', end: '' });
        this.setHoursStartOrEnd(this.state.hours[this.state.hours.length - 1], kindBreak);
    }

    requestHours() {
        request.updateWorkTime(1, this.state)
            .then();
    }


    setHoursStartOrEnd(hour, kindBreak) {

        hour.kindBreak = kindBreak;

        var startedCircleButNotEnd = (hour.start && !hour.end);

        if (!hour.start) hour.start = new Date().toLocaleTimeString();

        else if (startedCircleButNotEnd) hour.end = new Date().toLocaleTimeString();
    }

    handleClickWork() {
        if (this.state.iconWork === 'local_dining') return;

        let work = this.state.iconWork === 'play_arrow' ? 'pause' : 'play_arrow';

        let _textInfo = this.state.iconWork === 'play_arrow' ? 'Working' : 'Paused..';

        this.setState(
            () => ({ iconWork: work, textInfo: _textInfo }),
            () => this.updateHours('work')
        );
    }

    handleClickLunch() {
        let _lunch = this.state.iconLunch === 'fastfood' ? 'pause' : 'fastfood';

        let _work = this.state.iconWork === 'local_dining' ? 'play_arrow' : 'local_dining';

        let _textInfo = this.state.iconWork === 'local_dining' ? 'Paused' : 'Lunch Time';

        this.setState(
            () => ({ iconLunch: _lunch, iconWork: _work, textInfo: _textInfo }),
            () => this.updateHours('lunch')
        );
    }

    getClassBreath() {
        return this.state.iconWork === 'play_arrow' ? 'span-animate' : '';
    }

    showMessage() {
        return this.state.iconWork === 'play_arrow' ? 'Take time to breath, Follow the circle.' : '';
    }



    render() {
        return (
            <div className="default">

                <p>Hello {this.state.name}</p>

                <div className="icon">


                    <Icon className={this.getClassBreath()} onClick={this.handleClickWork} >
                        {this.state.iconWork}
                    </Icon>

                    <div className="lunch">

                        <Icon onClick={this.handleClickLunch}>
                            {this.state.iconLunch}
                        </Icon>

                    </div>

                </div>

                <h3>
                    {this.state.textInfo}
                </h3>
                <p>
                    <small>
                        {this.showMessage()}
                    </small>
                </p>
            </div>
        );
    }
}


export default ManagerHours;