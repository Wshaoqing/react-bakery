import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Grid,
} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import { alpha } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import "date-fns";

import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";

import CloseIcon from "@material-ui/icons/Close";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import { Search as SearchIcon } from "react-feather";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
});

const validationSchema = yup.object({
  ingredientName: yup.string("Enter ingredient name").required(),
  price: yup.number("Enter ingredient price per kg").required(),
  comment: yup.string("Enter comment"),
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h4" sx={{ fontSize: "1.5em" }}>
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          sx={{
            position: "absolute",
            right: "1rem",
            top: "0.1rem",
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const IngredientsListToolbar = (props) => {
  const { numSelected } = props;
  const [open, setOpen] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      ingredientName: "",
      price: 0,
      comment: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{}}>
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(numSelected > 0 && {
              bgcolor: (theme) =>
                alpha(
                  theme.palette.primary.main,
                  theme.palette.action.activatedOpacity
                ),
            }),
          }}
        >
          {numSelected > 0 ? (
            <Typography
              sx={{ flex: "1 1 100%" }}
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              {numSelected} selected
            </Typography>
          ) : null}

          {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: 1,
              }}
            >
              <Button
                color="primary"
                variant="contained"
                onClick={handleClickOpen}
              >
                Add ingredient
              </Button>
            </Box>
          )}
        </Toolbar>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Search ingredient"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>

      <div>
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          fullScreen={true}
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            New ingredient
          </DialogTitle>
          <DialogContent
            dividers
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h4">Ingredient Infomation</Typography>

            <form onSubmit={formik.handleSubmit}>
              <div
                style={{
                  width: "90vw",
                  margin: "0 auto",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",

                  padding: "2rem",
                  borderRadius: "5px",
                  background: "#fff",
                  shadows: " 0 2px 10px rgb(0 0 0 / 30%)",
                }}
              >
                <Grid container spacing={3}>
                  <Grid item lg={3} sm={6} xl={6} xs={12}>
                    <label
                      htmlFor="name"
                      style={{
                        display: "block",
                        marginTop: "1.5rem",
                        marginBottom: "0.8rem",
                      }}
                    >
                      Ingredient Name
                    </label>
                    <TextField
                      id="ingredientName"
                      fullWidth
                      label="Name"
                      variant="standard"
                      value={formik.values.ingredientName}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.ingredientName &&
                        Boolean(formik.errors.ingredientName)
                      }
                      helperText={
                        formik.touched.ingredientName &&
                        formik.errors.ingredientName
                      }
                    />
                  </Grid>

                  <Grid item lg={3} sm={6} xl={6} xs={12}>
                    <label
                      htmlFor="price"
                      style={{
                        display: "block",
                        marginTop: "1.5rem",
                        marginBottom: "0.8rem",
                      }}
                    >
                      Price / Kg
                    </label>
                    <TextField
                      id="price"
                      fullWidth
                      label="Price"
                      variant="standard"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.price && Boolean(formik.errors.price)
                      }
                      helperText={formik.touched.price && formik.errors.price}
                    />
                  </Grid>
                </Grid>
              </div>

              <Typography variant="h4">Ingredient Note</Typography>
              <div
                style={{
                  width: "90vw",
                  margin: "0 auto",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",

                  padding: "2rem",
                  borderRadius: "5px",
                  background: "#fff",
                  shadows: " 0 2px 10px rgb(0 0 0 / 30%)",
                }}
              >
                <TextField
                  value={formik.values.comment}
                  id="comment"
                  fullWidth
                  rows={5}
                  maxRows={10}
                  label="Note"
                  multiline
                  variant="outlined"
                  onChange={formik.handleChange}
                  error={
                    formik.touched.comment && Boolean(formik.errors.comment)
                  }
                  helperText={formik.touched.comment && formik.errors.comment}
                />
              </div>

              <Button
                color="primary"
                variant="contained"
                type="submit"
                style={{ margin: "2rem auto", display: "block", width: "50vw" }}
              >
                Submit
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </Box>
  );
};

export default IngredientsListToolbar;
