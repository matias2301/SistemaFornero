"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteObservations = exports.createObservations = void 0;
const Observations_1 = __importDefault(require("../models/Observations"));
exports.createObservations = async (req, res) => {
    const { body } = req;
    const obs = new Observations_1.default(body);
    obs.save()
        .then(() => {
        res.json({
            success: true,
            msg: 'observation creada con exito',
            obs
        });
    })
        .catch((err) => console.log(err));
};
exports.deleteObservations = async (req, res) => {
    const { id } = req.params;
    const obs = await Observations_1.default.findByPk(id);
    if (!obs) {
        return res.status(404).json({
            msg: 'No existe un observation con el id ' + id
        });
    }
    // await obs.update({ state: false });
    // res.json(obs);
    await obs.destroy();
    res.json({
        success: true,
        msg: "observation borrado con exito"
    });
};
//# sourceMappingURL=observationController.js.map