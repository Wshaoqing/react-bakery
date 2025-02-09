import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Grid,
  MenuItem,
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

import red from "@material-ui/core/colors/red";
import CloseIcon from "@material-ui/icons/Close";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import React, { useState } from "react";
import { useFormik, Formik, getIn, FieldArray } from "formik";
import * as yup from "yup";
import customers from "src/__mocks__/customers";
import products from "src/__mocks__/products";
import { Search as SearchIcon } from "react-feather";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
});
const validationSchemaDate = yup.object({
  FromDate: yup.date("Select a date").required(),
  ToDate: yup.date("Select another date").required(),
});
const validationSchema = yup.object({
  date: yup.date("Select a date").required(),
  hours: yup.number("Enter opening hours"),
  comment: yup.string("Enter order comment"),
  products: yup.array().of(
    yup.object({
      product: yup
        .string("Select a product")
        .required("Please select a product"),
      startQuantity: yup
        .number("Enter product quantity")
        .required("Please enter a quantity"),
      soldQuantity: yup
        .number("Enter product sold quantity")
        .required("Please enter a quantity"),
      trashQuantity: yup
        .number("Enter product trashed quantity")
        .required("Please enter a quantity"),
    })
  ),
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

const StoreToolbar = (props) => {
  const { numSelected } = props;
  const [open, setOpen] = React.useState(false);

  const formikDate = useFormik({
    initialValues: {
      FromDate: null,
      ToDate: null,
    },
    validationSchema: validationSchemaDate,
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
                Add Sales Report
              </Button>
            </Box>
          )}
        </Toolbar>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <form onSubmit={formikDate.handleSubmit}>
              <Box
                sx={{ maxWidth: 500, display: "flex", alignItems: "center" }}
              >
                <Box style={{ marginRight: "1rem" }}>
                  <Typography variant="h5" sx={{ marginBottom: "0.5rem" }}>
                    From
                  </Typography>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      name="FromDate"
                      variant="inline"
                      id="FromDate"
                      label="From Date"
                      format="MM/dd/yyyy"
                      value={formikDate.values.FromDate}
                      onChange={(value) =>
                        formikDate.setFieldValue("FromDate", value)
                      }
                    />
                  </MuiPickersUtilsProvider>
                </Box>

                <Box>
                  <Typography variant="h5" sx={{ marginBottom: "0.5rem" }}>
                    To
                  </Typography>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      name="ToDate"
                      variant="inline"
                      id="ToDate"
                      label="To Date"
                      format="MM/dd/yyyy"
                      value={formikDate.values.ToDate}
                      onChange={(value) =>
                        formikDate.setFieldValue("ToDate", value)
                      }
                    />
                  </MuiPickersUtilsProvider>
                </Box>

                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  style={{
                    height: "80%",
                    transform: "translateY(0.8rem)",
                    marginLeft: "2rem",
                  }}
                >
                  Search
                </Button>
              </Box>
            </form>
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
            New In-store sales report
          </DialogTitle>
          <DialogContent
            dividers
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h4">Report Infomation</Typography>
            <Formik
              initialValues={{
                date: null,
                hours: 0,
                comment: "",
                products: [],
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                alert(JSON.stringify(values, null, 2));
              }}
            >
              {(formik) => (
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
                      <Grid item lg={6} sm={6} xl={6} xs={12}>
                        <label
                          htmlFor="date"
                          style={{
                            display: "block",
                            marginTop: "1.5rem",
                            marginBottom: "0.8rem",
                          }}
                        >
                          Date
                        </label>

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            fullWidth
                            name="date"
                            variant="inline"
                            id="date"
                            label="Date"
                            format="MM/dd/yyyy"
                            value={formik.values.date}
                            onChange={(value) =>
                              formik.setFieldValue("date", value)
                            }
                          />
                        </MuiPickersUtilsProvider>
                      </Grid>
                      <Grid item lg={6} sm={6} xl={6} xs={12}>
                        <label
                          htmlFor="amount"
                          style={{
                            display: "block",
                            marginTop: "1.5rem",
                            marginBottom: "0.8rem",
                          }}
                        >
                          Opening Hours
                        </label>
                        <TextField
                          id="hours"
                          fullWidth
                          type="number"
                          label="Opening hours"
                          variant="standard"
                          value={formik.values.hours}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.hours && Boolean(formik.errors.hours)
                          }
                          helperText={
                            formik.touched.hours && formik.errors.hours
                          }
                        />
                      </Grid>
                    </Grid>
                  </div>

                  <Typography variant="h4">Sales Comment</Typography>
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
                      label="Comment"
                      multiline
                      variant="outlined"
                      onChange={formik.handleChange}
                      error={
                        formik.touched.comment && Boolean(formik.errors.comment)
                      }
                      helperText={
                        formik.touched.comment && formik.errors.comment
                      }
                    />
                  </div>

                  <Typography variant="h4">In-store Products</Typography>
                  <div
                    style={{
                      width: "90vw",
                      margin: "0 auto",
                      display: "flex",
                      flexDirection: "column",

                      padding: "2rem",
                      borderRadius: "5px",
                      background: "#fff",
                      shadows: " 0 2px 10px rgb(0 0 0 / 30%)",
                    }}
                  >
                    <FieldArray name="products">
                      {(arrayHelpers) => (
                        <div>
                          <Button
                            color="success"
                            variant="contained"
                            style={{ maxWidth: "10rem" }}
                            onClick={() =>
                              arrayHelpers.push({
                                product: "",
                                startQuantity: 0,
                                soldQuantity: 0,
                                trashQuantity: 0,
                              })
                            }
                            style={{ marginBottom: "0.5rem" }}
                          >
                            Add Product
                          </Button>

                          {formik.values.products.map((item, index) => {
                            const product = `products[${index}].product`;
                            const touchedProduct = getIn(
                              formik.touched,
                              product
                            );
                            const errorProduct = getIn(formik.errors, product);

                            const startQuantity = `products[${index}].startQuantity`;
                            const touchedStartQuantity = getIn(
                              formik.touched,
                              startQuantity
                            );
                            const errorStartQuantity = getIn(
                              formik.errors,
                              startQuantity
                            );

                            const trashQuantity = `products[${index}].trashQuantity`;
                            const touchedTrashQuantity = getIn(
                              formik.touched,
                              trashQuantity
                            );
                            const errorTrashQuantity = getIn(
                              formik.errors,
                              trashQuantity
                            );

                            const soldQuantity = `products[${index}].soldQuantity`;
                            const touchedSoldQuantity = getIn(
                              formik.touched,
                              soldQuantity
                            );
                            const errorSoldQuantity = getIn(
                              formik.errors,
                              soldQuantity
                            );

                            return (
                              <Grid
                                container
                                spacing={3}
                                key={index}
                                style={{ marginBottom: "1.5rem" }}
                              >
                                <Grid item lg={3} sm={6} xl={6} xs={6}>
                                  <TextField
                                    select
                                    fullWidth
                                    label="Select"
                                    onChange={formik.handleChange}
                                    value={item.product}
                                    name={product}
                                    helperText={
                                      touchedProduct && errorProduct
                                        ? errorProduct
                                        : ""
                                    }
                                    error={Boolean(
                                      touchedProduct && errorProduct
                                    )}
                                    variant="standard"
                                    style={{ marginBottom: "1rem" }}
                                  >
                                    {products.map((option) => (
                                      <MenuItem
                                        key={option.title}
                                        value={option.title}
                                      >
                                        {option.title}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                </Grid>

                                <Grid item lg={3} sm={6} xl={6} xs={6}>
                                  <TextField
                                    type="number"
                                    value={item.startQuantity}
                                    fullWidth
                                    name={startQuantity}
                                    label="Start Quantity"
                                    variant="standard"
                                    onChange={formik.handleChange}
                                    helperText={
                                      touchedStartQuantity && errorStartQuantity
                                        ? errorStartQuantity
                                        : ""
                                    }
                                    error={Boolean(
                                      touchedStartQuantity && errorStartQuantity
                                    )}
                                  />
                                </Grid>

                                <Grid item lg={3} sm={6} xl={6} xs={6}>
                                  <TextField
                                    type="number"
                                    value={item.soldQuantity}
                                    fullWidth
                                    name={soldQuantity}
                                    label="Sold Quantity"
                                    variant="standard"
                                    onChange={formik.handleChange}
                                    helperText={
                                      touchedSoldQuantity && errorSoldQuantity
                                        ? errorSoldQuantity
                                        : ""
                                    }
                                    error={Boolean(
                                      touchedSoldQuantity && errorSoldQuantity
                                    )}
                                  />
                                </Grid>

                                <Grid item lg={3} sm={6} xl={6} xs={6}>
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <TextField
                                      type="number"
                                      value={item.trashQuantity}
                                      fullWidth
                                      name={trashQuantity}
                                      label="Trash Quantity"
                                      variant="standard"
                                      onChange={formik.handleChange}
                                      helperText={
                                        touchedTrashQuantity &&
                                        errorTrashQuantity
                                          ? errorTrashQuantity
                                          : ""
                                      }
                                      error={Boolean(
                                        touchedTrashQuantity &&
                                          errorTrashQuantity
                                      )}
                                    />

                                    <IconButton
                                      component="span"
                                      style={{ marginLeft: "0.5rem" }}
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      <DeleteIcon style={{ color: red[700] }} />
                                    </IconButton>
                                  </div>
                                </Grid>
                              </Grid>
                            );
                          })}
                        </div>
                      )}
                    </FieldArray>
                  </div>

                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    style={{
                      margin: "2rem auto",
                      display: "block",
                      width: "50vw",
                    }}
                  >
                    Submit
                  </Button>
                </form>
              )}
            </Formik>
          </DialogContent>
        </Dialog>
      </div>
    </Box>
  );
};

export default StoreToolbar;
