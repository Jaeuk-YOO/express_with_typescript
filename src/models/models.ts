import { Model } from "mongoose";

// linked by /models/users.ts
import { InterfaceUserModel } from "./users";

export interface InterfaceModel {
  user: Model<InterfaceUserModel>;
}
//the user property is Model of type InterfaceUserModel. create/edit/delete documents within our users collection.

// 모델 연결 정리...
// 몽고db의 users databases - 

//현재 만들어진 user관련 파일
// /interface users.ts
// /models users.ts
// /models models.ts
// /schemas users.ts