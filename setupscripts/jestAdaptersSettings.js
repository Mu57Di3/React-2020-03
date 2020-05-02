import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";

configure({ adapter: new Adapter() });

const doc = new JSDOM(fs.readFileSync(path.resolve(__dirname, "../public/index.html")));
const { window } = doc;

function copyProps(src, target) {
    Object.defineProperties(target, {
        ...Object.getOwnPropertyDescriptors(src),
        ...Object.getOwnPropertyDescriptors(target),
    });
}

global.window = window;
global.document = window.document;
global.navigator = {
    userAgent: "node.js",
};
global.requestAnimationFrame = function (callback) {
    return setTimeout(callback, 0);
};
global.cancelAnimationFrame = function (id) {
    clearTimeout(id);
};
copyProps(window, global);
