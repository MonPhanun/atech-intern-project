import{ AfterViewInit, Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA,MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

declare const $: any;

@Component({
    selector:'Dialog-root',
    templateUrl:'./Dialog.component.html',
    styleUrls:['./Dialog.component.css']

})

export class Dialog implements OnInit {

    ProductForm !: FormGroup;
    BottonDialog:string="Save";
    
    constructor(private dialog:MatDialog,
                private formBuilder :FormBuilder,
                private Api:ApiService,
                private ref:MatDialogRef<Dialog>,
                @Inject(MAT_DIALOG_DATA)public EditData:any
                ){}

    ngOnInit(): void {
       this.ProductForm=this.formBuilder.group({

        Code            :   ['',Validators.required],
        Name            :   ['',Validators.required],
        Price           :   ['',Validators.required],
        Description     :   ['',Validators.required],
        id              :   ['',Validators.nullValidator],

       });
      // console.log(this.EditData);
       if(this.EditData){
        this.BottonDialog="Update";
        this.ProductForm.controls['Code'].setValue(this.EditData.code);
        this.ProductForm.controls['Name'].setValue(this.EditData.name);
        this.ProductForm.controls['Price'].setValue(this.EditData.price);
        this.ProductForm.controls['Description'].setValue(this.EditData.description);
        this.ProductForm.controls['id'].setValue(this.EditData.id);
       }
    }

    onNoClick(){
        this.dialog.closeAll();
    
    }
    
    SaveProduct(){
        console.log(this.ProductForm.value);
    }

    command:any=[];
    Result:any={};
    addProduct(){
        if(!this.EditData){
            if(this.ProductForm.valid){
                this.command.push(this.ProductForm.value);
                this.Result={'command':this.command}
                console.log(this.Result);
                this.Api.PostProductApi(this.Result).subscribe({
                    next:(res)=>{alert('Save Success !');
                    this.ProductForm.reset();
                    this.ref.close("Save");
                    },
                    error:(res)=>{alert('Save fail !');}
                })
            }
        }else{
            if(this.ProductForm.valid){
                //this.ProductForm.value.push({"id":this.EditData.id});
                this.command.push(this.ProductForm.value);
                //this.command={"id":this.EditData.id};
                this.Result={'command':this.command}
                console.log(JSON.stringify(this.Result));
                 this.Api.UpdateProductApi(this.Result).subscribe({
                    next:(res)=>{alert('Update Success !');
                    this.ProductForm.reset();
                    this.ref.close("Update");
                    },
                    error:(res)=>{alert('Update fail !');}
                })
            }
        }
    }

   
}


// addProduct(){
//     if(!this.EditData){
//         if(this.ProductForm.valid){
//             this.Api.PostProduct(this.ProductForm.value).subscribe({
//                 next:(res)=>{alert('Save Success !');
//                 this.ProductForm.reset();
//                 this.ref.close("Save");
//                 },
//                 error:(res)=>{alert('Save fail !');}
//             })
//         }
//     }else{
//         if(this.ProductForm.valid){
//             this.Api.UpdateProduct(this.ProductForm.value,this.EditData.id).subscribe({
//                 next:(res)=>{alert('Update Success !');
//                 this.ProductForm.reset();
//                 this.ref.close("Update");
//                 },
//                 error:(res)=>{alert('Update fail !');}
//             })
//         }
//     }
// }