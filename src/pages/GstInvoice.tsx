import { useState } from "react";
import { Button, TextField, Box, Modal, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import InvoicePreview from "../components/InvoicePreview";
import CloseIcon from "@mui/icons-material/Close";

const GstInvoice = () => {
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerMobile, setCustomerMobile] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerGstin, setCustomerGstin] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [terms, setTerms] = useState("");
  const [placeOfSupply, setPlaceOfSupply] = useState("");
  const [products, setProducts] = useState([
    { name: "", hsn: "", quantity: "", rate: "", cgst: "", sgst: "" },
  ]);
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(false);

  const handleAddProduct = () => {
    setProducts([
      ...products,
      { name: "", hsn: "", quantity: "", rate: "", cgst: "", sgst: "" },
    ]);
  };

  type ProductField = "name" | "hsn" | "quantity" | "rate" | "cgst" | "sgst";

  const handleProductChange = (
    index: number,
    field: ProductField,
    value: string
  ) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  const handleSave = () => {
    setShowPreview(true);
  };

  const handleClose = () => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(20);
    doc.text("TAX INVOICE", doc.internal.pageSize.width / 2, 20, {
      align: "center",
    });

    // Company Details
    doc.setFontSize(12);
    doc.text("Your Company Name", 20, 40);
    doc.text("Address Line 1", 20, 45);
    doc.text("City, State, PIN", 20, 50);
    doc.text("GSTIN: YOUR_GSTIN", 20, 55);

    // Customer Details
    doc.setFontSize(10);
    doc.text("Bill To:", 20, 70);
    doc.text(customerName, 20, 75);
    doc.text(customerAddress, 20, 80);
    doc.text(`Mobile: ${customerMobile}`, 20, 85);
    doc.text(`Email: ${customerEmail}`, 20, 90);
    doc.text(`GSTIN: ${customerGstin}`, 20, 95);

    // Invoice Details
    doc.text(
      `Invoice Date: ${invoiceDate}`,
      doc.internal.pageSize.width - 60,
      70
    );
    doc.text(`Due Date: ${dueDate}`, doc.internal.pageSize.width - 60, 75);
    doc.text(
      `Place of Supply: ${placeOfSupply}`,
      doc.internal.pageSize.width - 60,
      80
    );

    // Table Header
    const startY = 110;
    doc.setFillColor(240, 240, 240);
    doc.rect(20, startY - 5, doc.internal.pageSize.width - 40, 8, "F");
    doc.text("Product", 25, startY);
    doc.text("HSN", 80, startY);
    doc.text("Qty", 100, startY);
    doc.text("Rate", 120, startY);
    doc.text("CGST", 140, startY);
    doc.text("SGST", 160, startY);
    doc.text("Amount", 180, startY);

    // Table Content
    let yPos = startY + 10;
    let totalAmount = 0;

    products.forEach((product) => {
      const quantity = parseFloat(product.quantity) || 0;
      const rate = parseFloat(product.rate) || 0;
      const cgst = parseFloat(product.cgst) || 0;
      const sgst = parseFloat(product.sgst) || 0;

      const subtotal = quantity * rate;
      const cgstAmount = (subtotal * cgst) / 100;
      const sgstAmount = (subtotal * sgst) / 100;
      const total = subtotal + cgstAmount + sgstAmount;
      totalAmount += total;

      doc.text(product.name, 25, yPos);
      doc.text(product.hsn, 80, yPos);
      doc.text(product.quantity, 100, yPos);
      doc.text(product.rate, 120, yPos);
      doc.text(`${product.cgst}%`, 140, yPos);
      doc.text(`${product.sgst}%`, 160, yPos);
      doc.text(total.toFixed(2), 180, yPos);

      yPos += 10;
    });

    // Total
    doc.setDrawColor(0);
    doc.line(20, yPos, doc.internal.pageSize.width - 20, yPos);
    yPos += 10;
    doc.setFontSize(12);
    doc.text(
      `Total Amount: ₹${totalAmount.toFixed(2)}`,
      doc.internal.pageSize.width - 60,
      yPos
    );

    // Terms and Conditions
    if (terms) {
      yPos += 20;
      doc.text("Terms and Conditions:", 20, yPos);
      doc.setFontSize(10);
      doc.text(terms, 20, yPos + 5);
    }

    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, "_blank");
    navigate("/invoice");
    setShowPreview(false);
  };

  return (
    <Box sx={{ p: 4 }}>
      <h2>Create GST Invoice</h2>

      {/* Customer Details */}
      <TextField
        fullWidth
        label="Customer Name"
        margin="normal"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      />
      <TextField
        fullWidth
        label="Customer Address"
        margin="normal"
        value={customerAddress}
        onChange={(e) => setCustomerAddress(e.target.value)}
      />
      <TextField
        fullWidth
        label="Customer Mobile"
        margin="normal"
        value={customerMobile}
        onChange={(e) => setCustomerMobile(e.target.value)}
      />
      <TextField
        fullWidth
        label="Customer Email"
        margin="normal"
        value={customerEmail}
        onChange={(e) => setCustomerEmail(e.target.value)}
      />
      <TextField
        fullWidth
        label="Customer GSTIN"
        margin="normal"
        value={customerGstin}
        onChange={(e) => setCustomerGstin(e.target.value)}
      />

      {/* Invoice Details */}
      <TextField
        fullWidth
        label="Invoice Date"
        margin="normal"
        value={invoiceDate}
        onChange={(e) => setInvoiceDate(e.target.value)}
      />
      <TextField
        fullWidth
        label="Due Date"
        margin="normal"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <TextField
        fullWidth
        label="Terms"
        margin="normal"
        value={terms}
        onChange={(e) => setTerms(e.target.value)}
      />
      <TextField
        fullWidth
        label="Place of Supply"
        margin="normal"
        value={placeOfSupply}
        onChange={(e) => setPlaceOfSupply(e.target.value)}
      />

      {products.map((product, index) => (
        <Box key={index} sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
          <TextField
            label="Product Name"
            value={product.name}
            onChange={(e) => handleProductChange(index, "name", e.target.value)}
          />
          <TextField
            label="HSN/SAC"
            value={product.hsn}
            onChange={(e) => handleProductChange(index, "hsn", e.target.value)}
          />
          <TextField
            label="Quantity"
            value={product.quantity}
            onChange={(e) =>
              handleProductChange(index, "quantity", e.target.value)
            }
          />
          <TextField
            label="Rate"
            value={product.rate}
            onChange={(e) => handleProductChange(index, "rate", e.target.value)}
          />
          <TextField
            label="CGST %"
            value={product.cgst}
            onChange={(e) => handleProductChange(index, "cgst", e.target.value)}
          />
          <TextField
            label="SGST %"
            value={product.sgst}
            onChange={(e) => handleProductChange(index, "sgst", e.target.value)}
          />
        </Box>
      ))}
      <Button variant="outlined" onClick={handleAddProduct}>
        Add Product
      </Button>
      <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </Box>
      <Modal
        open={showPreview}
        onClose={handleClose}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxHeight: "90vh",
            overflow: "auto",
            bgcolor: "background.paper",
            border: "2px solid #000",
            borderRadius: 2,
            p: 5, // Changed padding to 5
          }}>
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              zIndex: 1,
            }}>
            <CloseIcon />
          </IconButton>
          <InvoicePreview
            customerName={customerName}
            customerAddress={customerAddress}
            customerMobile={customerMobile}
            customerEmail={customerEmail}
            customerGstin={customerGstin}
            invoiceDate={invoiceDate}
            dueDate={dueDate}
            terms={terms}
            placeOfSupply={placeOfSupply}
            products={products}
          />
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button variant="contained" onClick={handleClose}>
              Confirm & Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default GstInvoice;
