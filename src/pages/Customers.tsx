import { useState } from "react";
import { Button, Modal, Box, TextField, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link, Checkbox } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  organization?: string;
  gstin?: string;
}

const Customers = () => {
  const [open, setOpen] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([
    { id: 1, name: "John Doe", email: "john@example.com", phone: "1234567890", address: "123 Main St", organization: "John's Supplies", gstin: "27AAAPL1234C1ZV" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "0987654321", address: "456 Elm St", organization: "Jane's Goods", gstin: "27AAAPL5678D1ZW" },
  ]);
  const [currentCustomer, setCurrentCustomer] = useState<Customer>({ id: 0, name: "", email: "", phone: "", address: "", organization: "", gstin: "" });
  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([]);

  const handleOpen = (customer: Customer) => {
    setCurrentCustomer(customer);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleSave = () => {
    setCustomers((prevCustomers) => {
      const existingCustomerIndex = prevCustomers.findIndex((customer) => customer.id === currentCustomer.id);
      if (existingCustomerIndex >= 0) {
        const updatedCustomers = [...prevCustomers];
        updatedCustomers[existingCustomerIndex] = currentCustomer;
        return updatedCustomers;
      } else {
        return [...prevCustomers, { ...currentCustomer, id: prevCustomers.length + 1 }];
      }
    });
    handleClose();
  };

  const handleDelete = () => {
    setCustomers((prevCustomers) => prevCustomers.filter((customer) => !selectedCustomers.includes(customer.id)));
    setSelectedCustomers([]);
  };

  const handleSelect = (id: number) => {
    setSelectedCustomers((prevSelected) =>
      prevSelected.includes(id) ? prevSelected.filter((customerId) => customerId !== id) : [...prevSelected, id]
    );
  };

  return (
    <>
      <div style={{display:'flex',justifyContent:'space-between', marginBottom: '20px'}}>
        <div>Customers</div>
        <div>
          <Button variant="outlined" onClick={() => handleOpen({ id: 0, name: "", email: "", phone: "", address: "", organization: "", gstin: "" })}>+Add Customer</Button>
          <Button variant="outlined" color="error" onClick={handleDelete} style={{ marginLeft: '10px' }}>Delete</Button>
        </div>
      </div>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Organization</TableCell>
              <TableCell>GSTIN</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedCustomers.includes(customer.id)}
                    onChange={() => handleSelect(customer.id)}
                  />
                </TableCell>
                <TableCell>
                  <Link href="#" onClick={() => handleOpen(customer)}>
                    {customer.name}
                  </Link>
                </TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.address}</TableCell>
                <TableCell>
                  <Link href="#" onClick={() => handleOpen(customer)}>
                    {customer.organization}
                  </Link>
                </TableCell>
                <TableCell>{customer.gstin}</TableCell>
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
            <h2>{currentCustomer.id ? "Edit Customer" : "Add Customer"}</h2>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <form>
            <TextField fullWidth label="Name" margin="normal" value={currentCustomer.name} onChange={(e) => setCurrentCustomer({ ...currentCustomer, name: e.target.value })} />
            <TextField fullWidth label="Email" margin="normal" value={currentCustomer.email} onChange={(e) => setCurrentCustomer({ ...currentCustomer, email: e.target.value })} />
            <TextField fullWidth label="Phone" margin="normal" value={currentCustomer.phone} onChange={(e) => setCurrentCustomer({ ...currentCustomer, phone: e.target.value })} />
            <TextField fullWidth label="Address" margin="normal" value={currentCustomer.address} onChange={(e) => setCurrentCustomer({ ...currentCustomer, address: e.target.value })} />
            <TextField fullWidth label="Organization" margin="normal" value={currentCustomer.organization} onChange={(e) => setCurrentCustomer({ ...currentCustomer, organization: e.target.value })} />
            <TextField fullWidth label="GSTIN" margin="normal" value={currentCustomer.gstin} onChange={(e) => setCurrentCustomer({ ...currentCustomer, gstin: e.target.value })} />
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

export default Customers;
