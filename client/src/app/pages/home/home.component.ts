import { Component, ViewEncapsulation, OnDestroy } from '@angular/core';
import { MediaChange, MediaObserver } from "@angular/flex-layout";
import { Subscription } from 'rxjs';
import { menu } from '../../interfaces/menu';
import { NavItem } from '../../interfaces/navItem';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
    // Need to remove view encapsulation so that the custom tooltip style defined in
    // `tooltip-custom-class-example.css` will not be scoped to this component's view.
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnDestroy {

    public userName: string;
    public opened: boolean = true;
    private mediaWatcher: Subscription;
    public menu: NavItem[] = menu;

    constructor(
        private media: MediaObserver,
        private _authService: AuthService,
        ) {
        this.mediaWatcher = this.media.media$.subscribe((mediaChange: MediaChange) => {
            this.handleMediaChange(mediaChange);            
        })
        this.getUserLogged();
    }

    private handleMediaChange(mediaChange: MediaChange) {
        if (this.media.isActive('lt-md')) {
            this.opened = false;
        } else {
            this.opened = true;
        }
    }

    // CHECK LOGIN STATE
    getUserLogged(){
        
        this._authService.authSubject.subscribe( state => {
            if (state.name) {
            this.userName = state.name;
            }
        });
    }
    logout() {
        this._authService.logout()
    }

    ngOnDestroy() {
        this.mediaWatcher.unsubscribe();
    }
}