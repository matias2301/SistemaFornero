import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControlsService {

  sideState = new BehaviorSubject(false);

  constructor() { }

  toggleSide() {
    if(this.sideState.value){
      this.sideState.next(false)
    } else {
      this.sideState.next(true)
    }
  }

}
