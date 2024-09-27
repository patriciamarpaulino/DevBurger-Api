import * as Yup from "yup"
import Product from "../models/product";
import Category from "../models/category";
import User from "../models/user";

class ProductController {
    async store(request, response) {
        const schema = Yup.object({
            name: Yup.string().required(),
            price: Yup.number().required(),
            category_id: Yup.number().required(),
        });

        try {
            schema.validateSync(request.body, { abortEarly: false })
        } catch(err) {
            return response.status(400).json({ error: err.errors })
        }

        const { admin: isAdmin } = await User.findByPk(request.userId);

        if (!isAdmin) {
            return response.status(401).json();
        }

        const { filename: path } = request.file
        const { name, price, category_id } = request.body

        const product = await Product.create({
            name,
            price,
            category_id,
            path,
        })

        return response.status(201).json(product);
    }

    async index(request, response) {
        const products = await Product.findAll({
            include: [
                {
                    model: Category,
                    as: "category",
                    attributes: ["id", "name"],
                }
            ]
        });

        return response.json(products)
    }
}

export default new ProductController()