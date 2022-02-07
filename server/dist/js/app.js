"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./routes/index"));
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
const privateKey = fs_1.default.readFileSync('./localhost-key.pem', 'utf8');
const certificate = fs_1.default.readFileSync('./localhost.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };
const app = express_1.default();
const PORT = process.env.PORT || 4000;
app.use(cors_1.default());
app.use(express_1.default.json());
app.use("/api", index_1.default);
const dbUri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose_1.default.set("useFindAndModify", false);
const httpServer = http_1.default.createServer(app);
const httpsServer = https_1.default.createServer(credentials, app);
mongoose_1.default.connect(dbUri, dbOptions).then(() => {
    // httpServer.listen(PORT, () =>
    //   console.log(`HTTP Server running on port: ${PORT}!`)
    // )
    httpsServer.listen(PORT, () => console.log(`HTTPS Server running on port: ${PORT}!`));
}).catch(error => {
    throw error;
});
