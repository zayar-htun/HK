import {
    Box,
    Button,
    IconButton,
    Typography,
    Snackbar,
    Modal,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Alert as MuiAlert,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import SideNav from "../../components/SideNav";
import NavBar from "../../components/NavBar";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import {
    ApiCallClinics,
    ApiCallCreateClinic,
    ApiCallCreateOrganization,
    ApiCallDeleteClinic,
    ApiCallOrganizations,
    ApiCallUpdateClinic,
    ApiCallUpdateOrganization,
} from "../../apicall";

export default function Clinic() {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [clinics, setClinics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [organizations, setOrganizations] = useState([]);
    const [selectOrg, setSelectOrg] = useState("");
    const [selectedOrganization, setSelectedOrganization] = useState(null);
    const [selectedOrgGuid, setSelectedOrgGuid] = useState(null);
    const [selectedName, setSelectedName] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedTownship, setSelectedTownship] = useState(null);
    const [selectedClinic, setSelectedClinic] = useState(null);
    const [update, setUpdate] = useState("");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpenEdit = (
        clinic,
        organization,
        guid,
        name,
        state,
        township
    ) => {
        setSelectedClinic(clinic);
        setSelectedOrganization(organization);
        setSelectedOrgGuid(guid);
        setSelectedName(name);
        setSelectedState(state);
        setSelectedTownship(township);
        setOpenEdit(true);
        console.log(clinic, organization, guid, name, state, township);
    };

    const handleCloseEdit = () => setOpenEdit(false);
    const token = sessionStorage.getItem("access_token");
    const nameRef = useRef();
    const updateRef = useRef();
    const updateTownshipRef = useRef();
    const updateStateRef = useRef();
    const townshipRef = useRef();
    const stateRef = useRef();
    useEffect(() => {
        (async () => {
            const result = await ApiCallClinics(token);
            setClinics(result.data.items);
            setLoading(false);
        })();
    }, [token]);

    useEffect(() => {
        (async () => {
            const result = await ApiCallOrganizations(token);
            setOrganizations(result.data.items);
        })();
    }, [token]);

    const deleteClinic = async orgGuid => {
        const result = await ApiCallDeleteClinic(token, orgGuid);
        setClinics(clinics.filter(org => org.guid !== orgGuid));
        setSnackbarSeverity("success");
        setSnackbarMessage("Organization deleted successfully");
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const addOrganization = async () => {
        const name = nameRef.current.value;
        const township = townshipRef.current.value;
        const state = stateRef.current.value;

        if (name === "" || township === "" || state === "") {
            handleClose();
            setSnackbarSeverity("error");
            setSnackbarMessage("need to fill name, township and state");
            setSnackbarOpen(true);
            return;
        }

        // Make the API call to add the organization
        const result = await ApiCallCreateClinic(
            token,
            selectOrg,
            name,
            township,
            state
        );

        // Fetch the updated list of organizations
        const updatedClinics = await ApiCallClinics(token);

        // Set the updated Clinics list
        setClinics(updatedClinics.data.items);

        // Close the modal
        handleClose();

        // Show a success message
        setSnackbarSeverity("success");
        setSnackbarMessage("Organization added successfully");
        setSnackbarOpen(true);
    };

    const updateOrganizaton = async () => {
        const update = updateRef.current.value;
        const state = updateStateRef.current.value;
        const township = updateTownshipRef.current.value;

        // console.log(token, selectedClinic,selectedOrganization, update, township, state);

        // Make the API call to add the organization
        const result = await ApiCallUpdateClinic(
            token,
            selectedClinic,
            selectedOrganization,
            update,
            township,
            state
        );

        if (result.success === true) {
            // Fetch the updated list of organizations
            const updatedClinics = await ApiCallClinics(token);

            // Set the updated Clinics list
            setClinics(updatedClinics.data.items);
        }

        // Close the modal
        handleCloseEdit();

        // Show a success message
        setSnackbarSeverity("success");
        setSnackbarMessage("Organization updated successfully");
        setSnackbarOpen(true);
    };

    const handleChange = event => {
        setSelectOrg(event.target.value);
    };

    const handleChangeUpdate = event => {
        setUpdate(event.target.value);
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
                                    Clinic Lists
                                </Typography>
                            </Box>
                            <Box>
                                <Button
                                    variant="contained"
                                    onClick={handleOpen}
                                >
                                    Add New Clinic
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
                                    {clinics.length}
                                </Typography>
                            )}

                            <Typography sx={{ color: "white" }}>
                                Total Number of Clinics
                            </Typography>
                        </Box>
                        {/* organization count  */}

                        {/* organization list  */}
                        <Box>
                            {clinics?.map(clinic => {
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
                                        key={clinic.guid}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Box>
                                                <LocalHospitalIcon />
                                            </Box>
                                            <Box>
                                                <Typography sx={{ ml: 2 }}>
                                                    {clinic.clinicName}
                                                </Typography>
                                                <Box sx={{ display: "flex" }}>
                                                    <Typography
                                                        sx={{
                                                            ml: 2,
                                                            color: "gray",
                                                        }}
                                                        variant="subtitle1"
                                                    >
                                                        {clinic.township},
                                                        {clinic.state}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box>
                                            <IconButton
                                                aria-label="delete"
                                                color="primary"
                                                onClick={() => {
                                                    handleOpenEdit(
                                                        clinic.guid,
                                                        clinic.organizationGuid,
                                                        clinic.guid,
                                                        clinic.clinicName,
                                                        clinic.state,
                                                        clinic.township
                                                    );
                                                }}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                aria-label="delete"
                                                color="error"
                                                onClick={() => {
                                                    deleteClinic(clinic.guid);
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
                            Add New Clinic
                        </Typography>
                        <Box sx={{ textAlign: "center" }}>
                            <Box sx={{ my: 2 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">
                                        Org
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectOrg}
                                        label="Age"
                                        onChange={handleChange}
                                    >
                                        {organizations.map(org => {
                                            return (
                                                <MenuItem
                                                    value={org.guid}
                                                    key={org.guid}
                                                >
                                                    {org.organizationType}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                                <TextField
                                    fullWidth
                                    required
                                    id="standard-password-input"
                                    label="Clinic Name"
                                    variant="standard"
                                    inputRef={nameRef}
                                    sx={{ mt: 1 }}
                                />
                                <TextField
                                    fullWidth
                                    required
                                    id="standard-password-input"
                                    label="State"
                                    variant="standard"
                                    inputRef={stateRef}
                                    sx={{ mt: 1 }}
                                />
                                <TextField
                                    fullWidth
                                    required
                                    id="standard-password-input"
                                    label="Township"
                                    variant="standard"
                                    inputRef={townshipRef}
                                    sx={{ mt: 1 }}
                                />
                            </Box>
                            <Button
                                sx={{ mt: 3 }}
                                onClick={() => {
                                    addOrganization();
                                }}
                                disabled={selectOrg === ""}
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
                            Update Clinic
                        </Typography>
                        <Box sx={{ textAlign: "center" }}>
                            <Box sx={{ my: 2 }}>
                                <FormControl fullWidth sx={{ my: 1 }}>
                                    <InputLabel id="demo-simple-select-label">
                                        Org
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={
                                            update === ""
                                                ? selectedOrganization
                                                : update
                                        }
                                        label="Age"
                                        onChange={handleChangeUpdate}
                                        readOnly
                                    >
                                        {organizations.map(org => {
                                            return (
                                                <MenuItem
                                                    value={org.guid}
                                                    key={org.guid}
                                                >
                                                    {org.organizationType}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                                <TextField
                                    sx={{ my: 1 }}
                                    fullWidth
                                    id="standard-password-input"
                                    label="Clinic Name"
                                    variant="standard"
                                    inputRef={updateRef}
                                    defaultValue={selectedName}
                                />
                                <TextField
                                    sx={{ my: 1 }}
                                    fullWidth
                                    id="standard-password-input"
                                    label="State"
                                    variant="standard"
                                    inputRef={updateStateRef}
                                    defaultValue={selectedState}
                                />
                                <TextField
                                    sx={{ my: 1 }}
                                    fullWidth
                                    id="standard-password-input"
                                    label="Township"
                                    variant="standard"
                                    inputRef={updateTownshipRef}
                                    defaultValue={selectedTownship}
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
