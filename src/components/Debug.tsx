import React from 'react';
import '../styles/App.css';
import{ Client_Subscribe, Client_On_Message} from "../api/mqtt";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Client_On_Message></Client_On_Message>
            </header>
        </div>
    );
}

export default App;
