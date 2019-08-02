import React from 'react';
import Button from './Button.js'
// import { ReactComponent as Logo } from './images/itunes/itunes.svg';

class Card extends React.Component {
    render() {
        const active = this.props.active;
        const z_index = ((parseInt(this.props.z_index, 10) + parseInt(this.props.time, 10)) % 4)
        const createClassName = `carousel__cell${active ? ' active' : ''}${z_index === 0 ? ' transparent' : ''}`
        return (

                <div className={createClassName} style={{zIndex: `${z_index}`}}>
                    <Button />
                    <div className="container">
                        <img className="hard-img" src={this.props.asset.image} alt="Error"/>
                        <p>You earned {this.props.asset.money}<br /> from {this.props.asset.user}</p>
                    </div>
                </div>

        )
    }
}

export default Card