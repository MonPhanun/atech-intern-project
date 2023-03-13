import{ AfterViewInit, Component, OnInit,ViewChild } from '@angular/core';
import {MAT_DIALOG_DATA,MatDialog} from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { Dialog } from './Dialog/Dialog.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { tick } from '@angular/core/testing';
import { RigisterProduct } from './Rigister_Product/Rigister_Product.component';
declare const $: any;

@Component({
    selector:'product-root',
    templateUrl:'./Product.component.html',
    styleUrls:['./Product.component.css']

})

export class Product implements AfterViewInit,OnInit{

    // dataSource !: MatTableDataSource<any>;
    // @ViewChild(MatPaginator) paginator !: MatPaginator;
    // @ViewChild(MatSort) sort !: MatSort;

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

    constructor(private dialog:MatDialog,private Api:ApiService){}


    ngOnInit(): void {
        this.GetAllProduct();
       
       this.AllProductApi();
      
    }

    AllProduct:any=[];

    AllProductApi(){

        return this.Api.CatchAllProductApi().subscribe(
            {
                next: (val: any)=>{
                    this.AllProduct=val.data;
                    console.log(val.data);
                    console.log(this.AllProduct);
                }
            }
       )
    }

    dataDe:any={};
    dataArr:any=[];
    DeleteProductApi(data:number){
        this.dataArr.push(data);
        this.dataDe={"id":this.dataArr}
        
        console.log(JSON.stringify(this.dataDe))
        return this.Api.DeleteProductApi(this.dataDe).subscribe({
            next:(resp)=>{
                console.log(resp);
                this.AllProductApi();
            },
            error:(err)=>{
                console.log(err);
            }
        })
    }

    IdProductApi:any=[];
    IDApi:any;
    CheckBoxApi=false;
    ResultIdProductAPI={};
    DeleteCheckBoxApi(data:any){
        this.IDApi=data.target.value;
        this.CheckBoxApi=data.target.checked;
        
        if(this.CheckBoxApi){
            this.IdProductApi.push(this.IDApi);
        }else{
            this.IdProductApi.pop(...this.IDApi);
        }
        this.ResultIdProductAPI={"id":this.IdProductApi};
        console.log(this.CheckBoxApi);
        console.log(this.IdProductApi);
        console.log(this.ResultIdProductAPI);
    }

    ResultCheckBoxDeleteApi(){
        return this.Api.DeleteProductApi(this.ResultIdProductAPI).subscribe({
            next:(resp)=>{
                console.log(resp);
                this.AllProductApi();
            },
            error:(er)=>{
                console.log(er);
            }
        })
    }


    tes2(){

        return this.Api.GetdataTest().subscribe(
            {
                next: (val)=>{
                    console.log(val);
                }
            }
       )
    }
    openDialog(){
        this.dialog.open(Dialog, {
            height: '500px',
            width: '500px',
          })
          .afterClosed().subscribe(val=>{
            if(val==="Save"){
                this.AllProductApi();
            }
          })
    }

    onEditApi(row:any){
        this.dialog.open(Dialog, {
            height: '500px',
            width: '500px',
            data:row
          }).afterClosed().subscribe(val=>{
            if(val==="Update"){
                this.AllProductApi();
            }
          });
    }


    openRegisterdialog(){
        this.dialog.open(RigisterProduct,{
            height: '650px',
            width: '700px',
        }).afterClosed().subscribe(val=>{
            if(val==='rigister'){
                this.AllProductApi();
            }
        })
    }

    


//===================================================>>>
    openDialog1(){
        this.dialog.open(Dialog, {
            height: '500px',
            width: '500px',
          })
          .afterClosed().subscribe(val=>{
            if(val==="Save"){
                this.GetAllProduct();
            }
          })
    }

    productResp:any;

    filterText='';
  
    GetAllProduct():any{
        if(this.Api.GetData()!=null){
            // return this.Api.GetData().subscribe({
            //     next:(res)=>{
            //                     // console.log(res);
            //                     // 

            //                     // this.dataSource=new MatTableDataSource(res);
            //                     // this.dataSource.paginator=this.paginator;
            //                     // this.dataSource.sort=this.sort;
            //                     this.productResp=res;
                              
            //                 },
            //     error:(resp)=>{
            //       //  alert("Error !");
            //     }
            // })
        }
    }

    onEdit(row:any){
        this.dialog.open(Dialog, {
            height: '500px',
            width: '500px',
            data:row
          }).afterClosed().subscribe(val=>{
            if(val==="Update"){
                this.GetAllProduct();
            }
          });
    }

    OnDelete(id:number){
        this.Api.Delete(id).subscribe({
            next:(ref)=>{
                this.GetAllProduct();
                alert("Product has delete Succesfuly !");
            },
            error:(ref)=>{
                alert("Delete Product Not Succesfuly")
            }
        })
    }

    // test():any{
    //    console.log(this.productResp);
    // }
    IdProduct:any=[];

    ID:any;
    CheckBox=false;
    DeleteCheckBox(data:any){
        this.ID=data.target.value;
        this.CheckBox=data.target.checked;
        
        if(this.CheckBox){
            this.IdProduct.push(this.ID);
        }else{
            this.IdProduct.pop(...this.ID);
        }

        console.log(this.IdProduct);
        console.log(data.target.checked);
    }

    checkDelete:boolean=false;
    DeleteProCheckBox(){
        this.checkDelete=false;
        for(let item of this.IdProduct){
            this.Api.Delete(item).subscribe({
                next:(resp)=>{
                    this.GetAllProduct();
                    this.checkDelete=true;
                    console.log(this.checkDelete);
                },
                error:(err)=>{
                    this.checkDelete=false;
                    console.log(this.checkDelete);
                }
            })
            console.log(item)
        }

        console.log(this.checkDelete);

        // if(this.checkDelete){
        //     alert("Delete Success !");
        // }else{
        //     alert("Delete fail !");
        // }
        this.IdProduct=[];
    }

}