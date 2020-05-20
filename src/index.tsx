import React from "react";
import { render } from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { registerIcons } from "./tools";
import { BrowserRouter as Router } from "react-router-dom";
import { App } from "@/App";
registerIcons();

render(
    <Router>
        <App />
    </Router>,
    document.getElementById("root")
);
