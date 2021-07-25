import { API_MAGIC_QUERY } from "rxmodels-swr/api";
import { AxiosRequestConfig } from "axios";
import { MagicQueryMeta } from "./magic-query-meta";
import { WhereBuilder } from "./where-builder";

const orderBy = 'orderBy'
export class MagicQueryBuilder{

  private _entity: string = '';
  private _commands: string[] = [];
  private _take = "";
  private _skip = "";
  private _fetcher = "";
  private _orderBy: any = undefined;
  private _pageSize: number = 10;
  private _pageIndex: number = 0;
  private _isPagination = false;
  private _relations = {} as any;
  private _queryMeta?: MagicQueryMeta;
  private _whereGroup = new WhereBuilder();

  constructor(entity?:string){
    if(entity){
      this.setEntity(entity);      
    }
  }

  setEntity(entity:string){
    this._entity = entity;
    return this;
  }

  setQueryString(queryString?:string){
    if(queryString){
      this._queryMeta = new MagicQueryMeta(queryString);
      this._entity = this._queryMeta.entity;
    }

    return this;
  }

  setTake(count:number){
    this._take = `@take${count}`;
    return this;
  }

  setSkip(count:number){
    this._skip = `@skip${count}`;
    return this;    
  }

  setGetMany(){
    this._fetcher = "@getMany";
    return this;
  }

  setGetOne(){
    this._fetcher = "@getOne";
    return this;
  }

  addCondition(field:string, value:any, operator?:string){
    this._whereGroup.addCondition(field, value, operator);
    return this;
  }

  addRelation(field:string, value?:any){
    this._relations[field] = value||{};
    return this;
  }

  addEntityCommand(command:string){
    this._commands.push(`@${command}`);
    return this;
  }

  setTreeCommand(){
    this._commands.push(`@tree`);
    return this;
  }

  setOrderByASC(key: string){
    return this.setOrderBy(key, 'ASC');
  }

  setOrderByDESC(key: string){
    return this.setOrderBy(key, 'DESC');
  }

  setOrderBy(key: string, order: string){
    if(!this._orderBy){
      this._orderBy = {};
    }

    this._orderBy[key] = order;
    return this;
  }

  setOrderbyMap(orderBy:any){
    this._orderBy = orderBy;
    return this;
  }

  setPageSize(pageSize: number){
    this._isPagination = true;
    this._pageSize = pageSize;
    return this;
  }

  setPageIndex(pageIndex: number){
    this._isPagination = true;
    this._pageIndex = pageIndex;
    return this;
  }

  setWhereSql(whereStr: string){
    this._whereGroup.setWhereSql(whereStr);
    return this;
  }
  
  toAxioConfig():AxiosRequestConfig{
    return {
      ...API_MAGIC_QUERY,
      url:`${API_MAGIC_QUERY.url}/${encodeURI(this.toQueryString())}` 
    };
  }

  toUrl(){
    return this.toAxioConfig().url || null;
  }

  private toQueryString(){
    const queryObj = {} as any;
    const commands = this._queryMeta ? this._commands.concat(this._queryMeta.commands) : this._commands;
    const conditions = this._queryMeta ? {...this._whereGroup.toJSON(), ...this._queryMeta.otherJSON } : this._whereGroup.toJSON();

    const pagination = this._isPagination ? `@paginate(${this._pageSize},${this._pageIndex})` :'';
    queryObj[`entity ${this._take} ${this._skip} ${this._fetcher} ${commands.join(' ')} ${pagination}`] = this._entity;
    this._orderBy && (queryObj[orderBy] = this._orderBy);
    return JSON.stringify({...queryObj, ...conditions, ...this._relations});
  }
}