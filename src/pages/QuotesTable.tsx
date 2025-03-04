import { useState } from "react";
import { Button, Modal, Box, TextField, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link, Checkbox } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface Quote {
  id: number;
  customerName: string;
  date: string;
  amount: number;
  status: string;
}

const QuotesTable = () => {
  const [open, setOpen] = useState(false);
  const [quotes, setQuotes] = useState<Quote[]>([
    { id: 1, customerName: "John Doe", date: "2023-01-01", amount: 1000, status: "Accepted" },
    { id: 2, customerName: "Jane Smith", date: "2023-01-02", amount: 2000, status: "Pending" },
  ]);
  const [currentQuote, setCurrentQuote] = useState<Quote>({ id: 0, customerName: "", date: "", amount: 0, status: "" });
  const [selectedQuotes, setSelectedQuotes] = useState<number[]>([]);

  const handleOpen = (quote: Quote) => {
    setCurrentQuote(quote);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

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

  const handleDelete = () => {
    setQuotes((prevQuotes) => prevQuotes.filter((quote) => !selectedQuotes.includes(quote.id)));
    setSelectedQuotes([]);
  };

  const handleSelect = (id: number) => {
    setSelectedQuotes((prevSelected) =>
      prevSelected.includes(id) ? prevSelected.filter((quoteId) => quoteId !== id) : [...prevSelected, id]
    );
  };

  return (
    <>
      <div style={{display:'flex',justifyContent:'space-between', marginBottom: '20px'}}>
        <div>Quotes</div>
        <div>
          <Button variant="outlined" onClick={() => handleOpen({ id: 0, customerName: "", date: "", amount: 0, status: "" })}>+Add Quote</Button>
          <Button variant="outlined" color="error" onClick={handleDelete} style={{ marginLeft: '10px' }}>Delete</Button>
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
            {quotes.map((quote) => (
              <TableRow key={quote.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedQuotes.includes(quote.id)}
                    onChange={() => handleSelect(quote.id)}
                  />
                </TableCell>
                <TableCell>
                  <Link href="#" onClick={() => handleOpen(quote)}>
                    {quote.customerName}
                  </Link>
                </TableCell>
                <TableCell>{quote.date}</TableCell>
                <TableCell>{quote.amount}</TableCell>
                <TableCell>{quote.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal 
        open={open} 
        onClose={handleClose} 
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
            <h2>{currentQuote.id ? "Edit Quote" : "Add Quote"}</h2>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <form>
            <TextField fullWidth label="Customer Name" margin="normal" value={currentQuote.customerName} onChange={(e) => setCurrentQuote({ ...currentQuote, customerName: e.target.value })} />
            <TextField fullWidth label="Date" margin="normal" value={currentQuote.date} onChange={(e) => setCurrentQuote({ ...currentQuote, date: e.target.value })} />
            <TextField fullWidth label="Amount" margin="normal" value={currentQuote.amount} onChange={(e) => setCurrentQuote({ ...currentQuote, amount: parseFloat(e.target.value) })} />
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

export default QuotesTable;
