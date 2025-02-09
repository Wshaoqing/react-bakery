import * as React from "react";

import {
  CardContent,
  Card,
  Divider,
  CardHeader,
  Typography,
} from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
const Comment = () => {
  return (
    <Card sx={{ height: "100%" }}>
      <PerfectScrollbar>
        <CardHeader title="Customer Comment" />
        <Divider />
        <CardContent>
          <Typography color="textSecondary" variant="h3">
            The customer is allergic to peanuts The customer is allergic to
            peanutsThe customer is allergic to peanutsThe customer is allergic
            to peanutsThe customer is allergic to peanutsThe customer is
            allergic to peanutsThe customer is allergic to peanutsThe customer
            is allergic to peanutsThe customer is allergic to peanutsThe
            customer is allergic to peanutsThe customer is allergic to
            peanutsThe customer is allergic to peanutsThe customer is allergic
            to peanutsThe customer is allergic to peanutsThe customer is
            allergic to peanutsThe customer is allergic to peanutsThe customer
            is allergic to peanutsThe customer is allergic to peanutsThe
            customer is allergic to peanuts
          </Typography>
        </CardContent>
      </PerfectScrollbar>
    </Card>
  );
};

export default Comment;
