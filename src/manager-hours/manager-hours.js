import React from 'react';
import moment from 'moment';

import Icon from '@material-ui/core/Icon';
import Divider from "@material-ui/core/Divider";

import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';

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
            sumTotalSegWorking: '',
            sumTotalLunch: '',
            hours: [{
                start: '',
                end: '',
                kindBreak: '',
                total: ''
            }]
        };

        this.updateHours = this.updateHours.bind(this);
        this.requestUpdateHours = this.requestUpdateHours.bind(this);
        this.getDataFromUser = this.getDataFromUser.bind(this);

        this.onToggleTable = this.onToggleTable.bind(this);
        this.handleClickWork = this.handleClickWork.bind(this);
        this.handleClickLunch = this.handleClickLunch.bind(this);
        this.setTotalHoursInSeg = this.setTotalHoursInSeg.bind(this);
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

        let cyclesComplete = true;

        let notIsSameKindBreak = false;

        const lastHoursCycle = this.state.hours[this.state.hours.length - 1];

        if (lastHoursCycle) {
            cyclesComplete = (lastHoursCycle.start && lastHoursCycle.end);
            notIsSameKindBreak = (lastHoursCycle.kindBreak !== kindBreak);
        }

        if (cyclesComplete)
            this.createNewCycle(kindBreak);
        else if (notIsSameKindBreak) {
            this.setFillHoursStartOrEnd(lastHoursCycle, lastHoursCycle.kindBreak);
            this.createNewCycle(kindBreak);
            this.setTotalHoursInSeg(lastHoursCycle.kindBreak, this.state.sumTotalSegWorking);
        } else
            this.setFillHoursStartOrEnd(lastHoursCycle, kindBreak);

        let current = (kindBreak === 'work' ? this.state.sumTotalSegWorking: this.state.sumTotalLunch);
        
        this.setTotalHoursInSeg(kindBreak, current);

        this.requestUpdateHours();
    }

    createNewCycle(kindBreak) {
        this.state.hours.push({ start: '', end: '' });
        this.setFillHoursStartOrEnd(this.state.hours[this.state.hours.length - 1], kindBreak);
    }

    requestUpdateHours() {
        request.updateWorkTime(1, this.state)
            .then();
    }

    setFillHoursStartOrEnd(hour, kindBreak) {

        hour.kindBreak = kindBreak;

        var startedCycleButNotEnd = (hour.start && !hour.end);

        if (!hour.start) hour.start = new Date().toLocaleString();

        else if (startedCycleButNotEnd) {
            hour.end = new Date().toLocaleString();
            hour.total = moment(hour.end).diff(moment(hour.start), 'second')
        }
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

    onToggleTable() {
        this.setState((state) => ({ showTable: !state.showTable }));
    }

    setTotalHoursInSeg(kind, currentTotal) {
        let times = this.state.hours.filter(hr => hr.kindBreak === kind);

        if (times.length === 0) return;

        const sumTotalSeg = times.reduce((accumulator, time) => accumulator + time.total, 0);

        var formatted = moment.utc(sumTotalSeg * 1000).format('HH:mm:ss');

        formatted = formatted === 'Invalid date' ? currentTotal : formatted;

        if (kind === 'work')
            this.setState(() => ({ sumTotalSegWorking: formatted }));
        else
            this.setState(() => ({ sumTotalLunch: formatted }));

    }


    render() {
        return (
            <div>

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

                <Divider />

                <div className='info-hours'>

                    <ul>
                        <li>
                            Arrival : {this.state.hours[0]?.start || 0}
                        </li>

                        <li>
                            Last Exiting : {this.state.hours[this.state.hours.length - 1]?.end || 0}
                        </li>

                        <li>
                            Total Lunch Time: {this.state?.sumTotalLunch || 0}
                        </li>

                        <li>
                            Total Worked : {this.state?.sumTotalSegWorking || 0}
                        </li>
                    </ul>

                </div>

                <Divider />

                <p onClick={this.onToggleTable} className='cursor'>Show Hours</p>

                <TableContainer component={Paper} className={this.state.showTable ? 'table-style' : 'hidden'}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Type Break</TableCell>
                                <TableCell align="center">Start</TableCell>
                                <TableCell align="center">End</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.hours.map((row) => (
                                <TableRow key={row.start}>
                                    <TableCell align="left">{row.kindBreak}</TableCell>
                                    <TableCell align="right">{row.start}</TableCell>
                                    <TableCell align="right">{row.end}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
        );
    }
}


export default ManagerHours;