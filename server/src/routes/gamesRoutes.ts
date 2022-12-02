import {Router} from "express";
import gamesController from "../controllers/gamesController";


class GamesRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    private config() {
        this.router.get('/', gamesController.list);
        this.router.get('/game/:id', gamesController.getOne);
        this.router.post('/', gamesController.create);
        this.router.put('/:id', gamesController.update)
        this.router.delete('/:id', gamesController.delete)
    }
}

const gamesRoutes = new GamesRoutes();
export default gamesRoutes.router;
