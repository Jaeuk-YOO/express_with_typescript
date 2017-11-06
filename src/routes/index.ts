import {NextFunction, Request, Response, Router} from "express";
import {BaseRoute} from "./route";

export class IndexRoute extends BaseRoute {


  public static create(router: Router){
    router.get('/', (req:Request,res:Response,next:NextFunction) => {
      new IndexRoute().index(req,res,next)
    });
  }

  constructor() {
    super();
  }

  public index(req:Request,res:Response,next:NextFunction){
    this.title = "index by types";

    let options: Object = {
      "message": "first index by typescript"
    };

    this.render(req, res, 'index', options);
  }
    
}

  
/* GET home page by pure express 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
*/
