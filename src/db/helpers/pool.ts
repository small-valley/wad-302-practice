import { Pool, PoolConfig } from "pg";
import { DATABASE, DB_PORT, HOST, PASSWORD, USER } from "../../env";

const poolConfig: PoolConfig = {
    host: HOST,
    port: DB_PORT,
    database: DATABASE,
    user: USER,
    password: PASSWORD,
};
export const pool = new Pool(poolConfig);
