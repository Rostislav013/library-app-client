import React from 'react'
import TextField from '@material-ui/core/TextField'

import { searchUserProps } from '../../types'

const SearchUser = (props: searchUserProps) => {
  const { keyword, handleKeywordChange } = props

  return (
    <TextField
      id="outlined-basic"
      label="Find a user"
      variant="outlined"
      value={keyword}
      onChange={handleKeywordChange}
    />
  )
}

export default SearchUser
