import {NextFunction, Request, Response} from "express";

export class BaseRoute {

  title:string;
  scripts: string[];

  constructor(){
    this.title = "";
    this.scripts = [];
  }

  // res.render(view [, locals] [, callback])
  public render(req:Request, res:Response, views:string, options?:Object) {
    res.locals.BASE_URL="/";
    res.locals.title = this.title; //타이틀을 로컬 변수로 넘김
    res.render(views,options);
  }

}