import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import { useStyles } from "../../hooks/useStyles";
import { SearchBookProps } from "../../types";

function SearchBook(props: SearchBookProps) {
  const {
    author,
    title,
    category,
    handleChangeAbility,
    handleChangeCategory,
    handleChangeAuthor,
    handleSubmit,
    handleChangeTitle,
  } = props;
  const classes = useStyles();

  return (
    <div className={classes.searchBookContainer}>
      <h1 className={classes.searchH1}>Find your book</h1>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              id="title"
              label="Search by title"
              name="title"
              autoComplete="title"
              value={title}
              onChange={handleChangeTitle}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="author"
              name="author"
              variant="outlined"
              fullWidth
              id="author"
              label="Search by author"
              autoFocus
              value={author}
              onChange={handleChangeAuthor}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              id="category"
              label="Search by category"
              name="category"
              autoComplete="category"
              value={category}
              onChange={handleChangeCategory}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox color="primary" onChange={handleChangeAbility} />
              }
              label="Only available now"
              labelPlacement="start"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submitSearch}
        >
          Search
        </Button>
      </form>
    </div>
  );
}

export default SearchBook;
