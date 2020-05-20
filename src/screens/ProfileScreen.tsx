import React from "react";
import { ToDoApp } from "@/containers/ToDoApp";

const ProfileScreen: React.FC<{}> = () => {
    return (
        <div className="row justify-content-center">
            <div className="col-6">
                <ToDoApp />
            </div>
        </div>
    );
};

export { ProfileScreen };
