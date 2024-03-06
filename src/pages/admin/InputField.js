import {
    Box,
    Button,
    IconButton,
    Typography,
    Paper,
    InputBase,
    Modal,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Alert as MuiAlert,
    Snackbar,
    Pagination,
    Stack,
    TablePagination,
    PaginationItem,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import SideNav from "../../components/SideNav";
import NavBar from "../../components/NavBar";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import {
    ApiCallAllDomain,
    ApiCallCreateQuestion,
    ApiCallDeleteQuestion,
    ApiCallQuestions,
    ApiCallUpdateQuestion,
} from "../../apicall";

export default function InputField() {
    const searchInput = useRef();
    const token = sessionStorage.getItem("access_token");
    const [open, setOpen] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [selectDomain, setSelectDomain] = useState("");
    const [allDomains, setAllDomains] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [selectDepartmentText, setSelectDepartmentText] = useState("");
    const [selectDepartmentGuid, setSelectDepartmentGuid] = useState("");
    const [listLength, setListLength] = useState(0);
    const [selectQuestion, setSelectQuestion] = useState("");
    const [updateDomain, setUpdateDomain] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleCloseEdit = () => setOpenEdit(false);
    const questionRef = useRef();
    const updatQuestionText = useRef();
    const [questions, setQuestions] = useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpenEdit = (text, departmentGuid, questionGuid) => {
        setSelectDepartmentText(text);
        setSelectDepartmentGuid(departmentGuid);
        setSelectQuestion(questionGuid);
        setOpenEdit(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    useEffect(() => {
        (async () => {
            const searchTerm = searchInput.current.value.trim();
            const result = await ApiCallQuestions(
                token,
                searchTerm,
                page,
                rowsPerPage
            );
            setQuestions(result.data.items);
            setListLength(result.data.totalRecords);
        })();
    }, [token, page, rowsPerPage]);

    useEffect(() => {
        (async () => {
            const result = await ApiCallAllDomain(token);
            setAllDomains(result.data.items);
        })();
    }, [token]);

    const handleSearch = async event => {
        // Prevent the default form submission behavior
        event.preventDefault();

        const searchTerm = searchInput.current.value.trim();

        if (searchTerm) {
            const result = await ApiCallQuestions(
                token,
                searchTerm,
                page,
                rowsPerPage
            );
            setQuestions(result.data.items);
            setListLength(result.data.totalRecords);
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

    const handleChange = event => {
        setSelectDomain(event.target.value);
    };

    const handleChangeUpdate = event => {
        setUpdateDomain(event.target.value);
    };

    const deleteQuestion = async guid => {
        const result = await ApiCallDeleteQuestion(token, guid);
        const searchTerm = searchInput.current.value.trim();
        if (result.success === true) {
            // Fetch the updated list of organizations
            const updatedQuestions = await ApiCallQuestions(
                token,
                searchTerm,
                page,
                rowsPerPage
            );

            // Set the updated Questions list
            setQuestions(updatedQuestions.data.items);
            setListLength(updatedQuestions.data.totalRecords);
        }

        // Show a success message
        setSnackbarSeverity("success");
        setSnackbarMessage("Delete question successfully");
        setSnackbarOpen(true);
    };

    const addQuestion = async () => {
        const text = questionRef.current.value;
        const searchTerm = searchInput.current.value.trim();
        if (text === "") {
            setSnackbarSeverity("error");
            setSnackbarMessage("Please fill questions!!!");
            setSnackbarOpen(true);
            return;
        }

        // Make the API call to add the organization
        const result = await ApiCallCreateQuestion(token, text, selectDomain);

        // Fetch the updated list of organizations
        const updatedQuestions = await ApiCallQuestions(
            token,
            searchTerm,
            page,
            rowsPerPage
        );

        // Set the updated Questions list
        setQuestions(updatedQuestions.data.items);
        setListLength(updatedQuestions.data.totalRecords);

        // Close the modal
        handleClose();

        // Show a success message
        setSnackbarSeverity("success");
        setSnackbarMessage("Organization added successfully");
        setSnackbarOpen(true);
    };

    const updateQuestion = async () => {
        const update = updatQuestionText.current.value;
        const searchTerm = searchInput.current.value.trim();

        // Make the API call to add the organization
        const result = await ApiCallUpdateQuestion(
            token,
            selectQuestion,
            update,
            // updateDomain
            selectDepartmentGuid
        );

        if (result.success === true) {
            // Fetch the updated list of organizations
            const updatedQuestions = await ApiCallQuestions(
                token,
                searchTerm,
                page,
                rowsPerPage
            );

            // Set the updated Questions list
            setQuestions(updatedQuestions.data.items);
            setListLength(updatedQuestions.data.totalRecords);
        }

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
                                    Question Lists
                                </Typography>
                            </Box>
                            <Box>
                                <Button
                                    variant="contained"
                                    onClick={handleOpen}
                                >
                                    Add New Question
                                </Button>
                            </Box>
                        </Box>
                        {/* header  */}

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

                        {/* Question list  */}
                        <Box sx={{ mt: 2 }}>
                            {questions.map(question => {
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
                                        key={question.guid}
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
                                                    {question.questionText}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        ml: 2,
                                                        fontSize: "15px",
                                                        color: "gray",
                                                    }}
                                                >
                                                    Domain Name :{" "}
                                                    <b>
                                                        {
                                                            question.departmentName
                                                        }
                                                    </b>
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box>
                                            <IconButton
                                                aria-label="delete"
                                                color="primary"
                                                onClick={() => {
                                                    handleOpenEdit(
                                                        question.questionText,
                                                        question.departmentGuid,
                                                        question.guid
                                                    );
                                                }}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                aria-label="delete"
                                                color="error"
                                                onClick={() => {
                                                    deleteQuestion(
                                                        question.guid
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
                        {/* Question list  */}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                mt: 2,
                            }}
                        >
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, 75, 200]}
                                component="div"
                                count={listLength}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                            {/* <Stack spacing={2}>
                                <Pagination
                                    
                                    rowsPerPageOptions={[5, 10, 25, 75, 200]}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={
                                        handleChangeRowsPerPage
                                    }
                                />
                            </Stack> */}
                        </Box>
                    </Box>
                </Box>
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
                            // width: 800,
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
                            Add New Question
                        </Typography>
                        <Box sx={{ textAlign: "center" }}>
                            <Box sx={{ my: 2 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">
                                        Domain
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectDomain}
                                        label="Domain"
                                        onChange={handleChange}
                                    >
                                        {allDomains.map(org => {
                                            return (
                                                <MenuItem
                                                    value={org.guid}
                                                    key={org.guid}
                                                >
                                                    {org.departmentName}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                                <TextField
                                    fullWidth
                                    required
                                    id="standard-password-input"
                                    label="Question"
                                    variant="standard"
                                    multiline
                                    rows={4}
                                    inputRef={questionRef}
                                    sx={{ mt: 1 }}
                                />
                            </Box>
                            <Button
                                sx={{ mt: 3 }}
                                onClick={() => {
                                    addQuestion();
                                }}
                                disabled={selectDomain === ""}
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
                            // width: 800,
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
                            Add New Question
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
                                        value={
                                            updateDomain === ""
                                                ? selectDepartmentGuid
                                                : updateDomain
                                        }
                                        label="Age"
                                        // onChange={handleChangeUpdate}
                                        disabled
                                    >
                                        {allDomains.map(org => {
                                            return (
                                                <MenuItem
                                                    value={org.guid}
                                                    key={org.guid}
                                                >
                                                    {org.departmentName}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                                <TextField
                                    fullWidth
                                    required
                                    id="standard-password-input"
                                    label="Question"
                                    variant="standard"
                                    multiline
                                    rows={4}
                                    inputRef={updatQuestionText}
                                    defaultValue={selectDepartmentText}
                                    sx={{ mt: 1 }}
                                />
                            </Box>
                            <Button
                                sx={{ mt: 3 }}
                                onClick={() => {
                                    updateQuestion();
                                }}
                                // disabled={selectOrg === ""}
                            >
                                Update
                            </Button>
                        </Box>
                    </Box>
                </Modal>
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
            </Box>
        </>
    );
}
