import express from "express"
import routes from "./routes"
import "./database"
import { resolve } from "node:path"

class App {
    constructor() {
        this.app = express();

        this.middewares();
        this.routes();
    }

    middewares() {
        this.app.use(express.json());
        this.app.use("/product-file", express.static(resolve(__dirname, "..", "uploads")));
        this.app.use("/category-file", express.static(resolve(__dirname, "..", "uploads")));
    }

    routes() {
        this.app.use(routes)
    }
}

module.exports = new App().app