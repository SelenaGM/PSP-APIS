import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NavbarComponent} from "./components/navbar/navbar.component";
import {EditGameComponent} from "./components/edit-game/edit-game.component";
import {BooksComponent} from "./components/books/books.component";

const routes: Routes = [
  {
    path: '',
    redirectTo:'games',
    pathMatch:'full'
  },
  {
    path:'games',
    component: NavbarComponent
  },
  {
    path:'games/edit/:id',
    component: EditGameComponent
  },
  {
    path:'books',
    component: BooksComponent
  },
  {
    path:'**',
    redirectTo:'games',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
