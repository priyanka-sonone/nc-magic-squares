import React from 'react';
import logo from '../assets/img/n1.svg';
import check from '../assets/img/check.svg';
import * as audio from './audio';

class Card extends React.Component {

    constructor(props) {
        super(props);
        this.state = {view: 'number', completed: false};
    }

    clickHandler(event) {
        if (this.state.view === 'number') {
             audio.play("flip");
            setTimeout(() => {
                if (this.state.view === "question") {
                     audio.play("tada");
                }
            }, 200);
            this.setState({view: 'question', flipping: true});
        } 
        // else if (this.state.view === 'question') {
        //     audio.stop("countdown");
        //     this.setState({view: 'answer'});
        // } 
        else {
            audio.play("flipBack");
            this.setState({view: 'number', completed: true, flipping: true});
        }
    }

    getLabelBack() {
        return {__html: this.state.view === 'question' ? this.props.question.question : this.props.question.answer};
    }

    transitionEndHandler(event) {
        if (event.propertyName === 'width') {
            this.setState({flipping: false});
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

        if (this.state.view !== 'number') {
            className = className + ' flipped';
        }
        if (this.state.flipping) {
            className = className + ' flipping';
            console.log("style",style)
        }

        return (
            <div style={style} className={className} onClick={this.clickHandler.bind(this)} onTransitionEnd={this.transitionEndHandler.bind(this)}>
                <div className='card'>
                    <div className='front'>
                        {front}
                    </div>
                    <div className='back'>
                        <span dangerouslySetInnerHTML={this.getLabelBack()}/>
                        <img src={logo } alt='React logo' />
                    </div>
                </div>
            </div>
        );
    }

};

export default Card;