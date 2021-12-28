import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  // useNavigate,
  Link,
  Navigate,
} from "react-router-dom";
import PageNotFound from "./Components/404_page";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import {
  Grid,
  Container,
  Menu,
  Paper,
  MenuItem,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    // flexWrap: "wrap",
    // textAlign: "center",
    // flexGrow: 1,
    // justifyContent: "space-evenly",
    background: "#FFFFF0",
    // alignItems: "center",
  },

  mainContainer: {
    flexWrap: "wrap",
    textAlign: "center",
    flexGrow: 1,
    justifyContent: "space-evenly",
    background: "#3CB371",
    alignItems: "center",
  },

  gridContainer: {
    justifyContent: "center",
    alignItems: "center",
    background: "#FFFFF0",
  },

  idNumberTextField: {
    marginRight: "5px",
    marginLeft: "5px",
    width: "25ch",
    background: "#D8BFD8",
    borderRadius: "5px",
  },

  img: {
    width: "150px",
    height: "150px",
    objectFit: "cover",
    borderRadius: "10px",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
    background: "#FFFFF0",
    borderRadius: "5px",
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
  const [type, setType] = useState("person");
  const [typeName, setTypeName] = useState("TYP");
  const [nip, setNip] = useState("");
  const [pesel, setPesel] = useState("");
  const [errorFirstNameSubmit, setErrorFirstNameSubmit] = useState(false);
  const [errorLastNameSubmit, setErrorLastNameSubmit] = useState(false);
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

  const handleType = (event, newType) => {
    if (newType !== null) {
      setType(newType);
    }
  };

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

  const handleSubmit = (event) => {
    firstName.length === 0
      ? setErrorFirstNameSubmit(true)
      : setErrorFirstNameSubmit(false);

    lastName.length === 0
      ? setErrorLastNameSubmit(true)
      : setErrorLastNameSubmit(false);

    if (type === "person") {
      pesel.length === 11
        ? setErrorPESELSubmit(false)
        : setErrorPESELSubmit(true);

      setValues({
        firstName: firstName,
        lastName: lastName,
        type: type,
        identyNumber: pesel.length === 11 ? pesel : "",
      });
    } else {
      setErrorPESELSubmit(false);
    }

    if (type === "company") {
      nip.length === 10 ? setErrorNIPSubmit(false) : setErrorNIPSubmit(true);

      setValues({
        firstName: firstName,
        lastName: lastName,
        type: type,
        identyNumber: nip.length === 10 ? nip : "",
      });
    } else {
      setErrorNIPSubmit(false);
    }

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
  // console.log(
  //   "ifDisableNipTextField, ifDisablePeselTextField",
  //   ifDisableNipTextField,
  //   ifDisablePeselTextField
  // );
  console.log("errorNIPSubmit", errorNIPSubmit);
  console.log("errorPESELSubmit", errorPESELSubmit);
  // console.log(errorTypeSubmit);

  // console.log(setErrorFirstNameSubmit);

  return (
    <div className={classes.root}>
      <style>{"body { background-color: #FFFFF0 ; }"}</style>
      <Container className={classes.mainContainer}>
        <Grid container spacing={2} direction="column">
          <Grid item xs={12}>
            <form noValidate autoComplete="off">
              <TextField
                className={classes.textField}
                id="firstName"
                label="Imię"
                variant="outlined"
                onChange={(event) => setFirstName(event.target.value)}
                helperText={errorFirstNameSubmit ? "Wpisz imię" : ""}
                error={errorFirstNameSubmit}
              />
            </form>
          </Grid>
          <Grid item xs={12}>
            <form noValidate autoComplete="off">
              <TextField
                className={classes.textField}
                id="lastName"
                label="Nazwisko"
                placeholder="Nazwisko"
                variant="outlined"
                onChange={(event) => setLastName(event.target.value)}
                helperText={errorLastNameSubmit ? "Wpisz nazwisko" : ""}
                error={errorLastNameSubmit}
              />
            </form>
          </Grid>
          <Grid item xs={12}>
            <ToggleButtonGroup
              value={type}
              exclusive
              onChange={handleType}
              aria-label="text variable"
            >
              <ToggleButton
                style={{ width: 200 }}
                value="person"
                aria-label="left aligned"
                className={classes.button}
              >
                {/* <img src={rainLogo} alt="rainLogo" width="36" height="36" /> */}
                Osoba
              </ToggleButton>
              <ToggleButton
                style={{ width: 200 }}
                value="company"
                aria-label="right aligned"
                className={classes.button}
              >
                {/* <img src={tempLogo} alt="tempLogo" width="36" height="36" />{" "} */}
                Firma
              </ToggleButton>
            </ToggleButtonGroup>
            {/* <Button
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
                onClick={(event) => handleMenuItemClick(event, "person")}
              >
                OSOBA PRYWATNA
              </MenuItem>
              <MenuItem
                onClick={(event) => handleMenuItemClick(event, "company")}
              >
                FIRMA
              </MenuItem>
            </Menu> */}
          </Grid>
          <Grid
            container
            item
            xs={12}
            style={{ height: 80 }}
            className={classes.gridContainer}
          >
            {" "}
            <form noValidate autoComplete="off">
              <TextField
                className={classes.idNumberTextField}
                id="idNumber"
                label={type === "company" ? "Numer NIP" : "Numer PESEL"}
                placeholder={type === "company" ? "NIP" : "PESEL"}
                variant="outlined"
                onChange={(event) =>
                  type === "person"
                    ? setPesel(event.target.value)
                    : setNip(event.target.value)
                }
                // helperText={handleHelperText}
                FormHelperTextProps={{ classes: { root: classes.helperText } }}
                InputLabelProps={{ classes: { root: classes.insideText } }}
                error={type === "company" ? errorNIPSubmit : errorPESELSubmit}
                // disabled={ifDisablePeselTextField}
              />{" "}
            </form>
          </Grid>
          <Grid item xs={12}>
            <div>
              <img className={classes.img} src={image} alt="" id="image" />
            </div>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" component="label">
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
              variant="contained"
              color="inherit"
              border-radius="20px"
              // href="https://localhost:60001/Contractor/Save"
              onClick={handleSubmit}
            >
              Submit
            </Button>{" "}
          </Grid>
          <Grid item xs={12}>
            {fetchError && (
              <Paper className={classes.paper} elevation={3}>
                {fetchError}
              </Paper>
            )}
          </Grid>{" "}
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<div />} />{" "}
              <Route path="*" element={<PageNotFound />} />{" "}
            </Routes>
          </BrowserRouter>
        </Grid>
      </Container>
    </div>
  );
};

export default App;
