import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { Autorization } from "./Auth.service";

@Injectable()
export class GuidService implements CanActivate,CanActivateChild{

    constructor(private auth:Autorization,private rout:Router) {
        
    }
   
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
       
        if(this.auth.AuthorizationHere()){
          //  this.rout.navigate(['page2']);
            return true;
        }else{
            this.rout.navigate(['form']);
            return false;
        }
    }// using for Rout

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
       
        return this.canActivate(childRoute,state);
    } // using for child Rout

}