import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useStyles } from "../hooks/useStyles";
import api from "../api";
import { AppState, Book, ParamProps } from "../types";

function EditBook() {
  const { id } = useParams<ParamProps>();
  const classes = useStyles();
  const [book, setBook] = useState<Book>();

  const auth = useSelector((state: AppState) => state.auth);

  // if (!auth.user.admin) {
  //   return <Redirect to="/login" />;
  // }

  const loadData = async () => {
    try {
      const response = await api.getBookById(id);
      setBook(response.data);
    } catch (error) {
      //FIX handle error
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const BookValidationSchema = Yup.object({
    isbn: Yup.string()
      .matches(/^[0-9]*$/, "Only digits acceptable")
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    title: Yup.string()
      .max(40, "Must be 40 characters or less")
      .required("Required"),
    description: Yup.string()
      .max(2000, "Must be 2000 characters or less")
      .required("Required"),
    publisher: Yup.string()
      .max(40, "Must be 40 characters or less")
      .required("Required"),
    author: Yup.string()
      .max(40, "Must be 40 characters or less")
      .required("Required"),
    publishedDate: Yup.string()
      .matches(/^[0-9]*$/, "Only digits acceptable")
      .min(4, "Must be 4 digits")
      .max(4, "Must be 4 digits")
      .required("Required"),
    categories: Yup.string()
      .max(40, "Must be 40 characters or less")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      isbn: book?.isbn,
      title: book?.title,
      description: book?.description,
      publisher: book?.publisher,
      author: book?.author,
      isAvailable: book?.isAvailable,
      publishedDate: book?.publishedDate,
      categories: book?.categories[0],
    },
    enableReinitialize: true,
    validationSchema: BookValidationSchema,
    onSubmit: async (values) => {
      if (auth.user.admin) {
        try {
          await api.updateBookById(book?._id, values);
        } catch (err) {
          //FIX handle error
          console.log(err.message);
        }
      } else {
        // FIX VERY IMPORTNAT
        console.log("No right to EDIT");
      }
    },
  });

  return (
    <>
      {book ? (
        <form onSubmit={formik.handleSubmit} className={classes.editForm}>
          <div className={classes.inputDiv}>
            <label htmlFor="isbn">ISBN</label>
            <div>
              <input
                id="isbn"
                name="isbn"
                type="number"
                className={classes.input}
                onChange={formik.handleChange}
                value={formik.values.isbn}
              />
              {formik.errors.isbn ? (
                <p className={classes.errorP}>{formik.errors.isbn}</p>
              ) : null}
            </div>
          </div>
          <div className={classes.inputDiv}>
            <label htmlFor="title">Title</label>
            <div>
              <input
                id="title"
                name="title"
                type="text"
                className={classes.input}
                onChange={formik.handleChange}
                value={formik.values.title}
              />
              {formik.errors.title ? (
                <p className={classes.errorP}>{formik.errors.title}</p>
              ) : null}
            </div>
          </div>
          <div className={classes.inputDiv}>
            <label htmlFor="author">Author</label>
            <div>
              <input
                id="author"
                name="author"
                type="text"
                className={classes.input}
                onChange={formik.handleChange}
                value={formik.values.author}
              />
              {formik.errors.author ? (
                <p className={classes.errorP}>{formik.errors.author}</p>
              ) : null}
            </div>
          </div>
          <div className={classes.inputDiv}>
            <label htmlFor="description">Description</label>
            <div>
              <textarea
                id="description"
                name="description"
                className={classes.inputTextarea}
                onChange={formik.handleChange}
                value={formik.values.description}
              ></textarea>
              {formik.errors.description ? (
                <p className={classes.errorP}>{formik.errors.description}</p>
              ) : null}
            </div>
          </div>
          <div className={classes.inputDiv}>
            <label htmlFor="publisher">Publisher</label>
            <div>
              <input
                id="publisher"
                name="publisher"
                type="text"
                className={classes.input}
                onChange={formik.handleChange}
                value={formik.values.publisher}
              />
              {formik.errors.publisher ? (
                <p className={classes.errorP}>{formik.errors.publisher}</p>
              ) : null}
            </div>
          </div>
          <div className={classes.inputDiv}>
            <label htmlFor="publishedDate">Published date</label>
            <div>
              <input
                id="publishedDate"
                name="publishedDate"
                type="number"
                className={classes.input}
                onChange={formik.handleChange}
                value={formik.values.publishedDate}
              />
              {formik.errors.publishedDate ? (
                <p className={classes.errorP}>{formik.errors.publishedDate}</p>
              ) : null}
            </div>
          </div>
          <div className={classes.inputDiv}>
            <label htmlFor="categories">Categories</label>
            <div>
              <input
                id="categories"
                name="categories"
                type="text"
                className={classes.input}
                onChange={formik.handleChange}
                value={formik.values.categories}
              />
              {formik.errors.categories ? (
                <p className={classes.errorP}>{formik.errors.categories}</p>
              ) : null}
            </div>
          </div>
          <div className={classes.inputDiv}>
            <label htmlFor="isAvailable">Available</label>
            <div>
              <input
                type="checkbox"
                id="isAvailable"
                className={classes.inputCheck}
                name="isAvailable"
                onChange={formik.handleChange}
                checked={formik.values.isAvailable}
              />
              {formik.errors.isAvailable ? (
                <p className={classes.errorP}>{formik.errors.isAvailable}</p>
              ) : null}
            </div>
          </div>
          <div className={classes.inputDiv}>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              className={classes.formButton}
            >
              Update
            </Button>
          </div>
        </form>
      ) : (
        <span style={{ marginTop: "80px" }}>loading...</span>
      )}
    </>
  );
}

export default EditBook;
