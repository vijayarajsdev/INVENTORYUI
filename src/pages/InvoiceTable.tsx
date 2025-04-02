import { useState } from "react";
import {
  Button,
  Modal,
  Box,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
  Checkbox,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface Invoice {
  id: number;
  invoiceNo: string;
  customerName: string;
  date: string;
  amount: number;
  status: string;
}

const InvoiceTable = () => {
  const [open, setOpen] = useState(false);
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: 1,
      invoiceNo: "INV001",
      customerName: "John Doe",
      date: "2023-01-01",
      amount: 1000,
      status: "Paid",
    },
    {
      id: 2,
      invoiceNo: "INV002",
      customerName: "Jane Smith",
      date: "2023-01-02",
      amount: 2000,
      status: "Unpaid",
    },
  ]);
  const [currentInvoice, setCurrentInvoice] = useState<Invoice>({
    id: 0,
    invoiceNo: "",
    customerName: "",
    date: "",
    amount: 0,
    status: "",
  });
  const [selectedInvoices, setSelectedInvoices] = useState<number[]>([]);

  const handleOpen = (invoice: Invoice) => {
    setCurrentInvoice(invoice);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleSave = () => {
    setInvoices((prevInvoices) => {
      const existingInvoiceIndex = prevInvoices.findIndex(
        (invoice) => invoice.id === currentInvoice.id
      );
      if (existingInvoiceIndex >= 0) {
        const updatedInvoices = [...prevInvoices];
        updatedInvoices[existingInvoiceIndex] = currentInvoice;
        return updatedInvoices;
      } else {
        return [
          ...prevInvoices,
          { ...currentInvoice, id: prevInvoices.length + 1 },
        ];
      }
    });
    handleClose();
  };

  const handleDelete = () => {
    setInvoices((prevInvoices) =>
      prevInvoices.filter((invoice) => !selectedInvoices.includes(invoice.id))
    );
    setSelectedInvoices([]);
  };

  const handleSelect = (id: number) => {
    setSelectedInvoices((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((invoiceId) => invoiceId !== id)
        : [...prevSelected, id]
    );
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}>
        <div>Invoices</div>
        <div>
          <Button
            variant="outlined"
            onClick={() =>
              handleOpen({
                id: 0,
                invoiceNo: "",
                customerName: "",
                date: "",
                amount: 0,
                status: "",
              })
            }>
            +Add Invoice
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleDelete}
            style={{ marginLeft: "10px" }}>
            Delete
          </Button>
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedInvoices.includes(invoice.id)}
                    onChange={() => handleSelect(invoice.id)}
                  />
                </TableCell>
                <TableCell>
                  <Link href="#" onClick={() => handleOpen(invoice)}>
                    {invoice.customerName}
                  </Link>
                </TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>{invoice.amount}</TableCell>
                <TableCell>{invoice.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={handleClose} disableEscapeKeyDown>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <h2>{currentInvoice.id ? "Edit Invoice" : "Add Invoice"}</h2>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <form>
            <TextField
              fullWidth
              label="Customer Name"
              margin="normal"
              value={currentInvoice.customerName}
              onChange={(e) =>
                setCurrentInvoice({
                  ...currentInvoice,
                  customerName: e.target.value,
                })
              }
            />
            <TextField
              fullWidth
              label="Date"
              margin="normal"
              value={currentInvoice.date}
              onChange={(e) =>
                setCurrentInvoice({ ...currentInvoice, date: e.target.value })
              }
            />
            <TextField
              fullWidth
              label="Amount"
              margin="normal"
              value={currentInvoice.amount}
              onChange={(e) =>
                setCurrentInvoice({
                  ...currentInvoice,
                  amount: parseFloat(e.target.value),
                })
              }
            />
            <TextField
              fullWidth
              label="Status"
              margin="normal"
              value={currentInvoice.status}
              onChange={(e) =>
                setCurrentInvoice({ ...currentInvoice, status: e.target.value })
              }
            />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "16px",
              }}>
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: "8px" }}
                onClick={handleSave}>
                Save
              </Button>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default InvoiceTable;
