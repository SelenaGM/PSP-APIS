import mysql from 'promise-mysql';
import keys from "./keys";


const pool = mysql.createPool(keys.database);

pool.then((r: any) => r.getConnection()
    .then((r: any) => {
        r.release();
        console.log('Database connected')
    }));

export default pool;
