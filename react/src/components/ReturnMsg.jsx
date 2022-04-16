import React, { Component } from "react";
import TextField from "@mui/material/TextField";
class ReturnMsg extends Component {
    state = {
        name: { value: null },
        errMsg: { value: 0 },
    };

    handleInput = (e) => {
        this.setState({ name: { value: e.target.value } });
    };

    handleValidation = () => {
        let name = this.state.name.value;

        if (name === null || name === "") {
            this.setState({ errMsg: { value: 1 } });
        } else {
            this.setState({ errMsg: { value: 0 } });
            this.props.onIncrement(name);
        }
    };
    render() {
        return (
            <div className="modalBackground">
                <div className="modalContainer">
                    <div className="titleCloseBtn">
                        <button onClick={() => this.props.onReturnPopup()}>X</button>
                    </div>
                    <div className="title">
                        <h3>Thanks for using! </h3>
                    </div>
                    <TextField required className="outlined-basic" label="Please enter your name" inputProps={{ style: { fontSize: 20, textAlign: "center" } }} onChange={(e) => this.handleInput(e)} />
                    {this.state.errMsg.value === 1 ? <div className="errMsg">This field is required!</div> : null}
                    {this.props.err === 2 ? <div className="errMsg">Please enter a correct name</div> : null}
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
export default ReturnMsg;
