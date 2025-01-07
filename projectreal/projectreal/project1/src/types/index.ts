export interface GameServer {
  id: string;
  type: GameType;
  status: ServerStatus;
  maxPlayers: number;
  currentPlayers: number;
  containerId?: string;
  port: number;
}

export enum GameType {
  MINECRAFT = 'minecraft',
  COUNTER_STRIKE = 'cs'
}

export enum ServerStatus {
  STARTING = 'starting',
  RUNNING = 'running',
  STOPPING = 'stopping',
  STOPPED = 'stopped',
  ERROR = 'error'
}

export interface ServerConfig {
  type: GameType;
  maxPlayers: number;
  port: number;
}