import {Component, OnInit} from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

import { Wares } from '../Wares.component';

@Component({
    selector:'Detail-root',
    templateUrl:'./WaresDetail.component.html',
    styleUrls:['./WaresDetail.component.css']
})

export class WaresDetail implements OnInit{

    WaresDetail:any;
    WaresId:number=0;

    constructor(
        private activateRoute:ActivatedRoute,
        // private wa:Wares,
        
     ){}

     ngOnInit(): void {
    //    this.WaresId=this.activateRoute.snapshot.params['id'];
    //    this.WaresDetail= this.wa.WareResp.find((d: { id: any; })=>d.id==this.WaresId)
    //    console.log(this.WaresDetail);
    }


}