import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";

import { useStyles } from "../../hooks/useStyles";
import { ChangePasswordProps } from "../../types";

function ChangePassword(props: ChangePasswordProps) {
  const { handleChangePassword } = props;
  const classes = useStyles();

  const UserValidationSchema = Yup.object({
    currentPassword: Yup.string()
      .min(6, "Minimum 6 characters")
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .max(40, "Must be 40 characters or less")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
    enableReinitialize: true,
    validationSchema: UserValidationSchema,
    onSubmit: (values) => handleChangePassword(values),
  });
  return (
    <form onSubmit={formik.handleSubmit} className={classes.editForm}>
      <div className={classes.inputDiv}>
        <label htmlFor="currentPassword">Current password</label>
        <div>
          <input
            id="currentPassword"
            name="currentPassword"
            type="password"
            className={classes.input}
            onChange={formik.handleChange}
            value={formik.values.currentPassword}
          />
          {formik.errors.currentPassword ? (
            <p className={classes.errorP}>{formik.errors.currentPassword}</p>
          ) : null}
        </div>
      </div>
      <div className={classes.inputDiv}>
        <label htmlFor="password">Password</label>
        <div>
          <input
            id="password"
            name="password"
            type="password"
            className={classes.input}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password ? (
            <p className={classes.errorP}>{formik.errors.password}</p>
          ) : null}
        </div>
      </div>
      <div className={classes.inputDiv}>
        <label htmlFor="confirmPassword">Confirm password</label>
        <div>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className={classes.input}
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
          />
          {formik.errors.confirmPassword ? (
            <p className={classes.errorP}>{formik.errors.confirmPassword}</p>
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
  );
}

export default ChangePassword;
