import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { BooksCardProps, Product } from "../../types";
import { useStyles } from "../../hooks/useStyles";
import { addProduct } from "../../redux/actions";
import bookImg from "../../Images/book.jpg";

export default function BooksCard(props: BooksCardProps) {
  // FIX get bookID
  const { id, title, description, author } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  // FIx add bookID?
  const handleAddBook = () => {
    const product: Product = {
      id: id,
      title: title,
      author: author,
    };
    dispatch(addProduct(product));
  };

  return (
    <Grid item>
      <Card className={classes.bookCard}>
        <CardActionArea>
          <CardMedia
            className={classes.bookMedia}
            image={bookImg}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="h6">
              {title}
            </Typography>
            <Typography gutterBottom variant="body2" component="p">
              By: {author}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.bookDescription}
            >
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.bookCardActions}>
          <Button
            size="small"
            color="primary"
            onClick={() => history.push(`/products/${id}`)}
          >
            More details
          </Button>
          <Button size="small" color="primary" onClick={handleAddBook}>
            Borrow this book
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
