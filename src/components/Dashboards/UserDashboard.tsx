import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

import { AppState, TabPanelProps, User } from "../../types";
import { useStyles } from "../../hooks/useStyles";
import BookTable from "../BooksTable/BookTable";
import UserTab from "../UserTab";
import ChangePassword from "../ChangePassword";
import api from "../../api";

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

function UserDashboard() {
  const classes = useStyles();
  const auth = useSelector((state: AppState) => state.auth);
  const token: string = localStorage.jwtToken;
  const id = useSelector((state: AppState) => state.auth.user.id);
  const [user, setUser] = useState<User>();
  const [sortedBook, setSotedBook] = useState<any>();
  const sessionValue = sessionStorage.getItem("tabIndex");
  const initValue = sessionValue ? parseInt(sessionValue) : 0;
  const [value, setValue] = React.useState(initValue);

  const loadData = async () => {
    try {
      const response = await api.getUserById(id);
      setUser(response.data);
    } catch (error) {
      // FIX handle error
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // sort array by date
    if (user) {
      setSotedBook(
        user?.booksProperties.sort((a, b) => {
          let dateA = new Date(a.borrowDate).getTime();
          let dateB = new Date(b.borrowDate).getTime();
          return dateB - dateA;
        })
      );
    }
  }, [user]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    sessionStorage.setItem("tabIndex", JSON.stringify(newValue));
  };

  if (!auth.isAuthenticated) {
    return <Redirect to="/login" />;
  }

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

  const handleUpdateInfo = async (values: any) => {
    try {
      const res = await api.updateUserById(user?._id, values, token);
      setUser(res.data);
    } catch (err) {
      // FIX handle Error
      console.log(err.message);
    }
  };
  const handleChangePassword = async (values: any) => {
    const payload = {
      password: values.password,
      currentPassword: values.currentPassword,
    };
    try {
      const res = await api.updateUserById(user?._id, payload, token);
      // FIX ADD COMFIRMATION ON THE PAGE
      if (res.status === 200) console.log("Password changed");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className={classes.tabs}>
      <Typography className={classes.typography} variant="h6" component="h3">
        Hey there, {user?.firstName}
      </Typography>

      <AppBar
        position="static"
        style={{ background: "transparent", boxShadow: "none", color: "black" }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="User dashboard tabs"
          centered
        >
          <Tab label="Books" {...a11yProps(0)} />
          <Tab label="User" {...a11yProps(1)} />
          <Tab label="Change password" {...a11yProps(2)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        {user && user?.booksProperties.length > 0 ? (
          <BookTable books={sortedBook} handleReturnBook={handleReturnBook} />
        ) : (
          <p style={{ height: "75vh" }}>No books taken</p>
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {user && <UserTab user={user} handleUpdateInfo={handleUpdateInfo} />}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {user && (
          <ChangePassword id={id} handleChangePassword={handleChangePassword} />
        )}
      </TabPanel>
    </div>
  );
}

export default UserDashboard;
