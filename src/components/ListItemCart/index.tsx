import React from 'react'
import Button from '@material-ui/core/Button'
import CardActionArea from '@material-ui/core/CardActionArea'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import DeleteIcon from '@material-ui/icons/Delete'
import Typography from '@material-ui/core/Typography'

import { useStyles } from '../../hooks/useStyles'
import { ListItemProps } from '../../types'

function ListItemCart(props: ListItemProps) {
  const { product, handleRemoveBook } = props
  const classes = useStyles()

  return (
    <Card className={classes.cartContainer}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h6" component="h6">
            {product.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            by {product.author}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button>
          <DeleteIcon onClick={() => handleRemoveBook(product)} />
        </Button>
      </CardActions>
    </Card>
  )
}

export default ListItemCart
