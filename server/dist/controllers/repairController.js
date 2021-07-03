"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRepair = exports.updateRepair = exports.createRepair = exports.getRepair = exports.getRepairs = void 0;
const Repairs_1 = __importDefault(require("../models/Repairs"));
const Clients_1 = __importDefault(require("../models/Clients"));
const Users_1 = __importDefault(require("../models/Users"));
const Articles_1 = __importDefault(require("../models/Articles"));
const Observations_1 = __importDefault(require("../models/Observations"));
exports.getRepairs = async (req, res) => {
    const repairs = await Repairs_1.default.findAll({
        include: [
            Clients_1.default,
            Observations_1.default,
            {
                model: Users_1.default,
                as: 'taken',
                attributes: ["name"],
            },
            {
                model: Users_1.default,
                as: 'assigned',
                attributes: ["name"],
            },
        ]
    });
    res.json({ repairs });
};
exports.getRepair = async (req, res) => {
    const { id } = req.params;
    const repair = await Repairs_1.default.findAll({
        where: {
            id
        },
        include: [
            Clients_1.default,
            Observations_1.default,
            Articles_1.default,
            {
                model: Users_1.default,
                as: 'taken',
                attributes: ["name"],
            },
            {
                model: Users_1.default,
                as: 'assigned',
                attributes: ["name"],
            },
        ]
    });
    if (repair.length > 0) {
        res.json(repair);
    }
    else {
        res.status(404).json({
            msg: `No existe una orden de reparacion con el id ${id}`
        });
    }
};
exports.createRepair = async (req, res) => {
    const { clientId, description, state, estDate, takenId, assignedId, articles, observations } = req.body;
    const repair = new Repairs_1.default({
        ClientId: clientId,
        description,
        estDate: estDate || '',
        state,
        assignedId,
        takenId,
    });
    repair.save()
        .then((repair) => {
        if (observations) {
            const obs = new Observations_1.default({
                description: observations,
                RepairId: repair.id
            });
            obs.save();
        }
        if (articles.length > 0) {
            articles.map((article) => {
                Articles_1.default.findByPk(article.id).then(art => {
                    if (art) {
                        repair.addArticle(art, { through: { amount: article.amount } });
                        let updatedArticle = {
                            code: article.code,
                            description: article.descrip,
                            price: art.price,
                            stock: (art.stock - article.amount),
                            poo: art.poo
                        };
                        art.update(updatedArticle);
                    }
                });
            });
        }
        res.json({
            success: true,
            msg: 'Orden de reparacion creada con exito',
            repair
        });
    })
        .catch((err) => console.log(err));
};
exports.updateRepair = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const repair = await Repairs_1.default.findOne({
            where: {
                id
            },
            include: [
                Articles_1.default,
            ]
        });
        if (!repair) {
            return res.status(404).json({
                msg: 'No existe una reparacion con el id ' + id
            });
        }
        await repair.update(body)
            .then((repair) => {
            if (body.observations) {
                const obs = new Observations_1.default({
                    description: body.observations,
                    RepairId: id
                });
                obs.save();
            }
            if (repair.Articles.length > 0 && body.articles.length > 0) {
                repair.Articles.map((article) => {
                    let remove = false;
                    body.articles.map((updArticle) => {
                        if (article.id === updArticle.id) {
                            remove = true;
                            let newStock = 0;
                            if (article.ArticlesRepairs.amount > updArticle.amount) {
                                newStock = article.stock + (updArticle.amount - article.ArticlesRepairs.amount);
                            }
                            else if (article.ArticlesRepairs.amount < updArticle.amount) {
                                newStock = article.stock - (updArticle.amount - article.ArticlesRepairs.amount);
                            }
                            if (article.ArticlesRepairs.amount != updArticle.amount) {
                                Articles_1.default.findByPk(updArticle.id).then(art => {
                                    if (art) {
                                        repair.addArticle(art, { through: { amount: updArticle.amount } });
                                        let updatedArticle = {
                                            code: updArticle.code,
                                            description: updArticle.descrip,
                                            price: art.price,
                                            stock: newStock,
                                            poo: art.poo
                                        };
                                        art.update(updatedArticle);
                                    }
                                });
                            }
                        }
                    });
                    if (!remove) {
                        repair.removeArticle(article);
                        let updatedArticle = {
                            code: article.code,
                            description: article.descrip,
                            price: article.price,
                            stock: (article.stock + article.ArticlesRepairs.amount),
                            poo: article.poo
                        };
                        article.update(updatedArticle);
                    }
                });
            }
            else if (repair.Articles.length > 0 && body.articles.length <= 0) {
                repair.Articles.map((article) => {
                    Articles_1.default.findByPk(article.id).then(art => {
                        if (art) {
                            repair.removeArticle(art);
                            let updatedArticle = {
                                code: article.code,
                                description: article.descrip,
                                price: art.price,
                                stock: art.stock + article.ArticlesRepairs.amount,
                                poo: art.poo
                            };
                            art.update(updatedArticle);
                        }
                    });
                });
            }
            else {
                body.articles.map((newArticle) => {
                    Articles_1.default.findByPk(newArticle.id).then(art => {
                        if (art) {
                            repair.addArticle(art, { through: { amount: newArticle.amount } });
                            let updatedArticle = {
                                code: newArticle.code,
                                description: newArticle.descrip,
                                price: art.price,
                                stock: art.stock - newArticle.amount,
                                poo: art.poo
                            };
                            art.update(updatedArticle);
                        }
                    });
                });
            }
            if (repair.Articles.length > 0 && body.articles.length > 0) {
                let newArticles = body.articles.filter((art) => {
                    let res = repair.Articles.find((match) => {
                        return art.id == match.id;
                    });
                    return res == undefined;
                });
                if (newArticles.length > 0) {
                    newArticles.map((newArticle) => {
                        Articles_1.default.findByPk(newArticle.id).then(art => {
                            if (art) {
                                repair.addArticle(art, { through: { amount: newArticle.amount } });
                                let updatedArticle = {
                                    code: newArticle.code,
                                    description: newArticle.descrip,
                                    price: art.price,
                                    stock: art.stock - newArticle.amount,
                                    poo: art.poo
                                };
                                art.update(updatedArticle);
                            }
                        });
                    });
                }
            }
            res.json(repair);
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Something went wrong'
        });
    }
};
exports.deleteRepair = async (req, res) => {
    const { id } = req.params;
    const repair = await Repairs_1.default.findByPk(id);
    if (!repair) {
        return res.status(404).json({
            msg: 'No existe una reparacion con el id ' + id
        });
    }
    // await repair.update({ state: false });
    // res.json(repair);
    await repair.destroy();
    res.json({
        success: true,
        msg: "reparacion borrada con exito"
    });
};
//# sourceMappingURL=repairController.js.map