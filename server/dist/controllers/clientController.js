"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClient = exports.updateClient = exports.createClient = exports.getClient = exports.getClients = void 0;
const Clients_1 = __importDefault(require("../models/Clients"));
exports.getClients = async (req, res) => {
    const clients = await Clients_1.default.findAll();
    res.json({ clients });
};
exports.getClient = async (req, res) => {
    const { id } = req.params;
    const client = await Clients_1.default.findByPk(id);
    if (client) {
        res.json(client);
    }
    else {
        res.status(404).json({
            msg: `No existe un cliente con el id ${id}`
        });
    }
};
exports.createClient = async (req, res) => {
    const { body } = req;
    const client = new Clients_1.default(body);
    client.save()
        .then(() => {
        res.json({
            success: true,
            msg: 'cliente creado con exito',
            client
        });
    })
        .catch((err) => console.log(err));
};
exports.updateClient = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const client = await Clients_1.default.findByPk(id);
        if (!client) {
            return res.status(404).json({
                msg: 'No existe un cliente con el id ' + id
            });
        }
        await client.update(body);
        res.json(client);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Something went wrong'
        });
    }
};
exports.deleteClient = async (req, res) => {
    const { id } = req.params;
    const client = await Clients_1.default.findByPk(id);
    if (!client) {
        return res.status(404).json({
            msg: 'No existe un cliente con el id ' + id
        });
    }
    // await client.update({ state: false });
    // res.json(client);
    await client.destroy();
    res.json({
        success: true,
        msg: "client borrado con exito"
    });
};
//# sourceMappingURL=clientController.js.map