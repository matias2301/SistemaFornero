import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { ManageDataService } from '../../../services/manage-data.service';
import { AlertsService } from '../../../services/alerts.service';
import { AuthService } from '../../../services/auth.service';

import { Repair } from '../../../interfaces/repair.interface';
import { Client } from '../../../interfaces/client.interface';
import { Article } from '../../../interfaces/article.interface';
import { UserResponse } from '../../../interfaces/authUser';

import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'app-manage-repairs',
  templateUrl: './manage-repairs.component.html',
  styleUrls: ['./manage-repairs.component.css']
})
export class ManageRepairsComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;

  repairForm: FormGroup;
  articlesForm: FormGroup;
  takenId: string;
  email: string = '';
  repair: any;
  clients: Client[];
  users: UserResponse[];  
  articles: Article[];
  observations: any[] = [];
  articleSelected: boolean = false;
  articleRepair = [];
  edit: boolean = false;
  displayedColumns: string[] = ['code', 'descrip', 'amount', 'iconDelete'];  

  constructor(
    public formBuilder: FormBuilder,    
    private _manageDataService: ManageDataService,
    private _authService: AuthService,
    private _alertsService: AlertsService,
    private activatedRoute: ActivatedRoute,  
    private router: Router, 
  ) {
    this.createForm();
  }

  ngOnInit(){
    this.getUsers();
    this.getClients();
    this.getArticles();

    this._authService.authSubject
      .subscribe( state => {        
        this.takenId = state.id;    
    });

    let repair = this.activatedRoute.snapshot.params;
    
    if( repair.idRepair ){
      this.edit = true;
      this._manageDataService.getDataById('repairs', repair.idRepair)
      .subscribe((res: any) => {
        this.repair = res[0];

        this.repair.Articles.map( art => {
          let article = {
            id: art.id,
            code: art.code,
            descrip: art.description,
            amount: art.ArticlesRepairs.amount
          }
          this.articleRepair.push(article);
        })

        this.loadForm();
      });
    }
  }

  getUsers(){
    this._manageDataService.getData('users')
    .subscribe((res: any) => {
      this.users = res.users;   
    }); 
  }
  getClients(){
    this._manageDataService.getData('clients')
    .subscribe((res: any) => {
      this.clients = res.clients;      
    }); 
  }
  getArticles(){
    this._manageDataService.getData('articles')
    .subscribe((res: any) => {      
      this.articles = res.articles;
    }); 
  }

  createForm() {
    this.repairForm = this.formBuilder.group({
      clientId: new FormControl('', Validators.compose([Validators.required ])),      
      description: new FormControl('', Validators.compose([Validators.required ])),
      estDate: new FormControl('', Validators.compose([Validators.required ])),      
      state: new FormControl('', Validators.compose([Validators.required ])),   
      assignedId: new FormControl('', Validators.compose([Validators.required ])),
      observations: new FormControl(''),          
    });

    this.articlesForm = this.formBuilder.group({
      id: new FormControl('', Validators.compose([Validators.required ])),    
      code: new FormControl('', Validators.compose([Validators.required ])),      
      descrip: new FormControl('', Validators.compose([Validators.required ])), 
      amount: new FormControl('', Validators.compose([Validators.required ])),        
    });

  }

  loadForm() {    
    this.repairForm.reset({
      clientId: this.repair.ClientId,
      description: this.repair.description,
      estDate: this.repair.estDate,
      state: this.repair.state,      
      assignedId: this.repair.assignedId,            
    });    
    this.email = this.repair.Client.email;
    this.observations = this.repair.Observations;    
  }

  selectArticle(code: string, descrip: string){
    this.articleSelected = true;
    this.articlesForm.controls.code.setValue(code);
    this.articlesForm.controls.descrip.setValue(descrip);
  }

  cancelArticle() {
    this.articleSelected = false;
    this.articlesForm.reset();
  }

  addArticle(values: any) {
    if( this.articlesForm.invalid ) {
      this.articlesForm.controls.amount.markAsTouched();
      return
    }
    if( this.articleRepair.length > 0 ){
      let match = false;
      this.articleRepair.map( art => {
        if( art.id == values.id ) {
          art.amount = Number(art.amount) + Number(values.amount);
          match = true;
        }
      })
      if( !match ) {
        this.articleRepair.push(values);
        this.articleRepair = [...this.articleRepair];
      }
    } else {
      this.articleRepair.push(values);
      this.articleRepair = [...this.articleRepair];
    }

    this.cancelArticle();     
  }

  deleteArticle(article: any){    
    this.articleRepair = this.articleRepair.filter( e => e.id !== article.id );
    this.articleRepair = [...this.articleRepair];
  }
  
  onSubmit(values: Repair) {
    if( this.repairForm.invalid ){
      Object.values( this.repairForm.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();          
        }
      });
      return
    }
    values.takenId = Number(this.takenId);
    values = {
      ...values,
      articles: this.articleRepair
    }

    if( !this.edit) {
      this.addRepair(values)
    } else {
      this.updateRepair(values)
    }
  }

  addRepair(values: Repair) {

    this._manageDataService.createRecord('repairs', values)
    .subscribe((res: any) => {    

      if( res.success){            
        this._alertsService.alertToast(res.msg, 'success')
          .then( () => {
            this.articleRepair = [];
            this.articleRepair = [...this.articleRepair];
            this.email = '';
            this.repairForm.reset();
          });
      }

    }, ( err ) => {
      
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

  updateRepair(values: Repair) {
    
    this._manageDataService.updateRecord('repairs', this.repair.id, values)
    .subscribe((res: any) => {
      
        this._alertsService.alertToast('¡La reparación se modificó con éxito!', 'success')
          .then( () => {
            this.router.navigateByUrl('repairs/list-repairs');
            this.repairForm.reset();
            this.edit = false;    
          }); 

    }, ( err ) => {
      
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

  addObservation() {
    if( this.repairForm.controls['observations'].value === null ) return;

    let values = {
      RepairId: this.repair.id,
      description: this.repairForm.controls['observations'].value
    }

    this._manageDataService.createRecord('observations', values)
    .subscribe((res: any) => {    

      if( res.success){
        this._alertsService.alertToast(res.msg, 'success')         
        this.observations.push(res.obs);
        this.repairForm.controls['observations'].reset();
      }
    }, ( err ) => {
      
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