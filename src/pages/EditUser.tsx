import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useStyles } from "../hooks/useStyles";
import api from "../api";
import { User, ParamProps } from "../types";

function EditBook() {
  const token: string = localStorage.jwtToken;
  //console.log(typeof token)
  const { id } = useParams<ParamProps>();
  const classes = useStyles();
  const [user, setUser] = useState<User>();

  const loadData = async () => {
    try {
      const response = await api.getUserById(id);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const UserValidationSchema = Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .max(40, "Must be 40 characters or less")
      .required("Required"),
    email: Yup.string()
      .max(2000, "Must be 200 characters or less")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
    },
    enableReinitialize: true,
    validationSchema: UserValidationSchema,
    onSubmit: async (values) => {
      try {
        await api.updateUserById(user?._id, values, token);
      } catch (err) {
        console.log(err.message);
      }
    },
  });

  return (
    <>
      {user ? (
        <form onSubmit={formik.handleSubmit} className={classes.editForm}>
          <div className={classes.inputDiv}>
            <label htmlFor="firstName">First name</label>
            <div>
              <input
                id="firstName"
                name="firstName"
                type="text"
                className={classes.input}
                onChange={formik.handleChange}
                value={formik.values.firstName}
              />
              {formik.errors.firstName ? (
                <p className={classes.errorP}>{formik.errors.firstName}</p>
              ) : null}
            </div>
          </div>
          <div className={classes.inputDiv}>
            <label htmlFor="lastName">Last name</label>
            <div>
              <input
                id="lastName"
                name="lastName"
                type="text"
                className={classes.input}
                onChange={formik.handleChange}
                value={formik.values.lastName}
              />
              {formik.errors.lastName ? (
                <p className={classes.errorP}>{formik.errors.lastName}</p>
              ) : null}
            </div>
          </div>
          <div className={classes.inputDiv}>
            <label htmlFor="email">Email</label>
            <div>
              <input
                id="email"
                name="email"
                type="text"
                className={classes.input}
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.errors.email ? (
                <p className={classes.errorP}>{formik.errors.email}</p>
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
