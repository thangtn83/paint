import React, { useEffect, useRef } from 'react';
import { drawStroke, setCanvasSize } from './utils/canvasUtils';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from './store';
import {
  beginStroke,
  endStroke,
  updateStroke,
} from './store/slices/boardSlice';
import { getCurrentStroke } from './store/slices/boardSlice';

const WIDTH = 1024;
const HEIGHT = 768;
function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dispatch = useDispatch();

  const currentStroke = useSelector<AppState>((state) =>
    getCurrentStroke(state.board)
  );
  const isDrawing = useSelector<AppState>(
    (state) => !!state.board.currentStroke.points.length
  );

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
    if (isDrawing) dispatch(endStroke());
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

  return (
    <div className={'window'}>
      <div className={'title-bar'}>
        <div className="title-bar-text">Paint</div>
        <div className="title-bar-controls">
          <button aria-label={'Close'}></button>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
        onMouseMove={draw}
      />
    </div>
  );
}

export default App;
