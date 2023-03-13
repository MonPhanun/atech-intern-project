import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA,MatDialog} from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ApiService } from 'src/app/services/api.service';
import { WareDialog } from './WareDialog/WareDialog.component';
declare const $: any;
@Component({
    selector:'Wares-root',
    templateUrl:'./Wares.component.html',
    styleUrls:['./Wares.component.css']
})

export class Wares implements OnInit,AfterViewInit {

    constructor(
                private dialog:MatDialog,
                private Api:ApiService,
                private route:Router,
                private activateRout:ActivatedRoute
            ){
            }

    pageID:any;
    page='';
            tootherpage(){
                this.route.navigate(['contact']); //,{relativeTo: this.activateRout}
              // this.route.navigateByUrl('contact');
            }

    ngAfterViewInit(): void {
        setTimeout(()=>{
            $('#myTable').DataTable({
                pagingType:'full_numbers',
                pageLength:5,
                processing:true,
                lengthMenu:[5,10,25,50],
                order:[[1,"desc"]]

            },1);  
        },500);
       // $('#myTable').DataTable();
       
    }
    ngOnInit(): void {
      
        this.CatchAllWaresApi();

       
    }
                            // Catch All Data
    AllWareApi:any=[];
    CatchAllWaresApi(){
        return this.Api.CatchAllWares().subscribe({
            next:(resp)=>{
                this.AllWareApi=resp.data;
                console.log(resp);
            },
            error:(err)=>{
                alert(err);
            }
        })
    }
       
    

//======= dialog

    openWareDialog(){
        this.dialog.open(WareDialog,{
            height: '400px',
            width: '500px',
        })
        .afterClosed().subscribe(
            (val)=>{
                if(val=="SaveWare"){
                    this.CatchAllWaresApi();
                }
            }
        );
    }


    OnEditApi(row:any){
        this.dialog.open(WareDialog,{
            height:'400px',
            width:'500px',
            data:row
        }).afterClosed().subscribe(
            (val)=>{
                if(val=="Edit"){
                    this.CatchAllWaresApi();
                }
            }
        );
    }

    CloseWareDialog(){
        this.dialog.closeAll();
    }
//======= delete 
    IdWareApi:any={};
    IdWareArr:any=[]
    DeleteOnlyWaresApi(data:number){
        this.IdWareArr.push(data);
        this.IdWareApi={"id":this.IdWareArr};
        return this.Api.DeleteOnlyWareApi(this.IdWareApi).subscribe({
            next:(resp)=>{
                console.log(resp);
                this.CatchAllWaresApi();
            },
            error:(err)=>{
                //alert(err);
                console.log(err);
            }
        })
            
        
        //console.log(JSON.stringify(this.IdWareApi));
    }

//====================== Checck box delete 
    IdWares:any=[];
    check:boolean=false;
    ID:any;
    checkBox:Boolean=false;
    deleteWare(data:any){

        this.checkBox=data.target.checked
        this.ID=data.target.value;
       // const test1=this.ID.Tostring();
       //console.log(this.ID);
        if(this.checkBox){
            this.IdWares.push(this.ID);
        }else{
            this.IdWares.pop(...this.ID);
        }
       // this.IdWares.push(...data);
        // console.log(data.target.value);
        // console.log(data.target.checked);
        console.log(this.IdWares);
    }
 
    successDelete:boolean=false;
    DeleteCheckBox:any={};
    CheckBoxDelete(){
     
        this.DeleteCheckBox={"id":this.IdWares}
        console.log(JSON.stringify(this.DeleteCheckBox))
        this.Api.DeleteOnlyWareApi(this.DeleteCheckBox).subscribe({
            next:(resp)=>{
                console.log(resp);
                this.CatchAllWaresApi();
            },
            error:(err)=>{
                console.log(err);
            }
        })
      
       this.IdWares=[];
    }

//============================================================>>>>>> db.jaon



   // WareResp:WaresModel[]=[];
   WareResp:any; 
   data=new Array();

   test:WaresModel[]=[{id:1,Code:"1",Name:'darta',Description:"data"}];
  //mo$: Observable<any>=new Observable;
     GetWareOut(){
     //   this.mo$=await this.Api.GetWare()
        this.Api.GetWare().subscribe(res => {
            this.WareResp = res;
           // console.log('data response', this.WareResp);
          });
    //     .subscribe({
    //     next:(es)=>{this.WareResp=es}
    //   })
       //this.Api.GetWare().pipe(tap((data)=>(this.WareResp=data)))
      // this.mo$.pipe(tap((data)=>(this.WareResp=data)))
        
        
    }

    EditWares1(row:any){
        this.dialog.open(WareDialog,{
            height: '400px',
            width: '500px',
            data:row
        }).afterClosed().subscribe(
            (val)=>{
                if(val=="Edit"){
                    this.GetWareOut();
                }
            }
        );
    }

    Delete(id:number){
        if(id!=null){
            this.Api.DeleteWare(id).subscribe({
                next:(resp)=>{
                    this.GetWareOut();
                    alert("Delete Successfuly !");
                },
                error:(resp)=>{
                    alert('Delete Fail !');
                }
            })
        }
    }


    IdWares1:any=[];
    check1:boolean=false;
    ID1:any;
    checkBox1:Boolean=false;
    deleteWare1(data:any){

        this.checkBox1=data.target.checked
        this.ID1=data.target.value;
       // const test1=this.ID.Tostring();
       console.log(this.ID1);
        if(this.checkBox1){
            this.IdWares1.push(this.ID1);
        }else{
            this.IdWares1.pop(...this.ID1);
        }
       // this.IdWares.push(...data);
        // console.log(data.target.value);
        // console.log(data.target.checked);
        console.log(this.IdWares1);
    }
 
    successDelete1:boolean=false;
    CheckBoxDelete1(){
        // this.IdWares.forEach(element => {
        //     this.Api.DeleteWare(element);
        // });
        
        for(let data of this.IdWares1){
             this.Api.DeleteWare(data).subscribe({
                next:(resp)=>{
                    this.GetWareOut();
                    this.successDelete1=true;
                },
                error:(err)=>{
                    
                    this.successDelete1=false;
                }
             })
            console.log(data);
        }
        // if(this.successDelete){
        //     alert("Delete Successed !");
        // }else{
        //     alert("Delete Fail !");
        // }
       this.IdWares=[];
    }
    

}

export class WaresModel{
    id?:number;
    Code?:String
    Name?:String;
    Description?:String
}