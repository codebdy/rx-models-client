export const TOKEN_ENTITY = 'entity';

export class MagicQueryMeta{
  private _queryJSON:any;
  private _entity = '';
  private _commands:string[] = [];
  private _otherJSON = {} as any;
  private _modelKey = '';

  constructor(query:string){
    try {
    this._queryJSON = JSON.parse(query);
    }
    catch(error){
      console.error(query, error);
    }
    if(!this._queryJSON){
      return;
    }
    for(const key in this._queryJSON){
      const keyStringArray = key.split('@');
      if(keyStringArray[0].trim().toLowerCase() === TOKEN_ENTITY){
        this._entity = this._queryJSON[key];
        this._commands = keyStringArray.slice(1).map(command => '@' + command);
        this._modelKey = key;
      }
      else{
        this._otherJSON[key] = this._queryJSON[key];
      }
    }
  }

  addCondition(key:string, value:any){
    this._otherJSON[key] = value;
  }

  get entity(){
    return this._entity;
  }

  get commands():string[]{
    return this._commands;
  }

  get otherJSON(){
    return this._otherJSON;
  }

}