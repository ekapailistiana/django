
import React, { useEffect, useState } from 'react'
import { Button, Box, Paper, Table, TableBody, TableCell, TableHead, TableRow, IconButton, TableContainer, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Select, MenuItem, FormControl, InputLabel  } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { BrowserRouter as Router, Link} from "react-router-dom";
// import useRequestResource from 'src/hooks/useRequestResource';

import client from 'src/Utils/client';

    export default function Siswa() {
        const [KelasData, setKelasData] = useState([]);
        const [DataSekolah, setSekolahData] = useState([]);
        const [openEditDialog, setOpenEditDialog] = useState(false);
        const [openAddDialog, setOpenAddDialog] = useState(false);
        const [currentKelas, setCurrentKelas] = useState(null);
        const [newKelas, setNewKelas] = useState({
            Nama: '',
            Tingkat: '',
            Catatan: '',
            KelasId: ''
          });
        
    
        useEffect(() => {
            client.get('api/kelas/')
                .then(({ data }) => {
                    setKelasData(data);
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

        //function hapus
        const handleDelete = (id) => {
            client.delete(`api/kelas/${id}/`)
                .then(() => {
                    // Update state to remove deleted item
                    setKelasData((prevData) => prevData.filter((item) => item.id !== id));
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        //function edit
        const handleEdit = (kelas) => {
            setCurrentKelas(kelas);
            setOpenEditDialog(true);
        };
    
        const handleCloseEditDialog = () => {
            setOpenEditDialog(false);
            setCurrentKelas(null);
        };

        const handleSaveEdit = () => {
            if (currentKelas) {
                client.put(`/api/kelas/${currentKelas.id}/`, currentKelas)
                    .then(() => {
                        setKelasData((prevData) => prevData.map((item) => item.id === currentKelas.id ? currentKelas : item));
                        handleCloseEditDialog();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        };
    
        const handleChange = (e) => {
            const { name, value } = e.target;
            setCurrentKelas({
                ...currentKelas,
                [name]: value
            });
        };

        //function add
        const handleAddChange = (e) => {
            const { name, value } = e.target;
            setNewKelas({
              ...newKelas,
              [name]: value
            });
          };
        
          const handleOpenAddDialog = () => {
            setOpenAddDialog(true);
          };
        
          const handleCloseAddDialog = () => {
            setOpenAddDialog(false);
            setNewKelas({
              Nama: '',
            Tingkat: '',
            Catatan: '',
            KelasId: ''
            });
          };
        
          const handleSaveAdd = () => {
            console.log('Saving new class:', newKelas);
            client.post('/api/kelas/', newKelas)
              .then(({ data }) => {
                setKelasData([...KelasData, data]);
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
          Tambah Kelas
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
                            Tingkat
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
                    {KelasData.map((r) => {
                        return <TableRow key={r.id}>
                            <TableCell align="left">
                                {r.Nama}
                            </TableCell>
                            <TableCell align="left">
                                {r.Tingkat}
                            </TableCell>
                            <TableCell align="left">
                                {r.Catatan}
                            </TableCell>
                            <TableCell align="left">
                                {r.SekolahId}
                            </TableCell>
                            
                <TableCell align="right">
                    <Box sx={{ display: "flex", justifyContent: "flex-end"}}>
                        {/* <Link to={`/kelas/edit/${r.id}`} key="kelas-edit"> */}
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
                <DialogTitle>Edit Kelas</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Silakan edit informasi kelas di bawah ini.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="Nama"
                        label="Nama"
                        type="text"
                        fullWidth
                        value={currentKelas?.Nama || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="Tingkat"
                        label="Tingkat"
                        type="text"
                        fullWidth
                        value={currentKelas?.Tingkat || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="Catatan"
                        label="Catatan"
                        type="text"
                        fullWidth
                        value={currentKelas?.Catatan || ''}
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
                        value={currentKelas?.SekolahId || ''}
                        onChange={handleChange}
                        >
                            {DataSekolah.map((sekolah) => (
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
            <Dialog open={openAddDialog} onClose={handleCloseEditDialog}>
                <DialogTitle>Add Kelas</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Silakan Add informasi kelas di bawah ini.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="Nama"
                        label="Nama"
                        type="text"
                        fullWidth
                        value={newKelas.Nama}
                        onChange={handleAddChange}
                    />
                    <TextField
                        margin="dense"
                        name="Tingkat"
                        label="Tingkat"
                        type="text"
                        fullWidth
                        value={newKelas.Tingkat}
                        onChange={handleAddChange}
                    />
                    <TextField
                        margin="dense"
                        name="Catatan"
                        label="Catatan"
                        type="text"
                        fullWidth
                        value={newKelas.Catatan}
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
                        value={newKelas.SekolahId}
                        onChange={handleAddChange}
                        >
                            {DataSekolah.map((sekolah) => (
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
        );
    }
