import React from "react";
import ReactDOM from "react-dom";
import CssBaseLine from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";

import Sekolah from "./pages/Sekolah";
import Siswa from "./pages/Siswa";
import Pelanggarann from "./pages/Pelanggarann";
import Kategori from "./pages/Kategori";
import Petugas from "./pages/Petugas";
import Kelas from "./pages/Kelas";

export default function App() {
    return <div>
        <CssBaseLine /> 
        <Router>
            <Box sx={{
                bgcolor: (theme) => theme.palette.background.default,minHeight: "100vh"
            }}>
                <Routes>
                    <Route path="api/sekolah"
                    element={<Sekolah />} />
                    <Route path="api/siswa"
                    element={<Siswa />} />
                    <Route path="api/kelas"
                    element={<Kelas />} />
                    <Route path="api/petugas"
                    element={<Petugas />} />
                    <Route path="api/kategori"
                    element={<Kategori />} />
                     <Route path="api/pelanggarann"
                    element={<Pelanggarann />} />
                </Routes>
            </Box>
        </Router>
    </div>
}

ReactDOM.render(<App />, document.
getElementById("root"))
