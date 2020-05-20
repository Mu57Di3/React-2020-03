import React from "react";
import { Greeting } from "Components";

interface Props {
    name: string;
    email?: string;
}

const AutorizedMain: React.FC<Props> = ({ name }) => {
    return (
        <div className="row justify-content-center">
            <div className="col-6">
                <Greeting username={name} />
            </div>
        </div>
    );
};

export { AutorizedMain };
