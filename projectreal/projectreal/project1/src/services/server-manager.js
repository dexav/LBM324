class ServerManager {
    constructor() {
        this.gameServers = [];
    }

    addServer(spielTyp, port, containerId) {
        const server = {
            id: this.gameServers.length + 1,
            spielTyp,
            port,
            containerId
        };
        this.gameServers.push(server);
        return server;
    }

    getServer(id) {
        return this.gameServers.find(s => s.id === id);
    }

    removeServer(id) {
        this.gameServers = this.gameServers.filter(s => s.id !== id);
    }

    getAllServers() {
        return this.gameServers;
    }
}

export const serverManager = new ServerManager();