import React, { useRef, useState } from 'react'
import AddItem from './AddItem'
import BarcodeScanner from './BarcodeScan'
import {
  Grid,
  Snackbar,
  Table,
} from '@material-ui/core'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { getItem, updateItem } from '../API'
import ItemCard from './ItemCard'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    snackbar: {
      position: 'absolute',
      bottom: theme.spacing(12),
      right: theme.spacing(2),
      zIndex: 11
    },
  }),
);


function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AddTab = ({ }) => {
  const classes = useStyles()

  const [itemStack, setItemStack] = useState([] as IItem[])
  const [open, setOpen] = useState(false)
  const [errState, setErrState] = useState(false)
  const [snackBarMessage, setSnackBarMessage] = useState("")
  const [item, setItem] = useState({
    _id: "",
    price: 0,
    description: ""
  } as IItem)

  const addItemStack = (i: IItem) => {
    setItemStack((prevState => {
      const cleanArray = prevState.filter(product => !(
        i._id === product._id &&
        i.price === product.price &&
        i.description === product.description
      ))
      return [i, ...cleanArray]
  }))
}

const itemCardClickHandler = (i: IItem) => {
  addItemStack(i)
  setItem(i)
}

const displayError = (message?: string) => {

  setSnackBarMessage(message ? message : "Error")
  setErrState(true)
  setOpen(true);
}
const displaySuccess = (message?: string) => {

  setSnackBarMessage(message ? message : "Success")
  setErrState(false)
  setOpen(true);
}

const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
  if (reason === 'clickaway') {
    return;
  }
  setOpen(false);
};


const addItemInputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
  setItem(old => ({ ...old, [e.target.id]: e.target.value }))
}

const addItemSearchHandler = () => {

  console.log("fetching...")
  const fetchItem = getItem(item._id)
  fetchItem.then(v => {
    console.log(v.data)
    const remoteItem = v.data.item
    if (remoteItem) {
      addItemStack(remoteItem)
      setItem(remoteItem)
      displaySuccess(`Item: ${remoteItem._id} found!`)
    }
  }
  ).catch((err) => {
    console.log("404??")
    console.error(err)
    displayError("Item not found!")
  }
  )
}

const addItemAddHandler = () => {

  console.log("updating...")
  const response = updateItem(item)
  response.then(v => {
    console.log(v.data)
    const remoteItem = v.data.item
    if (remoteItem) {
      addItemStack(remoteItem)
      setItem(remoteItem)
      displaySuccess(`Item: ${remoteItem._id} updated!`)
    }
  }
  ).catch((err) => {
    console.error(err)
    displayError(`Failed to update item!`)
  }
  )
}

const onBarcodeDetectHandler = (code: string) => {
  setItem(old => ({ ...old, _id: code }))
  const fetchItem = getItem(code)
  fetchItem.then(v => {
    const remoteItem = v.data.item
    if (remoteItem) setItem(remoteItem)
  }
  ).catch((err) => {
    console.error(err)
    setErrState(true)
    setOpen(true)
  }
  )

}
return (
  <Grid
    container
    direction="column"
    justifyContent="flex-start"
    spacing={4}
    alignItems="stretch"
    style={{ height: '100%' }}
  >
    <Grid item >
      <AddItem
        _id={item._id}
        price={item.price}
        description={item.description}
        inputChangeHandler={addItemInputHandle}
        searchSubmitHandler={addItemSearchHandler}
        addSubmitHandler={addItemAddHandler}
      />
      <BarcodeScanner onDetected={onBarcodeDetectHandler} />
    </Grid>

    {itemStack.map((i) => {
      return (
        <Grid item key={i._id}>
          <ItemCard item={i} clickHandler={itemCardClickHandler} />
        </Grid>
      )
    })}

    <Grid item >
      <Snackbar
        open={open}
        autoHideDuration={6000}
        className={classes.snackbar}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      // TransitionComponent={TransitionUp}
      >
        <Alert severity="success">
          Success!
        </Alert>
      </Snackbar>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        className={classes.snackbar}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      // TransitionComponent={TransitionUp}
      >
        {errState ? <Alert severity="error">{snackBarMessage}</Alert> : <Alert severity="success">{snackBarMessage} </Alert>}
      </Snackbar>
    </Grid>

  </Grid>
);
}

export default AddTab;
