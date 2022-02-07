import React, { useState } from 'react';
import Backdrop from '@material-ui/core/Backdrop'
import Fab from '@material-ui/core/Fab';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import CloseIcon from '@material-ui/icons/Close';

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Scanner from './Scanner'

type Props = {
  onDetected: (data: string) => void
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'absolute',
      bottom: theme.spacing(3),
      right: theme.spacing(2),
      zIndex: 11
    },
  }),
);


const BarcodeScanner: React.FC<Props> = ({ onDetected }) => {
  const [scanning, setScanning] = useState(false)
  const toggleScanState = (): void => {
    setScanning(old => !old)
  }

  const onDetectHandler = (code: string | null) => {
    if (code) {
      onDetected(code)
      setScanning(false)
    }
  }
  return (
    <div>
      <Fab variant="extended" color="primary" onClick={() => setScanning(!scanning)} className={useStyles().fab} >
        {scanning ? <CloseIcon /> : <PhotoCameraIcon />}
        {scanning ? 'Cancel' : 'Scan'}
      </Fab>
      <Backdrop style={{ zIndex: 10 }} open={scanning} onClick={toggleScanState}>
        {scanning && <Scanner onDetected={onDetectHandler} />}
      </Backdrop>
    </div>

  );
}

export default BarcodeScanner
