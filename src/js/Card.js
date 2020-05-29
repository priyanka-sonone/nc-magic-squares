import React, { Component } from 'react';
import logo from '../assets/img/NC_logo_white.png';
import check from '../assets/img/check.svg';
import * as audio from './audio';
import data from '../data';
import { red } from 'color-name';


class Card extends Component {

    constructor(props) {
        super(props);
        this.state = {view: 'number', completed: false};
    }

    clickHandler(event) {
        if (this.state.view === 'number') {
             audio.play("flip");
            setTimeout(() => {
                if (this.state.view === "question") {
                    if(this.props.question.type === "A"){
                        audio.play("tada");
                    }
                    else if(this.props.question.type === "B"){
                        audio.play("lost");
                    }      
                }
            }, 700);
            this.setState({view: 'question', flipping: true});
        } 
        else {
            audio.play("flipBack");
            this.setState({view: 'number', completed: true, flipping: true});
        }
    }

    getLabelBack() {
        // return {__html: this.state.view === 'question' ? this.props.question.question : null};
        console.log(JSON.stringify(this.props.question.icon));
        
    //    return {__html: <img src = {this.props.question.icon} alt=""/> + this.props.question.question}
    return {__html: this.props.question.question}       
    }

    transitionEndHandler(event) {
        if (event.propertyName === 'width') {
            this.setState({flipping: false});
            console.log("event.propertyName === 'width'",event.propertyName === 'width')
            console.log('event.propertyName',event.propertyName);
        }
    }

    render() {
        let style = {
                width: this.props.width + 'px',
                height: this.props.height + 'px',
                transform: 'translate3d(' + this.props.left + 'px,' +0+ 'px,0)',
                WebkitTransform: 'translate3d(' + this.props.left + 'px,' + this.props.top + 'px,0)'
            },
            front = this.state.completed ? <img src={check} alt='Check Mark'/> : <span className='number'>{this.props.question.number}</span>,
            className = 'flipper';
            let showImage;

        if (this.state.view !== 'number') {
            className = className + ' flipped';
        }
        if (this.state.flipping) {
            className = className + ' flipping';

        }
        if(this.props.question){
             showImage = <img src={this.props.question.icon} alt='Check Mark' height="150" width="300"/>
        }

        let frontStyle ={
            backgroundColor: this.props.question.color,
            border: '1px solid'+ this.props.question.color
        }

        return (
            <div style={style} className={className} onClick={this.clickHandler.bind(this)} onTransitionEnd={this.transitionEndHandler.bind(this)}>
                <div className='card'>
                    <div style={frontStyle} className='front'>
                        {front}
                    </div>
                    <div className='back'>
                        <p>{showImage}</p>
                        <span dangerouslySetInnerHTML={this.getLabelBack()}/>
                        <img src={logo } alt='Netcentric logo' />
                    </div>
                </div>
            </div>
        );
    }
};

export default Card;