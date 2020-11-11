import React from "react";
import TableRow from "@material-ui/core/TableRow";

import TableCells from "../TableCell";

function BookTableHeader() {
  const headerName: string[] = [
    "Photo",
    "Title",
    "Author",
    "Borrowed day",
    "Return day",
    "",
  ];

  return (
    <thead aria-label="table head">
      <TableRow className="TableHeader">
        {headerName.map((name) => (
          <TableCells key={name} name={name} />
        ))}
      </TableRow>
    </thead>
  );
}

export default React.memo(BookTableHeader);
