import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import "./PopupMsg.css";

class PopupMsg extends Component {
    state = {
        name: { value: null },
        errMsg: { value: false },
    };

    handleInput = (e) => {
        this.setState({ name: { value: e.target.value } });
    };

    handleValidation = () => {
        let name = this.state.name.value;

        if (name === null || name === "") {
            this.setState({ errMsg: { value: true } });
        } else {
            this.setState({ errMsg: { value: false } });
            this.props.onDecrement(name);
        }
    };

    render() {
        return (
            <div className="modalBackground">
                <div className="modalContainer">
                    <div className="titleCloseBtn">
                        <button onClick={() => this.props.onTakePopup()}>X</button>
                    </div>
                    <div className="title">
                        <h3>Take a record here</h3>
                    </div>
                    <TextField required id="outlined-basic" label="Please enter your name" inputProps={{ style: { fontSize: 20, textAlign: "center" } }} onChange={(e) => this.handleInput(e)} />
                    {this.state.errMsg.value === false ? null : <div className="errMsg">This field is required!</div>}
                    <div className="footer">
                        <button onClick={() => this.handleValidation()} className="btn btn-secondary btn-sm m-2">
                            Continous
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
export default PopupMsg;
