import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Game} from "../models/game";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  /*CONECTAR CON LA API */
  API_URI= 'http://localhost:3000/api/games';
  constructor(private http: HttpClient) {
    //Importar HttpClientModule en app.module.ts

  }
  //la funcion que nos devolverá el resultado (en forma de array)
  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.API_URI);
  }
  //le damos un id y nos devolverá un game
  getOneGame(id: number): Observable<Game>{
    return this.http.get<Game>(this.API_URI+'/game/'+id);
  }

  //le mandamos el objeto juego y nos devolverá un mensaje
  addGame(game:Game):Observable<any>{
    return this.http.post(this.API_URI, game);
  }

  //le mandamos el juego del que sacaremos la id para actualizar
  updateGame(game: Game): Observable<any>{
    return this.http.put<any>(this.API_URI+'/'+game.id,game);
  }

  deleteGame(id: number | undefined): Observable<any>{
    //ANOTACION JAVASCRIPT
    //return this.http.delete(`${this.API_URI}/${id}`);
    return this.http.delete(this.API_URI+'/'+id);
  }





}
