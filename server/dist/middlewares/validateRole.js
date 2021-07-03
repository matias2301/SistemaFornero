"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasRole = exports.isAdminRole = void 0;
exports.isAdminRole = (req, res, next) => {
    const { user } = req.body;
    if (!user) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    }
    const { role, name } = user;
    if (role !== 'admin') {
        return res.status(401).json({
            msg: `User ${name} no es administrador - Acceso no permitido`
        });
    }
    next();
};
exports.hasRole = (...roles) => {
    return (req, res, next) => {
        const { user } = req.body;
        const { role } = user;
        if (!user) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }
        if (!roles.includes(role)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            });
        }
        next();
    };
};
//# sourceMappingURL=validateRole.js.map