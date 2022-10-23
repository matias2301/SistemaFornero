import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { CountriesService } from '../../../services/countries.service';
import { JSONLoaderHelper } from '../../../services/getJson.service';
import { ManageDataService } from '../../../services/manage-data.service';
import { AlertsService } from '../../../services/alerts.service';
import { AuthService } from '../../../services/auth.service';

import { Client } from '../../../interfaces/client.interface';

@Component({
  selector: 'app-manage-clients',
  templateUrl: './manage-clients.component.html',
  styleUrls: ['./manage-clients.component.css']
})
export class ManageClientsComponent implements OnInit {

  clientForm: FormGroup;
  client: any;
  countries: any[] = [];
  states: any;
  cities: any;
  edit: boolean = false;
  checkValue: boolean = false;
  public disabled: boolean = false;
  public role = '';

  constructor(
    public formBuilder: FormBuilder,
    private _countriesService: CountriesService,
    private _JSONLoaderHelper: JSONLoaderHelper,
    private _manageDataService: ManageDataService,
    private _alertsService: AlertsService,
    private _authService: AuthService,
    private activatedRoute: ActivatedRoute, 
    private router: Router, 
  ) {
    this.role = this._authService.authSubject.value.role;
    this.disabled = this.role != 'admin';
    this.createForm();

    this.router.events.subscribe((ev: any) => {
      if (ev.url === '/clients/manage-clients') {
        this.clientForm.reset();
        this.edit = false;
      }
    })
  }

  ngOnInit(){
    this.getCountries();    
    this.client = this.activatedRoute.snapshot.params;    
    if( this.client.id ){      
      this.edit = true;
      this.loadForm();
    }
  }

  createForm() {
    this.clientForm = this.formBuilder.group({
      firstName: new FormControl({value: '', disabled: this.disabled}, Validators.compose([Validators.required ])),
      lastName: new FormControl({value: '', disabled: this.disabled}, Validators.compose([Validators.required ])),
      email: new FormControl({value: '', disabled: this.disabled}, Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        Validators.maxLength(40)
      ])),
      phone: new FormControl({value: '', disabled: this.disabled}, Validators.compose([Validators.required ])),
      address: new FormControl({value: '', disabled: this.disabled}, Validators.compose([Validators.required ])),
      // streetNumber: new FormControl({value: '', disabled: this.disabled}, Validators.compose([Validators.required ])),
      country: new FormControl({value: '', disabled: this.disabled}, Validators.compose([Validators.required ])),   
      state: new FormControl({value: '', disabled: this.disabled}, Validators.compose([Validators.required ])),
      city: new FormControl({value: '', disabled: this.disabled}, Validators.compose([Validators.required ])), 
    });
  }

  loadForm() {
    this.clientForm.reset({
      firstName: this.client.firstName,
      lastName: this.client.lastName,
      email: this.client.email,
      phone: this.client.phone,
      address: this.client.address,
      // streetNumber: this.client.streetNumber,
      country: this.client.country,
      state: this.client.state,
      city: this.client.city,
    });    
  }

  getCountries(){    
    this._countriesService.allCountries().
    subscribe(
      res => {
        this.countries = res.Countries;

        if (this.edit) {
          const index = this.countries.findIndex(country => country.CountryName == this.client.country);
          if (index) this.setStates(index);
        } else {
          this.clientForm.controls['country'].patchValue('Argentina');
          this.setStates(9);
        }      
      },
      err => console.log(err),
    )
  }

  setStates(i: number) {
    if (i == 9) {
      this._JSONLoaderHelper.get('provincias').then( data => {
        this.states = data;

        if (this.edit) {
          const index = this.states.findIndex(state => state.StateName == this.client.state);
          if (index != -1) {
            this.clientForm.controls['city'].patchValue(this.client.city);
            this._JSONLoaderHelper.get('localidades', String(index+1)).then( (ciudades: any) => {
              this.cities = ciudades.map( ciudad => ciudad.Nombre);
            }); 
          }
       
        } else {
          this.clientForm.controls['state'].patchValue('Santa Fe');
          this._JSONLoaderHelper.get('localidades', '22').then( (ciudades: any) => {
            this.cities = ciudades.map( ciudad => ciudad.Nombre);
          });        
          this.clientForm.controls['city'].patchValue('Rosario');
        }
      });      
    } else {
      this.states = this.countries[i].States;
      this.cities = this.states[0].Cities;   
      if (this.edit) {
        const index = this.states.findIndex(state => state.StateName == this.client.state);
        if (index != -1) {
          this.clientForm.controls['city'].patchValue(this.client.city);
          this.setCities(index);
        }
      }
    }
  }

  setCities(i: number) {         
    if (this.clientForm.controls['country'].value == 'Argentina') {
      this._JSONLoaderHelper.get('localidades', String(i+1)).then( (ciudades: any) => {
        this.cities = ciudades.map( ciudad => ciudad.Nombre);
      });
    } else {
      this.cities = this.states[i].Cities;   
    }
  }
  
  onSubmit(values: Client) {
    if( this.clientForm.invalid ){
      Object.values( this.clientForm.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();          
        }
      });
      return
    }
    if( !this.edit) {
      this.addClient(values)
    } else {
      this.updateClient(values)
    }    
  }

  addClient(values) {
    this._manageDataService.createRecord('clients', values)
    .subscribe((res: any) => {    

      if( res.success ){            
        this._alertsService.alertToast(res.msg, 'success')
          .then( () => {
            this.clientForm.reset();
            this.clientForm.controls['country'].patchValue('Argentina');
          });
      } else {
        this._alertsService.alertToast(res.msg, 'error');
      }

    }, ( err ) => {
        if (err.error && err.error.code == 999) {
          this._authService.logout()
        }
      
        let errorMsg = '';        
        if( err.error.msg ){
          errorMsg = err.error.msg
        } else {
          errorMsg = 'Lo sentimos, ha ocurrido un error. Intentá nuevamente.'
        }

        this._alertsService.alertToast(errorMsg, 'error');
      }                        
    );
  }

  updateClient(values) {
    this._manageDataService.updateRecord('clients', this.client.id, values)
    .subscribe((res: any) => {
        this._alertsService.alertToast('¡El cliente se modificó con éxito!', 'success')
          .then( () => {
            this.router.navigateByUrl('clients/list-clients');
            this.clientForm.reset();
            this.clientForm.controls['country'].patchValue('Argentina');
            this.edit = false;            
          });      

    }, ( err ) => {
        if (err.error && err.error.code == 999) {
          this._authService.logout()
        }
      
        let errorMsg = '';        
        if( err.error.msg ){
          errorMsg = err.error.msg
        } else {
          errorMsg = 'Lo sentimos, ha ocurrido un error. Intentá nuevamente.'
        }

        this._alertsService.alertToast(errorMsg, 'error');
      }                        
    );
  }

}