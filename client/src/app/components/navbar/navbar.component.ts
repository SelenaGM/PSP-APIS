import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  myIndex: any;

  constructor(private router: Router) {

  }

  //para que actualice información, sería mandarlo a books y luego a games
  reload(){
    if(this.myIndex == 0){
      this.router.navigateByUrl(
        '/books', {skipLocationChange: true})
        .then(()=>{
          this.router.navigate(['/games'])
        })
    }
  }

}
