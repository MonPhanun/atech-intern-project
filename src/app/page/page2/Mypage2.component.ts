import {AfterViewInit, Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { DetailStock } from './Detail_dialog/Detail_dialog.component';
import { StockDialog } from './Dialog/StockDialog.component';

declare const $: any;
@Component({
    selector:'mypage2-root',
    templateUrl:'./Mypage2.component.html',
    styleUrls:['./Mypage2.component.css']
})


export class Mypage2 implements OnInit,AfterViewInit{

    constructor(
        private Api:ApiService,
        private dialog:MatDialog
    ){}

    ngAfterViewInit(): void {
        setTimeout(()=>{
            $('#myTable').DataTable({
                pagingType:'full_numbers',
                pageLength:5,
                processing:true,
                lengthMenu:[5,10,25,50],
                order:[[1,'desc']]
    
            },1);
           },500)
    }
    ngOnInit(): void {
        this.GetAllStockApi();
    }

    StockDataApi:any=[];

    GetAllStockApi(){
        return this.Api.CatchAllStock().subscribe({
            next:(resp)=>{
                this.StockDataApi=resp.data;
                console.log(resp);
            },
            error:(err)=>{
                console.log(err);
            }
        })
    }
    Idstock:any=[];
    ResulIdstock:any={}
    DeleteOnlyStock(data:any){
        this.Idstock.push(data);
        this.ResulIdstock={"id":this.Idstock}
        console.log(JSON.stringify(this.ResulIdstock));
        return this.Api.DeleteStockApi(this.ResulIdstock).subscribe({
            next:(resp)=>{

                console.log(resp);
                this.GetAllStockApi();
            },
            error:(err)=>{
                console.log(err);
               alert("faild !");
            }
        })
    }
    check=false;
    IdStock:any;

    ArrStockID:any=[];
    ResultID={};
    CheckBoxDelete(data:any){
        this.check=data.target.checked;
        this.IdStock=data.target.value;
        if(this.check){
            this.ArrStockID.push(this.IdStock);
        }else{
            this.ArrStockID.pop(...this.IdStock);
        }

        this.ResultID={"id":this.ArrStockID}
       // console.log(this.ResultID);
    }

    DeleteAllCheckBox(){
        this.Api.DeleteStockApi(this.ResultID).subscribe({
            next:(resp)=>{
                console.log(resp);
                this.GetAllStockApi();
            },
            error:(err)=>{
                console.log(err);
            }
        })
        this.ArrStockID=[];
    }

    EditStock(row:any){
        this.dialog.open(StockDialog,{
            width:'500px',
            height:'400px',
            data:row
        }).afterClosed().subscribe(val=>{
            if(val==='Edit'){
                this.GetAllStockApi();
            }
        })
       // console.log(row);
    }

    OpenDialog(){
        this.dialog.open(StockDialog,{
            width:'500px',
            height:'400px'
        }).afterClosed().subscribe(val=>{
            if(val==='Save'){
                this.GetAllStockApi();
            }
        })
    }

    OpenDialogDetail(row:any){
        this.dialog.open(DetailStock,{
            width:'900px',
            height:'700px',
            data:row
        })
    }

} 