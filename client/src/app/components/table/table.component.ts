import { Component, OnInit, Input, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { ColumnTable } from '../../interfaces/columnTable';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableComponent implements OnInit, AfterViewInit {

  public role: string;
  public pageRepairs = false;
  public filterKey: string;
  public filterValue: string;
  private defaultFilterPredicate?: (data: any, filter: string) => boolean;

  public tableDataSource = new MatTableDataSource([]);
  public displayedColumns: string[];
  @ViewChild(MatPaginator, {static: false}) matPaginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) matSort: MatSort;

  @Input() isPageable = false;
  @Input() isSortable = false;
  @Input() isFilterable = false;
  @Input() tableColumns: ColumnTable[];
  @Input() rowAction: string;  
  @Input() paginationSizes: number[] = [5, 10, 15];
  @Input() defaultPageSize = this.paginationSizes[1];

  @Output() sort: EventEmitter<Sort> = new EventEmitter();
  @Output() rowActionAdd: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowActionEdit: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowActionDelete: EventEmitter<any> = new EventEmitter<any>();  

  // this property needs to have a setter, to dynamically get changes from parent component
  @Input() set tableData(data: any[]) {
    this.setTableDataSource(data);
  }

  constructor(
    private _authService: AuthService,
  ) {
    this.role = this._authService.authSubject.value.role;    
  }

  ngOnInit(): void {
    
    const columnNames = this.tableColumns.map((tableColumn: ColumnTable) => tableColumn.name);
    if (this.rowAction) {      
      this.displayedColumns = [...columnNames, this.rowAction]
    } else {
      this.displayedColumns = columnNames;
    }

    this.defaultFilterPredicate = this.tableDataSource.filterPredicate;
    if (this.tableColumns[2] && this.tableColumns[2].name == "Motivo") this.pageRepairs = true;
  }

  // we need this, in order to make pagination work with *ngIf
  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.matPaginator;
  }

  setTableDataSource(data: any) {
    this.tableDataSource = new MatTableDataSource<any>(data);
    this.tableDataSource.paginator = this.matPaginator;
    this.tableDataSource.sort = this.matSort;
  }

  applyFilter(event?: Event) {
    if (event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.filterValue = filterValue.trim().toLowerCase();
    }
     
    this.tableDataSource.filter = this.filterValue
  }

  setFilter(filter?: string) {
    this.filterKey = filter;
    if (this.filterKey) {
      this.tableDataSource.filterPredicate = (data: any, filter: string) => {
        return data[this.filterKey].indexOf(filter) != -1;
      };
    } else {
      this.tableDataSource.filterPredicate = this.defaultFilterPredicate;
    }
    this.applyFilter();
  }

  sortTable(sortParameters: Sort) {
    // defining name of data property, to sort by, instead of column name
    sortParameters.active = this.tableColumns.find(column => column.name === sortParameters.active).dataKey;
    this.sort.emit(sortParameters);
  }

  emitRowActionAdd(row: any) {
    this.rowActionAdd.emit(row);
  }
  emitRowActionEdit(row: any) {
    this.rowActionEdit.emit(row);
  }
  emitRowActionDelete(row: any) {
    this.rowActionDelete.emit(row);
  }
}