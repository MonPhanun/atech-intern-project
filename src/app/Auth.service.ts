import { Injectable } from "@angular/core";


export class Autorization{
    loggedIn:boolean=false;
    
    Login(){
        this.loggedIn=true;
        return true;
    }

    logOut(){
        this.loggedIn=false;
    }

    AuthorizationHere(){
        return this.loggedIn;
    }
}