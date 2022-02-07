"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.updateItem = exports.addItem = exports.getAllItems = exports.getItem = void 0;
const item_1 = __importDefault(require("../../models/item"));
const getAllItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield item_1.default.find();
        res.status(200).json({ items });
    }
    catch (error) {
        console.error(error);
        res.status(501);
    }
});
exports.getAllItems = getAllItems;
const getItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = yield item_1.default.findById(req.params.id);
        if (item === null) {
            res.status(404).json({});
        }
        else {
            res.status(200).json({ item: item });
        }
    }
    catch (error) {
        console.error(error);
        res.status(501);
    }
});
exports.getItem = getItem;
const addItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const item = new item_1.default({
            _id: req.params.id,
            description: body.description,
            price: body.price
        });
        try {
            const newItem = yield item.save();
            res.status(200).json({ newItem });
        }
        catch (mongoError) {
            console.error(mongoError);
            res.status(501);
        }
    }
    catch (error) {
        console.error(error);
        res.status(401);
    }
});
exports.addItem = addItem;
const updateItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const item = {
            price: req.body.price,
            description: req.body.description,
            _id: id
        };
        let updateItem = yield item_1.default.findByIdAndUpdate({ _id: id }, item, { new: true });
        if (updateItem === null) {
            const itemDocument = new item_1.default(item);
            updateItem = yield itemDocument.save();
        }
        res.status(200).json({
            item: updateItem
        });
    }
    catch (error) {
        console.error(error);
        res.status(401);
    }
});
exports.updateItem = updateItem;
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedItem = yield item_1.default.findByIdAndRemove(req.params.id);
        if (deletedItem) {
            res.status(200).json({
                item: deletedItem
            });
        }
        else {
            res.status(404);
        }
    }
    catch (error) {
        console.error(error);
        res.status(501);
    }
});
exports.deleteItem = deleteItem;
