import React from 'react'
import Grid from '@material-ui/core/Grid'

import { BooksGridProps } from '../../types'
import BooksCard from '../BooksCard'
import { useStyles } from '../../hooks/useStyles'

export default function BooksGrid(props: BooksGridProps) {
  const { books } = props
  const classes = useStyles()

  return (
    <Grid container className={classes.bookGrid} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          {books.map((book) => (
            <BooksCard
              key={book.isbn}
              id={book._id}
              isbn={book.isbn}
              title={book.title}
              description={book.description}
              publisher={book.publisher}
              author={book.author}
              isAvailable={book.isAvailable}
              statusProperty={book.statusProperty}
              publishedDate={book.publishedDate}
              categories={book.categories}
            />
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}
