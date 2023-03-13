import { Component, OnInit } from '@angular/core';
import { Autorization } from '../Auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {


constructor(private aut:Autorization){}
  ngOnInit(): void {
    
  }

  log=this.aut.Login();

// Login(){
//   this.aut.Login();
//   alert('You has logIn Successfuly !');
//   this.log=true;
// }

LogOut(){
  this.aut.logOut();
  alert('You has logOut Successfuly !');
  this.log=false;
}


}
