import { Db, MongoClient as Mongodb } from "mongodb";
const { MongoClient } = require('mongodb');
require('dotenv').config();

class dbConnection {
    private connectionString: string;
    private objClient: any;
    private db: any;

    constructor() {
        this.connectionString = `mongodb://${process.env.USER_NAME}:${process.env.PASSWORD}@${process.env.DATABASE_SERVER_IP}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;
        this.objClient = null;
        this.db = null;
    }

    GetDb(): Db {
        if (!this.db) {
            throw new Error("Connection to database is not valid. Please connect to database.")
        }

        return this.db;
    }

    async Connection(): Promise<Db> {
        if (!this.db) {
            try {
                this.objClient = new MongoClient(this.connectionString);
                await this.objClient.connect();
                this.db = this.objClient.db();
                console.log("Connection to database is success.")
            }
            catch (ex: unknown) {
                console.log(`Database connection is failly. ${ex}`);
            }
        }

        return this.db;
    }

    async Disconnect(): Promise<void> {
        if (this.db) {
            await this.objClient.close();
            this.db = <Db>{};
            console.log("Connection to database is close.")
        }
    }
}

const objDbConection: dbConnection = new dbConnection();

export default objDbConection;