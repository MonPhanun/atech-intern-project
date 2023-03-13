import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WaresModel } from '../page/Wares/Wares.component';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService  {


  constructor(private http : HttpClient ) { }
  

  PostProduct(data:any){
    return this.http.post<any>("http://localhost:3000/PostProduct/",data);
  }

  GetData(){
    return this.http.get<any>("http://localhost:3000/PostProduct/");
  }
   
  UpdateProduct(data:any,id:string){
    return this.http.put<any>("http://localhost:3000/PostProduct/"+id,data);
  }

  Delete(id:number){
    return this.http.delete<any>("http://localhost:3000/PostProduct/"+id);
  }

  PostWare(data:any){
    return this.http.post<any>("http://localhost:3000/PostWares/",data);
  }
//=================

   GetWare():Observable<any> {
   // var lis=[];
   //  this.http.get<any>("http://localhost:3000/PostWares/").pipe(map(resulft=>{resulft}));
     // return this.http.get<any>("http://localhost:3000/PostWares/")
   // return lis;
 
    return this.http.get("http://localhost:3000/PostWares/").pipe(map(res => res));
  }
  

  UpdateWare(data:any,id:string){
    return this.http.put<any>("http://localhost:3000/PostWares/"+id,data);
  }

  DeleteWare(id:number){
    return this.http.delete<any>("http://localhost:3000/PostWares/"+id);
  }

  //========== Real API =========>
 //  Access Origin AllowAccess Controll

//===================== Product

 CatchAllProductApi(){
    return  this.http.post<any>('http://192.168.0.33:8884/api/product/getAll',JSON.stringify({"id":null}),HTTP_OPTIONS);
  }
  
  GetdataTest(){
    return this.http.get<any>("http://192.168.0.33:8884/api/product/f9ewpqr");
  }

  PostProductApi(data:any){
    return this.http.post<any>('http://192.168.0.33:8884/api/Product',JSON.stringify(data),HTTP_OPTIONS);
  }

  DeleteProductApi(data:any){
    return this.http.delete<any>('http://192.168.0.33:8884/api/Product',{headers:HTTP_OPTIONS.headers,body:JSON.stringify(data)});
  }//{headers:HTTP_OPTIONS.headers,body:JSON.stringify(data)}

  UpdateProductApi(data:any){
    return this.http.put<any>('http://192.168.0.33:8884/api/Product',JSON.stringify(data),HTTP_OPTIONS);
  }

  //=============================>> Wares 

  CatchAllWares(){
    return this.http.post<any>("http://192.168.0.33:8884/api/Ware/GetAll",JSON.stringify({"id":null}),HTTP_OPTIONS);
  }

  DeleteOnlyWareApi(data:any){
    console.log(JSON.stringify(data));
    return this.http.delete("http://192.168.0.33:8884/api/ware",{headers:HTTP_OPTIONS.headers,body:JSON.stringify(data)});
  }

  CreateWaresApi(data:any){
    return this.http.post<any>('http://192.168.0.33:8884/api/ware',JSON.stringify(data),HTTP_OPTIONS);
  }

  UpdateWareApi(data:any){
    return this.http.put<any>('http://192.168.0.33:8884/api/ware',JSON.stringify(data),HTTP_OPTIONS);
  }

    //=============================>> Stocking 

  CatchAllStock(){
    return this.http.post<any>('http://192.168.0.33:8884/api/stock',JSON.stringify({"id":null}),HTTP_OPTIONS);
  }

  CreateStockApi(data:any){
    //console.log(JSON.stringify(data))
    return this.http.post<any>("http://192.168.0.33:8884/api/Stock/Create/",JSON.stringify(data),HTTP_OPTIONS);
  }

  DeleteStockApi(data:any){
    return this.http.delete("http://192.168.0.33:8884/api/Stock",{headers:HTTP_OPTIONS.headers,body:JSON.stringify(data)})
  }

  EditStockApi(data:any){
    return this.http.put("http://192.168.0.33:8884/api/Stock",JSON.stringify(data),HTTP_OPTIONS);
  }

  RigisterProduct(data:any){
    return this.http.post("http://192.168.0.33:8884/api/Stock/newproduct",JSON.stringify(data),HTTP_OPTIONS);
  }

  TransferStock(data:any){
    return this.http.put("http://192.168.0.33:8884/api/Stock/transfer",JSON.stringify(data),HTTP_OPTIONS);
  }

  //=========== Searching

  SearchProduct(data:any){
    return this.http.get("http://192.168.0.33:8884/api/Product/"+data,HTTP_OPTIONS);
  }

  SearchStock(data:any){
    return this.http.get("http://192.168.0.33:8884/api/Stock/"+data,HTTP_OPTIONS);
  }

  SearchWares(data:any){
    return this.http.get("http://192.168.0.33:8884/api/Ware/"+data,HTTP_OPTIONS);
  }

 }



export const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
     'Access-Control-Allow-Credentials' : 'true',
     'Access-Control-Allow-Origin': '*',
     'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
     'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
  })
};