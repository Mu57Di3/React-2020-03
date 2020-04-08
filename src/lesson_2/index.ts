import { createInterface } from "readline";
import { actor, polishActor } from "./calculator";

const isPolish = process.argv.pop() === "-polish";
console.log(`Сприпт запущен ${isPolish ? "с поддержкой" : "без поддержки"} польской нотации.`);

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

const main = (): Promise<null> => {
    return new Promise((resolve) => {
        rl.question("> ", (query: string) => {
            5;
            const result: number = isPolish ? polishActor(query) : actor(query);

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
