import {
  PaintStyle,
  Skia,
  StrokeCap,
  StrokeJoin,
} from '@shopify/react-native-skia';
import {customAlphabet} from 'nanoid/non-secure';
import {CurrentPath} from '../store';

export type ExcalidrawElement = {
  points: [number, number][];
  strokeWidth: number;
  strokeLinecap: any;
  strokeLinejoin: any;
  strokeColor: string | undefined;
  x: number;
  y: number;
} 

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-', 20);

/**
 * Get a stroke with the given parameters
 *
 * @param strokeWidth
 * @param color
 * @returns
 */
const getPaint = (strokeWidth: number, color: string) => {
  const paint = Skia.Paint();
  paint.setStrokeWidth(strokeWidth);
  paint.setStrokeMiter(5);
  paint.setStyle(PaintStyle.Stroke);
  paint.setStrokeCap(StrokeCap.Round);
  paint.setStrokeJoin(StrokeJoin.Round);
  paint.setAntiAlias(true);
  const _color = paint.copy();
  _color.setColor(Skia.Color(color));
  console.log(color);
  return _color;
};

/**
 * A function get get elevation style for android/ios.
 * @param elevation
 * @returns
 */
const getElevation = (elevation: number) => {
  return {
    elevation,
    shadowColor: 'black',
    shadowOffset: {width: 0.3 * elevation, height: 0.5 * elevation},
    shadowOpacity: 0.2,
    shadowRadius: 0.7 * elevation,
  };
};

const convertSkiaPathToExcalidrawElement = (excalidrawElement: Partial<ExcalidrawElement>) => {
  return {
    type: 'freedraw',
    version: 45,
    versionNonce: 188043502,
    isDeleted: false,
    id: randomId(), // generate a unique ID
    fillStyle: 'hachure',
    strokeWidth: 1,
    strokeStyle: 'solid',
    roughness: 1,
    opacity: 100,
    angle: 0,
    x: 0, // set the starting x-coordinate
    y: 0, // set the starting y-coordinate
    strokeColor: '#000000',
    backgroundColor: 'transparent',
    width: 170,
    height: 25,
    seed: Math.floor(Math.random() * 1000000), // generate a random seed
    groupIds: [],
    frameId: null,
    roundness: null,
    boundElements: [],
    updated: Date.now(),
    link: null,
    locked: false,
    points: [],
    lastCommittedPoint: null,
    simulatePressure: true,
    pressures: [],
    ...excalidrawElement,
  };
};

/**
 * https://stackoverflow.com/questions/25384052/convert-svg-path-d-attribute-to-a-array-of-points
 * @param paths
 * @param options
 * @returns
 */
const makeRoughPointsFromPaths = (
  paths: CurrentPath[],
  options: {
    width: number;
    height: number;
    backgroundColor?: string;
  },
) => {
  const commands = paths
    .map(path =>
      path.paint && path.path
        ? {
            points: path.path.toSVGString().split(/(?=[LMC])/),
            strokeWidth: path.paint.getStrokeWidth(),
            strokeLinecap: path.paint.getStrokeCap(),
            strokeLinejoin: path.paint.getStrokeJoin(),
            strokeColor: path.color,
          }
        : null,
    )
    .filter(path => path && path.points.length);

  const firstPoint: Array<[number, number]> = [];
  let firstArray: [number, number] = [0, 0];

  return commands
    .map(command => {
      return {
        ...command,
        points: command?.points
          .map(function (points: string, index: number) {
            const pointsArray = points.slice(1, points.length).split(' ');

            const pairsArray = [];

            for (let i = 0; i < pointsArray.length; i += 2) {
              if (index === 0) {
                firstArray = [+pointsArray[i], +pointsArray[i + 1]];
                firstPoint.push(firstArray);
              }

              pairsArray.push([
                +pointsArray[i] - firstArray[0],
                +pointsArray[i + 1] - firstArray[1],
              ]);
            }

            return pairsArray;
          })
          .flat(1),
      };
    })
    .map((objects, index) =>
      convertSkiaPathToExcalidrawElement({
        ...objects,
        x: firstPoint[index][0],
        y: firstPoint[index][1],
      }),
    );
};

const makeSvgFromPaths = (
  paths: CurrentPath[],
  options: {
    width: number;
    height: number;
    backgroundColor?: string;
  },
) => {
  return `<svg width="${options.width}" height="${
    options.height
  }" viewBox="0 0 ${options.width} ${
    options.height
  }" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="${options.width}" height="${options.height}" fill="${
    options.backgroundColor || 'white'
  }"/>
  <g>

    ${paths.map(path =>
      path.paint && path.path
        ? `<path d="${path.path.toSVGString()}" stroke="${
            path.color
          }" stroke-width="${path.paint.getStrokeWidth()}" stroke-linecap="${path.paint.getStrokeCap()}" stroke-linejoin="${path.paint.getStrokeJoin()}"/>`
        : '',
    )}
    </g>
    </svg>`;
};

export const randomId = () => (false ? `id${1}` : nanoid());

export default {
  getPaint,
  getElevation,
  makeSvgFromPaths,
  makeRoughPointsFromPaths,
};
