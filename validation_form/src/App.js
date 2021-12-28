import React, { useState, useEffect } from "react";
import PageNotFound from "./Components/404_page";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {
  Grid,
  Container,
  Menu,
  MenuItem,
  Button,
  Paper,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    // flexWrap: "wrap",
    // textAlign: "center",
    // flexGrow: 1,
    // justifyContent: "space-evenly",
    background: "#3CB371",
    // alignItems: "center",
  },

  mainContainer: {
    flexWrap: "wrap",
    marginTop: "40px",
    width: "500px",
    textAlign: "center",
    flexGrow: 1,
    justifyContent: "space-evenly",
    background: "#3CB371",
    alignItems: "center",
    borderRadius: "15px",
  },

  gridContainer: {
    justifyContent: "center",
    alignItems: "center",
    background: "#3CB371",
  },

  gridTextFields: {
    height: "96px",
  },

  button: {
    fontFamily: "sans-serif",
    background: "#DEB887",
  },

  insideText: {
    fontFamily: "sans-serif",
  },

  idNumberTextField: {
    marginRight: "5px",
    marginLeft: "5px",
    width: "25ch",
    background: "#FFFFF0",
    borderRadius: "5px",
  },

  img: {
    width: "150px",
    height: "150px",
    objectFit: "cover",
    borderRadius: "10px",
  },

  textField: {
    width: "25ch",
    background: "#FFFFF0",
    borderRadius: "5px",
  },

  helperText: {
    fontFamily: "sans-serif",
  },

  paper: {
    // height: "50px",
    // width: "250px",

    padding: theme.spacing(2),
    fontFamily: "sans-serif",
    textAlign: "center",
    textJustify: "center",
    color: theme.palette.text.secondary,
  },
}));

