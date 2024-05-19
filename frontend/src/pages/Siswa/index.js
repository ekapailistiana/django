
import React, { useEffect, useState } from 'react'
import { Button, Box, Paper, Table, TableBody, TableCell, TableHead, TableRow, IconButton, TableContainer, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions,  Select, MenuItem, FormControl, InputLabel  } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { BrowserRouter as Router, Link} from "react-router-dom";
// import useRequestResource from 'src/hooks/useRequestResource';
import client from 'src/Utils/client';

    export default function Siswa() {
        const [SiswaData, setSiswaData] = useState([]);
        const [SekolahData, setSekolahData] = useState([]);
        const [KelasData, setKelasData] = useState([]);
        const [openEditDialog, setOpenEditDialog] = useState(false);
        const [openAddDialog, setOpenAddDialog] = useState(false);
        const [currentSiswa, setCurrentSiswa] = useState(null);
        const [newSiswa, setNewSiswa] = useState({
          NIS: '',
          Nama: '',
          NamaOrtu: '',
          HpOrtu: '',
          EmailOrtu: '',
          Catatan: '',
          SekolahId: '',
          KelasId: ''
        });
    
        useEffect(() => {
            client.get('api/siswa/')
                .then(({ data }) => {
                    setSiswaData(data);
                })
                .catch((err) => {
                    console.log(err);
                });

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

        // function hapus
        const handleDelete = (id) => {
            client.delete(`api/siswa/${id}/`)
                .then(() => {
                    // Update state to remove deleted item
                    setSiswaData((prevData) => prevData.filter((item) => item.id !== id));
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        //function edit
        const handleEdit = (siswa) => {
            setCurrentSiswa(siswa);
            setOpenEditDialog(true);
        };
    
        const handleCloseEditDialog = () => {
            setOpenEditDialog(false);
            setCurrentSiswa(null);
        };

        const handleSaveEdit = () => {
            if (currentSiswa) {
                client.put(`/api/siswa/${currentSiswa.id}/`, currentSiswa)
                    .then(() => {
                        setSiswaData((prevData) => prevData.map((item) => item.id === currentSiswa.id ? currentSiswa : item));
                        handleCloseEditDialog();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        };
    
        const handleChange = (e) => {
            const { name, value } = e.target;
            setCurrentSiswa({
                ...currentSiswa,
                [name]: value
            });
        };

        // fuction add
        const handleAddChange = (e) => {
            const { name, value } = e.target;
            setNewSiswa({
              ...newSiswa,
              [name]: value
            });
          };
        
          const handleOpenAddDialog = () => {
            setOpenAddDialog(true);
          };
        
          const handleCloseAddDialog = () => {
            setOpenAddDialog(false);
            setNewSiswa({
                NIS: '',
                Nama: '',
                NamaOrtu: '',
                HpOrtu: '',
                EmailOrtu: '',
                Catatan: '',
                SekolahId: '',
                KelasId: ''
            });
          };
        
          const handleSaveAdd = () => {
            console.log('Saving new student:', newSiswa);
            client.post('/api/siswa/', newSiswa)
              .then(({ data }) => {
                setSiswaData([...SiswaData, data]);
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
          Tambah Siswa
        </Button>
      </Box>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 360 }} size="small">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">
                            NIS
                        </TableCell>
                        <TableCell align="center">
                            Nama
                        </TableCell>
                        <TableCell align="center">
                            Nama Ortu
                        </TableCell>
                        <TableCell align="center">
                            No. Telepon Ortu
                        </TableCell>
                        <TableCell align="center">
                            Email Ortu
                        </TableCell>
                        <TableCell align="center">
                            Catatan
                        </TableCell>
                        <TableCell align="center">
                            Sekolah
                        </TableCell>
                        <TableCell align="center">
                            Kelas
                        </TableCell>
                        <TableCell align="center">
                            Actions
                           </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {SiswaData.map((r) => {
                        return <TableRow key={r.id}>
                            <TableCell align="left">
                                {r.NIS}
                            </TableCell>
                            <TableCell align="left">
                                {r.Nama}
                            </TableCell>
                            <TableCell align="left">
                                {r.NamaOrtu}
                            </TableCell>
                            <TableCell align="left">
                                {r.HpOrtu}
                            </TableCell>
                            <TableCell align="left">
                                {r.EmailOrtu}
                            </TableCell>
                            <TableCell align="left">
                                {r.Catatan}
                            </TableCell>
                            <TableCell align="left">
                                {r.SekolahId}
                            </TableCell>
                            <TableCell align="left">
                                {r.KelasId}
                            </TableCell>                      
            <TableCell align="right">
                <Box sx={{ display: "flex", justifyContent: "flex-end"}}>
                  
                        <IconButton size="large" onClick={() => handleEdit(r)}>
                            <EditIcon />
                        </IconButton>
                    

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

            <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                <DialogTitle>Edit Siswa</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Silakan edit informasi siswa di bawah ini.
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        name="NIS"
                        label="NIS"
                        type="text"
                        fullWidth
                        value={currentSiswa?.NIS || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="Nama"
                        label="Nama"
                        type="text"
                        fullWidth
                        value={currentSiswa?.Nama || ''}
                        onChange={handleChange}
                    />
                     <TextField
                        margin="dense"
                        name="NamaOrtu"
                        label="Nama Orang Tua"
                        type="text"
                        fullWidth
                        value={currentSiswa?.NamaOrtu || ''}
                        onChange={handleChange}
                    />
                     <TextField
                        margin="dense"
                        name="HpOrtu"
                        label="Hp Orang Tua"
                        type="text"
                        fullWidth
                        value={currentSiswa?.HpOrtu || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="EmailOrtu"
                        label="Email Orang Tua"
                        type="email"
                        fullWidth
                        value={currentSiswa?.EmailOrtu || ''}
                        onChange={handleChange}
                    /> 
                    <TextField
                        margin="dense"
                        name="Catatan"
                        label="Catatan"
                        type="text"
                        fullWidth
                        value={currentSiswa?.Catatan || ''}
                        onChange={handleChange}
                    />
                      <FormControl fullWidth margin="dense">
                        <InputLabel id="sekolah-select-label-add">Sekolah</InputLabel>
                    <Select
                        margin="dense"
                        name="SekolahId"
                        label="Sekolah"
                        type="text"
                        fullWidth
                        value={currentSiswa?.SekolahId || ''}
                        onChange={handleChange}
                        >
                        {SekolahData.map((sekolah) => (
                            <MenuItem key={sekolah.id} value={sekolah.id}>
                                {sekolah.Nama}
                            </MenuItem>
                        ))}
                        </Select>
                     </FormControl>
                     <FormControl fullWidth margin="dense">
                        <InputLabel id="kelas-select-label-add">Kelas</InputLabel>
                   <Select
                        margin="dense"
                        name="KelasId"
                        label="Kelas"
                        type="text"
                        fullWidth
                        value={currentSiswa?.KelasId || ''}
                        onChange={handleChange}
                        > 
                           {KelasData.map((kelas) => (
                            <MenuItem key={kelas.id} value={kelas.id}>
                                {kelas.Nama}
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
 
            {/* add dialog */}
            <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Tambah Sekolah</DialogTitle>
        <DialogContent>
          <DialogContentText>Silakan isi informasi sekolah di bawah ini.</DialogContentText> 
                    <TextField
                        margin="dense"
                        name="NIS"
                        label="NIS"
                        type="text"
                        fullWidth
                        value={newSiswa.NIS}
                        onChange={handleAddChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="Nama"
                        label="Nama"
                        type="text"
                        fullWidth
                        value={newSiswa.Nama}
                        onChange={handleAddChange}
                    />
                    <TextField
                        margin="dense"
                        name="NamaOrtu"
                        label="Nama Orang Tua"
                        type="text"
                        fullWidth
                        value={newSiswa.NamaOrtu}
                        onChange={handleAddChange}
                    />
                    <TextField
                        margin="dense"
                        name="HpOrtu"
                        label="Hp Orang Tua"
                        type="text"
                        fullWidth
                        value={newSiswa.HpOrtu}
                        onChange={handleAddChange}
                    />
                      <TextField
                        margin="dense"
                        name="EmailOrtu"
                        label="Email Orang Tua"
                        type="email"
                        fullWidth
                        value={newSiswa.EmailOrtu}
                        onChange={handleAddChange}
                    />
                     <TextField
                        margin="dense"
                        name="Catatan"
                        label="Catatan"
                        type="text"
                        fullWidth
                        value={newSiswa.Catatan}
                        onChange={handleAddChange}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="sekolah-select-label-add">Sekolah</InputLabel>
                    <Select
                        margin="dense"
                        name="SekolahId"
                        label="Sekolah"
                        type="text"
                        fullWidth
                        value={newSiswa.SekolahId}
                        onChange={handleAddChange}
                        >
                         {SekolahData.map((sekolah) => (
                            <MenuItem key={sekolah.id} value={sekolah.id}>
                                {sekolah.Nama}
                            </MenuItem>
                        ))}
                        </Select>
                        </FormControl>
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="kelas-select-label-add">Kelas</InputLabel>
                     <Select 
                        margin="dense"
                        name="KelasId"
                        label="Kelas"
                        type="text"
                        fullWidth
                        value={newSiswa.KelasId || ''}
                        onChange={handleAddChange}
                        >
                        {KelasData.map((kelas) => (
                            <MenuItem key={kelas.id} value={kelas.id}>
                                    {kelas.Nama}
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
