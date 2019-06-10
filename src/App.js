import React, {Component} from 'react';
import './App.css';
import ScanContainer from "./ScanContainer";
import {SOFTCHALL} from './const';

class App extends Component {

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    {SOFTCHALL}
                </header>
                <ScanContainer />
            </div>
        );
    }
}

export default App;
