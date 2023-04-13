import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  constructor(public dr : MatDialogRef<SuccessComponent>) { }

  ngOnInit(): void {
  }

  done(){
    this.dr.close();
    this.dr.afterClosed().subscribe(res=>{
      window.location.reload();
    })
  }

}
