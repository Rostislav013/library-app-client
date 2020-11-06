import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";

import { BookTableRowProps } from "../../../types";
import api from "../../../api";
import Photo from "../Photo";
import "./TableRows.css";

function TableRows(props: BookTableRowProps) {
  const { bookId, borrowDate, returnDate, handleReturnBook } = props;
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const getInfo = async () => {
    try {
      const res = await api.getBookById(bookId);
      setTitle(res.data.title);
      setAuthor(res.data.author);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TableRow aria-label="table row">
      <TableCell className="table-cell">
        <Photo />
      </TableCell>
      <TableCell className="table-cell">
        <Link to={`/products/${bookId}`} className="nameLink">
          {title}
        </Link>
      </TableCell>
      <TableCell className="table-cell">{author}</TableCell>
      <TableCell className="table-cell">
        {borrowDate ? borrowDate.slice(0, 10) : borrowDate}
      </TableCell>
      <TableCell className="table-cell">
        {returnDate && returnDate.length < 25
          ? returnDate.slice(0, 10)
          : `Not returned yet`}
      </TableCell>
      <TableCell className="table-cell">
        {returnDate ? (
          <Button
            variant="contained"
            color="primary"
            disabled
            onClick={() => handleReturnBook(bookId)}
          >
            Returned
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleReturnBook(bookId)}
          >
            Return this book
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
}

export default TableRows;
