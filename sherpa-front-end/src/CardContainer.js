import React from 'react';
import Card from './Card.js'

class CardContainer extends React.Component {
    state = {
        pointer: 0,
        time: 0
    };

    incrementPointer() {
        this.setState(state => ({
            pointer: (state.pointer + 1) % 4,
        }));
    }

    incrementZIndex() {
        this.setState(state => ({
            time: state.time + 1
        }));
    }

    componentDidMount() {
        setInterval(() => this.incrementPointer(), 1600);
        setTimeout(setInterval(() => this.incrementZIndex(), 1600), 1600)
    }

    render() {
        const assets = this.props.assets;
        const cards = assets.map((asset, index) => {
            const z_index = (3 - index);
            return <Card asset={asset} active={index === this.state.pointer} z_index={z_index} time={this.state.time} key={index}/>
        })

        return (
            <div className="s3-carousel">{cards}</div>
        )
    }
}

export default CardContainer