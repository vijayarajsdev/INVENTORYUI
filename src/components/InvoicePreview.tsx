import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

interface Product {
  name: string;
  hsn: string;
  quantity: string;
  rate: string;
  cgst: string;
  sgst: string;
}

interface InvoicePreviewProps {
  customerName: string;
  customerAddress: string;
  customerMobile: string;
  customerEmail: string;
  customerGstin?: string;
  invoiceDate: string;
  dueDate: string;
  terms: string;
  placeOfSupply: string;
  products: Product[];
}

const InvoicePreview = ({
  customerName,
  customerAddress,
  customerMobile,
  customerEmail,
  customerGstin,
  invoiceDate,
  dueDate,
  terms,
  placeOfSupply,
  products,
}: InvoicePreviewProps) => {
  const calculateAmount = (
    price: string,
    quantity: string,
    cgst: string,
    sgst: string
  ) => {
    const p = parseFloat(price) || 0;
    const q = parseFloat(quantity) || 0;
    const c = parseFloat(cgst) || 0;
    const s = parseFloat(sgst) || 0;
    const subtotal = p * q;
    const cgstAmount = (subtotal * c) / 100;
    const sgstAmount = (subtotal * s) / 100;
    return subtotal + cgstAmount + sgstAmount;
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 5, // Changed padding to 5
        maxWidth: 1000,
        margin: "auto",
        border: "2px solid #000",
        borderRadius: 2,
      }}>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 4,
          pb: 2,
          borderBottom: "1px solid #ccc", // Add bottom border
        }}>
        <Box sx={{ display: "flex", gap: 3 }}>
          <Box>
            <img
              src="/your-logo.png"
              alt="Logo"
              style={{ height: 100, width: 200 }} /* Modified dimensions */
            />
          </Box>
          <Box>
            <Typography variant="h6">Your Organization Name</Typography>
            <Typography>Your Address Line 1</Typography>
            <Typography>Your Address Line 2</Typography>
            <Typography>GSTIN: YOUR-GSTIN-NUMBER</Typography>
            <Typography>Mobile: YOUR-MOBILE-NUMBER</Typography>
            <Typography>Email: your@email.com</Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="h4" align="right">
            TAX INVOICE
          </Typography>
          <Typography variant="h6" align="right">
            Invoice #: INV-{Date.now()}
          </Typography>
        </Box>
      </Box>

      {/* Invoice Details Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 4,
          pb: 2,
          borderBottom: "1px solid #ccc", // Add bottom border
        }}>
        <Box sx={{ width: "45%" }}>
          <Typography variant="subtitle2">
            Invoice Date: {invoiceDate}
          </Typography>
          <Typography variant="subtitle2">Terms: {terms}</Typography>
          <Typography variant="subtitle2">Due Date: {dueDate}</Typography>
        </Box>
        <Box sx={{ width: "45%" }}>
          <Typography variant="subtitle2">
            Place of Supply: {placeOfSupply}
          </Typography>
        </Box>
      </Box>

      {/* Bill To Section */}
      <Box
        sx={{
          mb: 4,
          pb: 2,
          borderBottom: "1px solid #ccc", // Add bottom border
        }}>
        <Typography
          variant="h6"
          sx={{
            backgroundColor: "#f5f5f5",
            p: 1,
            borderBottom: "1px solid #ccc", // Add bottom border to header
          }}>
          BILL TO
        </Typography>
        <Typography variant="subtitle1">{customerName}</Typography>
        <Typography>{customerAddress}</Typography>
        <Typography>Mobile: {customerMobile}</Typography>
        <Typography>Email: {customerEmail}</Typography>
        {customerGstin && <Typography>GSTIN: {customerGstin}</Typography>}
      </Box>

      {/* Products Table */}
      <TableContainer
        sx={{
          "& .MuiTableCell-root": {
            // Add borders to all table cells
            border: "1px solid #ccc",
          },
        }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>S.NO</TableCell>
              <TableCell>ITEM</TableCell>
              <TableCell>HSN/SAC</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell colSpan={2}>CGST</TableCell>
              <TableCell colSpan={2}>SGST</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>%</TableCell>
              <TableCell>Amt</TableCell>
              <TableCell>%</TableCell>
              <TableCell>Amt</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => {
              const amount = calculateAmount(
                product.rate,
                product.quantity,
                product.cgst,
                product.sgst
              );
              const cgstAmount =
                (parseFloat(product.rate) *
                  parseFloat(product.quantity) *
                  parseFloat(product.cgst)) /
                100;
              const sgstAmount =
                (parseFloat(product.rate) *
                  parseFloat(product.quantity) *
                  parseFloat(product.sgst)) /
                100;

              return (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.hsn}</TableCell>
                  <TableCell>{product.quantity} PCS</TableCell>
                  <TableCell>{parseFloat(product.rate).toFixed(2)}</TableCell>
                  <TableCell>{product.cgst}%</TableCell>
                  <TableCell>{cgstAmount.toFixed(2)}</TableCell>
                  <TableCell>{product.sgst}%</TableCell>
                  <TableCell>{sgstAmount.toFixed(2)}</TableCell>
                  <TableCell>{amount.toFixed(2)}</TableCell>
                </TableRow>
              );
            })}
            {/* Add total row */}
            <TableRow>
              <TableCell colSpan={9} align="right" sx={{ fontWeight: "bold" }}>
                Total Amount:
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                {products
                  .reduce((sum, product) => {
                    return (
                      sum +
                      calculateAmount(
                        product.rate,
                        product.quantity,
                        product.cgst,
                        product.sgst
                      )
                    );
                  }, 0)
                  .toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Terms and Conditions Section */}
      <Box
        sx={{
          mt: 4,
          pt: 2,
          borderTop: "1px solid #ccc", // Add top border
        }}>
        <Typography variant="h6" gutterBottom>
          Terms and Conditions:
        </Typography>
        <Typography variant="body2" color="text.secondary">
          1. Payment is due within {terms} days
        </Typography>
        <Typography variant="body2" color="text.secondary">
          2. Goods once sold will not be taken back
        </Typography>
      </Box>

      {/* Signature Section */}
      <Box
        sx={{
          mt: 4,
          pt: 2,
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #ccc", // Add top border
        }}>
        <Box>
          <Typography variant="subtitle2">Customer's Signature</Typography>
          <Box sx={{ mt: 4, borderTop: "1px solid #ccc", width: 200 }} />
        </Box>
        <Box>
          <Typography variant="subtitle2">Authorized Signature</Typography>
          <Box sx={{ mt: 4, borderTop: "1px solid #ccc", width: 200 }} />
        </Box>
      </Box>
    </Paper>
  );
};

export default InvoicePreview;
