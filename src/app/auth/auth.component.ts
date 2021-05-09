import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AuthService,AuthResponseData} from "./auth.service";
import {AlertComponent} from '../shared/alert/alert.component'
import { PlaceHolderDirective } from "../shared/placeholder/placeholder.directive";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy{
isLoginMode=true;
isLoading=false;
error:string=null;
private closeSub:Subscription;
@ViewChild(PlaceHolderDirective) alertHost:PlaceHolderDirective;
//@ViewChild finds the firstoccurence of thedirective

constructor(private authService:AuthService
    ,private router:Router,private componentFactoryResolver:ComponentFactoryResolver ){

}

onSwitchMode(){
    this.isLoginMode=!this.isLoginMode;

}

onSubmit(form:NgForm){
    if(!form.valid){
return;
    }
    const email=form.value.email;
    const password=form.value.password;

let authObs:Observable<AuthResponseData>

this.isLoading=true;

    if(this.isLoginMode)
    {
        //checks if logging in
    authObs=    this.authService.login(email,password);
    }
    else{
        console.log(form.value);
       
      authObs=  this.authService.signUp(email,password);
    }

    authObs.subscribe( responseData=>{
        console.log(responseData);
        this.isLoading=false;
        this.router.navigate(['/recipes']);
        //navigste to recipes after login
    }
,errorMessage=>{
   this.error=errorMessage;
   this.isLoading=false;
//    this.showErrorAlert(errorMessage);
   console.log(errorMessage);
});

//subscribe as it is a observable
form.reset();
}

onHandleError(){
    this.error=null
}


// private showErrorAlert(message:string){

//     //dynamically create program with code
//   const alertCmpFactory= this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
// // resturns component factory

//   const hostViewContainer=this.alertHost.viewContainerRef;
//   hostViewContainer.clear();
//   const componentRef=hostViewContainer.createComponent(alertCmpFactory);
//   componentRef.instance.message=message;
//   this.closeSub=componentRef.instance.close.subscribe(()=>{
// this.closeSub.unsubscribe();
// hostViewContainer.clear();
//   });

// }

ngOnDestroy(){
    if(this.closeSub){
        this.closeSub.unsubscribe();
    }
}
}