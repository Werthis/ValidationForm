import React, { useState } from "react";
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

  const [anchorEl, setAnchorEl] = useState(null);
  const [type, setType] = useState("");
  const [idNumber, setIdNumber] = useState("Numer");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (event, newType) => {
    setType(newType);
    newType === "person" ? setIdNumber('Numer PESEL') : setIdNumber('Numer NIP');
    setAnchorEl(null);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  

  const classes = useStyles();

  console.log(type);
  console.log(idNumber);


  return (
    <div className="App">
      <Container maxWidth="sm">
        <Grid
          container
          spacing={2}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid container item xs={12}>
            <form noValidate autoComplete="off">
              <TextField id="outlined-basic" label="Imię" variant="outlined" />
            </form>
          </Grid>
          <Grid container item xs={12}>
            <form noValidate autoComplete="off">
              <TextField
                id="outlined-basic"
                label="Nazwisko"
                variant="outlined"
              />
            </form>
          </Grid>
          <Grid container item xs={12}>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              Typ
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
                Osoba Prywatna
              </MenuItem>
              <MenuItem
                onClick={(event) => handleMenuItemClick(event, "company")}
              >
                Firma
              </MenuItem>
            </Menu>
          </Grid>
          <Grid container item xs={12}>
            <form noValidate autoComplete="off">
              <TextField
                id="outlined-basic"
                label={idNumber}
                variant="outlined"
              />
            </form>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default App;
