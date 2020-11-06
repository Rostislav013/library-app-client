import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";

import MemoizedTableHeader from "../TableHeader";
import TableRows from "../TableRow";
import { UserProps } from "../../types";
import "./userTable.css";

const UserTable = (props: UserProps) => {
  const { users, handleDeleteUser } = props;

  return (
    <>
      <Table aria-label="List of users" className="table">
        <MemoizedTableHeader />
        <TableBody>
          {users &&
            users?.map((user) => (
              <TableRows
                key={user._id}
                id={user._id}
                admin={user.admin}
                firstName={user.firstName}
                lastName={user.lastName}
                email={user.email}
                booksProperties={user.booksProperties}
                creationDate={user.creationDate}
                handleDeleteUser={handleDeleteUser}
              />
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default UserTable;
