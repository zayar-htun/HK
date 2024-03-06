import {
    Box,
    Button,
    IconButton,
    Typography,
    Snackbar,
    Modal,
    TextField,
    Alert as MuiAlert,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import SideNav from "../../components/SideNav";
import NavBar from "../../components/NavBar";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import {
    ApiCallCreateOrganization,
    ApiCallDeleteOrganization,
    ApiCallOrganizations,
    ApiCallUpdateOrganization,
} from "../../apicall";

export default function Organization() {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [organizations, setOrganizations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [selectedOrganization, setSelectedOrganization] = useState(null);
    const [selectedOrgGuid, setSelectedOrgGuid] = useState(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpenEdit = (organization, guid) => {
        setSelectedOrganization(organization);
        setSelectedOrgGuid(guid);
        setOpenEdit(true);
    };

    const handleCloseEdit = () => setOpenEdit(false);
    const token = sessionStorage.getItem("access_token");
    const nameRef = useRef();
    const updateRef = useRef();

    useEffect(() => {
        (async () => {
            const result = await ApiCallOrganizations(token);
            setOrganizations(result.data.items);
            setLoading(false);
        })();
    }, [token]);

    const deleteOrganization = async orgGuid => {
        const result = await ApiCallDeleteOrganization(token, orgGuid);
        setOrganizations(organizations.filter(org => org.guid !== orgGuid));
        setSnackbarSeverity("success");
        setSnackbarMessage("Organization deleted successfully");
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const addOrganization = async () => {
        const name = nameRef.current.value;

        // Make the API call to add the organization
        const result = await ApiCallCreateOrganization(token, name);

        // Fetch the updated list of organizations
        const updatedOrganizations = await ApiCallOrganizations(token);

        // Set the updated organizations list
        setOrganizations(updatedOrganizations.data.items);

        // Close the modal
        handleClose();

        // Show a success message
        setSnackbarSeverity("success");
        setSnackbarMessage("Organization added successfully");
        setSnackbarOpen(true);
    };

    const updateOrganizaton = async () => {
        const update = updateRef.current.value;

        // Make the API call to add the organization
        const result = await ApiCallUpdateOrganization(
            token,
            selectedOrgGuid,
            update
        );

        // Fetch the updated list of organizations
        const updatedOrganizations = await ApiCallOrganizations(token);

        // Set the updated organizations list
        setOrganizations(updatedOrganizations.data.items);

        // Close the modal
        handleCloseEdit();

        // Show a success message
        setSnackbarSeverity("success");
        setSnackbarMessage("Organization updated successfully");
        setSnackbarOpen(true);
    };

    return (
        <>
            <NavBar />
            <Box height={28} />
            <Box sx={{ display: "flex" }}>
                <SideNav />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Box sx={{ mt: 4 }}>
                        {/* header  */}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Box>
                                <Typography
                                    sx={{
                                        fontSize: "24px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Organization Lists
                                </Typography>
                            </Box>
                            <Box>
                                <Button
                                    variant="contained"
                                    onClick={handleOpen}
                                >
                                    Add New Organization
                                </Button>
                            </Box>
                        </Box>
                        {/* header  */}

                        {/* organization count  */}
                        <Box
                            sx={{
                                bgcolor: "#EC7800",
                                my: 4,
                                mx: 2,
                                borderRadius: "10px",
                                p: 2,
                            }}
                        >
                            {!loading && (
                                <Typography
                                    sx={{
                                        fontSize: "24px",
                                        fontWeight: "bold",
                                        color: "white",
                                    }}
                                >
                                    {organizations.length}
                                </Typography>
                            )}

                            <Typography sx={{ color: "white" }}>
                                Total Number of Organizations
                            </Typography>
                        </Box>
                        {/* organization count  */}

                        {/* organization list  */}
                        <Box>
                            {organizations?.map(organization => {
                                return (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            bgcolor: "#FBFBFB",
                                            py: 2,
                                            px: 4,
                                            my: 1,
                                            borderRadius: "10px",
                                        }}
                                        key={organization.guid}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Diversity2Icon />
                                            <Typography sx={{ ml: 2 }}>
                                                {organization.organizationType}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <IconButton
                                                aria-label="delete"
                                                color="primary"
                                                onClick={() => {
                                                    handleOpenEdit(
                                                        organization.organizationType,
                                                        organization.guid
                                                    );
                                                }}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                aria-label="delete"
                                                color="error"
                                                onClick={() => {
                                                    deleteOrganization(
                                                        organization.guid
                                                    );
                                                }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                );
                            })}
                        </Box>
                        {/* organization list  */}
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
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            Add New Organization
                        </Typography>
                        <Box sx={{ textAlign: "center" }}>
                            <Box sx={{ my: 2 }}>
                                <TextField
                                    fullWidth
                                    id="standard-password-input"
                                    label="Organization Name"
                                    variant="standard"
                                    inputRef={nameRef}
                                />
                            </Box>
                            <Button
                                sx={{ mt: 3 }}
                                onClick={() => {
                                    addOrganization();
                                }}
                            >
                                Add
                            </Button>
                        </Box>
                    </Box>
                </Modal>
                <Modal
                    open={openEdit}
                    onClose={handleCloseEdit}
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
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            Update Organization
                        </Typography>
                        <Box sx={{ textAlign: "center" }}>
                            <Box sx={{ my: 2 }}>
                                <TextField
                                    fullWidth
                                    id="standard-password-input"
                                    label="Organization Name"
                                    variant="standard"
                                    inputRef={updateRef}
                                    defaultValue={selectedOrganization}
                                />
                            </Box>
                            <Button
                                sx={{ mt: 3 }}
                                onClick={() => {
                                    updateOrganizaton();
                                }}
                            >
                                Update
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </Box>
        </>
    );
}
