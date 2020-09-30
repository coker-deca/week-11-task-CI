"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
function authenticate(context) {
    if (!context.data) {
        throw new Error("You need to login to get start");
    }
    return;
}
exports.authenticate = authenticate;
//# sourceMappingURL=auth-middleware.js.map