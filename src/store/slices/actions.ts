import { Point } from "../../types";

enum StrokeActionType {
  BEGIN_STROKE = "BEGIN_STROKE",
  UPDATE_STROKE = "UPDATE_STROKE",
  END_STROKE = "END_STROKE",
}

type BeginStroke = {
  type: StrokeActionType.BEGIN_STROKE;
  payload: Point;
};
type UpdateStroke = {
  type: StrokeActionType.UPDATE_STROKE;
  payload: Point;
};
type EndStroke = {
  type: StrokeActionType.END_STROKE;
};

type BoardAction = BeginStroke | UpdateStroke | EndStroke;

export const beginStroke = (point: Point): BoardAction => ({
  type: StrokeActionType.BEGIN_STROKE,
  payload: point,
});

export const updateStroke = (point: Point): BoardAction => ({
  type: StrokeActionType.UPDATE_STROKE,
  payload: point,
});

export const endStroke = (): BoardAction => ({
  type: StrokeActionType.END_STROKE,
});
