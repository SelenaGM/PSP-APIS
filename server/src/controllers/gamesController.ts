import {json, Request, Response} from "express";
import pool from "../database";


class GamesController {
    public async list(req: Request, res: Response) {
        try{
            const games = await pool
                .then((r: any) => r.query('SELECT * FROM games'));
            res.json(games);
        } catch (e){
            console.log(e);
        }
    }

    //con esto creamos juegos en la base de datos
    public async create(req: Request, res: Response) {
        try{
            await pool.then((r:any) => r.query(
                'INSERT INTO games set ?',[req.body]));
            res.json({message: 'Juego guardado'});
        }catch (e: any){
            console.log(e.sqlMessage);
            res.send(e.sqlMessage)
        }

    }

    public async getOne(req: Request, res:Response) {
        try{
            const {id} = req.params;
            const game = await pool.then((r: any) =>
                r.query('SELECT * FROM games WHERE id = ?', [id]))
            if(game.length > 0){
                return res.json(game[0])
            }
            res.status(404).json({message:'El juego no existe'})
        }catch (e : any){
            console.log(e.sqlMessage);
        }
    }

    public async update(req:Request, res:Response) {
        try{
            const{id} = req.params;
            await pool.then((r: any) => r.query(
                'UPDATE games SET ? WHERE id = ?',[req.body, id]
            )
                    .then((data: any)=>{
                        if (data.affectedRows>0){
                            res.json({message: 'El juego se ha actualizado'})
                        }else{
                            res.status(404).json({message: 'El juego no existe'})
                        }
                    })
            )
        }catch (e:any){
            console.log(e.sqlMessage)
            res.send(e.sqlMessage)
        }
    }

    public async delete(req: Request, res:Response) {
        try{
            const{id} = req.params;
            await pool.then((r:any) => r.query(
                'DELETE FROM games WHERE id=?', [id]
            )
                    .then((data:any) => {
                        if(data.affectedRows >0){
                            res.json({message: 'El juego ha sido eliminado'})
                        }else{
                            res.status(404).json({message: 'El juego no existe'})
                        }
                    })
            )
        }catch (e:any){
            console.log(e.sqlMessage)
            res.send(e.sqlMessage)
        }


    }
}

const gamesController = new GamesController();
export default gamesController;
