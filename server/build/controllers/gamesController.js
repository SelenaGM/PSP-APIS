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
const database_1 = __importDefault(require("../database"));
class GamesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const games = yield database_1.default
                    .then((r) => r.query('SELECT * FROM games'));
                res.json(games);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    //con esto creamos juegos en la base de datos
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.then((r) => r.query('INSERT INTO games set ?', [req.body]));
                res.json({ message: 'Juego guardado' });
            }
            catch (e) {
                console.log(e.sqlMessage);
                res.send(e.sqlMessage);
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const game = yield database_1.default.then((r) => r.query('SELECT * FROM games WHERE id = ?', [id]));
                if (game.length > 0) {
                    return res.json(game[0]);
                }
                res.status(404).json({ message: 'El juego no existe' });
            }
            catch (e) {
                console.log(e.sqlMessage);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield database_1.default.then((r) => r.query('UPDATE games SET ? WHERE id = ?', [req.body, id])
                    .then((data) => {
                    if (data.affectedRows > 0) {
                        res.json({ message: 'El juego se ha actualizado' });
                    }
                    else {
                        res.status(404).json({ message: 'El juego no existe' });
                    }
                }));
            }
            catch (e) {
                console.log(e.sqlMessage);
                res.send(e.sqlMessage);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield database_1.default.then((r) => r.query('DELETE FROM games WHERE id=?', [id])
                    .then((data) => {
                    if (data.affectedRows > 0) {
                        res.json({ message: 'El juego ha sido eliminado' });
                    }
                    else {
                        res.status(404).json({ message: 'El juego no existe' });
                    }
                }));
            }
            catch (e) {
                console.log(e.sqlMessage);
                res.send(e.sqlMessage);
            }
        });
    }
}
const gamesController = new GamesController();
exports.default = gamesController;
