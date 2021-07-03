"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const Users_1 = __importDefault(require("../models/Users"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.getUsers = async (req, res) => {
    const users = await Users_1.default.findAll();
    res.json({ users });
};
exports.getUser = async (req, res) => {
    const { id } = req.params;
    const user = await Users_1.default.findByPk(id);
    if (user) {
        res.json(user);
    }
    else {
        res.status(404).json({
            msg: `No existe un user con el id ${id}`
        });
    }
};
exports.createUser = async (req, res) => {
    const { body } = req;
    const salt = bcryptjs_1.default.genSaltSync();
    bcryptjs_1.default.hash(body.password, salt)
        .then(hashedPass => {
        const user = new Users_1.default({
            name: body.name,
            email: body.email,
            password: hashedPass
        });
        user.save()
            .then(() => {
            res.json({
                success: true,
                msg: 'User created successfully',
                user
            });
        })
            .catch((err) => console.log(err));
    });
};
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const user = await Users_1.default.findByPk(id);
        if (!user) {
            return res.status(404).json({
                msg: 'No existe un user con el id ' + id
            });
        }
        await user.update(body);
        res.json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Something went wrong'
        });
    }
};
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await Users_1.default.findByPk(id);
    if (!user) {
        return res.status(404).json({
            msg: 'No existe un user con el id ' + id
        });
    }
    await user.update({ state: "inactive" });
    res.json(user);
    // await user.destroy();
    // res.json({
    //     success: true,
    //     msg: "user borrado con exito"
    // });
};
//# sourceMappingURL=userController.js.map