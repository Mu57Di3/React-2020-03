import React from "react";
import { render } from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import ToDoApp from "./containers/ToDoApp";

library.add(fab, far, fas);

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
