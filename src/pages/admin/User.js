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
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import SideNav from "../../components/SideNav";
import NavBar from "../../components/NavBar";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import {
    ApiCallCreateUser,
    ApiCallDeleteUser,
    ApiCallOrganizations,
    ApiCallRoles,
    ApiCallUpdateUser,
    ApiCallUsers,
} from "../../apicall";

export default function User() {
    const [users, setUsers] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [open, setOpen] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [selectOrg, setSelectOrg] = useState("");
    const [selectRole, setSelectRole] = useState("");
    const [organizations, setOrganizations] = useState([]);
    const [roles, setRoles] = useState([
        {
            name: "Administrator",
            guid: "3c442251-3ede-45ab-9343-c30a89a97dba",
        },
        {
            name: "Customer",
            guid: "4ef876a8-dbdf-468c-9ce0-7d4a7523c954",
        },
    ]);
    const nameRef = useRef();
    const passwordRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const nameEditRef = useRef();
    const passwordEditRef = useRef();
    const emailEditRef = useRef();
    const phoneEditRef = useRef();
    const [selectedOrganization, setSelectedOrganization] = useState("");
    const [selectedOrgGuid, setSelectedOrgGuid] = useState("");
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedRoleGuid, setSelectedRoleGuid] = useState("");
    const [selectedName, setSelectedName] = useState("");
    const [selectedEmail, setSelectedEmail] = useState("");
    const [selectedPhone, setSelectedPhone] = useState("");
    const [selectedUserGuid, setSelectedUserGuid] = useState("");
    const [updateRole, setUpdateRole] = useState("");
    const [updateOrg, setUpdateOrg] = useState("");
    const [selectedRoles, setSelectedRoles] = useState("");

    const token = sessionStorage.getItem("access_token");

    useEffect(() => {
        (async () => {
            const result = await ApiCallUsers(token);
            setUsers(result.data.items);
        })();
    }, [token]);

    // useEffect(() => {
    //     (async () => {
    //         const result = await ApiCallRoles(token);
    //         setRoles(result.data.items);
    //     })();
    // }, [token]);

    useEffect(() => {
        (async () => {
            const result = await ApiCallOrganizations(token);
            setOrganizations(result.data.items);
        })();
    }, [token]);

    const handleChange = event => {
        setSelectOrg(event.target.value);
    };

    const handleUpdateRole = event => {
        setSelectedRoles(event.target.value);
        console.log(event.target.value);
    };
    const handleChangeRole = event => {
        setUpdateRole(event.target.value);
    };
    const handleChangeOrg = event => {
        setUpdateOrg(event.target.value);
    };
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpenEdit = (
        userguid,
        organization,
        guid,
        role,
        roleGuid,
        name,
        email,
        phone
    ) => {
        setSelectedUserGuid(userguid);
        setSelectedOrganization(organization);
        setSelectedOrgGuid(guid);
        setSelectedRole(role);
        setSelectedRoleGuid(roleGuid);
        setSelectedName(name);
        setSelectedEmail(email);
        setSelectedPhone(phone);
        setOpenEdit(true);
        setSelectRole(roleGuid);
        console.log(roleGuid);
    };
    const handleCloseEdit = () => setOpenEdit(false);
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };
    const addUser = async () => {
        const name = nameRef.current.value;
        const password = passwordRef.current.value;
        const email = emailRef.current.value;
        const phone = phoneRef.current.value;

        if (name === "" || password === "" || email === "" || phone === "") {
            handleClose();
            setSnackbarSeverity("error");
            setSnackbarMessage("need to fill name, township and state");
            setSnackbarOpen(true);
            return;
        }

        // Make the API call to add the organization
        const result = await ApiCallCreateUser(
            token,
            selectOrg,
            updateRole,
            name,
            password,
            email,
            phone
        );

        // Fetch the updated list of organizations
        const updatedUsers = await ApiCallUsers(token);

        // Set the updated Clinics list
        setUsers(updatedUsers.data.items);

        // Close the modal
        handleClose();

        // Show a success message
        setSnackbarSeverity("success");
        setSnackbarMessage("User added successfully");
        setSnackbarOpen(true);
    };

    const updateUser = async () => {
        const name = nameEditRef.current.value;
        const email = emailEditRef.current.value;
        const phone = phoneEditRef.current.value;
        const password = passwordEditRef.current.value;

        console.log(
            "org",
            selectedOrgGuid,
            "role",
            selectedRoleGuid,
            name,
            password,
            email,
            phone
        );

        if (password === "") {
            handleClose();
            setSnackbarSeverity("error");
            setSnackbarMessage("need to fill new password");
            setSnackbarOpen(true);
            return;
        }

        //Make the API call to add the organization
        const result = await ApiCallUpdateUser(
            token,
            selectedUserGuid,
            selectedOrgGuid,
            selectedRoleGuid,
            name,
            password,
            email,
            phone
        );

        if (result.success === true) {
            // Fetch the updated list of organizations
            const updatedUsers = await ApiCallUsers(token);

            // Set the updated Users list
            setUsers(updatedUsers.data.items);
        }

        // Close the modal
        handleCloseEdit();

        // Show a success message
        setSnackbarSeverity("success");
        setSnackbarMessage("User updated successfully");
        setSnackbarOpen(true);
    };

    const deleteUser = async userGuid => {
        const result = await ApiCallDeleteUser(token, userGuid);
        setUsers(users.filter(user => user.guid !== userGuid));
        setSnackbarSeverity("success");
        setSnackbarMessage("Organization deleted successfully");
        setSnackbarOpen(true);
    };

    console.log(selectedOrgGuid, selectedRoleGuid);

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
                                    User Lists
                                </Typography>
                            </Box>
                            <Box>
                                <Button
                                    variant="contained"
                                    onClick={handleOpen}
                                >
                                    Add New User
                                </Button>
                            </Box>
                        </Box>
                        {/* header  */}

                        {/* User count  */}
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
                                {users.length}
                            </Typography>
                            <Typography sx={{ color: "white" }}>
                                Total Number of Users
                            </Typography>
                        </Box>
                        {/* User count  */}

                        {/* User list  */}
                        <Box>
                            {users.map(user => {
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
                                        key={user.guid}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                            }}
                                        >
                                            <PersonIcon />
                                            <Box>
                                                <Typography sx={{ ml: 2 }}>
                                                    Name :{" "}
                                                    <b>{user.username}</b>
                                                </Typography>
                                                <Typography sx={{ ml: 2 }}>
                                                    Organization :{" "}
                                                    <b>
                                                        {user.organizationType}
                                                    </b>
                                                </Typography>
                                                <Typography sx={{ ml: 2 }}>
                                                    Role :{" "}
                                                    <b>{user.roleName}</b>
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box>
                                            <IconButton
                                                aria-label="delete"
                                                color="primary"
                                                onClick={() => {
                                                    handleOpenEdit(
                                                        user.guid,
                                                        user.organizationType,
                                                        user.organizationGuid,
                                                        user.roleName,
                                                        user.roleGuid,
                                                        user.username,
                                                        user.email,
                                                        user.phone
                                                    );
                                                }}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                aria-label="delete"
                                                color="error"
                                                onClick={() => {
                                                    deleteUser(user.guid);
                                                }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                );
                            })}
                        </Box>
                        {/* User list  */}
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
                            Add New User
                        </Typography>
                        <Box sx={{ textAlign: "center" }}>
                            <Box sx={{ my: 2 }}>
                                <FormControl fullWidth sx={{ my: 1 }}>
                                    <InputLabel>Organization</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectOrg}
                                        label="Organization"
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
                                <FormControl fullWidth sx={{ my: 1 }}>
                                    <InputLabel id="demo-simple-select-label">
                                        Role
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={updateRole}
                                        label="Role"
                                        onChange={handleChangeRole}
                                    >
                                        {roles.map(org => {
                                            return (
                                                <MenuItem
                                                    value={org.guid}
                                                    key={org.guid}
                                                >
                                                    {org.name}
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
                                    inputRef={nameRef}
                                />
                                <TextField
                                    fullWidth
                                    sx={{ my: 1 }}
                                    id="standard-password-input"
                                    label="Email"
                                    variant="standard"
                                    inputRef={emailRef}
                                />
                                <TextField
                                    fullWidth
                                    sx={{ my: 1 }}
                                    id="standard-password-input"
                                    label="Phone"
                                    variant="standard"
                                    inputRef={phoneRef}
                                />
                                <TextField
                                    fullWidth
                                    sx={{ my: 1 }}
                                    type="password"
                                    id="standard-password-input"
                                    label="Password"
                                    variant="standard"
                                    inputRef={passwordRef}
                                />
                            </Box>
                            <Button
                                sx={{ mt: 3 }}
                                onClick={() => {
                                    addUser();
                                }}
                                disabled={selectOrg === "" || updateRole === ""}
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
                            Add New User
                        </Typography>
                        <Box sx={{ textAlign: "center" }}>
                            <Box sx={{ my: 2 }}>
                                <FormControl fullWidth sx={{ my: 1 }}>
                                    <InputLabel id="demo-simple-select-label">
                                        Organization
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={
                                            updateOrg === ""
                                                ? selectedOrgGuid
                                                : updateOrg
                                        }
                                        label="Organization"
                                        onChange={handleChangeOrg}
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
                                <FormControl fullWidth sx={{ my: 1 }}>
                                    <InputLabel id="demo-simple-select-label">
                                        Role
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        // value={
                                        //     updateRole === ""
                                        //         ? selectRole
                                        //         : updateRole
                                        // }
                                        value={selectedRoleGuid}
                                        label="Role"
                                        onChange={handleUpdateRole}
                                        readOnly
                                    >
                                        {roles.map(org => {
                                            return (
                                                <MenuItem
                                                    value={org.guid}
                                                    key={org.guid}
                                                >
                                                    {org.name}
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
                                    defaultValue={selectedName}
                                />
                                <TextField
                                    fullWidth
                                    sx={{ my: 1 }}
                                    id="standard-password-input"
                                    label="Email"
                                    variant="standard"
                                    inputRef={emailEditRef}
                                    defaultValue={selectedEmail}
                                />
                                <TextField
                                    fullWidth
                                    sx={{ my: 1 }}
                                    id="standard-password-input"
                                    label="Phone"
                                    variant="standard"
                                    inputRef={phoneEditRef}
                                    defaultValue={selectedPhone}
                                />
                                <TextField
                                    type="password"
                                    fullWidth
                                    sx={{ my: 1 }}
                                    id="standard-password-input"
                                    label="Password"
                                    variant="standard"
                                    inputRef={passwordEditRef}
                                />
                            </Box>
                            <Button
                                sx={{ mt: 3 }}
                                onClick={() => {
                                    updateUser();
                                }}
                                disabled={
                                    selectedOrganization === "" ||
                                    selectedRole === ""
                                }
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
