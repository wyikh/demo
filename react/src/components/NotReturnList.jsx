import React, { Component } from "react";
import "./PopupMsg.css";

class NotReturnList extends Component {
    render() {
        return (
            <div>
                <button onClick={() => this.props.onShowNameList()} className="btn btn-secondary btn-sm m-2">
                    X
                </button>
                <table>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Date</td>
                            <td>Time</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.NameLists
                            ? this.props.NameLists.map((NameList) => (
                                  <tr key={this.props.NameLists.indexOf(NameList)}>
                                      <td> {NameList.name ? NameList.name : null}</td>
                                      <td> {NameList.date ? NameList.date : null}</td>
                                      <td> {NameList.time ? NameList.time : null}</td>
                                  </tr>
                              ))
                            : null}
                    </tbody>
                </table>
            </div>
        );
    }
}
export default NotReturnList;
