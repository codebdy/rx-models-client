export interface User {
  id: ID;
  loginName: string;
  isSupper?: boolean;
  isDemo?: boolean;
  auths?: ID[];
}

type ID = number;

export class LoggedUser{
  meta?:User;

  constructor(user: User|undefined){
    this.meta = user;
  }

  authCheck(...auths:ID[]|string[]) {
    if(!this.meta || !this.meta.loginName){
      return false;
    }

    if(this.meta.isSupper || this.meta.isDemo){
      return true;
    }
    if(!auths || !this.meta.auths){
      return false;
    }
    for(var i = 0; i < auths.length; i++){
      let auth = auths[i]
      for(var j = 0; j < this.meta.auths.length; j++){
        if(auth ===  this.meta.auths[j]){
          return true;
        }
      }
    }
    return false;
  }
}