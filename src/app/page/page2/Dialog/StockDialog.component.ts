import{ AfterViewInit, Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA,MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import {MatSelectModule} from '@angular/material/select';
import { tick } from '@angular/core/testing';

@Component({
    selector:'stock-root',
    templateUrl:'./StockDialog.component.html',
    styleUrls:['./StockDialog.component.css']
})

export class StockDialog implements OnInit{

    constructor(
        private formBuilder:FormBuilder,
        private dialog:MatDialog,
        private Api:ApiService,
        private Ref:MatDialogRef<StockDialog>,
        @Inject(MAT_DIALOG_DATA) public EditStock:any
    ){}

    btnCreate="Create";
    StockForm!:FormGroup;
        edit=false;
    ngOnInit(): void {
       this.StockForm=this.formBuilder.group({
        productCode     : ['',Validators.required],
        wareCode        : ['',Validators.required],
        quantity        : ['',Validators.required],
        StockId         : ['',Validators.nullValidator],
       
       })

       this.DataProduct();
       this.DataWare();

       if(this.EditStock){
        this.StockForm=this.formBuilder.group({
            productCode     : ['',Validators.nullValidator],
            wareCode        : ['',Validators.nullValidator],
            quantity        : ['',Validators.required],
            StockId         : ['',Validators.required],
           
           })
        this.edit=true;
        this.btnCreate="Update";
        // this.StockForm.controls['productCode'].setValue(this.EditStock.product.name);
        // this.StockForm.controls['wareCode'].setValue(this.EditStock.ware.name);
         this.StockForm.controls['quantity'].setValue(this.EditStock.quantity);
        //this.StockForm.patchValue(this.EditStock);
        this.StockForm.controls['StockId'].setValue(this.EditStock.id);
       // this.StockForm.controls['quantity2'].setValue(this.EditStock.product.name);
        console.log(this.EditStock.id);

       }

    }
    Product:any=[];
    DataProduct(){
        this.Api.CatchAllProductApi().subscribe({
            next:(resp)=>{
                this.Product=resp.data;
               // console.log(resp);
            //    for(let item of this.Product){
            //   //  console.log(item.name);
            //    }
            }
        })
    }

    Wares:any=[];
    DataWare(){
        this.Api.CatchAllWares().subscribe({
            next:(resp)=>{
                this.Wares=resp.data;
              //  console.log(this.Wares.name);
            }
        })
    }
    StockResult:any={};
    StockArr:any=[];
    CreateStocking(){
        if(!this.EditStock){
            if(this.StockForm.valid){
                this.StockArr.push(this.StockForm.value);
                this.StockResult={"commands":this.StockArr}
               // console.log(JSON.stringify(this.StockResult));
                this.Api.CreateStockApi(this.StockResult).subscribe({
                    next:(resp)=>{
                        this.StockForm.reset();
                        this.Ref.close('Save');
                        console.log("success ");
                        console.log(resp);
                    },
                    error:(err)=>{
                        console.log(err);
                        alert("Create fail !");
                    }
                })
               
            }
        }else{
            if(this.StockForm.valid){
                this.StockArr.push(this.StockForm.value);
                this.StockResult={"command":[{'id':this.StockArr[0].StockId,'quantity':this.StockArr[0].quantity}]}

                console.log(JSON.stringify(this.StockResult));
                this.Api.EditStockApi(this.StockResult).subscribe({
                    next:(resp)=>{
                        this.Ref.close("Edit");
                        this.StockForm.reset();
                        console.log(resp);
                    },
                    error:(err)=>{
                        console.log(err);
                    }
                })
            }
        }
    }




    CloseDialog(){
        this.dialog.closeAll();
    }
    
}