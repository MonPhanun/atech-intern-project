import {Component, Inject, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranSfer } from '../TranSfer/TranSfer.component';

@Component({
    selector:'detail-root',
    templateUrl:'./Detail_dialog.component.html',
    styleUrls:['./Detail_dialog.component.css']
})

export class DetailStock implements OnInit{

    constructor(
        private RefDialog:MatDialogRef<DetailStock>,
        @Inject (MAT_DIALOG_DATA) public Detail:any,    
        private dialog:MatDialog,
    ){}
    ngOnInit(): void {
     //  console.log(this.Detail);

       if(this.Detail){
            this.DetailShow=this.Detail;
            console.log(this.DetailShow);
            console.log(this.DetailShow.id);
       }
    }

    DetailShow:any;

    CloseDialog(){
        this.dialog.closeAll();
    }

    openTransfer(row:any){
        this.dialog.open(TranSfer,{
            width:'500px',
            height:'500px',
            data:row
        })
        console.log(row);
    }
}