import { Helmet } from "react-helmet";
import { Box, Container } from "@material-ui/core";
import CustomerListResults from "src/components/customer/CustomerListResults";

import customers from "src/__mocks__/customers";

const CustomerList = () => (
  <>
    <Helmet>
      <title>Customers | Bakery</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
        py: 3,
      }}
    >
      <Container maxWidth={false}>
        <Box sx={{ pt: 3 }}>
          <CustomerListResults customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);

export default CustomerList;
