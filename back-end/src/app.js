import express from "express"
import routes from "./routes"
import "./database"

class App {
    constructor() {
        this.app = express()

        this.middewares();
        this.routes();
    }

    middewares() {
        this.app.use(express.json())
    }

    routes() {
        this.app.use(routes)
    }
}

module.exports = new App().app