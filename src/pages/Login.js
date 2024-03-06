import {
    Box,
    Button,
    Grid,
    TextField,
    Typography,
    Snackbar,
    Alert as MuiAlert,
    OutlinedInput,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { ApiCallGetUserInfo, ApiCallLogin } from "../apicall";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const nameRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    const handleFormSubmit = async e => {
        e.preventDefault();
        const name = nameRef.current.value;
        const password = passwordRef.current.value;

        setLoading(true);

        try {
            const result = await ApiCallLogin(name, password);

            if (result) {
                setSnackbarOpen(true);
                setSnackbarSeverity("success");
                setSnackbarMessage("Login successful");

                navigate("/userhome");
            } else {
                setSnackbarOpen(true);
                setSnackbarSeverity("error");
                setSnackbarMessage(
                    "Login failed. Please check your credentials."
                );
            }
        } catch (error) {
            setSnackbarSeverity("error");
            setSnackbarMessage("An error occurred. Please try again.");
        } finally {
            setLoading(false);
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box>
            <Grid container spacing={0} sx={{ height: "100vh" }}>
                <Grid
                    item
                    xs={6}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "#FFF8E8",
                    }}
                >
                    <Box
                        sx={{
                            textAlign: "center",
                        }}
                    >
                        <img
                            src="/hk.png"
                            alt=""
                            style={{
                                height: "150px",
                                width: "150px",
                                margin: "auto",
                            }}
                        />
                        <Typography
                            sx={{
                                color: "var(--Text-500, #3F3F3F)",
                                fontFamily: "Nunito Sans",
                                fontSize: "32px",
                                fontStyle: "normal",
                                fontWeight: 600,
                                lineHeight: "28px",
                                mb: 1,
                            }}
                        >
                            HK
                        </Typography>
                        <Typography
                            sx={{
                                color: "var(--Text-500, #3F3F3F)",
                                fontFamily: "Nunito Sans",
                                fontSize: "16px",
                                fontStyle: "normal",
                                fontWeight: 400,
                                lineHeight: "24px",
                            }}
                        >
                            Health Key
                        </Typography>
                    </Box>
                </Grid>

                <Grid
                    item
                    xs={6}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <form onSubmit={handleFormSubmit}>
                            <Typography
                                sx={{
                                    mb: "12px",
                                    color: "var(--Text-800, #141414)",
                                    textAlign: "center",
                                    fontFamily: "Inter",
                                    fontSize: "24px",
                                    fontStyle: "normal",
                                    fontWeight: 600,
                                    lineHeight: "32px",
                                }}
                            >
                                Welcome
                            </Typography>

                            <Typography
                                sx={{
                                    mb: "32px",
                                    color: "var(--Text-500, #3F3F3F)",
                                    textAlign: "center",
                                    fontFamily: "Inter",
                                    fontSize: "18px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "28px",
                                }}
                            >
                                Log in now to access your account.
                            </Typography>
                            <OutlinedInput
                                placeholder="Username"
                                fullWidth
                                sx={{ mb: "16px", width: "100%" }}
                                inputRef={nameRef}
                            />
                            <OutlinedInput
                                type="password"
                                placeholder="Password"
                                fullWidth
                                sx={{ mb: "32px", width: "100%" }}
                                inputRef={passwordRef}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                sx={{ width: "100%", borderRadius: "8px" }}
                                disabled={loading}
                            >
                                {loading ? "Logging in..." : "Login"}
                            </Button>
                        </form>
                    </Box>
                </Grid>
            </Grid>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={handleSnackbarClose}
                    severity={snackbarSeverity}
                >
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </Box>
    );
}
