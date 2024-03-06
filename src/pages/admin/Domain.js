import {
    Box,
    Button,
    IconButton,
    Typography,
    TextField,
    Snackbar,
    Modal,
    Alert as MuiAlert,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    InputBase,
    Paper,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import SideNav from "../../components/SideNav";
import NavBar from "../../components/NavBar";
import DeleteIcon from "@mui/icons-material/Delete";
import DomainIcon from "@mui/icons-material/Domain";
import SearchIcon from "@mui/icons-material/Search";
import {
    ApiCallAllDomain,
    ApiCallAssignDepartmentWithClinic,
    ApiCallClinics,
    ApiCallCreateDomain,
    ApiCallDeleteDomain,
    ApiCallUpdateDepartmentName,
    ApiCallUsers,
} from "../../apicall";

export default function Domain() {
    const [users, setUsers] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [open, setOpen] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const domainRef = useRef();
    const nameEditRef = useRef();
    const [allDomains, setAllDomains] = useState([]);
    const [clinics, setClinics] = useState([]);
    const [domainGuid, setDomainGuid] = useState("");
    const [departmentName, setDepartmentName] = useState("");
    const [selectClinicGuid, setSelectClinicGuid] = useState("");
    const [newClinic, setNewClinic] = useState("");
    const searchInput = useRef();
    const [selectedClinic, setSelectedClinic] = React.useState("All Clinic");

    const handleChange = event => {
        setSelectedClinic(event.target.value);
    };

    const token = sessionStorage.getItem("access_token");

    useEffect(() => {
        (async () => {
            const result = await ApiCallUsers(token);
            setUsers(result.data.items);
        })();
    }, [token]);
    const handleAddClinic = event => {
        setNewClinic(event.target.value);
    };
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpenEdit = (guid, departmentName, clinicGuid) => {
        setDomainGuid(guid);
        setDepartmentName(departmentName);
        setSelectClinicGuid(clinicGuid);
        setOpenEdit(true);
    };
    const handleCloseEdit = () => setOpenEdit(false);
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };
    useEffect(() => {
        (async () => {
            const searchTerm = searchInput.current.value.trim();
            const result = await ApiCallAllDomain(token, searchTerm);
            setAllDomains(result.data.items);
            console.log(result.data.items);
        })();
    }, [token]);

    useEffect(() => {
        (async () => {
            const result = await ApiCallClinics(token);
            setClinics(result.data.items);
        })();
    }, [token]);
    const addDomain = async () => {
        const name = domainRef.current.value;

        if (name === "") {
            handleClose();
            setSnackbarSeverity("error");
            setSnackbarMessage("need to fill domain name");
            setSnackbarOpen(true);
            return;
        }

        // console.log(newClinic, name);

        // Make the API call to add the organization
        const result = await ApiCallCreateDomain(token, name, newClinic);

        if (result.success === true) {
            // Fetch the updated list of organizations
            const searchTerm = searchInput.current.value.trim();
            const updateDomain = await ApiCallAllDomain(token, searchTerm);

            // Set the updated Clinics list
            setAllDomains(updateDomain.data.items);

            // Close the modal
            handleClose();

            // Show a success message
            setSnackbarSeverity("success");
            setSnackbarMessage("User added successfully");
            setSnackbarOpen(true);
        }
    };

    const handleSearch = async event => {
        // Prevent the default form submission behavior
        event.preventDefault();

        const searchTerm = searchInput.current.value.trim();

        if (searchTerm) {
            const result = await ApiCallAllDomain(token, searchTerm);
            setAllDomains(result.data.items);
        }
        //  else {
        //     // If there is no search term, perform a general search
        //     setIsLoading(true);
        //     const result = await ApiCallGetAllGateCha(page, rowsPerPage);
        //     setGateLists(result.data.items);
        //     setIsLoading(false);
        //     setListLength(result.data.totalRecords);
        // }
    };
    const handleKeyPress = event => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    const editDomainName = async () => {
        const domainName = nameEditRef.current.value;
        // Make the API call to add the organization
        const result = await ApiCallUpdateDepartmentName(
            token,
            domainGuid,
            domainName
        );

        if (result.success === true) {
            // Fetch the updated list of organizations
            const updatedDomains = await ApiCallAllDomain(token);

            // Set the updated Domains list
            setAllDomains(updatedDomains.data.items);
        }

        // Close the modal
        handleCloseEdit();

        // Show a success message
        setSnackbarSeverity("success");
        setSnackbarMessage("Assign Domain With Clinic successfully");
        setSnackbarOpen(true);
    };

    const deleteDomain = async guid => {
        const result = await ApiCallDeleteDomain(token, guid);
        if (result.success === true) {
            const searchTerm = searchInput.current.value.trim();
            const updateDomain = await ApiCallAllDomain(token, searchTerm);
            setAllDomains(updateDomain.data.items);
            setSnackbarSeverity("success");
            setSnackbarMessage("Domain deleted successfully");
            setSnackbarOpen(true);
        }
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
                                    Domain Lists
                                </Typography>
                            </Box>
                            <Box>
                                <Button
                                    variant="contained"
                                    onClick={handleOpen}
                                >
                                    Add New Domain
                                </Button>
                            </Box>
                        </Box>
                        {/* header  */}

                        {/* Domain count  */}
                        <Box
                            sx={{
                                bgcolor: "#EC7800",
                                my: 4,
                                mx: 2,
                                borderRadius: "10px",
                                p: 2,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "24px",
                                    fontWeight: "bold",
                                    color: "white",
                                }}
                            >
                                {allDomains.length}
                            </Typography>
                            <Typography sx={{ color: "white" }}>
                                Total Number of Domain
                            </Typography>
                        </Box>
                        {/* Domain count  */}

                        {/* search */}
                        <Box sx={{ my: 4 }}>
                            <Paper
                                component="form"
                                sx={{
                                    p: "2px 4px",
                                    display: "flex",
                                    alignItems: "center",
                                    width: "100%",
                                }}
                            >
                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="Search by question name"
                                    inputProps={{
                                        "aria-label":
                                            "Search e.g. Way ID, Merchant ID, Merchant Name",
                                    }}
                                    inputRef={searchInput}
                                />
                                <IconButton
                                    type="button"
                                    sx={{ p: "10px" }}
                                    aria-label="search"
                                    onClick={handleSearch}
                                    onKeyPress={handleKeyPress}
                                >
                                    <SearchIcon />
                                </IconButton>
                            </Paper>
                        </Box>
                        {/* search */}

                        {/* filter */}
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                Age
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedClinic}
                                label="Age"
                                onChange={handleChange}
                            >
                                <MenuItem value={"All Clinic"}>
                                    All Clinic
                                </MenuItem>
                                {clinics.map(clinic => {
                                    return (
                                        <MenuItem
                                            value={clinic.guid}
                                            key={clinic.guid}
                                        >
                                            {clinic.clinicName}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                        {/* filter */}

                        {/* domain list  */}
                        <Box>
                            {allDomains
                                ?.filter(domain => {
                                    // If "All Clinic" is selected, show all domains
                                    if (selectedClinic === "All Clinic") {
                                        return true;
                                    }
                                    // Otherwise, filter domains by selected clinic
                                    return domain.clinicGuid === selectedClinic;
                                })
                                .map(domain => {
                                    return (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                bgcolor: "#FBFBFB",
                                                py: 2,
                                                px: 4,
                                                borderRadius: "10px",
                                                my: 2,
                                            }}
                                            key={domain.guid}
                                        >
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-between",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <DomainIcon />
                                                <Box>
                                                    <Typography sx={{ ml: 2 }}>
                                                        Domain :{" "}
                                                        <b>
                                                            {
                                                                domain.departmentName
                                                            }
                                                        </b>
                                                    </Typography>
                                                    <Typography sx={{ ml: 2 }}>
                                                        Clinic :{" "}
                                                        <b>
                                                            {domain.clinicName}
                                                        </b>
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Box>
                                                <Button
                                                    variant="contained"
                                                    sx={{ mr: 2 }}
                                                    onClick={() => {
                                                        handleOpenEdit(
                                                            domain.guid,
                                                            domain.departmentName,
                                                            domain.clinicGuid
                                                        );
                                                    }}
                                                >
                                                    Edit Domain Name
                                                </Button>
                                                <IconButton
                                                    aria-label="delete"
                                                    color="error"
                                                    onClick={() => {
                                                        deleteDomain(
                                                            domain.guid
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
                        {/* domain list  */}
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
                            Add New Domain
                        </Typography>
                        <Box sx={{ textAlign: "center" }}>
                            <Box sx={{ my: 2 }}>
                                <FormControl fullWidth sx={{ my: 1 }}>
                                    <InputLabel id="demo-simple-select-label">
                                        Clinic
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={newClinic}
                                        label="Role"
                                        onChange={handleAddClinic}
                                    >
                                        {clinics.map(clinic => {
                                            return (
                                                <MenuItem
                                                    value={clinic.guid}
                                                    key={clinic.guid}
                                                >
                                                    {clinic.clinicName}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                                <TextField
                                    fullWidth
                                    sx={{ my: 1 }}
                                    id="standard-password-input"
                                    label="Domain"
                                    variant="standard"
                                    inputRef={domainRef}
                                />
                            </Box>
                            <Button
                                sx={{ mt: 3 }}
                                onClick={() => {
                                    addDomain();
                                }}
                                disabled={newClinic === ""}
                            >
                                Create Domain
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
                            Assign Domain With Clinic
                        </Typography>
                        <Box sx={{ textAlign: "center" }}>
                            <Box sx={{ my: 2 }}>
                                <FormControl fullWidth sx={{ my: 1 }}>
                                    <InputLabel id="demo-simple-select-label">
                                        Clinic
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectClinicGuid}
                                        label="Clinic"
                                        readOnly
                                    >
                                        {clinics.map(org => {
                                            return (
                                                <MenuItem
                                                    value={org.guid}
                                                    key={org.guid}
                                                >
                                                    {org.clinicName}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                                <TextField
                                    fullWidth
                                    sx={{ my: 1 }}
                                    id="standard-password-input"
                                    label="User Name"
                                    variant="standard"
                                    inputRef={nameEditRef}
                                    defaultValue={departmentName}
                                />
                            </Box>
                            <Button
                                sx={{ mt: 3 }}
                                onClick={() => {
                                    editDomainName();
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
