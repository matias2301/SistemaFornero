import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  desktop: boolean = false;
  targetAlert: string;

  constructor () { }

    async alertModal(title: string, message: string, icon: any, eliminar: boolean) {      // por ahora sólo se usa para confirmar eliminación
      let confirm = '';
      
      await Swal.fire({
        title: title,
        text: message,        
        icon: icon,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },        
        heightAuto: false,
        width: 400,
        // timer: 5000,
        confirmButtonText: eliminar ? 'Eliminar' : 'Continuar',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
      }).then( data => confirm = data.value);

      return confirm;
    }

    async alertToast(message, icon) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        width: 600,
        customClass: {
          container: 'position-absolute'
        },        
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: icon,
        title: message
      })
    }
}
