import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ControlsService } from './services/controls.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  logged: boolean = false;
  userName: string = "";  

  constructor(
    private _authService: AuthService,
    private _controlsService: ControlsService,
  ){
    this.initializeApp();
  }

  initializeApp() {
    this._authService.authSubject.subscribe( state => {
      this.logged = state.logged;
      this.userName = state.name;
    }); 
  }

  toggleMenu() {
    this._controlsService.toggleSide();  
  }

  logout() {
    this._authService.logout();    
  }
}
