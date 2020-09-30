"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
require("dotenv").config();
const express_graphql_1 = require("express-graphql");
const schema_1 = __importDefault(require("./schema/schema"));
const resolvers_1 = __importDefault(require("./controllers/resolvers"));
const register_login_1 = require("./controllers/register-login");
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const SECRET = process.env["JWT_SECRET"];
var app = express_1.default();
const addUser = async (req, res, next) => {
    let token = req.headers.authorization;
    const user = register_login_1.decodeToken(token);
    req.context = user;
    next();
};
mongoose_1.default
    .connect("mongodb+srv://Db-Admin:Db-Admin@decadev-space.r9psq.mongodb.net/week11db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
    .then(function dbConnect() {
    console.log("Connected to Database...");
})
    .catch(function dbConnectError(err) {
    console.error("Could not connect to database...", err);
});
app.use(morgan_1.default("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, "../", "public")));
app.use("/graphql", body_parser_1.default.json(), express_graphql_1.graphqlHTTP((req) => ({
    schema: schema_1.default,
    rootValue: resolvers_1.default,
    graphiql: true,
    context: req.context,
})));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(http_errors_1.default(404));
});
// error handler
app.use(function (err, req, res, _next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render("error");
});
exports.default = app;
//# sourceMappingURL=app.js.map