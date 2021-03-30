import { Component, OnDestroy } from '@angular/core';
import { MediaChange, MediaObserver } from "@angular/flex-layout";
import { Subscription } from 'rxjs';
import { menu } from '../../interfaces/menu';
import { NavItem } from '../../interfaces/navItem';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {

    public opened: boolean = true;
    private mediaWatcher: Subscription;
    public menu: NavItem[] = menu;

    constructor(
        private media: MediaObserver
        ) {
        this.mediaWatcher = this.media.media$.subscribe((mediaChange: MediaChange) => {
            this.handleMediaChange(mediaChange);            
        })
    }

    private handleMediaChange(mediaChange: MediaChange) {
        if (this.media.isActive('lt-md')) {
            this.opened = false;
        } else {
            this.opened = true;
        }
    }

    ngOnDestroy() {
        this.mediaWatcher.unsubscribe();
    }
}