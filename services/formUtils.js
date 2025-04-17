export function setInputAttributes(input, attrs) {
    for (const [key, value] of Object.entries(attrs)) {
        input[key] = value;
    }
}