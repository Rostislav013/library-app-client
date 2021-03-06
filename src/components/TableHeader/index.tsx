import React from 'react'
import TableRow from '@material-ui/core/TableRow'

import TableCells from '../TableCell'

function TableHeader() {
  const headerName: string[] = [
    'Photo',
    'First name',
    'Last name',
    'Email',
    'Created',
    'Edit',
    'Delete',
  ]

  return (
    <thead aria-label="table head">
      <TableRow className="TableHeader">
        {headerName.map((name) => (
          <TableCells key={name} name={name} />
        ))}
      </TableRow>
    </thead>
  )
}

const MemoizedTableHeader = React.memo(TableHeader)

export default MemoizedTableHeader
