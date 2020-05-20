import React from "react";

const LockScreen: React.FC<{}> = () => {
    return (
        <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export { LockScreen };
