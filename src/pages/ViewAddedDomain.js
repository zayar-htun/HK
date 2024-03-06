import React, { useEffect, useState } from "react";
import UserNavBar from "../components/UserNavBar";
import {
    Box,
    Button,
    Container,
    Modal,
    IconButton,
    Typography,
    Alert as MuiAlert,
    Snackbar,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import {
    ApiCallDeleteRecord,
    ApiCallDepartmentByUserGuid,
    ApiCallSelectDomain,
} from "../apicall";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

export default function ViewAddedDomain() {
    const [domainByUser, setDomainByUser] = useState([]);
    const [domains, setDomains] = useState([]);
    const [otherDomains, setotherDomains] = useState([]);
    const [deleteGuid, setDeleteGuid] = useState("");
    const [open, setOpen] = useState(false);
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
    const navigate = useNavigate();

    const handleOpen = guid => {
        setOpen(true);
        setDeleteGuid(guid);
        console.log(guid);
    };
    const handleClose = () => setOpen(false);

    useEffect(() => {
        (async () => {
            const result = await ApiCallDepartmentByUserGuid(
                token,
                userGuid,
                clinicGuid
            );
            setDomainByUser(result.data.items);
            console.log("Domain By User", result.data.items);
        })();
    }, [token, userGuid, clinicGuid]);

    useEffect(() => {
        (async () => {
            const result = await ApiCallSelectDomain(token, clinicGuid);
            setDomains(result.data.items);
            // console.log(result.data.items);
        })();
    }, [token, clinicGuid]);
    useEffect(() => {
        // Check if both domainByUser and domains have data
        if (domainByUser.length > 0 || domains.length > 0) {
            const updatedOtherDomains = domains.filter(dom => {
                // Filter out domains that have a matching guid in domainByUser
                return !domainByUser.some(dbu => dbu.guid === dom.guid);
            });

            setotherDomains(updatedOtherDomains);
            console.log("otherdomain", updatedOtherDomains);
        }
    }, [domainByUser, domains]);

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
            <UserNavBar />
            <Box
                sx={{
                    bgcolor: "var(--Primary-500, #EC7800)",
                    py: "32px",
                    px: "24px",
                    mr: {
                        xs: "30px",
                        md: "110px",
                        lg: "150px",
                    },
                    ml: {
                        xs: "30px",
                        md: "110px",
                        lg: "150px",
                    },
                    my: 4,
                    borderRadius: "12px",
                }}
            >
                <Typography
                    sx={{
                        color: "var(--Text-50, #FFF)",
                        fontFamily: "Inter",
                        fontSize: "32px",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "32px",
                        mb: "12px",
                    }}
                >
                    <b>{clinicName}</b>
                </Typography>
                <Typography
                    sx={{
                        color: "var(--Text-50, #FFF)",
                        fontFamily: "Inter",
                        fontSize: "20px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "20px",
                        mb: "8px",
                    }}
                >
                    {clinicState}, {clinicTownship}
                </Typography>

                <Typography
                    sx={{
                        color: "var(--Text-50, #FFF)",
                        fontFamily: "Inter",
                        fontSize: "20px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "20px",
                        mb: "16px",
                    }}
                >
                    Organization : <b>{organizationType} </b>
                </Typography>

                <Button
                    sx={{
                        mr: 2,
                        bgcolor: "var(--Primary-50, #FFF8E8)",
                        borderRadius: "10px",
                        color: "#EC7800",
                        "&:hover": {
                            bgcolor: "var(--Primary-50, #FFF8E8)",
                            color: "#EC7800",
                        },
                    }}
                    onClick={() => {
                        navigate(`/selectdomain/${clinicGuid}`);
                    }}
                >
                    Add New Record
                </Button>
            </Box>

            {/* view domain list */}
            <Box>
                {domainByUser?.map(dbu => {
                    return (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                bgcolor: "#FBFBFB",
                                px: "16px",
                                py: "24px",
                                mr: {
                                    xs: "30px",
                                    md: "110px",
                                    lg: "150px",
                                },
                                ml: {
                                    xs: "30px",
                                    md: "110px",
                                    lg: "150px",
                                },
                                mt: 3,
                                borderRadius: "10px",
                            }}
                            key={dbu.guid}
                        >
                            <Box>
                                <Typography variant="h5">
                                    {dbu.departmentName}
                                </Typography>
                                <Typography>
                                    {" "}
                                    {format(
                                        new Date(dbu.updatedOn),
                                        "dd/MM/yyyy"
                                    )}
                                </Typography>
                            </Box>
                            <Box>
                                <IconButton
                                    aria-label="delete"
                                    onClick={() => {
                                        navigate(`/viewonly/${dbu.guid}`);
                                    }}
                                >
                                    <VisibilityIcon sx={{ color: "#4892F9" }} />
                                </IconButton>
                                <IconButton
                                    aria-label="delete"
                                    onClick={() => {
                                        navigate(`/viewedit/${dbu.guid}`);
                                    }}
                                >
                                    <EditIcon sx={{ color: "#10B981" }} />
                                </IconButton>
                                <IconButton
                                    aria-label="delete"
                                    onClick={() => {
                                        // deleteRecord(dbu.guid);
                                        // console.log(dbu.guid);
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
            <Box>
                {otherDomains?.map(dbu => {
                    return (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                bgcolor: "#FBFBFB",
                                px: "16px",
                                py: "24px",
                                mr: {
                                    xs: "30px",
                                    md: "110px",
                                    lg: "150px",
                                },
                                ml: {
                                    xs: "30px",
                                    md: "110px",
                                    lg: "150px",
                                },
                                mt: 3,
                                borderRadius: "10px",
                            }}
                            key={dbu.guid}
                        >
                            <Box>
                                <Typography variant="h5">
                                    {dbu.departmentName}
                                </Typography>
                                <Typography>
                                    {" "}
                                    {format(
                                        new Date(dbu.updatedOn),
                                        "dd/MM/yyyy"
                                    )}
                                </Typography>
                            </Box>
                            <Box>
                                <IconButton
                                    aria-label="delete"
                                    onClick={() => {
                                        navigate(`/viewonly/${dbu.guid}`);
                                    }}
                                >
                                    <VisibilityIcon sx={{ color: "#4892F9" }} />
                                </IconButton>
                                {roleName === "Administrator" && (
                                    <IconButton
                                        aria-label="delete"
                                        onClick={() => {
                                            navigate(`/viewedit/${dbu.guid}`);
                                        }}
                                    >
                                        <EditIcon sx={{ color: "#10B981" }} />
                                    </IconButton>
                                )}
                                {roleName === "Administrator" && (
                                    <IconButton
                                        aria-label="delete"
                                        onClick={() => {
                                            // deleteRecord(dbu.guid);
                                            // console.log(dbu.guid);
                                            handleOpen(dbu.guid);
                                        }}
                                    >
                                        <DeleteIcon
                                            sx={{
                                                color: "#EC7800",
                                            }}
                                        />
                                    </IconButton>
                                )}
                            </Box>
                        </Box>
                    );
                })}
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
                        <IconButton aria-label="delete" onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        This action cannot be undone. Are you sure you want to
                        delete the record?
                    </Typography>
                    <Box
                        sx={{
                            mt: 3,
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <Button sx={{ color: "black" }} onClick={handleClose}>
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
        </>
    );
}
