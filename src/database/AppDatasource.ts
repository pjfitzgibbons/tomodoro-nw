import "reflect-metadata"
import { DataSource } from "typeorm"
import { Task } from "./entities/Task"

const AppDataSource = new DataSource({
    type: "sqlite",
    database: process.env.DATABASE || "tomodoro.db",
    entities: [Task],
    synchronize: false, // dont lose your data!
    logging: true,
    migrations: ['./src/database/migrations/*']
})

// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))

export default AppDataSource