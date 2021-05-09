export class User{
    constructor(public email:string,
        public id:string,
        private _token:string,
        private _tokenExpirationDate:Date){}

        // these are things that we get from response from firebase
        get token(){
  if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate)
  {
// checking whether token is expired or not
return null;
  }
            return this._token;
        }

        
}