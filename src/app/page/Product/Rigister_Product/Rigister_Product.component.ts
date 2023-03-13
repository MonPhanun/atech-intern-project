import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
    selector:'rigister-root',
    templateUrl:'./Rigister_Product.component.html',
    styleUrls:['./Rigister_Product.component.css']
})

export class RigisterProduct implements OnInit{

    constructor(
        private dialog:MatDialog,
        private Ref:MatDialogRef<RigisterProduct>,
        private formBuilder:FormBuilder,
        private Api:ApiService
    ){}
    ngOnInit(): void {
        this.RegisterFrm=this.formBuilder.group({

            productCode            :   ['',Validators.required],
            productName            :   ['',Validators.required],
            price                  :   ['',Validators.required],
            productDescription     :   ['',Validators.required],
            wareCode               :   ['',Validators.required],
            quantity               :   ['',Validators.required],
    
           });

        this.GetWares();
    }

    RegisterFrm !:FormGroup

    WaresData:any=[];
    GetWares(){
        this.Api.CatchAllWares().subscribe({
            next:(resp)=>{
                this.WaresData=resp.data;
               // console.log(this.WaresData);
            }
        })
    }
    comment:any=[];
    ResultRigister:any={};
    GetFormValues(){
        console.log(this.RegisterFrm.value);
        this.comment.push(this.RegisterFrm.value);
        this.ResultRigister={"commands":this.comment};
        console.log(this.ResultRigister);
        if(this.RegisterFrm.valid){
            this.Api.RigisterProduct(this.ResultRigister).subscribe({
                next:(resp)=>{
                    console.log(resp);
                    this.Ref.close("rigister");
                },
                error:(err)=>{
                    console.log(err);
                }
            })
    
        }
        
    }

    ClosRegisterdialog(){
        this.dialog.closeAll();
    }
}