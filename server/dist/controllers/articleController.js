"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteArticle = exports.updateArticle = exports.createArticle = exports.getArticle = exports.getArticles = void 0;
const Articles_1 = __importDefault(require("../models/Articles"));
const Providers_1 = __importDefault(require("../models/Providers"));
exports.getArticles = async (req, res) => {
    const articles = await Articles_1.default.findAll({
        include: [
            {
                model: Providers_1.default,
            }
        ]
    });
    res.json({ articles });
};
exports.getArticle = async (req, res) => {
    const { id } = req.params;
    const article = await Articles_1.default.findByPk(id);
    if (article) {
        res.json(article);
    }
    else {
        res.status(404).json({
            msg: `No existe un articulo con el id ${id}`
        });
    }
};
exports.createArticle = async (req, res) => {
    const { code, description, price, stock, poo, providers } = req.body;
    const article = new Articles_1.default({
        code,
        description,
        price,
        stock,
        poo
    });
    article.save()
        .then((article) => {
        if (providers.length > 0) {
            providers.map((provider) => {
                Providers_1.default.findByPk(provider).then(prov => {
                    article.addProvider(prov);
                });
            });
        }
        res.json({
            success: true,
            msg: 'articulo creado con exito',
            article
        });
    })
        .catch((err) => console.log(err));
};
exports.updateArticle = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const article = await Articles_1.default.findByPk(id);
        if (!article) {
            return res.status(404).json({
                msg: 'No existe un articulo con el id ' + id
            });
        }
        await article.update(body);
        res.json(article);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Something went wrong'
        });
    }
};
exports.deleteArticle = async (req, res) => {
    const { id } = req.params;
    const article = await Articles_1.default.findByPk(id);
    if (!article) {
        return res.status(404).json({
            msg: 'No existe un articulo con el id ' + id
        });
    }
    // await article.update({ state: false });
    // res.json(article);
    await article.destroy();
    res.json({
        success: true,
        msg: "article borrado con exito"
    });
};
//# sourceMappingURL=articleController.js.map