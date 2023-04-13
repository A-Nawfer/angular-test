import { Component, OnInit, ViewChild } from '@angular/core';
import { Testdata } from 'src/app/testdata';
import { ApiService } from 'src/app/api.service';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmComponent } from '../confirm/confirm.component';
import { Observable, map, startWith } from 'rxjs';

interface Category {
  value: string;
}

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  testdata= new Testdata;

  @ViewChild('form')
  form?: NgForm;

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
              public fb : FormBuilder,
              public dr : MatDialogRef<PopupComponent>,
              public dialog : MatDialog) { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  submit(){
    this.dialog.open(ConfirmComponent, {
      data: {
        id:       this.testdata.id,
        itemName:       this.testdata.itemName,
        description:       this.testdata.description,
        category:       this.testdata.category,
        subcategory:       this.testdata.subcategory,
        price:       this.testdata.price,
        lastUpdated:       this.testdata.lastUpdated,
        trigger:  'create'
      },
    });
  }

  resetForm(){
    this.testdata = new Testdata;
    this.form?.resetForm();
    this.myControl.reset();
  }

}
