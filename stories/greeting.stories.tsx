import React from "react";
import { withKnobs, text } from "@storybook/addon-knobs";
import Greeting from "../src/components/greeting";

export default {
    title: "Greeting component",
    decorators: [withKnobs],
};

export const greet: React.FC<{}> = () => {
    const name = text("User name", "Bender");
    return <Greeting username={name} />;
};
