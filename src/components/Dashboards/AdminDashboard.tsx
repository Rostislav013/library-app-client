import React, { useEffect, useMemo, useState } from "react";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import { useSelector } from "react-redux";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

import { AppState, TabPanelProps, User } from "../../types";
import { useStyles } from "../../hooks/useStyles";
import SearchUser from "../SearchUser";
import UserTable from "../UserTable";
import AddBook from "../AddBook";
import api from "../../api";
import BookTable from "../BooksTable/BookTable";

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function AdminDashboard() {
  const classes = useStyles();
  const val = sessionStorage.getItem("tabIndex");
  const init = val ? parseInt(val) : 0;
  const [value, setValue] = useState(init);
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User>();
  const [sortedBook, setSotedBook] = useState<any>();
  const token: string = localStorage.jwtToken;
  const [data, setData] = useState<User[]>([]);
  const [keyword, setKeyword] = useState("");
  const id = useSelector((state: AppState) => state.auth.user.id);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    sessionStorage.setItem("tabIndex", JSON.stringify(newValue));
  };

  const loadUsers = async () => {
    try {
      const response = await api.getAllUsers(token);
      setData(response.data);
      const res = await api.getUserById(id);
      setUser(res.data);
    } catch (error) {
      //FIX error handling
      console.log(error);
    }
  };

  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // sort array by date
    if (user) {
      setSotedBook(
        user?.booksProperties.sort((a, b) => {
          let dateA = new Date(a.borrowDate).getTime();
          let dateB = new Date(b.borrowDate).getTime();
          return dateA - dateB;
        })
      );
    }
  }, [user]);

  useMemo(() => {
    let foundedUsers = [...data];
    if (keyword) {
      foundedUsers = data.filter(
        (user: User) =>
          user.firstName.toLowerCase().includes(keyword.toLowerCase()) ||
          user.lastName.toLowerCase().includes(keyword.toLowerCase()) ||
          user.email.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    setUsers(foundedUsers);
  }, [keyword, data]);

  const handleKeywordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setKeyword(e.target.value);
  };

  const handleDeleteUser = async (id: string) => {
    if (
      window.confirm("Are you sure you want to delete this user from database?")
    ) {
      try {
        await api.deleteUserById(id);
        loadUsers();
      } catch (err) {
        //FIX error handling
        console.log(err.message);
      }
    }
  };

  const handleReturnBook = async (bookId: string) => {
    const payload: any = {
      booksProperties: user?.booksProperties,
    };

    payload?.booksProperties.map(
      async (book: { bookId: string; returnDate: Date; borrowDate: Date }) => {
        if (book.bookId === bookId) {
          book.returnDate = new Date();
          try {
            const res = await api.updateUserById(user?._id, payload, token);
            console.log(res);
            setUser(res.data);
          } catch (err) {
            console.log(err.message);
          }
        }
      }
    );
  };

  return (
    <div className={classes.tabs}>
      <Typography className={classes.typography} variant="h6" component="h3">
        Hey there, {user?.firstName}
      </Typography>

      <AppBar
        position="static"
        // move to useStyle hook
        style={{ background: "transparent", boxShadow: "none", color: "black" }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="admin dashboard tabs"
          centered
        >
          <Tab label="Add Book" {...a11yProps(0)} />
          <Tab label="Users" {...a11yProps(1)} />
          <Tab label="Books" {...a11yProps(2)} />
          <Tab label="Info" {...a11yProps(3)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <AddBook />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SearchUser
          keyword={keyword}
          handleKeywordChange={handleKeywordChange}
        />
        {users && (
          <UserTable users={users} handleDeleteUser={handleDeleteUser} />
        )}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {user && user?.booksProperties.length > 0 ? (
          <BookTable books={sortedBook} handleReturnBook={handleReturnBook} />
        ) : (
          <p style={{ height: "75vh" }}>No books taken</p>
        )}
      </TabPanel>
      <TabPanel value={value} index={3}>
        <div>
          <p>
            Name: {user?.firstName} {user?.lastName}
          </p>
          <p>Email: {user?.email}</p>
        </div>
      </TabPanel>
    </div>
  );
}

export default AdminDashboard;
