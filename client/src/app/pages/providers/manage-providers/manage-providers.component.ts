import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { CountriesService } from '../../../services/countries.service';
import { JSONLoaderHelper } from '../../../services/getJson.service';
import { ManageDataService } from '../../../services/manage-data.service';
import { AlertsService } from '../../../services/alerts.service';
import { AuthService } from '../../../services/auth.service';

import { Provider } from '../../../interfaces/provider.interface';

@Component({
  selector: 'app-manage-providers',
  templateUrl: './manage-providers.component.html',
  styleUrls: ['./manage-providers.component.css']
})
export class ManageProvidersComponent implements OnInit {

  providerForm: FormGroup;
  provider: any;
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
      if (ev.url === '/providers/manage-providers') {
        this.providerForm.reset();
        this.edit = false;
        this.getCountries();
      }
    })
  }

  ngOnInit(){
    this.getCountries();
    this.provider = this.activatedRoute.snapshot.params;
    if( this.provider.id ){
      this.edit = true;
      this.loadForm();      
    }
  }

  createForm() {
    this.providerForm = this.formBuilder.group({
      name: new FormControl({value: '', disabled: this.disabled}, Validators.compose([Validators.required ])),
      lastName: new FormControl({value: '', disabled: this.disabled}),
      email: new FormControl({value: '', disabled: this.disabled}, Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        Validators.maxLength(40)
      ])),
      phone: new FormControl({value: '', disabled: this.disabled}, Validators.compose([Validators.required ])),      
      country: new FormControl({value: '', disabled: this.disabled}, Validators.compose([Validators.required ])),    
      state: new FormControl({value: '', disabled: this.disabled}, Validators.compose([Validators.required ])),
      city: new FormControl({value: '', disabled: this.disabled}, Validators.compose([Validators.required ])),          
    });
  }

  loadForm() {    
    this.providerForm.reset({
      name: this.provider.name,
      lastName: this.provider.lastName || '',
      email: this.provider.email,
      phone: this.provider.phone,      
      country: this.provider.country,
      state: this.provider.state,
      city: this.provider.city,
    });
  }

  getCountries(){
    this._countriesService.allCountries().
    subscribe(
      res => {
        this.countries = res.Countries;
        
        if (this.edit) {
          const index = this.countries.findIndex(country => country.CountryName == this.provider.country);
          if (index != -1) this.setStates(index);
        } else {
          this.providerForm.controls['country'].patchValue('Argentina');
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
          const index = this.states.findIndex(state => state.StateName == this.provider.state);
          if (index != -1) {
            this.providerForm.controls['city'].patchValue(this.provider.city);
            this._JSONLoaderHelper.get('localidades', String(index+1)).then( (ciudades: any) => {
              this.cities = ciudades.map( ciudad => ciudad.Nombre);
            }); 
          }
       
        } else {
          this.providerForm.controls['state'].patchValue('Santa Fe');
          this._JSONLoaderHelper.get('localidades', '22').then( (ciudades: any) => {
            this.cities = ciudades.map( ciudad => ciudad.Nombre);
          });        
          this.providerForm.controls['city'].patchValue('Rosario');
        }
      });      
    } else {
      this.states = this.countries[i].States;
      this.cities = this.states[0].Cities;   
      if (this.edit) {
        const index = this.states.findIndex(state => state.StateName == this.provider.state);
        if (index != -1) {
          this.providerForm.controls['city'].patchValue(this.provider.city);
          this.setCities(index);
        }
      }
    }
  }

  setCities(i: number) {
    if (this.providerForm.controls['country'].value == 'Argentina') {
      this._JSONLoaderHelper.get('localidades', String(i+1)).then( (ciudades: any) => {
        this.cities = ciudades.map( ciudad => ciudad.Nombre);
      });
    } else {
      this.cities = this.states[i].Cities;   
    }
  }
  
  onSubmit(values: Provider) {
    if( this.providerForm.invalid ){
      Object.values( this.providerForm.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();          
        }
      });
      return
    }
    if( !this.edit) {
      this.addProvider(values)
    } else {
      this.updateProvider(values)
    }
  }

  addProvider(values) {
    this._manageDataService.createRecord('providers', values)
    .subscribe((res: any) => {    

      if( res.success){            
        this._alertsService.alertToast(res.msg, 'success')
          .then( () => {
            this.providerForm.reset();
            this.providerForm.controls['country'].patchValue('Argentina')
            this.providerForm.controls['state'].patchValue('Santa Fe')
            this.providerForm.controls['city'].patchValue('Rosario')
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

  updateProvider(values) {
    this._manageDataService.updateRecord('providers', this.provider.id, values)
    .subscribe((res: any) => {
        this._alertsService.alertToast('¡El provedor se actualizó con éxito!', 'success')
          .then( () => {
            this.router.navigateByUrl('providers/list-providers');
            this.providerForm.reset();
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
