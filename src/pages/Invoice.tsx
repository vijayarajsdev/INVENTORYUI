import { useState } from "react";
import { Button, Modal, Box, TextField, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InvoicesTable from "../components/InvoicesTable";

interface Invoice {
  id: number;
  customerName: string;
  date: string;
  amount: string;
  status: string;
}

const Invoice = () => {
  const [open, setOpen] = useState(false);
  const [invoices, setInvoices] = useState<Invoice[]>([
    { id: 1, customerName: "John Doe", date: "2023-01-01", amount: "1000.00", status: "Paid" },
    { id: 2, customerName: "Jane Smith", date: "2023-01-02", amount: "2000.00", status: "Unpaid" },
    // ...more dummy data...
  ]);
  const [currentInvoice, setCurrentInvoice] = useState<Invoice>({ id: 0, customerName: "", date: "", amount: "", status: "" });

  const handleOpen = (invoice: Invoice) => {
    setCurrentInvoice(invoice);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleModalClose = (reason: "backdropClick" | "escapeKeyDown") => {
    if (reason !== "backdropClick") {
      handleClose();
    }
  };

  const handleSave = () => {
    setInvoices((prevInvoices) => {
      const existingInvoiceIndex = prevInvoices.findIndex((invoice) => invoice.id === currentInvoice.id);
      if (existingInvoiceIndex >= 0) {
        const updatedInvoices = [...prevInvoices];
        updatedInvoices[existingInvoiceIndex] = currentInvoice;
        return updatedInvoices;
      } else {
        return [...prevInvoices, { ...currentInvoice, id: prevInvoices.length + 1 }];
      }
    });
    handleClose();
  };

  return (
    <>
      <div style={{display:'flex',justifyContent:'space-between'}}>
        <div>Invoices</div>
        <div>
          <Button variant="outlined" onClick={() => handleOpen({ id: 0, customerName: "", date: "", amount: "", status: "" })}>+Add Invoice</Button>
        </div>
      </div>
      
      <InvoicesTable 
        rows={invoices}
        onEdit={handleOpen}
      />

      <Modal 
        open={open} 
        onClose={handleModalClose} 
        disableEscapeKeyDown
      >
        <Box 
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h2>{currentInvoice.customerName ? "Edit Invoice" : "Add Invoice"}</h2>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <form>
            <TextField fullWidth label="Customer Name" margin="normal" value={currentInvoice.customerName} onChange={(e) => setCurrentInvoice({ ...currentInvoice, customerName: e.target.value })} />
            <TextField fullWidth label="Date" margin="normal" value={currentInvoice.date} onChange={(e) => setCurrentInvoice({ ...currentInvoice, date: e.target.value })} />
            <TextField fullWidth label="Amount" margin="normal" value={currentInvoice.amount} onChange={(e) => setCurrentInvoice({ ...currentInvoice, amount: e.target.value })} />
            <TextField fullWidth label="Status" margin="normal" value={currentInvoice.status} onChange={(e) => setCurrentInvoice({ ...currentInvoice, status: e.target.value })} />
            <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '16px'}}>
              <Button variant="contained" color="primary" style={{marginRight: '8px'}} onClick={handleSave}>Save</Button>
              <Button variant="outlined" onClick={handleClose}>Cancel</Button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default Invoice;
