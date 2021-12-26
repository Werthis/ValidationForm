import React, { useState, useEffect, Component } from "react";
// import { Browser as Router, Switch, Route } from "react-router-dom";
import { DropzoneArea } from "material-ui-dropzone";
import PageNotFound from "./Components/404_page";
import Dropzone from "dropzone";
// import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
// import InputAdornment from "@material-ui/core/InputAdornment";
import { Grid, Container, Menu, MenuItem, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    flexWrap: "wrap",
    textAlign: "center",
    flexGrow: 1,
    justifyContent: "space-evenly",
    background: "#FFFFF0",
    // justifyContent: "center",
    alignItems: "center",
  },
  gridContainer: {
    justifyContent: "center",
    alignItems: "center",
    background: "#FFFFF0",
  },
  img: {
    width: "150px",
    height: "150px",
    objectFit: "cover",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
    background: "#fffd",
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
  const [idNumberLabel, setIdNumberLabel] = useState(
    <div style={{ height: 80 }} />
  );
  // const [dropzoneInfo, setDropzoneInfo] = useState(
  //   "Drag and drop an image here or click"
  // );
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

  useEffect(() => {
    if (type == "company") {
      setIfDisablePeselTextField(true);
      setIfDisableNipTextField(false);
    }
    if (type == "person") {
      setIfDisableNipTextField(true);
      setIfDisablePeselTextField(false);
    }
    if (type == "") {
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
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeFirstName = (event) => {
    setFirstName(firstName);
  };

  // const error = nip.length === 10 ? false : true;

  const handleSubmit = (event) => {
    if (type === "person") {
      if (pesel.length === 11) {
        setErrorPESELSubmit(false);
      } else {
        setErrorPESELSubmit(true);
      }
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
      if (nip.length === 10) {
        setErrorNIPSubmit(false);
      } else {
        setErrorNIPSubmit(true);
      }
      setValues({
        firstName: firstName,
        lastName: lastName,
        type: type,
        identyNumber: nip.length === 10 ? nip : "",
      });
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

  console.log("type", type);
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
    <Container className={classes.root}>
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
              // placeholder="wprowadź nazwisko"
              variant="outlined"
              onChange={(event) => setLastName(event.target.value)}
              helperText={errorLastNameSubmit ? "Wpisz nazwisko" : ""}
              error={errorLastNameSubmit}
            />
          </form>
        </Grid>
        <Grid item xs={12}>
          <Button
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
            <MenuItem onClick={(event) => handleMenuItemClick(event, "person")}>
              OSOBA PRYWATNA
            </MenuItem>
            <MenuItem
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
          style={{ height: 80 }}
          className={classes.gridContainer}
        >
          {" "}
          <form noValidate autoComplete="off">
            <TextField
              className={classes.textField}
              id="idNumber"
              label="Numer PESEL"
              placeholder="PESEL"
              variant="outlined"
              onChange={(event) => setPesel(event.target.value)}
              helperText={errorPESELSubmit ? "Niepoprawny numer Pesel" : ""}
              error={errorPESELSubmit}
              disabled={ifDisablePeselTextField}
            />
            <TextField
              className={classes.textField}
              id="idNumber"
              label="Numer NIP"
              placeholder="NIP"
              variant="outlined"
              onChange={(event) => setNip(event.target.value)}
              helperText={errorNIPSubmit ? "Niepoprawny numer NIP" : ""}
              error={errorNIPSubmit}
              disabled={ifDisableNipTextField}
            />{" "}
          </form>
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
          <div>
            <img src={image} alt="" id="image" />
          </div>
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="inherit"
            border-radius="20px"
            // href="https://localhost:60001/Contractor/Save"
            onClick={handleSubmit}
          >
            Link
          </Button>{" "}
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
