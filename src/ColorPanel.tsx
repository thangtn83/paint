// @flow
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentColor, setCurrentColor } from './store/slices/currentStroke';

const COLORS = ['#00FFFF', '#000080', '#FF0000', '#008000'];
export const ColorPanel = () => {
  const dispatch = useDispatch();
  const currentColor = useSelector(getCurrentColor);

  function handleSelectColor(color: string) {
    dispatch(setCurrentColor(color));
  }

  return (
    <div className={'color-panel'}>
      <div
        className={'current-color'}
        style={{ background: currentColor }}
      ></div>
      {COLORS.map((color) => (
        <span
          onClick={() => handleSelectColor(color)}
          key={color}
          style={{ background: color }}
          className={'color-selector'}
        ></span>
      ))}
    </div>
  );
};
