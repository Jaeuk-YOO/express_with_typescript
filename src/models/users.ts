//InterfaceForUserModel will serve as the model interface for the users collection.
//InterfaceForModel will serve as the interface for all models in our application.

//몽고db에서의 collections - document
import { Document } from "mongoose";
import { InterfaceForUser } from "../interfaces/users";

//만들어둔 인터페이스유저.ts , 몽구스의 document의 확장 인터페이스를 만든다.
export interface InterfaceUserModel extends InterfaceForUser, Document {
  //custom methods for your model would be defined here
}