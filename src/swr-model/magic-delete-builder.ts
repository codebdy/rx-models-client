import { isString } from "lodash";

export class MagicDeleteBuilder<T> {
  private _entity: string = '';
  private _ids: number[] = [];
  private _cascades: string[] = [];

  setEntity(entity:string | T&Function){
    this._entity = isString(entity) ? entity : entity.name;
    return this;
  }

  setIds(ids:number[]) {
    this._ids = ids;
    return this;
  }

  addId(id: number|undefined) {
    id && this._ids.push(id);
    return this;
  }

  addCascade(relation: string){
    this._cascades.push(relation);
    return this;
  }
    
  toData() {
    const cascades = this._cascades.length > 0 ? `@cascade(${this._cascades.join(',')})` :'';
    return {
      [`${this._entity} ${cascades}`]: this._ids
    };
  }
}