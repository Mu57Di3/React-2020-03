const loadNumbers = async (count, min, max) => {
    const query = {
        jsonrpc: "2.0",
        method: "generateIntegers",
        params: {
            apiKey: "41c6f41b-f85f-4c36-a0b7-bb37008c347e",
            n: count,
            min: min,
            max: max,
        },
        id: 42,
    };

    const response = await fetch("https://api.random.org/json-rpc/2/invoke", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(query),
    });
    const data = await response.json();

    return data.result.random.data;
};

export { loadNumbers };
