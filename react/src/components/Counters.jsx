import React, { Component } from "react";
import Counter from "./Counter";
import PopupMsg from "./PopupMsg";
import ReturnMsg from "./ReturnMsg";
import NotReturnList from "./NotReturnList";

let NameLists = [];

class Counters extends Component {
    state = {
        counters: { value: 10 },
        TakePopup: { value: false, err: 2 },
        ReturnPopup: { value: false, err: 2 },
        NameListPopup: { value: false },
    };

    handleTakePopUp = () => {
        let TakePopup = this.state.TakePopup;
        if (TakePopup.value === true) {
            TakePopup.value = false;
        } else {
            TakePopup.value = true;
        }
        this.setState({ TakePopup });
        this.setState({ ReturnPopup: { value: false } });
        this.setState({ NameListPopup: { value: false } });
    };

    handleReturnPopUp = () => {
        let ReturnPopup = this.state.ReturnPopup;
        if (ReturnPopup.value === true) {
            ReturnPopup.value = false;
        } else {
            ReturnPopup.value = true;
        }
        this.setState({ ReturnPopup });
        this.setState({ TakePopup: { value: false } });
        this.setState({ NameListPopup: { value: false } });
    };

    handleShowName = () => {
        let NameListPopup = this.state.NameListPopup;
        if (NameListPopup.value === true) {
            NameListPopup.value = false;
        } else {
            NameListPopup.value = true;
        }
        this.setState({ NameListPopup });
        this.setState({ TakePopup: { value: false } });
        this.setState({ ReturnPopup: { value: false } });
    };

    handleIncrement = (e) => {
        let counters = this.state.counters;
        let beforcount = NameLists.length;
        NameLists = NameLists.filter((NameList) => NameList.name !== e);
        let aftercount = NameLists.length;
        if (beforcount !== aftercount) {
            counters.value++;
            this.setState({ counters });
            this.handleReturnPopUp();
            this.setState({ ReturnPopup: { err: 0 } });
        }
        this.setState({ ReturnPopup: { err: 2 } });
    };

    handleDecrement = (e) => {
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        let date = now.getDate();
        let hour = now.getHours();
        let minute = now.getMinutes();
        let name = this.state.Name;
        if (name)
            if (hour < 10) {
                hour = "0" + hour;
            }

        if (minute < 10) {
            minute = "0" + minute;
        }

        NameLists = [
            ...NameLists,
            {
                name: e,
                date: year + "/" + month + "/" + date,
                time: hour + ":" + minute,
            },
        ];
        let counters = this.state.counters;
        if (counters.value > 0) {
            counters.value--;
            this.setState({ counters });
            this.handleTakePopUp();
        }
    };

    render() {
        return (
            <div>
                <Counter counter={this.state.counters} onReturnPopup={this.handleReturnPopUp} onTakePopup={this.handleTakePopUp} onShowNameList={this.handleShowName} />
                {this.state.TakePopup.value && this.state.counters.value > 0 && <PopupMsg onDecrement={this.handleDecrement} onTakePopup={this.handleTakePopUp} />}
                {this.state.ReturnPopup.value && this.state.counters.value < 10 && <ReturnMsg onIncrement={this.handleIncrement} onReturnPopup={this.handleReturnPopUp} err={this.state.ReturnPopup.err} />}
                {this.state.NameListPopup.value && <NotReturnList NameLists={NameLists} onShowNameList={this.handleShowName} />}
            </div>
        );
    }
}
export default Counters;
