import {
  fade,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";

const drawerWidth = 240;

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    link: {
      textDecoration: "none",
      color: "white",
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "space-between",
    },
    navBarLink: {
      color: "black",
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
    },
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    errMessage: {
      textAlign: "center",
      color: "red",
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    searchH1: {
      margin: "80px 5px 20px 5px",
    },
    searchBookContainer: {
      margin: "0 15px",
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    submitSearch: {
      margin: theme.spacing(3, 0, 2),
      width: "200px",
    },
    bookCard: {
      position: "relative",
      marginTop: "50px",
      flexGrow: 1,
      width: "275px",
      maxWidth: "300px",
      height: "360px",
      boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.75)",
    },
    bookDescription: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    bookCardActions: {
      width: "92%",
      justifyContent: "space-between",
      alignContent: "flex-end !important",
      position: "absolute",
      bottom: 0,
      // marginBottom: "5px",
    },

    bookMedia: {
      height: 140,
    },
    bookGrid: {
      flexGrow: 1,
    },
    registerPaper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    registerAvatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    registerForm: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    registerSubmit: {
      margin: theme.spacing(3, 0, 2),
    },
    cartContainer: {
      display: "flex",
      margin: "15px",
    },
    basketContainer: {
      marginTop: "80px",
    },
    cardContainer: {
      //margin: '10px auto',
      //width: '400px',
      //maxWidth: 500,
      // display: 'flex',
      //justifyContent: 'center',
    },
    media: {
      marginTop: "5px",
      boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",

      width: 300,
      height: 200,
    },
    p: {
      marginBottom: "5px",
    },
    arrow: {
      marginTop: "80px",
      marginLeft: "2px",
      fontSize: "64px",
      borderRadius: "50%",
      align: "center",
    },
    bookCardContent: {
      paddingBottom: 0,
    },
    listItem: {
      backgroundColor: "red",
      display: "flex",
      justifyContent: "space-between",
    },
    listRoot: {
      margin: "20px auto",
      width: "50vw",
    },
    emptyCartContainer: {
      marginTop: "80px",
    },
    h1: {
      textAlign: "center",
    },
    emptyCart: {
      textAlign: "center",
    },
    listBox: {
      display: "block",
      maxWidth: "50vw",
      margin: "0 auto",
    },
    cartButton: {
      float: "right",
      margin: "15px",
    },
    // ./AddBook
    bookFrom: {
      display: "flex",
      flexDirection: "column",
      width: "600px",
      margin: "0 auto",
    },
    inputDiv: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      margin: "15px",
    },
    input: {
      height: "30px",
      fontSize: "14pt",
      width: "450px",
    },
    formButton: {
      width: "600px",
      textAlign: "center",
    },
    inputTextarea: {
      height: "30px",
      fontSize: "14pt",
      width: "450px",
    },
    successP: {
      textAlign: "center",
      color: "green",
    },
    errorP: {
      color: "red",
    },
    inputCheck: {
      width: "30px",
      height: "30px",
    },
    // EditBook
    editForm: {
      marginTop: "80px",
      display: "flex",
      flexDirection: "column",
      width: "600px",
      margin: "0 auto",
    },
    tabs: {
      marginTop: "70px",
      flexGrow: 1,
    },
    typography: {
      marginLeft: "15px",
    },
    // about
    aboutContainer: {
      margin: "80px  5px 20px 5px",
    },
  })
);
