import React from "react";

const EmptyScreen: React.FC<{}> = () => {
    return (
        <div className="row justify-content-center">
            <div className="col-6">
                <div className="alert alert-primary" role="alert">
                    Что-то пошло не так.
                </div>
            </div>
        </div>
    );
};

export { EmptyScreen };
