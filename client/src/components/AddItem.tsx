
import React, { useState } from "react";
import {Container,Grid,InputAdornment, TextField, Button} from '@material-ui/core/'
import SearchIcon from '@material-ui/icons/Search'
import AddIcon from '@material-ui/icons/Add'

// type Props = undefined
type Props = IItem & {
    inputChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void
    addSubmitHandler?: () => void
    searchSubmitHandler?: () => void
}
// type Props = ItemProps

const AddItem: React.FC<Props> = ({
                                      _id,
                                      price,
                                      description,
                                      inputChangeHandler,
                                      addSubmitHandler,
                                      searchSubmitHandler,
                                  }) => {
    // const [price, setPrice] = useState(0.0)

    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //   setPrice(parseInt(event.currentTarget.value));
    // };
    return (
        <Grid container direction="column" justifyContent="center" alignItems="stretch" spacing={2}>
            <Grid item>
                <TextField
                    label="Barcode"
                    type="text"
                    id="_id"
                    onChange={inputChangeHandler}
                    value={_id}
                    variant="outlined"
                    fullWidth
                />
            </Grid>
            <Grid item>
                <TextField
                    label="Price"
                    type="number"
                    id="price"
                    value={(Number(price))?.toFixed(2)}
                    onChange={inputChangeHandler}
                    variant="outlined"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">€</InputAdornment>,
                    }}
                    InputLabelProps={{
                        shrink: true
                    }}
                    fullWidth
                />
            </Grid>
            <Grid item>
                <TextField
                    label="Description"
                    type="text"
                    id="description"
                    onChange={inputChangeHandler}
                    variant="outlined"
                    value={description}
                    fullWidth
                />
            </Grid>
            <Grid
                item
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={2}
            >
                <Grid item
                      style={{flex:1}}
                >
                    <Button onClick={addSubmitHandler} variant="contained" color="primary" fullWidth>
                        <AddIcon/>
                        Add
                    </Button>
                </Grid>
                <Grid item
                      style={{flex:1}}
                >
                    <Button onClick={searchSubmitHandler} variant="contained" color="primary" fullWidth>
                        <SearchIcon/>
                        Search
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default AddItem
