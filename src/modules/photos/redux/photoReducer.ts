import { ActionType, createCustomAction, getType } from "typesafe-actions";
import { IPhotoParams } from "../../../models/photo";

export const setPhotos = createCustomAction(
  "photos/setPhotos",
  (data: Array<IPhotoParams>) => ({ data })
);

const actions = { setPhotos };

type Action = ActionType<typeof actions>;

export default function reducer(
  state: Array<IPhotoParams> = [],
  action: Action
) {
  switch (action.type) {
    case getType(setPhotos):
      return action.data;
    default:
      return state;
  }
}
