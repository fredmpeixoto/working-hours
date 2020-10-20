import React from 'react';
import './manager-hours.scss';
import Icon from '@material-ui/core/Icon';

class ManagerHours extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isToggleOn: true, iconWork: 'play_arrow', iconLunch: 'fastfood', textInfo: '' };
        this.handleClickWork = this.handleClickWork.bind(this);
        this.handleClickLunch = this.handleClickLunch.bind(this);
    }

    handleClickWork() {
        if (this.state.iconWork === 'local_dining') return;

        let work = this.state.iconWork === 'play_arrow' ? 'pause' : 'play_arrow';

        let _textInfo = this.state.iconWork === 'play_arrow' ? 'Working' : 'Paused';

        this.setState(() => ({ iconWork: work, textInfo: _textInfo }));
    }

    handleClickLunch() {
        let _lunch = this.state.iconLunch === 'fastfood' ? 'pause' : 'fastfood';

        let _work = this.state.iconWork === 'local_dining' ? 'play_arrow' : 'local_dining';

        let _textInfo = this.state.iconWork === 'local_dining' ? 'Paused' : 'Lunch Time';

        this.setState(() => ({ iconLunch: _lunch, iconWork: _work, textInfo: _textInfo }));
    }



    render() {
        return (
            <div>

                <div className="icon">

                    <Icon onClick={this.handleClickWork} >
                        {this.state.iconWork}
                    </Icon>

                    <div className="lunch">

                        <Icon onClick={this.handleClickLunch}>
                            {this.state.iconLunch}
                        </Icon>

                    </div>

                </div>

                <h1>
                    {this.state.textInfo}
                </h1>
            </div>
        );
    }
}


export default ManagerHours;