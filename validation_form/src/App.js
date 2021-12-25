import React, { useState, Component } from "react";
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
    display: "flex",
    flexWrap: "wrap",
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
  const [idNumberLabel, setIdNumberLabel] = useState();
  const [dropzoneInfo, setDropzoneInfo] = useState(
    "Drag and drop an image here or click"
  );
  const [nip, setNip] = useState("");
  const [pesel, setPesel] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeFirstName = (event) => {
    setFirstName(firstName);
  };

  const handleMenuItemClick = (event, newType) => {
    setType(newType);
    if (newType === "person") {
      setIdNumberLabel(
        <Grid container item xs={12}>
          <TextField
            className={classes.textField}
            id="idNumber"
            label="Numer PESEL"
            variant="outlined"
            onChange={(event) => setPesel(event.target.value)}
          />
        </Grid>
      );
      setTypeName("Osoba Prywatna");
    } else {
      setIdNumberLabel(
        <TextField
          className={classes.textField}
          id="idNumber"
          label="Numer NIP"
          variant="outlined"
          onChange={(event) => setNip(event.target.value)}
        />
      );
      setTypeName("Firma");
    }
    setAnchorEl(null);
  };

  const handleSubmit = (event) => {
    setValues({
      firstName: firstName,
      lastName: lastName,
      type: type,
      identyNumber: type === "person" ? pesel : nip,
    });
  };

  const classes = useStyles();

  console.log("type", type);
  console.log("firstName", firstName);
  console.log("lastName", lastName);
  console.log("NIP", nip);
  console.log("PESEL", pesel);
  console.log("values", values);

  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Grid
          container
          spacing={2}
          direction="column"
          // justifyContent="center"
          // alignItems="center"
        >
          <Grid item xs={12}>
            <form noValidate autoComplete="off">
              <TextField
                className={classes.textField}
                id="firstName"
                label="Imię"
                variant="outlined"
                onChange={(event) => setFirstName(event.target.value)}
              />
            </form>
          </Grid>
          <Grid item xs={12}>
            <form noValidate autoComplete="off">
              <TextField
                className={classes.textField}
                id="lastName"
                label="Nazwisko"
                variant="outlined"
                onChange={(event) => setLastName(event.target.value)}
              />
            </form>
          </Grid>
          <Grid item xs={12}>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              {typeName}
            </Button>
            <Menu
              id="simple-menu"
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
            </Menu>
          </Grid>
          <Grid item xs={12}>
            <form noValidate autoComplete="off">
              {idNumberLabel}
            </form>
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
              color="primary"
              // href="https://localhost:60001/Contractor/Save"
              onClick={(event) => {
                setValues({
                  firstName: firstName,
                  lastName: lastName,
                  type: type,
                  identyNumber: type === "person" ? pesel : nip,
                });
              }}
            >
              Link
            </Button>{" "}
          </Grid>
        </Grid>
      </Container>{" "}
      {/* <Router>
        /* <Switch> */}
      {/* <Route component={PageNotFound} /> */}
      {/* </Switch> */}
      {/* </Router> */}
    </div>
  );
};

export default App;
