export function generateId() {
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
}
export function validatePort(port) {
    return port >= 1024 && port <= 65535;
}
