export const config = {
    port: process.env.PORT || 3000,
    dockerImages: {
        minecraft: 'itzg/minecraft-server',
        cs: 'cm2network/csgo'
    }
};