import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Game} from "../../models/game";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {GameService} from "../../services/game.service";

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css']
})
export class EditGameComponent {

  gameForm: FormGroup = this.formBuilder.group({
    id: [''],
    title: ['', [Validators.minLength(2), Validators.maxLength(255),
      Validators.required]],

    subtitle: ['', [Validators.minLength(2),

      Validators.maxLength(255), Validators.required]],
    image: ['', [Validators.minLength(3), Validators.maxLength(255),
      Validators.required]],

    description: ['', [Validators.minLength(2),

      Validators.maxLength(255), Validators.required]],
    favorite: [false, [Validators.required]],
    created_at: ['']
  });
  game: Game = {
    title: '',
    subtitle: '',
    description: '',
    image: '',
    favorite: false
  };

  constructor(private formBuilder: FormBuilder,
              private gameService: GameService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    const userId = this.activatedRoute.snapshot.paramMap.get('id') as
      unknown as number;
    this.loadUser(userId);
  }

  editGame() {
    this.game = this.gameForm.value;
    delete this.game.created_at;
    this.gameService.updateGame(this.game).subscribe(
      res => this.snackBar.open(res.message, 'Close', {
        duration:

          2000
      }));
    this.router.navigateByUrl('/games');
  }

  private loadUser(userId: number) {
    this.gameService.getOneGame(userId).subscribe(
      res => {
        this.game = res;

        this.gameForm.setValue(this.game);
      }
    )
  }

// Métodos getter para acceder a los FormControls
  get title(): any {
    return this.gameForm.get('title');
  }

  get subtitle(): any {
    return this.gameForm.get('subtitle');
  }

  get description(): any {
    return this.gameForm.get('description');
  }

  get image(): any {
    return this.gameForm.get('image');


  }
}
