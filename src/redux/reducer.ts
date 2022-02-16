import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";
import intlReducer, { IntlState } from "../modules/intl/redux/intlReducer";
import authReducer, { AuthState } from "../modules/auth/redux/authReducer";
import photoReducer from "../modules/photos/redux/photoReducer";
import { IPhotoParams } from "../models/photo";

export interface AppState {
  router: RouterState;
  intl: IntlState;
  profile: AuthState;
  photos: Array<IPhotoParams>;
}

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    intl: intlReducer,
    profile: authReducer,
    photos: photoReducer,
  });
}
