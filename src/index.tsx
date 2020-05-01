import React from "react";
import { render } from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToDoApp } from "./containers/ToDoApp";
import { registerIcons } from "./tools";

registerIcons();

const App: React.FC<{}> = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-6">
                    <ToDoApp />
                </div>
            </div>
        </div>
    );
};

render(<App />, document.getElementById("root"));
