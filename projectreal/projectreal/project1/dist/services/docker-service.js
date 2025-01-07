import Docker from 'dockerode';
import { GameType } from '../types/index.js';
import { logger } from '../utils/logger.js';
export class DockerService {
    docker;
    constructor() {
        this.docker = new Docker();
    }
    async createGameServer(config) {
        const containerConfig = this.getContainerConfig(config);
        try {
            const container = await this.docker.createContainer(containerConfig);
            await container.start();
            logger.info(`Started container for ${config.type}`);
            return container.id;
        }
        catch (error) {
            logger.error('Failed to create container:', error);
            throw error;
        }
    }
    getContainerConfig(config) {
        const baseConfig = {
            Image: this.getGameImage(config.type),
            ExposedPorts: {
                [`${config.port}/tcp`]: {}
            },
            HostConfig: {
                PortBindings: {
                    [`${config.port}/tcp`]: [{ HostPort: config.port.toString() }]
                }
            },
            Env: [
                `MAX_PLAYERS=${config.maxPlayers}`
            ]
        };
        return baseConfig;
    }
    getGameImage(type) {
        switch (type) {
            case GameType.MINECRAFT:
                return 'itzg/minecraft-server';
            case GameType.COUNTER_STRIKE:
                return 'cm2network/csgo';
            default:
                throw new Error(`Unsupported game type: ${type}`);
        }
    }
    async stopContainer(containerId) {
        try {
            const container = this.docker.getContainer(containerId);
            await container.stop();
            await container.remove();
            logger.info(`Stopped and removed container ${containerId}`);
        }
        catch (error) {
            logger.error(`Failed to stop container ${containerId}:`, error);
            throw error;
        }
    }
}
