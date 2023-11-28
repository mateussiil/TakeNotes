import {
  Canvas,
  ExtendedTouchInfo,
  Path,
  SkCanvas,
  Skia,
  SkiaView,
  TouchInfo,
  useDrawCallback,
  useTouchHandler,
} from '@shopify/react-native-skia';
import React, {useCallback, useRef, useState} from 'react';
import {
  LayoutChangeEvent,
  SafeAreaView,
  useWindowDimensions,
  View,
} from 'react-native';
import useDrawingStore, {CurrentPath} from '../../store';
import Header from '../../components/header';
import history from './history';
import Toolbar from '../../components/toolbar';
import { randomId } from './utils';

const Drawing = () => {
  const touchState = useRef(false);
  const canvasRef = useRef<SkCanvas>();
  const currentPath = useRef<CurrentPath | null>();
  const {width} = useWindowDimensions();
  const completedPaths = useDrawingStore(state => state.completedPaths);
  const addCompletedPath = useDrawingStore(state => state.addCompletedPath);
  const stroke = useDrawingStore(state => state.stroke);
  const [canvasHeight, setCanvasHeight] = useState(400);

  const onDrawingActive = useCallback((touchInfo: ExtendedTouchInfo) => {
    const {x, y} = touchInfo;
    if (!currentPath.current?.path) {
      return;
    }
    if (touchState.current) {
      currentPath.current.path.lineTo(x, y);
      if (currentPath.current) {
        canvasRef.current?.drawPath(
          currentPath.current.path,
          currentPath.current.paint,
        );
      }
    }
  }, []);

  const onDrawingStart = useCallback(
    (touchInfo: TouchInfo) => {
      if (currentPath.current) {
        return;
      }
      const {x, y} = touchInfo;
      currentPath.current = {
        path: Skia.Path.Make(),
        paint: stroke?.copy(),
      };

      touchState.current = true;
      currentPath.current.path?.moveTo(x, y);

      if (currentPath.current) {
        canvasRef.current?.drawPath(
          currentPath.current.path,
          currentPath.current.paint,
        );
      }
    },
    [stroke],
  );

  const onDrawingFinished = useCallback(() => {
    updatePaths();
    touchState.current = false;
    currentPath.current = null;
  }, []);

  const touchHandler = useTouchHandler({
    onActive: onDrawingActive,
    onStart: onDrawingStart,
    onEnd: onDrawingFinished,
  });

  const updatePaths = () => {
    if (!currentPath.current) {
      return;
    }
    
    if (!currentPath.current) {
      return;
    }

    // const updatedPaths = [...completedPaths];

    const newPath = {
      path: currentPath.current?.path.copy(),
      paint: currentPath.current?.paint.copy(),
      color: useDrawingStore.getState().color,
    }

    history.push(currentPath.current);

    addCompletedPath(newPath);
  };

  const onDraw = useDrawCallback((_canvas, info) => {
    touchHandler(info.touches);

    if (currentPath.current) {
      canvasRef.current?.drawPath(
        currentPath.current.path,
        currentPath.current.paint,
      );
    }

    if (!canvasRef.current) {
      useDrawingStore.getState().setCanvasInfo({
        width: info.width || width - 24,
        height: info.height || canvasHeight,
      });
      canvasRef.current = _canvas;
    }
  }, []);

  const onLayout = (event: LayoutChangeEvent) => {
    setCanvasHeight(event.nativeEvent.layout.height);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View
        style={{
          backgroundColor: '#f0f0f0',
          flex: 1,
          alignItems: 'center',
        }}>
        <Header />

        <View
          onLayout={onLayout}
          style={{
            width: width - 24,
            flexGrow: 1,
            backgroundColor: '#ffffff',
            borderRadius: 10,
            overflow: 'hidden',
            elevation: 1,
          }}>
          <SkiaView
            onDraw={onDraw}
            style={{height: canvasHeight, width: width - 24, zIndex: 10}}
          />
          <Canvas
            style={{
              height: canvasHeight,
              width: width - 24,
              position: 'absolute',
            }}>
            {completedPaths?.map(path => (
              <Path
                key={randomId()}
                path={path.path}
                paint={path.paint}
              />
            ))}
          </Canvas>
        </View>
        <Toolbar />
      </View>
    </SafeAreaView>
  );
};

export default Drawing;
