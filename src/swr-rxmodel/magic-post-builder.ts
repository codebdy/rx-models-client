export class MagicPostBuilder<T>{
  private _entity:string = '';
  private _datas:T[] = [];
  private _isSingle = false;
  private _commands: string[] = [];

  constructor(entity?:string){
    if(entity){
      this.setEntity(entity);      
    }
  }

  setEntity(entity:string){
    this._entity = entity;
    return this;
  }

  setSingleData(data:T){
    this._isSingle = true;
    this._datas = [data];
    return this;
  }

  addEntityCommand(command:string){
    this._commands.push(`@${command}`);
    return this;
  }

  setDatas(datas:T[]){
    this._datas = datas;
    return this;
  }
  
  addData(data:T){
    this._datas.push(data);
    return this;
  }
    
  toData(){
    return {
      [`${this._entity} ${this._commands.join(' ')}`]: this._isSingle ? this._datas[0] : this._datas
    };
  }
}