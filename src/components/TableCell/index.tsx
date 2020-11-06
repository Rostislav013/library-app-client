import React from "react";
import TableCell from "@material-ui/core/TableCell";

import { TableCellProps } from "../../types";
import "./TableCell.css";

const TableCells = (props: TableCellProps) => {
  const { name } = props;

  return <TableCell className="table-cell cell">{name}</TableCell>;
};

export default TableCells;
