"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProduct = exports.getProducts = void 0;
const Products_1 = __importDefault(require("../models/Products"));
exports.getProducts = async (req, res) => {
    const products = await Products_1.default.findAll();
    res.json({ products });
};
exports.getProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Products_1.default.findByPk(id);
    if (product) {
        res.json(product);
    }
    else {
        res.status(404).json({
            msg: `No existe un producto con el id ${id}`
        });
    }
};
exports.createProduct = async (req, res) => {
    const { body } = req;
    const product = new Products_1.default(body);
    product.save()
        .then(() => {
        res.json({
            success: true,
            msg: 'producto creado con exito',
            product
        });
    })
        .catch((err) => console.log(err));
};
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const product = await Products_1.default.findByPk(id);
        if (!product) {
            return res.status(404).json({
                msg: 'No existe un producto con el id ' + id
            });
        }
        await product.update(body);
        res.json(product);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Something went wrong'
        });
    }
};
exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Products_1.default.findByPk(id);
    if (!product) {
        return res.status(404).json({
            msg: 'No existe un producto con el id ' + id
        });
    }
    // await product.update({ state: false });
    // res.json(product);
    await product.destroy();
    res.json({
        success: true,
        msg: "product borrado con exito"
    });
};
//# sourceMappingURL=productController.js.map