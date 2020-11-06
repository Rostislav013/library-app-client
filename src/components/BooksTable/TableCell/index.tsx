import React from "react";
import TableCell from "@material-ui/core/TableCell";

import { BookTableCellProps } from "../../../types";

const TableCells = (props: BookTableCellProps) => {
  const { name } = props;
  return <TableCell className="table-cell cell">{name}</TableCell>;
};

export default TableCells;
