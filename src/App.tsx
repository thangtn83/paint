import React, { useEffect, useRef } from 'react';
import { clearCanvas, drawStroke, setCanvasSize } from './utils/canvasUtils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import {
  beginStroke,
  getCurrentStroke,
  updateStroke,
} from './store/slices/currentStroke';
import { ColorPanel } from './ColorPanel';
import { Stroke } from './types';
import { endStroke } from './store/sharedAction';
import { getStepHistory, redo, undo } from './store/slices/stepHistorySlice';
import { getStrokes } from './store/slices/strokesSlice';

const WIDTH = 1024;
const HEIGHT = 768;
function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dispatch = useDispatch();

  const strokes = useSelector<RootState>(getStrokes) as Stroke[];
  const currentStroke = useSelector<RootState>(getCurrentStroke) as Stroke;
  const stepHistory = useSelector<RootState>(getStepHistory) as number;
  const isDrawing = !!currentStroke.points.length;
  const getCanvasWithContext = (canvas = canvasRef.current) => {
    return { canvas, context: canvas?.getContext('2d') };
  };

  const initCanvas = () => {
    const { canvas, context } = getCanvasWithContext();
    if (!canvas || !context) return;
    setCanvasSize(canvas, WIDTH, HEIGHT);

    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.lineWidth = 5;
    context.strokeStyle = 'black';
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX: x, offsetY: y } = e.nativeEvent;
    dispatch(beginStroke({ x, y }));
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const { offsetX: x, offsetY: y } = e.nativeEvent;
    dispatch(updateStroke({ x, y }));
  };

  const endDrawing = () => {
    if (isDrawing)
      dispatch(endStroke({ stroke: currentStroke, stepIndex: stepHistory }));
  };

  const handleClickedUndoBtn = () => {
    dispatch(undo());
  };
  const handleClickedRedoBtn = () => {
    dispatch(redo(strokes.length));
  };

  useEffect(() => {
    initCanvas();
  }, []);

  useEffect(() => {
    const { context } = getCanvasWithContext();
    if (!context) return;
    requestAnimationFrame(() => {
      return drawStroke(context, currentStroke.points, currentStroke.color);
    });
  }, [currentStroke]);

  useEffect(() => {
    const { canvas, context } = getCanvasWithContext();
    if (!canvas || !context) return;
    requestAnimationFrame(() => {
      clearCanvas(canvas);
      strokes.slice(0, stepHistory).forEach((stroke) => {
        drawStroke(context, stroke.points, stroke.color);
      });
    });
  }, [stepHistory]);

  return (
    <div className={'window'}>
      <div className={'title-bar'}>
        <div className="title-bar-text">Paint</div>
        <div className="title-bar-controls">
          <button aria-label={'Close'}></button>
        </div>
      </div>

      <div className="window-body">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={endDrawing}
          onMouseOut={endDrawing}
          onMouseMove={draw}
        />
        <div>
          <button onClick={handleClickedUndoBtn}>undo</button>
          <button onClick={handleClickedRedoBtn}>redo</button>
        </div>

        <ColorPanel />
      </div>
    </div>
  );
}

export default App;
