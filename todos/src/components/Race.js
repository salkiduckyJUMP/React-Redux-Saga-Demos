import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionTypes from '../actions/ActionTypes';

class Race extends Component {

    render()  {
    
        return (

            <div className="Race">
                <h1>V1: {this.props.V1}</h1>
                <h1>V2: {this.props.V2}</h1>
                <h1>{this.props.msg}</h1>
                <button onClick={this.props.onStartRace}>Start Race</button>
                <button onClick={this.props.onResetRace}>Reset Race</button>
            </div>


        )
    }
}

const mapStateToProps = (state) => {
    return {

        V1: state.V1,
        V2: state.V2

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onStartRace: () => dispatch ({ type: actionTypes.START}),
        onResetRace: () => dispatch ({type: actionTypes.RESET})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Race);