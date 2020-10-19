import React from 'react';
import './manager-hours.scss';
import Icon from '@material-ui/core/Icon';

class ManagerHours extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isToggleOn: true, iconPause: 'pause' };
        this.handleClick = this.handleClick.bind(this);
        this.showLunch = this.showLunch.bind(this);
    }

    handleClick() {
        this.setState(state => ({ isToggleOn: !state.isToggleOn }));
    }

    getIconStatus() {
        return this.state.isToggleOn ? 'play_arrow' : this.state.iconPause;
    }

    getIconLunch() {
        return this.state.iconPause === 'fastfood' ? 'pause' : 'fastfood';
    }

    showLunch() {
        this.setState((state) => ({ iconPause: this.state.iconPause === 'fastfood' ? 'pause' : 'fastfood' }))
    }

    render() {
        return (
            <div>

                <div className="icon">

                    <Icon onClick={this.handleClick} >
                        {this.getIconStatus()}
                    </Icon>

                    <div className="food">

                        <Icon onClick={this.showLunch}>
                            {this.getIconLunch()}
                        </Icon>

                    </div>

                </div>

                <h1>  Ola cheguei </h1>
            </div>
        );
    }
}


export default ManagerHours;