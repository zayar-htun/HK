import React from "react";
import SideNav from "../components/SideNav";
import { Box, Typography } from "@mui/material";
import NavBar from "../components/NavBar";

export default function Dashboard() {
    return (
        <>
            <NavBar />
            <Box height={28} />
            <Box sx={{ display: "flex" }}>
                <SideNav />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <h1>Home</h1>
                </Box>
                <Box sx={{height:"100vh"}}>
                    <Typography>Hello</Typography>
                </Box>
                <Box sx={{height:"100vh"}}>
                    <Typography>Hello</Typography>
                </Box>
            </Box>
        </>
    );
}
