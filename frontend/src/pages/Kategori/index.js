
import React, { useEffect, useState } from 'react'
import { Button, Box, Paper, Table, TableBody, TableCell, TableHead, TableRow, IconButton, TableContainer, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions,  Select, MenuItem, FormControl, InputLabel  } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { BrowserRouter as Router, Link} from "react-router-dom";
// import useRequestResource from 'src/hooks/useRequestResource';

import client from 'src/Utils/client';

    export default function Kategori() {
        const [KategoriData, setKategoriData] = useState([]);
        const [SekolahData, setSekolahData] = useState([]);
        const [openEditDialog, setOpenEditDialog] = useState(false);
        const [openAddDialog, setOpenAddDialog] = useState(false);
        const [currentKategori, setCurrentKategori] = useState(null);
        const [newKategori, setNewKategori] = useState({
            Nama: '',
            Poin: '',
            Pesan: '',
            Catatan: '',
            SekolahId: ''
          });
    
        useEffect(() => {
            client.get('api/kategori/')
                .then(({ data }) => {
                    setKategoriData(data);
                })
                .catch((err) => {
                    console.log(err);
                });

                client.get('api/sekolah/')
                .then(({ data }) => {
                    setSekolahData(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }, []);

        // function hapus
        const handleDelete = (id) => {
            client.delete(`api/kategori/${id}/`)
                .then(() => {
                    // Update state to remove deleted item
                    setKategoriData((prevData) => prevData.filter((item) => item.id !== id));
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        // function edit
        const handleEdit = (kategori) => {
            setCurrentKategori(kategori);
            setOpenEditDialog(true);
        };
    
        const handleCloseEditDialog = () => {
            setOpenEditDialog(false);
            setCurrentKategori(null);
        };

        const handleSaveEdit = () => {
            if (currentKategori) {
                client.put(`/api/kategori/${currentKategori.id}/`, currentKategori)
                    .then(() => {
                        setKategoriData((prevData) => prevData.map((item) => item.id === currentKategori.id ? currentKategori : item));
                        handleCloseEditDialog();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        };
    
        const handleChange = (e) => {
            const { name, value } = e.target;
            setCurrentKategori({
                ...currentKategori,
                [name]: value
            });
        };

        // function add
        const handleAddChange = (e) => {
            const { name, value } = e.target;
            setNewKategori({
              ...newKategori,
              [name]: value
            });
          };
        
          const handleOpenAddDialog = () => {
            setOpenAddDialog(true);
          };
        
          const handleCloseAddDialog = () => {
            setOpenAddDialog(false);
            setNewKategori({
                Nama: '',
                Poin: '',
                Pesan: '',
                Catatan: '',
                SekolahId: ''
            });
          };
        
          const handleSaveAdd = () => {
            console.log('Saving new kategori:', newKategori);
            client.post('/api/kategori/', newKategori)
              .then(({ data }) => {
                setKategoriData([...KategoriData, data]);
                handleCloseAddDialog();
              })
              .catch((err) => {
                console.log(err);
              });
          };
        

return (
    <div>
         <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleOpenAddDialog} startIcon={<AddIcon />}>
          Tambah Kategori
        </Button>
        </Box>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 360 }} size="small">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">
                            Nama
                        </TableCell>
                        <TableCell align="center">
                            Poin
                        </TableCell>
                        <TableCell align="center">
                            Pesan
                        </TableCell>
                        <TableCell align="center">
                            Catatan
                        </TableCell>
                        <TableCell align="center">
                            Sekolah
                        </TableCell>
                        <TableCell align="center">
                            Actions
                           </TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {KategoriData.map((r) => {
                        return <TableRow key={r.id}>
                            <TableCell align="left">
                                {r.Nama}
                            </TableCell>
                            <TableCell align="left">
                                {r.Poin}
                            </TableCell>
                            <TableCell align="left">
                                {r.Pesan}
                            </TableCell>
                            <TableCell align="left">
                                {r.Catatan}
                            </TableCell>
                            <TableCell align="left">
                                {r.SekolahId}
                            </TableCell>
                            
<TableCell align="right">
    <Box sx={{ display: "flex", justifyContent: "flex-end"}}>
        {/* <Link to={`/kategori/edit/${r.id}`} key="kategori-edit"> */}
        <IconButton size="large" onClick={() => handleEdit(r)}>
                <EditIcon />
            </IconButton>
        {/* </Link> */}

        <IconButton size="large" onClick={() => handleDelete(r.id)}>
            <DeleteIcon />
        </IconButton>
    </Box>
</TableCell>
</TableRow>
})}
</TableBody>
</Table>
</TableContainer>

{/* dialog edit */}
<Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                <DialogTitle>Edit Kategori</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Silakan edit informasi kategori di bawah ini.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="Nama"
                        label="Nama"
                        type="text"
                        fullWidth
                        value={currentKategori?.Nama || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="Poin"
                        label="Poin"
                        type="text"
                        fullWidth
                        value={currentKategori?.Poin || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="Pesan"
                        label="Pesan"
                        type="text"
                        fullWidth
                        value={currentKategori?.Pesan || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="Catatan"
                        label="Catatan "
                        type="text"
                        fullWidth
                        value={currentKategori?.Catatan || ''}
                        onChange={handleChange}
                    />
                         <FormControl fullWidth margin="dense">
                        <InputLabel id="sekolah-select-label-add">Sekolah</InputLabel>
                      <Select
                        margin="dense"
                        name="SekolahId"
                        label="Sekolah "
                        type="text"
                        fullWidth
                        value={currentKategori?.SekolahId || ''}
                        onChange={handleChange}
                        >
                             {SekolahData.map((sekolah) => (
                            <MenuItem key={sekolah.id} value={sekolah.id}>
                                {sekolah.Nama}
                            </MenuItem>
                        ))}
                        </Select>
                        </FormControl>  
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog}>Cancel</Button>
                    <Button onClick={handleSaveEdit}>Save</Button>
                </DialogActions>
            </Dialog>

            {/* dialog add */}
            <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
                <DialogTitle>Add Kategori</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Silakan add informasi kategori di bawah ini.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="Nama"
                        label="Nama"
                        type="text"
                        fullWidth
                        value={newKategori.Nama}
                        onChange={handleAddChange}
                    />
                    <TextField
                        margin="dense"
                        name="Poin"
                        label="Poin"
                        type="text"
                        fullWidth
                        value={newKategori.Poin}
                        onChange={handleAddChange}
                    />
                    <TextField
                        margin="dense"
                        name="Pesan"
                        label="Pesan"
                        type="text"
                        fullWidth
                        value={newKategori.Pesan}
                        onChange={handleAddChange}
                    />
                    <TextField
                        margin="dense"
                        name="Catatan"
                        label="Catatan "
                        type="text"
                        fullWidth
                        value={newKategori.Catatan}
                        onChange={handleAddChange}
                    />
                           <FormControl fullWidth margin="dense">
                        <InputLabel id="sekolah-select-label-add">Sekolah</InputLabel>
                      <Select
                        margin="dense"
                        name="SekolahId"
                        label="Sekolah "
                        type="text"
                        fullWidth
                        value={newKategori.SekolahId}
                        onChange={handleAddChange}
                        >
                             {SekolahData.map((sekolah) => (
                            <MenuItem key={sekolah.id} value={sekolah.id}>
                                {sekolah.Nama}
                            </MenuItem>
                        ))}
                        </Select>
                        </FormControl> 
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddDialog}>Cancel</Button>
                    <Button onClick={handleSaveAdd}>Save</Button>
                </DialogActions>
            </Dialog>
</div>
)
}
