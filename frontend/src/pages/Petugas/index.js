import React, { useEffect, useState } from 'react'
import { Button, Box, Paper, Table, TableBody, TableCell, TableHead, TableRow, IconButton, TableContainer, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions,  Select, MenuItem, FormControl, InputLabel  } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { BrowserRouter as Router, Link} from "react-router-dom";
// import useRequestResource from 'src/hooks/useRequestResource';

import client from 'src/Utils/client';

    export default function Petugas() {
        const [PetugasData, setPetugasData] = useState([]);
        const [SekolahData, setSekolahData] = useState([]);
        const [openEditDialog, setOpenEditDialog] = useState(false);
        const [openAddDialog, setOpenAddDialog] = useState(false);
        const [currentPetugas, setCurrentPetugas] = useState(null);
        const [newPetugas, setNewPetugas] = useState({
            Nama: '',
            Jabatan: '',
            NoHp: '',
            Email: '',
            Catatan: '',
            SekolahId: ''
          });
        
    
        useEffect(() => {
            client.get('api/petugas/')
                .then(({ data }) => {
                    setPetugasData(data);
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

        //function delete
        const handleDelete = (id) => {
            client.delete(`api/petugas/${id}/`)
                .then(() => {
                    // Update state to remove deleted item
                    setPetugasData((prevData) => prevData.filter((item) => item.id !== id));
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        // function edit
        const handleEdit = (petugas) => {
            setCurrentPetugas(petugas);
            setOpenEditDialog(true);
        };
    
        const handleCloseEditDialog = () => {
            setOpenEditDialog(false);
            setCurrentPetugas(null);
        };

        const handleSaveEdit = () => {
            if (currentPetugas) {
                client.put(`/api/petugas/${currentPetugas.id}/`, currentPetugas)
                    .then(() => {
                        setPetugasData((prevData) => prevData.map((item) => item.id === currentPetugas.id ? currentPetugas : item));
                        handleCloseEditDialog();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        };
    
        const handleChange = (e) => {
            const { name, value } = e.target;
            setCurrentPetugas({
                ...currentPetugas,
                [name]: value
            });
        };

        //function add
        
  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewPetugas({
      ...newPetugas,
      [name]: value
    });
  };

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewPetugas({
        Nama: '',
        Jabatan: '',
        NoHp: '',
        Email: '',
        Catatan: '',
        SekolahId: ''
    });
  };

  const handleSaveAdd = () => {
    console.log('Saving new petugas:', newPetugas);
    client.post('/api/petugas/', newPetugas)
      .then(({ data }) => {
        setPetugasData([...PetugasData, data]);
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
          Tambah Petugas
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
                            Jabatan
                        </TableCell>
                        <TableCell align="center">
                            No Telepon
                        </TableCell>
                        <TableCell align="center">
                            Email
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
                    {PetugasData.map((r) => {
                        return <TableRow key={r.id}>
                            <TableCell align="left">
                                {r.Nama}
                            </TableCell>
                            <TableCell align="left">
                                {r.Jabatan}
                            </TableCell>
                            <TableCell align="left">
                                {r.NoHp}
                            </TableCell>
                            <TableCell align="left">
                                {r.Email}
                            </TableCell>
                            <TableCell align="left">
                                {r.Catatan}
                            </TableCell>
                            <TableCell align="left">
                                {r.SekolahId}
                            </TableCell>
                            
<TableCell align="right">
    <Box sx={{ display: "flex", justifyContent: "flex-end"}}>
        {/* <Link to={`/petugas/edit/${r.id}`} key="petugas-edit"> */}
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
                <DialogTitle>Edit Petugas</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Silakan edit informasi petugas di bawah ini.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="Nama"
                        label="Nama"
                        type="text"
                        fullWidth
                        value={currentPetugas?.Nama || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="Jabatan"
                        label="Jabatan"
                        type="text"
                        fullWidth
                        value={currentPetugas?.Jabatan || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="NoHp"
                        label="No Telepon"
                        type="text"
                        fullWidth
                        value={currentPetugas?.NoHp || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="Email"
                        label="Email "
                        type="email"
                        fullWidth
                        value={currentPetugas?.Email || ''}
                        onChange={handleChange}
                    />
                      <TextField
                        margin="dense"
                        name="Catatan"
                        label="Catatan "
                        type="text"
                        fullWidth
                        value={currentPetugas?.Catatan || ''}
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
                        value={currentPetugas?.SekolahId || ''}
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
                <DialogTitle>Add Petugas</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Silakan add informasi petugas di bawah ini.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="Nama"
                        label="Nama"
                        type="text"
                        fullWidth
                        value={newPetugas.Nama}
                        onChange={handleAddChange}
                    />
                    <TextField
                        margin="dense"
                        name="Jabatan"
                        label="Jabatan"
                        type="text"
                        fullWidth
                        value={newPetugas.Jabatan}
                        onChange={handleAddChange}
                    />
                    <TextField
                        margin="dense"
                        name="NoHp"
                        label="No Telepon"
                        type="text"
                        fullWidth
                        value={newPetugas?.NoHp}
                        onChange={handleAddChange}
                    />
                    <TextField
                        margin="dense"
                        name="Email"
                        label="Email "
                        type="email"
                        fullWidth
                        value={newPetugas.Email}
                        onChange={handleAddChange}
                    />
                      <TextField
                        margin="dense"
                        name="Catatan"
                        label="Catatan "
                        type="text"
                        fullWidth
                        value={newPetugas.Catatan}
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
                        value={newPetugas.SekolahId}
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
