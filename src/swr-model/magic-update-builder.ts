export class MagicUpdateBuilder {
  private _entity: string = '';
  private _ids: number[] = [];
  private _params: any;

  constructor(entity?:string){
    if(entity){
      this.setEntity(entity);      
    }
  }

  setEntity(entity:string){
    this._entity = entity;
    return this;
  }
  
  setIds(ids:number[]) {
    this._ids = ids;
    return this;
  }

  setParams(params:any){
    this._params = params;
    return this;
  }

  addId(id: number|undefined) {
    id && this._ids.push(id);
    return this;
  }

    
  toData() {
    return {
      [
        `${this._entity}`]: {
          ...this._params,
          ids:this._ids
        }
    };
  }
}