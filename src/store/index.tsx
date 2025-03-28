import { DrawingInfo, SkPaint, SkPath} from '@shopify/react-native-skia';
import {create} from 'zustand';
import utils from '../pages/Drawing/utils';

export type CurrentPath = {
  path: SkPath;
  paint: SkPaint;
  color?: string;
};

interface DrawingStore {
  /**
   * Array of completed paths for redrawing
   */
  completedPaths: CurrentPath[];
  /**
   * A function to update completed paths
   */
  setCompletedPaths: (completedPaths: CurrentPath[]) => void;
  /**
  * A function to add completed path in current paths
  */
  addCompletedPath: (completedPath: CurrentPath) => void;
  /**
   * Current stroke
   */
  stroke: SkPaint;
  /**
   * Width of the stroke
   */
  strokeWidth: number;
  /**
   * Color of the stroke
   */
  color: string;
  setStrokeWidth: (strokeWidth: number) => void;
  setColor: (color: string) => void;
  setStroke: (stroke: SkPaint) => void;
  canvasInfo: Partial<DrawingInfo> | null;
  setCanvasInfo: (canvasInfo: Partial<DrawingInfo>) => void;
}

const useDrawingStore = create<DrawingStore>((set, get) => ({
  completedPaths: [],
  setCompletedPaths: completedPaths => {
    set({ completedPaths });
  },
  addCompletedPath: completedPath => {
    set({ completedPaths: get().completedPaths.concat(completedPath) });
  },
  strokeWidth: 2,
  color: 'black',
  stroke: utils.getPaint(2, 'black'),
  setStrokeWidth: strokeWidth => {
    set({strokeWidth});
  },
  setColor: color => {
    set({color});
  },
  setStroke: stroke => {
    set({stroke});
  },
  canvasInfo: null,
  setCanvasInfo: canvasInfo => {
    set({canvasInfo});
  },
}));

export default useDrawingStore;
