import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { AppState, Product } from "../types";
import ListItemCart from "../components/ListItemCart";
import { useStyles } from "../hooks/useStyles";
import { removeProduct } from "../redux/actions";
import api from "../api";

function ShoppingCart() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const products = useSelector((state: AppState) => state.product.inCart);
  const auth = useSelector((state: AppState) => state.auth);
  const token: string = localStorage.jwtToken;

  const handleRemoveBook = (p: Product) => {
    dispatch(removeProduct(p));
  };

  const handleCheckout = async () => {
    const useWhoBorrow = {
      borrowerId: auth.user.id,
      borrowDate: new Date(),
      returnDate: "",
    };
    const resUser = await api.getUserById(auth.user.id);
    let bookProp = resUser.data.booksProperties;
    let newBookProps = [...bookProp];

    await Promise.all(
      products.map(
        async (item): Promise<any> => {
          // add userID to book properties
          const res = await api.getBookById(item.id);
          let statusProp = res.data.statusProperty;
          let newStatusProp = [...statusProp];
          newStatusProp.push(useWhoBorrow);
          let payload = {
            statusProperty: newStatusProp,
          };
          try {
            const req = await api.updateBookById(item.id, payload);
            console.log(req);
          } catch (err) {
            console.log(err.message);
          }
          let lendedBook = {
            bookId: item.id,
            borrowDate: new Date(),
            returnDate: "",
          };
          newBookProps.push(lendedBook);

          // remove books from cart
          dispatch(removeProduct(item));
        }
      )
    )
      .then(async () => {
        // Add bookIds to user
        let userpayload = {
          booksProperties: newBookProps,
        };
        try {
          const req = await api.updateUserById(
            auth.user.id,
            userpayload,
            token
          );
          // FIX add notification of success to user
          console.log(req);
        } catch (err) {
          console.log(err.message);
        }
      })
      .then(() => console.log("done"));
    /* What if there is an issue updating for ex user, 
       then need to cancel previos operations for book?
    */
  };
  if (products.length === 0) {
    return (
      <div className={classes.emptyCartContainer}>
        <Typography variant="h3" className={classes.h1}>
          Cart
        </Typography>
        <Typography variant="body2" className={classes.emptyCart}>
          You cart is empty
        </Typography>
      </div>
    );
  }
  return (
    <div className={classes.basketContainer}>
      <Typography variant="h3" className={classes.h1}>
        Cart
      </Typography>
      <div className={classes.listBox}>
        {products.length > 0 &&
          products.map((product) => (
            <ListItemCart
              key={product.id}
              product={product}
              handleRemoveBook={handleRemoveBook}
            />
          ))}

        {auth.isAuthenticated ? (
          <Button
            className={classes.cartButton}
            variant="contained"
            color="primary"
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        ) : products.length === 0 ? (
          <div></div>
        ) : (
          <Button
            className={classes.cartButton}
            onClick={() => history.push("/login")}
          >
            Login to checkout
          </Button>
        )}
      </div>
    </div>
  );
}

export default ShoppingCart;
