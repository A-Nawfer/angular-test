import { Component, OnInit, ViewChild } from '@angular/core';
import { Testdata } from 'src/app/testdata';
import { ApiService } from 'src/app/api.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { ConfirmComponent } from '../confirm/confirm.component';
import { Observable, map, startWith } from 'rxjs';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';

interface Category {
  value: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @ViewChild('form')
  form?: NgForm;

  @ViewChild(MatSort) sort: MatSort | undefined;

  testdata: Testdata[] = [];

  sortedData?: Testdata[];

  data = new Testdata;

  disableUpdate: boolean = true;

  column: string = 'id';
  order: string = 'ASC';

  displayedColumns: string[] = ['id', 'itemName', 'description', 'category', 'subcategory', 'price', 'lastUpdated', 'actions' ];
  dataSource = new MatTableDataSource(this.testdata);

  myControl = new FormControl('');
  options: string[] = ['Fiction', 'Non-fiction', 'Educational', 'Computers',
                      'Mobile phones', 'Audio', 'Cameras ', 'Gaming', 'Backpacks',
                      'Stationery ', 'Arts & crafts', 'Cameras ', 'Action figures', 'Console',
                      'Building sets: ', 'PC'];
  filteredOptions?: Observable<string[]>;

  Category: Category[] = [
    {value: 'Books '},
    {value: 'Electronics'},
    {value: 'Games '},
    {value: 'Office Supplies'},
    {value: 'School Supplies'},
    {value: 'Toys '}
  ];

  constructor(private api : ApiService,
              public dialog : MatDialog){ }


  announceSortChange(sortState: Sort) : void {
    this.column = sortState.active;
    this.order = sortState.direction;
    this.getAllData(this.column, this.order);
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort!;

    if(this.disableUpdate == true){
      this.myControl.disable();
    }
    else if(this.disableUpdate == false){
      this.myControl.enable();
    }

    this.getAllData('id', 'ASC');

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  getAllData(column: string, order: string){
    this.api.getAllData(column, order).subscribe(data => {
      data.lastUpdated = new Date(data.lastUpdated)
      this.testdata = data.data;
      this.data = data.data;
    });
  }

  addData(){
    this.dialog.open(PopupComponent);
  }

  edit(data: Testdata){
    this.data = data;
    this.disableUpdate = false;
    this.myControl.enable();
  }

  delete(id: any){
    this.dialog.open(ConfirmComponent, {
      data: {
        id:       id,
        trigger:  'delete'
      },
    });
  }

  update(){
    if(this.form?.valid){
      this.api.update(this.data.id, this.data).subscribe((res)=>{
        console.log(res.message)
        this.clear();
        this.getAllData('id', 'ASC');
      });
    }
  }

  clear(){
    this.data = new Testdata;
    this.form?.resetForm();
    this.disableUpdate = true;
    this.myControl.disable();
    this.myControl.reset();
    this.getAllData('id', 'ASC');
  }

}
