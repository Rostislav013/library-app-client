import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import { AppState, Book, ParamProps, Product } from "../types";
import api from "../api";
import { useStyles } from "../hooks/useStyles";
import { addProduct } from "../redux/actions";
import bookImage from "../Images/book.jpg";

export default function BookPage() {
  const { id } = useParams<ParamProps>();
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state: AppState) => state.auth.user);
  const [book, setBook] = useState<Book>();

  const loadData = async () => {
    try {
      const response = await api.getBookById(id);
      setBook(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddBook = () => {
    if (book) {
      const product: Product = {
        id: book._id,
        title: book.title,
        author: book.author,
      };
      dispatch(addProduct(product));
    }
  };

  if (!book) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <ArrowBackIcon
        className={classes.arrow}
        color="primary"
        onClick={() => history.goBack()}
      />

      <Card className={classes.cardContainer}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={bookImage}
            title="book image"
          />
          <CardContent className={classes.bookCardContent}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.p}
            >
              {book.title}
            </Typography>
            <Typography
              variant="body1"
              color="textPrimary"
              component="p"
              className={classes.p}
            >
              <b>Author:</b> {book.author}
            </Typography>
            <Typography
              variant="body1"
              color="textPrimary"
              component="p"
              className={classes.p}
            >
              <b>Description:</b> <br />
              {book.description}
            </Typography>
            <Typography
              variant="body1"
              color="textPrimary"
              component="p"
              className={classes.p}
            >
              <b>Publisher:</b> {book.publisher}
            </Typography>
            <Typography
              variant="body1"
              color="textPrimary"
              component="p"
              className={classes.p}
            >
              <b>Available to borrow:</b> {book.isAvailable ? "Yes" : "No"}
            </Typography>
            <Typography
              variant="body1"
              color="textPrimary"
              component="p"
              className={classes.p}
            >
              <b>Category:</b> {book.categories.map((category) => category)}
            </Typography>
            <Typography
              variant="body1"
              color="textPrimary"
              component="p"
              className={classes.p}
            >
              <b>Year:</b> {book.publishedDate}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={handleAddBook}>
            Borrow this book
          </Button>
          {user.admin && (
            <Button
              size="small"
              color="secondary"
              onClick={() => history.push(`/book/${id}`)}
            >
              Edit this book
            </Button>
          )}
        </CardActions>
      </Card>
    </>
  );
}
