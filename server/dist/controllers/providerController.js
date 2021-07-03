"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProvider = exports.updateProvider = exports.createProvider = exports.getProvider = exports.getProviders = void 0;
const Providers_1 = __importDefault(require("../models/Providers"));
exports.getProviders = async (req, res) => {
    const providers = await Providers_1.default.findAll();
    res.json({ providers });
};
exports.getProvider = async (req, res) => {
    const { id } = req.params;
    const provider = await Providers_1.default.findByPk(id);
    if (provider) {
        res.json(provider);
    }
    else {
        res.status(404).json({
            msg: `No existe un proveedor con el id ${id}`
        });
    }
};
exports.createProvider = async (req, res) => {
    const { body } = req;
    const provider = new Providers_1.default(body);
    provider.save()
        .then(() => {
        res.json({
            success: true,
            msg: 'proveedor creado con exito',
            provider
        });
    })
        .catch((err) => console.log(err));
};
exports.updateProvider = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const provider = await Providers_1.default.findByPk(id);
        if (!provider) {
            return res.status(404).json({
                msg: 'No existe un proveedor con el id ' + id
            });
        }
        await provider.update(body);
        res.json(provider);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Something went wrong'
        });
    }
};
exports.deleteProvider = async (req, res) => {
    const { id } = req.params;
    const provider = await Providers_1.default.findByPk(id);
    if (!provider) {
        return res.status(404).json({
            msg: 'No existe un proveedor con el id ' + id
        });
    }
    // await provider.update({ state: false });
    // res.json(provider);
    await provider.destroy();
    res.json({
        success: true,
        msg: "provider borrado con exito"
    });
};
//# sourceMappingURL=providerController.js.map