import { FormGroup } from '@angular/forms';

export class PasswordValidator {

  // Inspired on: http://plnkr.co/edit/Zcbg2T3tOxYmhxs7vaAm?p=preview
  static confirmPass(formGroup: FormGroup, password: string) {        
     
    if( password !== formGroup.value.confirmPass ) {      
       
      formGroup.controls.confirmPass.setErrors({ error: true });
       return {        
       error: true
      }
    } else {   

      formGroup.controls.confirmPass.setErrors(null);
       return {
        error: false
      }
    }
  }
}