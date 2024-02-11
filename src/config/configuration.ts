import { EnvVariables } from "src/common/types";

export default (): EnvVariables => ({
    port: Number(process.env.APP_PORT) || 3000,
    IqAirBaseURL: process.env.IQAIR_BASE_URL || 'http://api.airvisual.com',
    IqAirApiKey: process.env.IQAIR_API_KEY,
    dbHost: process.env.DATABASE_HOST,
    dbName: process.env.DATABASE_NAME,
    dbPort: process.env.DATABASE_PORT,
});