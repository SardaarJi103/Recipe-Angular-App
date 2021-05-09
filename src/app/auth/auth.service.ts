import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject,  throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";
import{environment} from '../../environments/environment';

export interface AuthResponseData{
    //this interface defines how our response data looks like
    // it has six properties

    kind:string,
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string,
    registered?:boolean

    //? means optional
}


@Injectable({providedIn:'root'})
export class AuthService {

user=new BehaviorSubject<User>(null);
//same as Subject from rxjs/operators but also 
// allows us to have access on prevoius emitted values

private tokenExpirationTime: any;
 
// to emit a new user whenver we have one as we login or lgout

    constructor(private http:HttpClient,
        private router:Router){

    }
    
    signUp(email:string,password:string){
return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
{
    //AuthResponseData represnts our resposed data format
    email:email,
    password:password,
    returnSecureToken:true

    //these three thongs are required in sign up auth
}
)
.pipe(catchError(this.handleError),tap(resData=>{
    this.handleAuthentication(resData.email,
        resData.localId,
        resData.idToken,
        +resData.expiresIn);
}


));
// tap allows us to perform some actions withput changing response
    };

    login(email:string,password:string){
      return  this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
        {
          email:email,
          password:password,
          returnSecureToken:true
        }
        )
        .pipe(catchError(this.handleError),tap(resData=>{
            //we are using this tap to whenever client logins
            this.handleAuthentication(resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIn);
        }
        
        
        ))

        

    }


    autoLogin(){
      const userData: {
          email:string,
          id:string,
          _token:string,
          _tokenExpirationDate:string;
      }= JSON.parse(localStorage.getItem('userData'));

      if(!userData){
          return;
      }

      const loadedUser=new User(userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate));

        if(loadedUser.token){
            this.user.next(loadedUser);
            const expirationDuration= new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();

            this.autoLogout(expirationDuration);
        }
    }

    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTime){
            clearTimeout(this.tokenExpirationTime);
        }
        this.tokenExpirationTime=null;
    }
 
autoLogout(expirationDuration:number){
    
    this.tokenExpirationTime=setTimeout(()=>{
       this.logout(); 
    },expirationDuration)

}


    private handleAuthentication(
        email:string,
        userId:string,
        token:string,
        expiresIn:number){

        const expirationDate=new Date(new Date().getTime() + expiresIn*1000);
        //here we are converting the expiration time that we got in milliseconds into a proper date 
        
        const user=new User(
            email,
            userId,
            token,
            expirationDate);

            this.user.next(user);
            this.autoLogout(expiresIn*1000)
            localStorage.setItem('userData',JSON.stringify(user));
            //stroing token of user in localStorage and converting 
            // javascript object into string

    }

    private handleError(errorRes:HttpErrorResponse){
              
        let errorMessage='An unknown error occured';
        if(!errorRes.error || !errorRes.error.error){
            return throwError(errorMessage);
        }
        switch(errorRes.error.error.message){
            case 'EMAIL_EXISTS' :
               errorMessage='This email already exists'; 
               break;
            case 'INVALID_PASSWORD':
            errorMessage='Password not correct';
               break;
            case 'EMAIL_NOT_FOUND':
                errorMessage='This email is not found';
                break;

                // these cases are defined in firebase auth sectiion
        }

        return throwError(errorMessage);
    }
}