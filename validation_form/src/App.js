import React, { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import {
  makeStyles,
  TextField,
  Grid,
  Container,
  Paper,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#FFFFF0",
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

  titlePaper: {
    padding: theme.spacing(2),
    fontFamily: "sans-serif",
    textAlign: "center",
    textJustify: "center",
    borderRadius: "25px",
    marginTop: "10px",
    background: "#DEB887",
  },

  button: {
    fontFamily: "sans-serif",
    background: "#DEB887",
  },

  insideText: {
    fontFamily: "sans-serif",
  },

  idNumberTextField: {
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
    marginTop: "10px",
    width: "25ch",
    background: "#FFFFF0",
    borderRadius: "5px",
  },

  paper: {
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
    photo: "",
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [type, setType] = useState("person");
  const [nip, setNip] = useState("");
  const [pesel, setPesel] = useState("");
  const [errorFirstNameSubmit, setErrorFirstNameSubmit] = useState(false);
  const [errorLastNameSubmit, setErrorLastNameSubmit] = useState(false);
  const [errorNIPSubmit, setErrorNIPSubmit] = useState(false);
  const [errorPESELSubmit, setErrorPESELSubmit] = useState(false);
  const [image, setImage] = useState(
    "https://cenea.org.pl/wp-content/uploads/2019/05/blank-profile-picture-973460_960_720-500x500.png"
  );
  const [fetchError, setFetchError] = useState(null);

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
        photo: image,
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
        photo: image,
      });
    } else {
      setErrorNIPSubmit(false);
    }

    fetch("http://localhost:3000/ValidationForm/Contractor/Save", {
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

  const classes = useStyles();

  // console.log("firstName", firstName);
  // console.log("lastName", lastName);
  // console.log("NIP", nip);
  // console.log("PESEL", pesel);
  // console.log("values", values);
  // console.log("errorNIPSubmit", errorNIPSubmit);
  // console.log("errorPESELSubmit", errorPESELSubmit);
  // console.log(errorTypeSubmit);
  // console.log(setErrorFirstNameSubmit);

  return (
    <div className={classes.root}>
      <style>{"body { background-color: #FFFFF0 ; }"}</style>
      <Container className={classes.mainContainer}>
        <Grid container spacing={2} direction="column">
          <Grid item xs={12}>
            <Paper className={classes.titlePaper} elevation={2}>
              FORMULARZ DODAWANIA KONTRAHENTA
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <form noValidate autoComplete="off">
              <TextField
                className={classes.textField}
                id="firstName"
                label="Imię"
                placeholder="Imię"
                variant="outlined"
                onChange={(event) => setFirstName(event.target.value)}
                helperText={errorFirstNameSubmit ? "Wpisz imię" : ""}
                FormHelperTextProps={{ classes: { root: classes.helperText } }}
                InputLabelProps={{ classes: { root: classes.insideText } }}
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
                FormHelperTextProps={{ classes: { root: classes.helperText } }}
                InputLabelProps={{ classes: { root: classes.insideText } }}
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
              className={classes.button}
              elevation={3}
            >
              <ToggleButton
                style={{ width: 150 }}
                value="person"
                aria-label="left aligned"
                className={classes.button}
              >
                Osoba
              </ToggleButton>
              <ToggleButton
                style={{ width: 150 }}
                value="company"
                aria-label="right aligned"
                className={classes.button}
              >
                Firma
              </ToggleButton>
            </ToggleButtonGroup>
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
                FormHelperTextProps={{ classes: { root: classes.helperText } }}
                InputLabelProps={{ classes: { root: classes.insideText } }}
                error={type === "company" ? errorNIPSubmit : errorPESELSubmit}
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
              <Paper className={classes.paper} elevation={3}>
                {fetchError}
              </Paper>
            )}
          </Grid>{" "}
        </Grid>
      </Container>
    </div>
  );
};

export default App;
