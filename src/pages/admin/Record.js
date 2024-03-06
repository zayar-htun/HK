import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Container,
    IconButton,
    Typography,
    Alert as MuiAlert,
    Snackbar,
    Modal,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import SideNav from "../../components/SideNav";
import CloseIcon from "@mui/icons-material/Close";
import {
    ApiCallAllDomain,
    ApiCallDeleteRecord,
    ApiCallDepartmentByUserGuid,
} from "../../apicall";
import { format } from "date-fns";

export default function Record() {
    const [domainByUser, setDomainByUser] = useState([]);
    const [domains, setDomains] = useState([]);
    const [otherDomains, setotherDomains] = useState([]);
    const token = sessionStorage.getItem("access_token");
    const userGuid = sessionStorage.getItem("user_guid");
    const clinicGuid = sessionStorage.getItem("clinicGuid");
    const roleName = sessionStorage.getItem("roleName");
    const clinicName = sessionStorage.getItem("clinicName");
    const clinicTownship = sessionStorage.getItem("clinicTownship");
    const clinicState = sessionStorage.getItem("clinicState");
    const organizationType = sessionStorage.getItem("organizationType");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [open, setOpen] = useState(false);
    const [deleteGuid, setDeleteGuid] = useState("");
    const navigate = useNavigate();
    const handleClose = () => setOpen(false);

    useEffect(() => {
        (async () => {
            const result = await ApiCallDepartmentByUserGuid(
                token,
                userGuid,
                clinicGuid
            );
            setDomainByUser(result.data.items);
        })();
    }, [token, userGuid, clinicGuid]);

    useEffect(() => {
        (async () => {
            const result = await ApiCallAllDomain(token);
            setDomains(result.data.items);
            // console.log(result.data.items);
        })();
    }, [token, clinicGuid]);
    // useEffect(() => {
    //     // Check if both domainByUser and domains have data
    //     if (domainByUser.length > 0 && domains.length > 0) {
    //         const updatedOtherDomains = domainByUser.map(dbu => {
    //             const correspondingDomain = domains.filter(
    //                 dom => dom.guid !== dbu.guid
    //             );
    //             return correspondingDomain;
    //         });

    //         setotherDomains(updatedOtherDomains[0]);
    //         console.log(updatedOtherDomains);
    //     }
    // }, [domainByUser, domains]);

    const handleOpen = guid => {
        setOpen(true);
        setDeleteGuid(guid);
        console.log(guid);
    };

    const deleteRecord = async guid => {
        try {
            const result = await ApiCallDeleteRecord(token, guid);

            if (result.success === true) {
                // Update the state after successful deletion
                setDomainByUser(prevDomains =>
                    prevDomains.filter(dbu => dbu.guid !== guid)
                );

                setOpen(false);

                // Show a success message
                setSnackbarSeverity("success");
                setSnackbarMessage("Delete record successfully");
                setSnackbarOpen(true);
            }
        } catch (error) {
            // Handle error, e.g., display an error message
            console.error("Error deleting record:", error);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <NavBar />
            <Box height={28} />
            <Box sx={{ display: "flex" }}>
                <SideNav />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Box sx={{ mt: 8 }}>
                        {/* view domain list */}
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                            Choose Domain to manage answer
                        </Typography>
                        <Container>
                            <Box>
                                {domains?.map(dbu => {
                                    return (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                bgcolor: "#FBFBFB",
                                                px: "16px",
                                                py: "24px",
                                                mt: 3,
                                            }}
                                            key={dbu.guid}
                                        >
                                            <Box>
                                                <Typography variant="h5">
                                                    {dbu.departmentName}
                                                </Typography>
                                                <Typography>
                                                    {dbu.createdOn
                                                        ? format(
                                                              new Date(
                                                                  dbu.createdOn
                                                              ),
                                                              "dd/MM/yyyy"
                                                          )
                                                        : ""}
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <IconButton
                                                    aria-label="delete"
                                                    onClick={() => {
                                                        navigate(
                                                            `/viewrecord/${dbu.guid}`
                                                        );
                                                    }}
                                                >
                                                    <VisibilityIcon
                                                        sx={{
                                                            color: "#4892F9",
                                                        }}
                                                    />
                                                </IconButton>
                                                <IconButton
                                                    aria-label="delete"
                                                    onClick={() => {
                                                        navigate(
                                                            `/editrecord/${dbu.guid}`
                                                        );
                                                    }}
                                                >
                                                    <EditIcon
                                                        sx={{
                                                            color: "#10B981",
                                                        }}
                                                    />
                                                </IconButton>
                                                <IconButton
                                                    aria-label="delete"
                                                    onClick={() => {
                                                        handleOpen(dbu.guid);
                                                    }}
                                                >
                                                    <DeleteIcon
                                                        sx={{
                                                            color: "#EC7800",
                                                        }}
                                                    />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    );
                                })}
                            </Box>
                        </Container>
                    </Box>
                </Box>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={2000} // This sets the duration to 2000 milliseconds (2 seconds)
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
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 400,
                            bgcolor: "background.paper",
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Typography
                                id="modal-modal-title"
                                sx={{
                                    color: "var(--Text-800, #141414)",
                                    fontFamily: "Inter",
                                    fontSize: "20px",
                                    fontStyle: "normal",
                                    fontWeight: 700,
                                    lineHeight: "28px",
                                }}
                            >
                                Delete Record
                            </Typography>
                            <IconButton
                                aria-label="delete"
                                onClick={handleClose}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Box>

                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            This action cannot be undone. Are you sure you want
                            to delete the record?
                        </Typography>
                        <Box
                            sx={{
                                mt: 3,
                                display: "flex",
                                justifyContent: "flex-end",
                            }}
                        >
                            <Button
                                sx={{ color: "black" }}
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() => {
                                    deleteRecord(deleteGuid);
                                }}
                            >
                                Yes
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </Box>
        </>
    );
}
