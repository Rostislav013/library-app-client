import React from "react";
import { v4 as uuidv4 } from "uuid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";

import BookTableHeader from "../BookTableHeader";
import { BookProps } from "../../../types";
import TableRows from "../TableRow";
import "./bookTable.css";

const BookTable = (props: BookProps) => {
  const { books, handleReturnBook } = props;

  return (
    <Table aria-label="List of users" className="table">
      <BookTableHeader />
      <TableBody>
        {books?.map((book) => (
          <TableRows
            key={uuidv4()}
            bookId={book.bookId}
            borrowDate={book.borrowDate}
            returnDate={book.returnDate}
            handleReturnBook={handleReturnBook}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default BookTable;
