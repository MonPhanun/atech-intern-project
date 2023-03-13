import {Component} from '@angular/core';
import { ApiService } from 'src/app/services/api.service';


@Component({
    selector:'search-root',
    templateUrl:'./Search.component.html',
    styleUrls:['./Search.component.css']
})

export class Search{

    constructor(
        private Api:ApiService
    ){}

    searchCheck='';
    CheckShow(data:any){
        if(data.target.checked){
            if(data.target.value==='Product'){
                this.searchCheck=data.target.value;
                console.log(data.target.value)
                this.ResultProduct=[];
                this.ResultWares=[];
                this.ResultStock=[];
            }
            else if(data.target.value==='Wares'){
                this.searchCheck=data.target.value;
                console.log(data.target.value)
                this.ResultProduct=[];
                this.ResultWares=[];
                this.ResultStock=[];
            }
            else if(data.target.value==='Stock'){
                this.searchCheck=data.target.value;
                console.log(data.target.value)
                this.ResultProduct=[];
                this.ResultWares=[];
                this.ResultStock=[];
            }
        }
    }

    dataInput='';
    InputVaue(data:any){
        this.dataInput=data.target.value;
        console.log(this.dataInput);
        
    }
    SearchErr:any=[];
    ResultProduct:any=[];
    SearchProduct(){
      //  this.ResultSearch={"id":this.dataInput};
        this.Api.SearchProduct(this.dataInput).subscribe({
            next:(resp)=>{
                console.log(resp);
                this.ResultProduct=resp;
               // this.SearchErr=null;
            },
            error:(err)=>{
                console.log(err);
                this.SearchErr=err;
            }
        })
    }

    ResultWares:any=[];
    SearchWears(){
        console.log(this.dataInput);
        this.Api.SearchWares(this.dataInput).subscribe({
            next:(resp)=>{
                console.log(resp);
                this.ResultWares=resp
                
            },
            error:(err)=>{
                console.log(err);
                this.SearchErr=err;
            }
        })
    }

    ResultStock:any=[];
    SearchStock(){
        console.log(this.dataInput);
        this.Api.SearchStock(this.dataInput).subscribe({
            next:(resp)=>{
                console.log(resp);
                this.ResultStock=resp;
            },
            error:(err)=>{
                console.log(err);
                this.SearchErr=err;
            }
        })
    }
}