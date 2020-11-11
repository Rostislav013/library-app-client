import React, { useMemo, useState } from "react";
import { useFormik } from "formik";
import Button from "@material-ui/core/Button";
import * as Yup from "yup";

import { useStyles } from "../../hooks/useStyles";
import api from "../../api";

function AddBook() {
  const classes = useStyles();
  const [isAdded, setIsAdded] = useState(false);

  useMemo(() => {
    const timer = setTimeout(() => {
      if (isAdded) {
        setIsAdded(false);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isAdded]);

  const BookValidationSchema = Yup.object({
    isbn: Yup.string()
      .matches(/^[0-9]*$/, "Only digits acceptable")
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    title: Yup.string()
      .max(40, "Must be 40 characters or less")
      .required("Required"),
    description: Yup.string()
      .max(200, "Must be 200 characters or less")
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
      isbn: "",
      title: "",
      description: "",
      publisher: "",
      author: "",
      publishedDate: "",
      categories: "",
      isAvailable: true,
    },
    validationSchema: BookValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await api.addBook(values);
        if (res.status === 200) {
          setIsAdded(true);
          resetForm({
            values: {
              isbn: "",
              title: "",
              description: "",
              publisher: "",
              author: "",
              publishedDate: "",
              categories: "",
              isAvailable: true,
            },
          });
        }
      } catch (err) {
        //FIX handle error
        console.log(err.message);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={classes.bookFrom}>
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
      {isAdded && <p className={classes.successP}>Book was added</p>}
      <div className={classes.inputDiv}>
        <Button
          color="primary"
          variant="contained"
          type="submit"
          className={classes.formButton}
        >
          Add a book
        </Button>
      </div>
    </form>
  );
}

export default AddBook;
