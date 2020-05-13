import React from 'react';
import data from '../data';

class Headers extends React.Component {

    render() {

        // let style = {
        //         width: this.props.headerWidth
        //     },
        //     headers = [];

        // this.props.data.forEach((title, index) => headers.push(<span className='header' style={style} key={index}>{title.title}</span>));

        return (
            <div className='headers'>
                Netcentric Fun Quiz
            </div>
        );
    }

};

export default Headers;
