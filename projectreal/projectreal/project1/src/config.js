export const config = {
    port: process.env.PORT || 3000,
    database: {
        connectionString: process.env.DATABASE_URL || "postgresql://benutzer:passwort@localhost:5432/lb324"
    },
    dockerImages: {
        minecraft: 'itzg/minecraft-server',
        cs: 'cm2network/csgo'
    }
};
