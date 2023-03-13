import {Component, OnInit,Inject} from '@angular/core'
import {MAT_DIALOG_DATA,MatDialog,MatDialogRef} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
    selector:'wareDialog-root',
    templateUrl:'./WareDialog.component.html',
    styleUrls:['./WareDialog.component.css']
})

export class WareDialog implements OnInit{

    constructor(
            private dialog:MatDialog,
            private formBuilder:FormBuilder,
            private Api:ApiService,
            private ref:MatDialogRef<WareDialog>,
            @Inject(MAT_DIALOG_DATA)public EditWare:any
        ){}

        WareBtn:string="Save";
    WareForm !: FormGroup;


    ngOnInit(): void {
        this.WareForm=this.formBuilder.group({
            code            :   ['',Validators.required],
            name            :   ['',Validators.required],
            description     :   ['',Validators.required],
        })

        if(this.EditWare){
            this.WareBtn="Update";
            //console.log(this.EditWare);
            this.WareForm.controls['code'].setValue(this.EditWare.code);
            this.WareForm.controls['name'].setValue(this.EditWare.name);
            this.WareForm.controls['description'].setValue(this.EditWare.description);
        }
    }

    CloseWareDialog(){
        this.dialog.closeAll();
    }

    WaresDataResult:any={};
    WaresData:any=[];
     dataEdit:editWare={}
    AddWares(){
        if(!this.EditWare){
            if(this.WareForm.valid){
                this.WaresData.push(this.WareForm.value);
                this.WaresDataResult={'command':this.WaresData}
               // console.log(JSON.stringify(this.WaresDataResult));
                this.Api.CreateWaresApi(this.WaresDataResult).subscribe({
                    next: (resp)=>{alert("Add Ware Successfuly !");
                                    this.WareForm.reset();
                                    this.ref.close("SaveWare");
                                    
                                },
                    error:(err)=>{console.log(err);}
                })
            }
         
        }else{
            if(this.WareForm.valid){
                
                //console.log(this.WareForm.value.name);
                this.dataEdit=new editWare(this.EditWare.id,this.WareForm.value.name,this.WareForm.value.description);
                
                this.WaresData.push(this.dataEdit);

                this.WaresDataResult={'command':this.WaresData}

              //  console.log(JSON.stringify(this.WaresDataResult));
                this.Api.UpdateWareApi(this.WaresDataResult).subscribe({
                    next:(resp)=>{
                        alert("Update Successfuly !");
                        this.WareForm.reset();
                        this.ref.close("Edit");
                    },
                    error:(err)=>{
                        alert("Update Fail !");
                    }
                    
                })
            }
        }
    }

//===========================>>
    AddWares1(){
        if(!this.EditWare){
            if(this.WareForm.valid){
                this.Api.PostWare(this.WareForm.value).subscribe({
                    next: (resp)=>{alert("Add Ware Successfuly !");
                                    this.WareForm.reset();
                                    this.ref.close("SaveWare");
                                    
                                },
                    error:(err)=>{alert("Fail in to add ware !")}
                })
            }
         
        }else{
            if(this.WareForm.valid){
                this.Api.UpdateWare(this.WareForm.value,this.EditWare.id).subscribe({
                    next:(resp)=>{
                        alert("Update Successfuly !");
                        this.WareForm.reset();
                        this.ref.close("Edit");
                    },
                    error:(err)=>{
                        alert("Update Fail !");
                    }
                    
                })
            }
        }
    }
}

 class editWare{
    id?:number;
    name?:string;
    description?:string;

    constructor(id?:number,name?:string,description?:string){
        this.id=id;
        this.name=name;
        this.description=description;
    }
 }