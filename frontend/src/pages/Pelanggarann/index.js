import React, { useEffect, useState } from 'react'
import { Button, Box, Paper, Table, TableBody, TableCell, TableHead, TableRow, IconButton, TableContainer, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions,  Select, MenuItem, FormControl, InputLabel  } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { BrowserRouter as Router, Link} from "react-router-dom";
// import useRequestResource from 'src/hooks/useRequestResource';

import client from 'src/Utils/client';

    export default function Pelanggarann() {
        const [PelanggarannData, setPelanggarannData] = useState([]);
        const [SekolahData, setSekolahData] = useState([]);
        const [PetugasData, setPetugasData] = useState([]);
        const [SiswaData, setSiswaData] = useState([]);
        const [KategoriData, setKategoriData] = useState([]);
        const [openEditDialog, setOpenEditDialog] = useState(false);
        const [openAddDialog, setOpenAddDialog] = useState(false);
        const [currentPelanggarann, setCurrentPelanggarann] = useState(null);
        const [newPelanggarann, setNewPelanggarann] = useState({
            TglJam: '',
            Poin: '',
            Catatan: '',
            SekolahId: '',
            PetugasId: '',
            SiswaId: '',
            KategoriId: ''
          });

        useEffect(() => {
            client.get('api/pelanggarann/')
                .then(({ data }) => {
                    setPelanggarannData(data);
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

            client.get('api/petugas/')
                .then(({ data }) => {
                    setPetugasData(data);
                })
                .catch((err) => {
                    console.log(err);
                });
            
            client.get('api/siswa/')
                .then(({ data }) => {
                    setSiswaData(data);
                })
                .catch((err) => {
                    console.log(err);
                });

            client.get('api/kategori/')
                .then(({ data }) => {
                    setKategoriData(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }, []);

        // function hapus
        const handleDelete = (id) => {
            client.delete(`api/pelanggarann/${id}/`)
                .then(() => {
                    // Update state to remove deleted item
                    setPelanggarannData((prevData) => prevData.filter((item) => item.id !== id));
                })
                .catch((err) => {
                    console.log(err);
                });
        };
    
        // function edit
        const handleEdit = (pelanggarann) => {
            setCurrentPelanggarann(pelanggarann);
            setOpenEditDialog(true);
        };
    
        const handleCloseEditDialog = () => {
            setOpenEditDialog(false);
            setCurrentPelanggarann(null);
        };

        const handleSaveEdit = () => {
            if (currentPelanggarann) {
                client.put(`/api/pelanggarann/${currentPelanggarann.id}/`, currentPelanggarann)
                    .then(() => {
                        setPelanggarannData((prevData) => prevData.map((item) => item.id === currentPelanggarann.id ? currentPelanggarann : item));
                        handleCloseEditDialog();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        };
    
        const handleChange = (e) => {
            const { name, value } = e.target;
            setCurrentPelanggarann({
                ...currentPelanggarann,
                [name]: value
            });
        };

        // function add
        const handleAddChange = (e) => {
            const { name, value } = e.target;
            setNewPelanggarann({
              ...newPelanggarann,
              [name]: value
            });
          };
        
          const handleOpenAddDialog = () => {
            setOpenAddDialog(true);
          };
        
          const handleCloseAddDialog = () => {
            setOpenAddDialog(false);
            setNewPelanggarann({
                TglJam: '',
                Poin: '',
                Catatan: '',
                SekolahId: '',
                PetugasId: '',
                SiswaId: '',
                KategoriId: ''
            });
          };
        
          const handleSaveAdd = () => {
            console.log('Saving new pelanggaran:', newPelanggarann);
            client.post('/api/pelanggarann/', newPelanggarann)
              .then(({ data }) => {
                setPelanggarannData([...PelanggarannData, data]);
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
          Tambah Pelanggaran 
        </Button>
      </Box>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 360 }} size="small">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">
                            Tanggal dan Jam
                        </TableCell>
                        <TableCell align="center">
                            Poin
                        </TableCell>
                        <TableCell align="center">
                            Catatan
                        </TableCell>
                        <TableCell align="center">
                            Sekolah
                        </TableCell>
                        <TableCell align="center">
                            Petugas
                        </TableCell>
                        <TableCell align="center">
                            Siswa
                        </TableCell>
                        <TableCell align="center">
                            Kategori
                        </TableCell>
                        <TableCell align="center">
                            Actions
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {PelanggarannData.map((r) => {
                        return <TableRow key={r.id}>
                            <TableCell align="center">
                                {r.TglJam}
                            </TableCell>
                            <TableCell align="center">
                                {r.Poin}
                            </TableCell>
                            <TableCell align="center">
                                {r.Catatan}
                            </TableCell>
                            <TableCell align="center">
                                {r.SekolahId}
                            </TableCell>
                            <TableCell align="center">
                                {r.PetugasId}
                            </TableCell>
                            <TableCell align="center">
                                {r.SiswaId}
                            </TableCell>
                            <TableCell align="center">
                                {r.KategoriId} 
                            </TableCell>

<TableCell align="right">
    <Box sx={{ display: "flex", justifyContent: "flex-end"}}>
        {/* <Link to={`/pelanggrann/edit/${r.id}`} key="pelanggarann-edit"> */}
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

<Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                <DialogTitle>Edit Pelanggarann</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Silakan edit informasi Pelanggarann di bawah ini.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="TglJam"
                        label="Tanggal dan Jam"
                        type="text"
                        fullWidth
                        value={currentPelanggarann?.TglJam || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="Poin"
                        label="Poin"
                        type="text"
                        fullWidth
                        value={currentPelanggarann?.Poin || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="Catatan"
                        label="Catatan"
                        type="text"
                        fullWidth
                        value={currentPelanggarann?.Catatan || ''}
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
                        value={currentPelanggarann?.SekolahId || ''}
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
                        <InputLabel id="petugas-select-label-add">Petugas</InputLabel>
                    <Select
                        margin="dense"
                        name="PetugasId"
                        label="Petugas "
                        type="text"
                        fullWidth
                        value={currentPelanggarann?.PetugasId || ''}
                        onChange={handleChange}
                        >
                             {PetugasData.map((petugas) => (
                            <MenuItem key={petugas.id} value={petugas.id}>
                                {petugas.Nama}
                            </MenuItem>
                        ))}
                        </Select>
                        </FormControl>
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="siswa-select-label-add">Siswa</InputLabel>
                    <Select
                        margin="dense"
                        name="SiswaId"
                        label="Siswa "
                        type="text"
                        fullWidth
                        value={currentPelanggarann?.SiswaId || ''}
                        onChange={handleChange}
                        >
                             {SiswaData.map((siswa) => (
                            <MenuItem key={siswa.id} value={siswa.id}>
                                {siswa.Nama}
                            </MenuItem>
                        ))}
                        </Select>
                        </FormControl>
                        <FormControl fullWidth margin="dense">
                        <InputLabel id="kategori-select-label-add">Kategori</InputLabel>
                    <Select
                        margin="dense"
                        name="KategoriId"
                        label="Kategori "
                        type="text"
                        fullWidth
                        value={currentPelanggarann?.KategoriId || ''}
                        onChange={handleChange}
                        >
                             {KategoriData.map((kategori) => (
                            <MenuItem key={kategori.id} value={kategori.id}>
                                {kategori.Nama}
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
                <DialogTitle>Add Pelanggarann</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Silakan add informasi Pelanggarann di bawah ini.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="TglJam"
                        label="Tanggal dan Jam"
                        type="text"
                        fullWidth
                        value={newPelanggarann.TglJam}
                        onChange={handleAddChange}
                    />
                    <TextField
                        margin="dense"
                        name="Poin"
                        label="Poin"
                        type="text"
                        fullWidth
                        value={newPelanggarann.Poin}
                        onChange={handleAddChange}
                    />
                    <TextField
                        margin="dense"
                        name="Catatan"
                        label="Catatan"
                        type="text"
                        fullWidth
                        value={newPelanggarann.Catatan}
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
                        value={newPelanggarann.SekolahId}
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
                        <InputLabel id="petugas-select-label-add">Petugas</InputLabel>
                    <Select
                        margin="dense"
                        name="PetugasId"
                        label="Petugas"
                        type="text"
                        fullWidth
                        value={newPelanggarann.PetugasId}
                        onChange={handleAddChange}
                        >
                         {PetugasData.map((petugas) => (
                            <MenuItem key={petugas.id} value={petugas.id}>
                                {petugas.Nama}
                            </MenuItem>
                        ))}
                        </Select>
                        </FormControl>
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="siswa-select-label-add">Siswa</InputLabel>
                    <Select
                        margin="dense"
                        name="SiswaId"
                        label="Siswa"
                        type="text"
                        fullWidth
                        value={newPelanggarann.SiswaId}
                        onChange={handleAddChange}
                        >
                         {SiswaData.map((siswa) => (
                            <MenuItem key={siswa.id} value={siswa.id}>
                                {siswa.Nama}
                            </MenuItem>
                        ))}
                        </Select>
                        </FormControl>
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="kategori-select-label-add">Kategori</InputLabel>
                    <Select
                        margin="dense"
                        name="KategoriId"
                        label="Kategori"
                        type="text"
                        fullWidth
                        value={newPelanggarann.KategoriId}
                        onChange={handleAddChange}
                        >
                         {KategoriData.map((kategori) => (
                            <MenuItem key={kategori.id} value={kategori.id}>
                                {kategori.Nama}
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
