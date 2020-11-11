import React from "react";
import { Link, useHistory } from "react-router-dom";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

import { TableRowProps } from "../../types";
import Photo from "../UserPhoto";
import "./TableRows.css";

function TableRows(props: TableRowProps) {
  const {
    id,
    firstName,
    lastName,
    email,
    creationDate,
    handleDeleteUser,
  } = props;
  const history = useHistory();

  return (
    <TableRow aria-label="table row">
      <TableCell className="table-cell">
        <Photo />
      </TableCell>
      <TableCell className="table-cell">
        <Link to={`/users/${id}`} className="nameLink">
          {firstName}
        </Link>
      </TableCell>
      <TableCell className="table-cell">{lastName}</TableCell>
      <TableCell className="table-cell">{email}</TableCell>
      <TableCell className="table-cell">{creationDate.slice(0, 10)}</TableCell>
      <TableCell className="table-cell">
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push(`/users/${id}`)}
        >
          Edit user
        </Button>
      </TableCell>
      <TableCell className="table-cell">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleDeleteUser(id)}
        >
          <DeleteIcon />
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default TableRows;
