import Docker from 'dockerode';
import { config } from '../config.js';

class DockerService {
    constructor() {
        this.docker = new Docker();
    }

    async createContainer(spielTyp, port) {
        const dockerImage = config.dockerImages[spielTyp];
        if (!dockerImage) {
            throw new Error('Ungültiger Spieltyp');
        }

        const container = await this.docker.createContainer({
            Image: dockerImage,
            ExposedPorts: {
                [`${port}/tcp`]: {}
            },
            HostConfig: {
                PortBindings: {
                    [`${port}/tcp`]: [{ HostPort: port.toString() }]
                }
            }
        });

        await container.start();
        return container.id;
    }

    async stopContainer(containerId) {
        const container = this.docker.getContainer(containerId);
        await container.stop();
        await container.remove();
    }
}

export const dockerService = new DockerService();