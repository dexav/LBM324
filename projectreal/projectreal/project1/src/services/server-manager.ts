import { GameServer, GameType, ServerStatus, ServerConfig } from '../types/index.js';
import { DockerService } from './docker-service.js';
import { logger } from '../utils/logger.js';
import { generateId } from '../utils/helpers.js';

export class ServerManager {
  private servers: Map<string, GameServer>;
  private dockerService: DockerService;

  constructor() {
    this.servers = new Map();
    this.dockerService = new DockerService();
  }

  async createServer(config: ServerConfig): Promise<GameServer> {
    const serverId = generateId();
    
    const server: GameServer = {
      id: serverId,
      type: config.type,
      status: ServerStatus.STARTING,
      maxPlayers: config.maxPlayers,
      currentPlayers: 0,
      port: config.port
    };

    try {
      const containerId = await this.dockerService.createGameServer(config);
      server.containerId = containerId;
      server.status = ServerStatus.RUNNING;
      
      this.servers.set(serverId, server);
      logger.info(`Created new ${config.type} server with ID ${serverId}`);
      
      return server;
    } catch (error) {
      server.status = ServerStatus.ERROR;
      logger.error(`Failed to create server ${serverId}:`, error);
      throw error;
    }
  }

  async stopServer(serverId: string): Promise<void> {
    const server = this.servers.get(serverId);
    if (!server) {
      throw new Error(`Server ${serverId} not found`);
    }

    if (server.containerId) {
      try {
        server.status = ServerStatus.STOPPING;
        await this.dockerService.stopContainer(server.containerId);
        server.status = ServerStatus.STOPPED;
        this.servers.delete(serverId);
        logger.info(`Stopped server ${serverId}`);
      } catch (error) {
        server.status = ServerStatus.ERROR;
        logger.error(`Failed to stop server ${serverId}:`, error);
        throw error;
      }
    }
  }

  getServer(serverId: string): GameServer | undefined {
    return this.servers.get(serverId);
  }

  getAllServers(): GameServer[] {
    return Array.from(this.servers.values());
  }

  updatePlayerCount(serverId: string, playerCount: number): void {
    const server = this.servers.get(serverId);
    if (server) {
      server.currentPlayers = playerCount;
      logger.info(`Updated player count for server ${serverId}: ${playerCount}`);
    }
  }
}