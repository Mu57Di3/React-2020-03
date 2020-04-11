import React from "react";

interface Prop {
    username: string;
}

const Greeting: React.FC<Prop> = ({ username }) => {
    return <span>Доброго времени суток, {username}</span>;
};

export default Greeting;
