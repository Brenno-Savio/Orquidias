import { reqValidate } from "../../types";
import userValidator from "./userValidator";

export default function reqValidator(req: reqValidate) {
  if(req.name === 'users') {
    const newReq = userValidator(req);
    return newReq;
  }
}
