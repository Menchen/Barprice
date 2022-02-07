import React, { useCallback, useLayoutEffect, useRef } from 'react';
import Quagga, { QuaggaJSResultObject, QuaggaJSResultObject_CodeResult } from '@ericblade/quagga2';

function getMedian(arr: number[]) {
  arr.sort((a, b) => a - b);
  const half = Math.floor(arr.length / 2);
  if (arr.length % 2 === 1) {
    return arr[half];
  }
  return (arr[half - 1] + arr[half]) / 2;
}

function getMedianOfCodeErrors(resultObject: QuaggaJSResultObject_CodeResult) {
  const errors: number[] = resultObject.decodedCodes.filter(x => x.error !== undefined).map(x => x.error) as number[];
  const medianOfErrors = getMedian(errors);
  return medianOfErrors;
}

type Props = {
  onDetected: (data: string | null) => void
  onScannerReady?: () => void
  cameraId?: string
  facingMode?: string
  constraints?: IConstraints
  locator?: ILocatorSettings
  numOfWorkers?: number
  decoders?: string[]
  locate?: boolean
}

interface IConstraints {
  width: number
  height: number
}

interface ILocatorSettings {
  patchSize: string
  halfSample: boolean

}

const defaultConstraints: IConstraints = {
  width: 640,
  height: 480,
};

const defaultLocatorSettings: ILocatorSettings = {
  patchSize: 'medium',
  halfSample: true,
};

const defaultDecoders = ['upc_reader', 'ean_reader', 'codabar_reader', 'code_39_reader', 'i2of5_reader', 'code_128_reader'];

const Scanner: React.FC<Props> = ({
  onDetected,
  onScannerReady,
  cameraId,
  facingMode,
  constraints = defaultConstraints,
  locator = defaultLocatorSettings,
  numOfWorkers = navigator.hardwareConcurrency || 0,
  decoders = defaultDecoders,
  locate = true,
}) => {
  const camRef = useRef<HTMLDivElement>(null)
  const pastCodes = useRef<string[]>([])
  const errorCheck = useCallback((result: QuaggaJSResultObject) => {
    if (!onDetected) {
      return;
    }
    const err = getMedianOfCodeErrors(result.codeResult);
    const errors: number[] = result.codeResult.decodedCodes.filter(_ => _.error !== undefined).map(_ => _.error) as number[]
    // if Quagga is at least 75% certain that it read correctly, then accept the code.
    if (err < 0.13 && !errors.every(err => err < 0.18)) {
      pastCodes.current.push(result.codeResult.code as string)
      if (pastCodes.current.length < 7) return
      if (pastCodes.current.filter(_ => _ === pastCodes.current[0]).length >= 4) {
        pastCodes.current = []
        onDetected(result.codeResult.code);
      } else {
        pastCodes.current.shift()
        return
      }
    }
  }, [onDetected, pastCodes]);

  const handleProcessed = (result: QuaggaJSResultObject) => {
    // const drawingCtx = Quagga.canvas.ctx.overlay;
    // const drawingCanvas = Quagga.canvas.dom.overlay;
    // drawingCtx.font = "24px Arial";
    // drawingCtx.fillStyle = 'green';

    // if (result) {
    // console.warn('* quagga onProcessed', result);
    // if (result.boxes) {
    // drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute('width') ?? '100'), parseInt(drawingCanvas.getAttribute('height') ?? '100'));
    // result.boxes.filter((box) => box !== result.box).forEach((box) => {
    //   Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: 'purple', lineWidth: 2 });
    // });
    // }
    // if (result.box) {
    // Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: 'blue', lineWidth: 2 });
    // }
    // if (result.codeResult && result.codeResult.code) {
    // const validated = barcodeValidator(result.codeResult.code);
    // const validated = validateBarcode(result.codeResult.code);
    // Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: validated ? 'green' : 'red', lineWidth: 3 });
    // drawingCtx.font = "24px Arial";
    // drawingCtx.fillStyle = validated ? 'green' : 'red';
    // drawingCtx.fillText(`${result.codeResult.code} valid: ${validated}`, 10, 50);
    // drawingCtx.fillText(result.codeResult.code, 10, 20);
    // if (validated) {
    //     onDetected(result);
    // }
    //   }
    // }
  };

  useLayoutEffect(() => {
    Quagga.init({
      inputStream: {
        type: 'LiveStream',
        constraints: {
          ...constraints,
          ...(cameraId && { deviceId: cameraId }),
          ...(!cameraId && { facingMode }),
        },
        target: camRef.current as Element,
      },
      locator,
      numOfWorkers,
      decoder: { readers: decoders },
      locate,
    }, (err) => {
      Quagga.onProcessed(handleProcessed);

      if (err) {
        return console.log('Error starting Quagga:', err);
      }
      if (camRef && camRef.current) {
        Quagga.start();
        if (onScannerReady) {
          onScannerReady();
        }
      }
    });
    Quagga.onDetected(errorCheck);
    return () => {
      Quagga.offDetected(errorCheck);
      Quagga.offProcessed(handleProcessed);
      Quagga.stop();
    };
  }, [cameraId, onDetected, onScannerReady, errorCheck, constraints, locator, decoders, locate, facingMode, numOfWorkers]);
  // return <div id="interactive" className="viewport" />;
  return <div ref={camRef} style={{ position: 'relative', border: '3px solid red' }}>
    <video style={{ width: window.innerWidth, height: window.innerHeight, border: '3px solid orange' }} />
    <canvas className="drawingBuffer" style={{
      position: 'absolute',
      top: '0px',
      // left: '0px',
      height: 'auto',
      width: '100%',
      border: '3px solid green',
    }} width="100%" height="100%" />
  </div>
}
export default Scanner;
