import React, { useState } from 'react'
// import { Theme, createStyles, createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import {Typography, Card, CardContent, CardActionArea, createStyles} from '@material-ui/core';
import {makeStyles, Theme} from "@material-ui/core/styles";

type Prop = {
  item: IItem
  clickHandler?: (i:IItem)=>void
};


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
      },
      content: {
        flex: "1 0 auto"
      },
    })
);

const ItemCard: React.FC<Prop> = ({
  item,
    clickHandler
}) => {
  const classes = useStyles()



    return (
      <Card onClick={()=>clickHandler?.(item)}>
        <CardActionArea className={classes.root}>
          <Typography className={classes.content}>{item._id}</Typography>
          <Typography className={classes.content}>{item.price.toFixed(2)}€</Typography>
          <Typography className={classes.content} color="textSecondary">
            {item.description}
          </Typography>
        </CardActionArea>
      </Card>
  );
}

export default ItemCard
