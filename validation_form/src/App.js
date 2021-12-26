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
  const [errorTypeSubmit, setErrorTypeSubmit] = useState(false);
  const [ifDisablePeselTextField, setIfDisablePeselTextField] = useState(false);
  const [ifDisableNipTextField, setIfDisableNipTextField] = useState(false);

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
    // return () => {
    //   cleanup;
    // };
  }, [type]);

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
    // if (firstName === "") {
    //   setErrorFirstNameSubmit(true);
    // }
    // if (lastName === "") {
    //   setErrorLastNameSubmit(true);
    // }
    if (
      (type === "person" && pesel === "") ||
      (type === "company" && nip === "")
    ) {
      setErrorTypeSubmit(true);
    } else {
      // setErrorFirstNameSubmit(false);
      // setErrorLastNameSubmit(false);
      setErrorTypeSubmit(false);
      setValues({
        firstName: firstName,
        lastName: lastName,
        type: type,
        identyNumber: type === "person" ? pesel : nip,
      });
    }
  };

  const handleMenuItemClick = (event, newType) => {
    setType(newType);
    if (newType === "person") {
      //   setIdNumberLabel(
      //     <Grid
      //       container
      //       item
      //       xs={12}
      //       style={{ height: 80 }}
      //       className={classes.gridContainer}
      //     >
      //       <TextField
      //         className={classes.textField}
      //         id="idNumber"
      //         label="Numer PESEL"
      //         variant="outlined"
      //         onChange={(event) => setPesel(event.target.value)}
      //         helperText={errorTypeSubmit ? "Niepoprawny numer Pesel" : ""}
      //         error={errorTypeSubmit}
      //       />
      //     </Grid>
      //   );
      setTypeName("Osoba Prywatna");
    } else {
      // setIdNumberLabel(
      //   <Grid
      //     container
      //     item
      //     xs={12}
      //     style={{ height: 80 }}
      //     className={classes.gridContainer}
      //   >
      //     <TextField
      //       className={classes.textField}
      //       id="idNumber"
      //       label="Numer NIP"
      //       variant="outlined"
      //       onChange={(event) => setNip(event.target.value)}
      //       helperText={errorTypeSubmit ? "Niepoprawny numer NIP" : ""}
      //       error={errorTypeSubmit}
      //     />{" "}
      //   </Grid>
      // );
      setTypeName("Firma");
    }

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
              variant="outlined"
              onChange={(event) => setPesel(event.target.value)}
              helperText={errorTypeSubmit ? "Niepoprawny numer Pesel" : ""}
              error={errorTypeSubmit}
              disabled={ifDisablePeselTextField}
            />
            <TextField
              className={classes.textField}
              id="idNumber"
              label="Numer NIP"
              variant="outlined"
              onChange={(event) => setNip(event.target.value)}
              helperText={errorTypeSubmit ? "Niepoprawny numer NIP" : ""}
              error={errorTypeSubmit}
              disabled={ifDisableNipTextField}
            />{" "}
          </form>
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" component="label">
            Upload File
            <input type="file" accept={["image/jpeg", "image/jpg"]} hidden />
          </Button>
        </Grid>
        {/* <Grid
            container
            alignContent="center"
            justifyContent="center"
            item
            xs={12}
            style={{ width: 200, height: 600 }}
          >
            <DropzoneArea
              acceptedFiles={["image/jpeg", "image/jpg"]}
              getPreviewIcon={(file) => {
                if (file.file.type.split("/")[0] === "image")
                  setDropzoneInfo("");
                return (
                  <img
                    className={classes.previewImg}
                    role="presentation"
                    src={file.data}
                    resizeWidth="200"
                    resizeHeight="200"

                    /// Sprawdzić dokumentację <img> (zakładka mozzilla) i zobaczyć czy da się ustawić 1:1 oraz
                    /// wysokość
                  />
                );
              }}
              maxSize="300"
              Icon="null"
              filesLimit={1}
              dropzoneText={dropzoneInfo}
              onChange={(files) => console.log("Files:", files)}
            />
          </Grid>{" "} */}
        {/* <Grid container item xs={12}>
            {/* <Dropzone></Dropzone> */}
        {/* </Grid> */}
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
