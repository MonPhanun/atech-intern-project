import {Component} from '@angular/core'
import { Router } from '@angular/router';

@Component({
    selector:'my-root',
    templateUrl:'./MyTest.component.html',
    styleUrls:['./MyTest.component.css']
})

export class MyTest{

    constructor(private rout:Router){}

    page1_title='data resurce not working now !';
    show_not:boolean=false;
    data:string='';
    inputevent(eventdata:Event){
        //console.log(eventdata);
        //this.data=(<HTMLInputElement>eventdata.target).value;
       // console.log(this.data);
    }

    GotoWare(){
        this.rout.navigate(['wares']);
    }

    id:boolean=false;
    hidents(){
        if(!this.id){
            this.id=true
        }else{
      
            this.id=false;
        }

    }
    showtext(eventdata:Event){
        this.data=(<HTMLInputElement>eventdata.target).value;
    }

    showdata(data1:string){
        this.data=data1;
    }
}