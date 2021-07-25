export class MagicUploadBuilder{
  private _entity:string = 'RxMedia';
  private _data:any = {};
  private _file:File|null = null;

  constructor(entity?:string){
    if(entity){
      this.setEntity(entity);      
    }
  }

  setEntity(entity:string){
    this._entity = entity;
    return this;
  }

  setData(data:any){
    this._data = data;
    return this;
  }
  
  setFile(file:File){
    this._file = file;
    return this;
  }

  toData(){
    const formData = new FormData()
    formData.append('entity', this._entity);
    formData.append('file', this._file as any);
    for(const key in this._data){
      formData.append(key, this._data[key]);
    }
    return formData;
  }
}