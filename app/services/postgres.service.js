// Implemetación de las librerias que se deseen

const pg = require('pg');

class PostgresService {
    constructor(){
        this.connectionString="postgresql://postgres:postgres@localhost:5432/universidad"
        this.pool=new pg.Pool(
            {connectionString:this.connectionString}
        );
    }

    async executeSql(sql){
        let result= await this.pool.query(sql);
        return result;
    }

    
}

module.exports=PostgresService;
