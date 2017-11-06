//Module resolution is the process the compiler uses to figure out what an import refers to. Consider an import statement like import { a } from "moduleA"; in order to check any use of a, the compiler needs to know exactly what it represents, and will need to check its definition moduleA.

import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import errorHandler = require("errorhandler");
import methodOverride = require("method-override");

import mongoose = require("mongoose"); //import mongoose

//인덱스 라우팅
import {IndexRoute} from "./routes/index"; 
/*
 * The server.
 *
 * @class Server
 */

 //몽고db의 users 콜렉션과 연결되는 인터페이스 - InterfaceForUser
import {InterfaceForUser} from "./interfaces/users";

//모델 임포트
import { InterfaceModel } from "./models/models"; //모든 모델에 영향을 미치는 model 인터페이스
import { InterfaceUserModel } from "./models/users"; //유저 모델에 영향을 미치는 usermodel 인터페이스

//스키마임포트
import { userSchema } from "./schemas/users"; //import userSchema

export class Server {

  public app: express.Application;
  private model: InterfaceModel; //an instance of IModel

  /*
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
   */
  public static bootstrap(): Server {
    return new Server();
  }


  /*
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
    
    //create expressjs application
    this.app = express();
  
    //configure application
    this.config();
  
    //add routes
    this.routes();
  
    //add api
    this.api();
    
    //create 모델 인스턴스
    this.model = Object(this.model);
    
  }

  /*
   * Create REST API routes
   *
   * @class Server
   * @method api
   */
  public api() {
    //empty for now
  }

  /*
   * Configure application
   *
   * @class Server
   * @method config
   */
  //app.configure()는 4버전에서 지워졌습니다. ts에서는 다음의 경우로 환경설정을 합니다.
  public config() {
    
    //add static paths 정적인 경로 추가
    this.app.use(express.static(path.join(__dirname, "public")));
  
    //configure ejs app.set()으로 뷰 엔진 추가, 뷰 경로 설정
    this.app.engine('.html', require('ejs').__express); 
    this.app.set("views", path.join(__dirname, "views"));
    this.app.set("view engine", "ejs");
  
    //use logger middlware
    this.app.use(logger("dev"));
  
    //use json form parser middlware
    this.app.use(bodyParser.json());
  
    //use query string parser middlware
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));
  
    //use cookie parser middleware
    this.app.use(cookieParser("SECRET_GOES_HERE"));
  
    //use override middlware
    this.app.use(methodOverride());

    // 로컬서버에서 몽고디비를 연결하겠습니당 ps. 몽고 커넥션 변수는 상수로 하나 존재하는걸 보니 데이터베이스 하나에 다 쑤셔넣어야 하는듯...
    const MONGODB_CONNECTION: string = "mongodb://127.0.0.1:27017/test";
    
    //connect to mongoose
    let connection: mongoose.Connection = mongoose.createConnection(MONGODB_CONNECTION);

    //create models
    this.model.user = connection.model<InterfaceUserModel>("User", userSchema);
    
  
    //catch 404 and forward to error handler
    this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
        err.status = 404;
        next(err);
    });
  
    //error handling
    this.app.use(errorHandler());

  }

  /*
   * Create router
   *
   * @class Server
   * @method api
   */

  public routes() {
  
    let router:express.Router = express.Router();

    //IndexRoute import from ./routes
    IndexRoute.create(router);
    this.app.use(router);

    /* pure express route
      var app = express();

      app.use(function (req, res, next) {
        console.log('Time:', Date.now());
        next();
      });
    */
  }

}
