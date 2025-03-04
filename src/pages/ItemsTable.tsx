import { useState } from "react";
import { Button, Modal, Box, TextField, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link, Checkbox } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

const ItemsTable = () => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: "Item 1", description: "Description 1", price: 100, quantity: 10 },
    { id: 2, name: "Item 2", description: "Description 2", price: 200, quantity: 20 },
  ]);
  const [currentItem, setCurrentItem] = useState<Item>({ id: 0, name: "", description: "", price: 0, quantity: 0 });
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleOpen = (item: Item) => {
    setCurrentItem(item);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleSave = () => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === currentItem.id);
      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = currentItem;
        return updatedItems;
      } else {
        return [...prevItems, { ...currentItem, id: prevItems.length + 1 }];
      }
    });
    handleClose();
  };

  const handleDelete = () => {
    setItems((prevItems) => prevItems.filter((item) => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };

  const handleSelect = (id: number) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id) ? prevSelected.filter((itemId) => itemId !== id) : [...prevSelected, id]
    );
  };

  return (
    <>
      <div style={{display:'flex',justifyContent:'space-between', marginBottom: '20px'}}>
        <div>Items</div>
        <div>
          <Button variant="outlined" onClick={() => handleOpen({ id: 0, name: "", description: "", price: 0, quantity: 0 })}>+Add Item</Button>
          <Button variant="outlined" color="error" onClick={handleDelete} style={{ marginLeft: '10px' }}>Delete</Button>
        </div>
      </div>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleSelect(item.id)}
                  />
                </TableCell>
                <TableCell>
                  <Link href="#" onClick={() => handleOpen(item)}>
                    {item.name}
                  </Link>
                </TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.quantity}</TableCell>
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
            <h2>{currentItem.id ? "Edit Item" : "Add Item"}</h2>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <form>
            <TextField fullWidth label="Name" margin="normal" value={currentItem.name} onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })} />
            <TextField fullWidth label="Description" margin="normal" value={currentItem.description} onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })} />
            <TextField fullWidth label="Price" margin="normal" value={currentItem.price} onChange={(e) => setCurrentItem({ ...currentItem, price: parseFloat(e.target.value) })} />
            <TextField fullWidth label="Quantity" margin="normal" value={currentItem.quantity} onChange={(e) => setCurrentItem({ ...currentItem, quantity: parseInt(e.target.value) })} />
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

export default ItemsTable;
