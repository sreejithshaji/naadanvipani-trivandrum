
// POSTGRES START
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'abcduser',
    host: 'postgres-runner',
    database: 'abcduser',
    password: 'abcdpsw',
    port: 5432,
})
// POSTGRES END


module.exports= {
    pool
}