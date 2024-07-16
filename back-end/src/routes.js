import { Router } from "express"
import { v4 } from "uuid"
import User from "./app/models/user"

const routes = new Router()

routes.get("/", async (request, response) => {
    const user = await User.create({
        id: v4(),
        name: "Raphael",
        email: "raphael@email.com",
        password_hash: "1gFv5yneef6DD3d",
    })

    return response.status(201).json(user)
})

module.exports = routes