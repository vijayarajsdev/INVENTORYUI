import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import Quote from "../pages/Quotes";

interface QuotesTableProps {
  rows: Quote[];
  onEdit: (quote: Quote) => void;
}

const QuotesTable: React.FC<QuotesTableProps> = ({ rows, onEdit }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Select</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((quote) => (
            <TableRow key={quote.id}>
              <TableCell><Input type="checkbox"/></TableCell>
              <TableCell>
                <Link href="#" onClick={() => onEdit(quote)}>
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
  );
};

export default QuotesTable;
