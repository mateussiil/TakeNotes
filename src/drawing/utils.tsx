import {
  PaintStyle,
  Skia,
  StrokeCap,
  StrokeJoin,
} from '@shopify/react-native-skia';
import {CurrentPath} from '../store';

//@ts-ignore adding a function to get random value from array
Array.prototype.sample = function () {
  return this[Math.floor(Math.random() * this.length)];
};

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

const convertSkiaPathToExcalidrawElement = () => {
  const excalidrawElement = {
    type: 'freedraw',
    version: 45,
    versionNonce: 188043502,
    isDeleted: false,
    id: Math.floor(Math.random() * 1000000), // generate a unique ID
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
  };

  return excalidrawElement;
};

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
    .filter(path => path.points.length);

  const pointArrays = commands.map(command => {
    return {
      ...command,
      points: command.points
        .map(function (points) {
          var pointsArray = points.slice(1, points.length).split(' ');

          var pairsArray = [];
          for (var i = 0; i < pointsArray.length; i += 2) {
            pairsArray.push([+pointsArray[i], +pointsArray[i + 1]]);
          }

          return pairsArray;
        })
        .flat(1),
    };
  });

  return pointArrays;
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

export default {
  getPaint,
  getElevation,
  makeSvgFromPaths,
  makeRoughPointsFromPaths,
};
