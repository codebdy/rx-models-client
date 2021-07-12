export class MagicPostBuilder{
  private _entity:string = '';
  private _datas:any[] = [];
  private _isSingle = false;
  private _commands: string[] = [];

  setEntity(entity:string){
    this._entity = entity;
    return this;
  }

  setSingleData(data:any){
    this._isSingle = true;
    this._datas = [data];
    return this;
  }

  addEntityCommand(command:string){
    this._commands.push(`@${command}`);
    return this;
  }

  setDatas(datas:any[]){
    this._datas = datas;
    return this;
  }
  
  addData(data:any){
    this._datas.push(data);
    return this;
  }
    
  toData(){
    return {
      [`${this._entity} ${this._commands.join(' ')}`]: this._isSingle ? this._datas[0] : this._datas
    };
  }
}