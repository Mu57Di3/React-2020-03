import { createInterface } from "readline";
import { actor } from "./calculator";

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

const main = (): Promise<null> => {
    return new Promise((resolve) => {
        rl.question("> ", (query: string) => {
            const result: number = actor(query);

            if (result) {
                console.log(`Result: ${result}`);
            }
            resolve();
        });
    });
};

async function app(): Promise<null> {
    while (true) {
        await main();
    }
}

app();
