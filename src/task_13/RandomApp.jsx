import React from "react";
import { ErrorWrapper } from "./ErrorWrapper";
import { Loader } from "./Loader";

const RandomApp = () => {
    return (
        <ErrorWrapper>
            <Loader />
        </ErrorWrapper>
    );
};

export { RandomApp };
