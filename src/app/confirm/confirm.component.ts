import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../api.service';
import { Testdata } from '../testdata';
import { SuccessComponent } from '../success/success.component';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  constructor(private api : ApiService,
              public dialog : MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: Testdata,
              public dr : MatDialogRef<ConfirmComponent>) { }

  ngOnInit(): void {
  }

  confirmDelete(){
    (this.api.delete(this.data.id)).subscribe((res)=>{
      this.dr.close();
      this.dr.afterClosed().subscribe(res=>{
        this.dialog.open(SuccessComponent);
      })
    });
  }

  confirmCreate(){
    (this.api.insert(this.data)).subscribe((res)=>{
      this.dr.close();
      this.dr.afterClosed().subscribe(res=>{
        this.dialog.open(SuccessComponent);
      })
    });
  }

}
