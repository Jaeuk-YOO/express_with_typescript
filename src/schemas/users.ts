import { Schema } from "mongoose";

export var userSchema: Schema = new Schema({
  createdAt:Date,
  name:String,
  phoneNumber:String,
  email:String
});

//.pre() == Defines a pre hook(==middleware) for the document.
//http://mongoosejs.com/docs/middleware.html -> https://github.com/bnoguchi/hooks-js // 쉽게말하면 먼저 실행하는 미들웨어.
userSchema.pre("save", function(next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});