const App = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    type: "",
    identyNumber: "",
    // photo: "",
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [type, setType] = useState("");
  const [typeName, setTypeName] = useState("TYP");
  const [nip, setNip] = useState("");
  const [pesel, setPesel] = useState("");
  const [errorFirstNameSubmit, setErrorFirstNameSubmit] = useState(false);
  const [errorLastNameSubmit, setErrorLastNameSubmit] = useState(false);
  const [errorType, setErrorType] = useState(false);
  const [errorNIPSubmit, setErrorNIPSubmit] = useState(false);
  const [errorPESELSubmit, setErrorPESELSubmit] = useState(false);
  const [ifDisablePeselTextField, setIfDisablePeselTextField] = useState(false);
  const [ifDisableNipTextField, setIfDisableNipTextField] = useState(false);
  const [image, setImage] = useState(
    "https://cenea.org.pl/wp-content/uploads/2019/05/blank-profile-picture-973460_960_720-500x500.png"
  );
  const [fetchError, setFetchError] = useState(null);

  // let navigate = useNavigate();

  useEffect(() => {
    if (type === "company") {
      setIfDisablePeselTextField(true);
      setIfDisableNipTextField(false);
    }
    if (type === "person") {
      setIfDisableNipTextField(true);
      setIfDisablePeselTextField(false);
    }
    if (type === "") {
      setIfDisableNipTextField(true);
      setIfDisablePeselTextField(true);
    }
  }, [type]);

  const handleImage = (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(event.target.files[0]);
    console.log("reader", reader);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFetch = () => {
    fetch("http://localhost:3000/Contractor/Save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Nie znaleziono metody zapisu");
        }
        return res.json();
      })
      .catch((err) => {
        setFetchError(err.message);
      });
  };

  const handleSubmit = (event) => {
    firstName.length === 0
      ? setErrorFirstNameSubmit(true)
      : setErrorFirstNameSubmit(false);

    lastName.length === 0
      ? setErrorLastNameSubmit(true)
      : setErrorLastNameSubmit(false);

    if (type === "person") {
      if (pesel.length === 11) {
        setErrorPESELSubmit(false);
        setValues({
          firstName: firstName,
          lastName: lastName,
          type: type,
          identyNumber: pesel.length === 11 ? pesel : "",
        });
        handleFetch();
      } else {
        setErrorPESELSubmit(true);
      }
    } else {
      setErrorPESELSubmit(false);
    }

    if (type === "company") {
      if (nip.length === 10) {
        setErrorNIPSubmit(false);
        setValues({
          firstName: firstName,
          lastName: lastName,
          type: type,
          identyNumber: nip.length === 10 ? nip : "",
        });
        handleFetch();
      } else {
        setErrorNIPSubmit(true);
      }
    } else {
      setErrorNIPSubmit(false);
    }
  };

  const handleMenuItemClick = (event, newType) => {
    setType(newType);
    newType === "person" ? setTypeName("Osoba Prywatna") : setTypeName("Firma");
    setAnchorEl(null);
  };

  const classes = useStyles();

  // console.log("firstName", firstName);
  // console.log("lastName", lastName);
  console.log("NIP", nip);
  console.log("PESEL", pesel);
  console.log("values", values);
  console.log(
    "ifDisableNipTextField, ifDisablePeselTextField",
    ifDisableNipTextField,
    ifDisablePeselTextField
  );
  // console.log(errorFirstNameSubmit);
  // console.log(errorLastNameSubmit);
  // console.log(errorTypeSubmit);

  // console.log(setErrorFirstNameSubmit);

  return (
    <div>
      <style>{"body { background-color: #FFFFF0 ; }"}</style>
      <Container className={classes.mainContainer}>
        <Grid container spacing={2} direction="column">
          <Grid className={classes.gridTextFields} item xs={12}>
            <form noValidate autoComplete="off">
              <TextField
                className={classes.textField}
                id="firstName"
                label="Imię"
                variant="outlined"
                onChange={(event) => setFirstName(event.target.value)}
                helperText={errorFirstNameSubmit ? "Wpisz imię" : ""}
                FormHelperTextProps={{ classes: { root: classes.helperText } }}
                InputLabelProps={{ classes: { root: classes.insideText } }}
                error={errorFirstNameSubmit}
              />
            </form>
          </Grid>
          <Grid item xs={12} style={{ height: 95 }}>
            <form noValidate autoComplete="off">
              <TextField
                className={classes.textField}
                id="lastName"
                label="Nazwisko"
                placeholder="Nazwisko"
                variant="outlined"
                onChange={(event) => setLastName(event.target.value)}
                helperText={errorLastNameSubmit ? "Wpisz nazwisko" : ""}
                FormHelperTextProps={{ classes: { root: classes.helperText } }}
                InputLabelProps={{ classes: { root: classes.insideText } }}
                error={errorLastNameSubmit}
              />
            </form>
          </Grid>
          <Grid item xs={12}>
            <Button
              className={classes.button}
              variant="contained"
              aria-controls="menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              {typeName}
            </Button>
            <Menu
              id="menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              value={type}
            >
              <MenuItem
                className={classes.menuInside}
                onClick={(event) => handleMenuItemClick(event, "person")}
              >
                OSOBA PRYWATNA
              </MenuItem>
              <MenuItem
                className={classes.menuInside}
                onClick={(event) => handleMenuItemClick(event, "company")}
              >
                FIRMA
              </MenuItem>
            </Menu>
          </Grid>
          <Grid
            container
            item
            xs={12}
            style={{ height: 95 }}
            className={classes.gridContainer}
          >
            {" "}
            <form noValidate autoComplete="off">
              <TextField
                className={classes.idNumberTextField}
                id="idNumber"
                label="Numer PESEL"
                placeholder="PESEL"
                variant="outlined"
                onChange={(event) => setPesel(event.target.value)}
                helperText={errorPESELSubmit ? "Niepoprawny numer Pesel" : ""}
                FormHelperTextProps={{ classes: { root: classes.helperText } }}
                InputLabelProps={{ classes: { root: classes.insideText } }}
                error={errorPESELSubmit}
                disabled={ifDisablePeselTextField}
              />
              <TextField
                className={classes.idNumberTextField}
                id="idNumber"
                label="Numer NIP"
                placeholder="NIP"
                variant="outlined"
                onChange={(event) => setNip(event.target.value)}
                helperText={errorNIPSubmit ? "Niepoprawny numer NIP" : ""}
                FormHelperTextProps={{ classes: { root: classes.helperText } }}
                InputLabelProps={{ classes: { root: classes.insideText } }}
                error={errorNIPSubmit}
                disabled={ifDisableNipTextField}
              />{" "}
            </form>
          </Grid>
          <Grid item xs={12}>
            <div>
              <img className={classes.img} src={image} alt="" id="image" />
            </div>
          </Grid>

          <Grid item xs={12}>
            <Button
              className={classes.button}
              variant="contained"
              component="label"
            >
              Upload File
              <input
                type="file"
                id="image_upload"
                name="image_upload"
                accept={["image/jpeg", "image/jpg"]}
                onChange={handleImage}
                hidden
              />
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button
              className={classes.button}
              variant="contained"
              color="inherit"
              border-radius="20px"
              onClick={handleSubmit}
            >
              Submit
            </Button>{" "}
          </Grid>
          <Grid item xs={12}>
            {fetchError && (
              // <div>
              <Paper className={classes.paper} elevation={3}>
                {fetchError}
              </Paper>
              // </div>
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default App;
