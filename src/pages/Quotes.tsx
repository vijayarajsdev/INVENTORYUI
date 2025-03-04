import { useState } from "react";
import { Button, Modal, Box, TextField, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import QuotesTable from "../components/QuotesTable";

interface Quote {
  id: number;
  customerName: string;
  date: string;
  amount: string;
  status: string;
}

const Quotes = () => {
  const [open, setOpen] = useState(false);
  const [quotes, setQuotes] = useState<Quote[]>([
    { id: 1, customerName: "John Doe", date: "2023-01-01", amount: "1500.00", status: "Pending" },
    { id: 2, customerName: "Jane Smith", date: "2023-01-02", amount: "2500.00", status: "Accepted" },
    // ...more dummy data...
  ]);
  const [currentQuote, setCurrentQuote] = useState<Quote>({ id: 0, customerName: "", date: "", amount: "", status: "" });

  const handleOpen = (quote: Quote) => {
    setCurrentQuote(quote);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleModalClose = (event: {}, reason: "backdropClick" | "escapeKeyDown") => {
    if (reason !== "backdropClick") {
      handleClose();
    }
  };

  const handleSave = () => {
    setQuotes((prevQuotes) => {
      const existingQuoteIndex = prevQuotes.findIndex((quote) => quote.id === currentQuote.id);
      if (existingQuoteIndex >= 0) {
        const updatedQuotes = [...prevQuotes];
        updatedQuotes[existingQuoteIndex] = currentQuote;
        return updatedQuotes;
      } else {
        return [...prevQuotes, { ...currentQuote, id: prevQuotes.length + 1 }];
      }
    });
    handleClose();
  };

  return (
    <>
      <div style={{display:'flex',justifyContent:'space-between'}}>
        <div>Quotes</div>
        <div>
          <Button variant="outlined" onClick={() => handleOpen({ id: 0, customerName: "", date: "", amount: "", status: "" })}>+Add Quote</Button>
        </div>
      </div>
      
      <QuotesTable 
        rows={quotes}
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
            <h2>{currentQuote.customerName ? "Edit Quote" : "Add Quote"}</h2>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <form>
            <TextField fullWidth label="Customer Name" margin="normal" value={currentQuote.customerName} onChange={(e) => setCurrentQuote({ ...currentQuote, customerName: e.target.value })} />
            <TextField fullWidth label="Date" margin="normal" value={currentQuote.date} onChange={(e) => setCurrentQuote({ ...currentQuote, date: e.target.value })} />
            <TextField fullWidth label="Amount" margin="normal" value={currentQuote.amount} onChange={(e) => setCurrentQuote({ ...currentQuote, amount: e.target.value })} />
            <TextField fullWidth label="Status" margin="normal" value={currentQuote.status} onChange={(e) => setCurrentQuote({ ...currentQuote, status: e.target.value })} />
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

export default Quotes;
