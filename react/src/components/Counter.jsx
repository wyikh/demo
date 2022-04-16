import React, { Component } from "react";

class Counter extends Component {
    render() {
        return (
            <div>
                <h1>Cup Counter</h1>
                <span className={this.getBadgeClass()}>{this.formatCount()}</span>
                <br />
                <button onClick={() => this.props.onReturnPopup()} className="btn btn-secondary btn-sm m-2">
                    Return
                </button>
                <button onClick={() => this.props.onTakePopup()} className="btn btn-secondary btn-sm m-2">
                    Take
                </button>
                <button onClick={() => this.props.onShowNameList()} className="btn btn-secondary btn-sm m-2">
                    Show Name List
                </button>
            </div>
        );
    }

    getBadgeClass() {
        let classes = "btn m-2 btn-";
        classes += this.props.counter.value === 0 ? "danger" : "success";
        return classes;
    }

    formatCount() {
        const { value } = this.props.counter;
        return value === 0 ? "All cups have been taken" : value;
    }
}
export default Counter;
