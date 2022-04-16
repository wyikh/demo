import React from "react";
import "./App.css";
import Counters from "./components/Counters";

function App() {
    return (
        <React.Fragment>
            <main className="container">
                <Counters />
            </main>
        </React.Fragment>
    );
}

export default App;
