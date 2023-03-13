import { Component,CUSTOM_ELEMENTS_SCHEMA, NgModule, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, NgControl, NgForm, Validators } from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { Router } from "@angular/router";
import { Autorization } from "src/app/Auth.service";
import { NavComponent } from "src/app/nav/nav.component";

@Component({
    selector:'form-root',
    templateUrl:'./FormData.component.html',
    styleUrls:['./FormData.component.css']
})

export class FormDatas implements OnInit{
   
    constructor(private formBuilder:FormBuilder,private aut:Autorization,private rout:Router){}
 
    hide = true;
    email = new FormControl('', [Validators.required, Validators.email]);
    password=new FormControl('', [Validators.required]);

    // customValidator(con:FormControl){
    //     if(con.value != null && con.value.indexOf(' ') !=-1){
    //         return {customValidator:true}
    //     }else{                                   //
    //         return {customValidator:false}
    //     }
    // }

    getErrorMessage() {
      if (this.email.hasError('required')) {
        return 'You must enter a value';
      }
  
      return this.email.hasError('email') ? 'Not a valid email' : '';
    }
    getErrorMessage1() {
        if (this.password.hasError('required')) {
          return 'You must enter a value';
        }
    
        return this.password.hasError('password') ? 'Not a valid password' : '';
    }

    //============   form
     Dataform !:FormGroup;
    //testdata !:FormGroup;

     ngOnInit(): void {
        this.Dataform=this.formBuilder.group({
            Email           :   ['',[Validators.email,Validators.required]],
            Password            :   ['',Validators.required],
            
        })

        // this.testdata=this.formBuilder.group({
        //     Password :['',Validators.required]
        // })
        
        // this.Dataform.get("Email")?.valueChanges.subscribe((v)=>{
        //     console.log(v);
        // })
       
     }
     default='Mail';
    gender=[
        {id:1,gen:'Mail'},
        {id:2,gen:'Femail'},
        {id:3,gen:'Other'}
    ]
 
    Result:any={};
    OnSub(){
        if(this.Dataform.valid){
        console.log(this.Dataform.value.Email);
        this.Result=this.Dataform.value;
        this.Dataform.reset();
    
        }
        else{
            console.log("error")
        }
       console.log(this.ResultLogin());
    }

    ResultLogin(){
        if(this.Result.Email=='Nun123@gmail.com' || this.Result.password=='Nun@@#sdfe22'){
            this.Result={}
            this.aut.Login();
            this.rout.navigate(['page2']);
            return true;
            
        }else{
            if(this.Result.Email=='david234@gmail.com' || this.Result.password=='David@&47y#45@@'){
                this.Result={}
                this.aut.Login();
                this.rout.navigate(['page2']);
                return true;
            }else{
                return false;
            }
        
        }
    }

    
    

    datass='';
    dds=0;
    Setvalue(){
        if(this.dds==0){
            this.Dataform.controls['Email'].setValue("Nun123@gmail.com");
            this.Dataform.controls['Password'].setValue("Nun@@#sdfe22");
            this.dds=1;
        }else if(this.dds==1){
            this.Dataform.controls['Email'].setValue("david234@gmail.com");
            this.Dataform.controls['Password'].setValue("David@&47y#45@@");
            this.dds=2;
        }else{
            this.Dataform.controls['Email'].setValue("");
            this.Dataform.controls['Password'].setValue("");
            this.dds=0;
        }
        
    }


}