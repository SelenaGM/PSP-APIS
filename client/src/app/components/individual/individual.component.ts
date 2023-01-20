import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Game} from "../../models/game";
import {GameService} from "../../services/game.service";
import {NavbarComponent} from "../navbar/navbar.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormValidators} from "../../validators/form-validators";

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.css']
})
export class IndividualComponent {

  gameForm: FormGroup = this.formbuilder.group({
    title: ['', [Validators.minLength(2), Validators.maxLength(255), Validators.required, FormValidators.notOnlyWhiteSpace]],

    subtitle: ['', [Validators.minLength(2), Validators.maxLength(255), Validators.required,FormValidators.notOnlyWhiteSpace]],

    description: ['', [Validators.minLength(2), Validators.maxLength(255), Validators.required, FormValidators.notOnlyWhiteSpace]],

    image: ['', [Validators.minLength(2), Validators.maxLength(255), Validators.required,FormValidators.notOnlyWhiteSpace]],
    favorite: [false, [Validators.required]]
  })

  game: Game = {
    title: '',
    subtitle: '',
    description: '',
    image: '',
    favorite: false
  };


  constructor(private formbuilder: FormBuilder, private gameService:GameService, private myGame: NavbarComponent,
              private snackBar: MatSnackBar){}

  get title(): any{
    return this.gameForm.get('title');
  }

  get subtitle(): any{
    return this.gameForm.get('subtitle');
  }

  get description(): any{
    return this.gameForm.get('description');
  }

  get image(): any{
    return this.gameForm.get('image');
  }
  get favorite(): any{
    return this.gameForm.get('favorite');
  }


  addGame() {

    //los forms tienn la mania de que al darle enter lo envia, así si es válido no lo hará
    if(this.gameForm.invalid){
      this.gameForm.markAllAsTouched();
      return;
    }

    this.game=this.gameForm.value;
    this.gameService.addGame(this.game).subscribe(
      res=>{
        this.snackBar.open(res.message, 'Close', {duration: 2000})
      }
    );
    this.myGame.myIndex = 0;
  }
}
