import {Component, Inject, OnInit} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ApiService } from "src/app/services/api.service";

@Component({
    selector:'transfer-root',
    templateUrl:'./TranSfer.component.html',
    styleUrls:['./TranSfer.component.css']
})

export class TranSfer implements OnInit{

    constructor(
        private RefDialog:MatDialogRef<TranSfer>,
        @Inject (MAT_DIALOG_DATA) public Detail:any,    
        private dialog:MatDialog,
        private TranForm:FormBuilder,
        private Api:ApiService,
    ){}

    TranDataForm !: FormGroup;

    ngOnInit(): void {
        this.TranDataForm=this.TranForm.group({
            productId     : ['',Validators.required],
            sourceWareId        : ['',Validators.required],
            targetWareId        : ['',Validators.required],
            quantity         : ['',Validators.nullValidator],
        })

        console.log(this.Detail);
        if(this.Detail){
        this.TranDataForm.controls['productId'].setValue(this.Detail.product.id);
        this.TranDataForm.controls['sourceWareId'].setValue(this.Detail.ware.id);
        //this.TranDataForm.controls['targetWareId'].setValue(this.Detail.product.id);
        //this.TranDataForm.controls['quantity'].setValue(this.Detail.product.id);
        }

        this.Api.CatchAllStock().subscribe({
            next:(val)=>{
                this.WareTranTo=val.data;
                console.log(this.WareTranTo);
            }
        })
        
    }

    WareTranTo:any;

    DialogClose(){
        this.dialog.closeAll()
    }

    lastdata:any={};
    StartTran(){
        if(this.TranDataForm.valid){
            console.log(this.TranDataForm.value);
            this.lastdata={
                "commands":[this.TranDataForm.value]
            };
            console.log(this.lastdata);
            console.log(JSON.stringify(this.lastdata));

            this.Api.TransferStock(this.lastdata).subscribe({
                next:(val)=>{
                    alert("Success !");
                    this.RefDialog.close();
                },
                error:(err)=>{
                    alert("Transfer faild !");
                    console.log(err);
                    this.RefDialog.close();
                }
            })
        }
    }

}