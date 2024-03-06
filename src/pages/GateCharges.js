import React, { useState } from "react";
import NavBar from "../components/NavBar";
import {
    Avatar,
    Box,
    Button,
    ButtonGroup,
    Card,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    IconButton,
    Input,
    InputAdornment,
    InputBase,
    InputLabel,
    Paper,
    Step,
    StepLabel,
    Stepper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from "@mui/material";
import SideNav from "../components/SideNav";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import CloseIcon from "@mui/icons-material/Close";

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function GateCharges() {
    const [showSecondGrid, setShowSecondGrid] = useState(false);

    const handleArrowClick = () => {
        setShowSecondGrid(true);
    };

    const handleHelloButtonClick = () => {
        setShowSecondGrid(false);
    };
    return (
        <>
            <NavBar />
            <Box height={28} />
            <Box sx={{ display: "flex" }}>
                <SideNav />
                <Box component="main" sx={{ flexGrow: 1, py: 3, m: 3 }}>
                    <Card sx={{ p: 2 }}>
                        {/* Header */}
                        <Box>
                            <Typography variant="h5">Gate Charges</Typography>
                            <Typography>
                                The list of ways which will be delivered or are
                                being delivered to the recipients
                            </Typography>
                        </Box>

                        {/* searchbar & filter  */}
                        <Box sx={{ marginTop: "20px" }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Box>
                                    <Paper
                                        component="form"
                                        sx={{
                                            p: "2px 4px",
                                            display: "flex",
                                            alignItems: "center",
                                            width: 500,
                                        }}
                                    >
                                        <InputBase
                                            sx={{ ml: 1, flex: 1 }}
                                            placeholder="Search e.g. Way ID, Merchant ID, Merchant Name"
                                            inputProps={{
                                                "aria-label":
                                                    "Search e.g. Way ID, Merchant ID, Merchant Name",
                                            }}
                                        />
                                        <IconButton
                                            type="button"
                                            sx={{ p: "10px" }}
                                            aria-label="search"
                                        >
                                            <SearchIcon />
                                        </IconButton>
                                        <Divider
                                            sx={{ height: 28, m: 0.5 }}
                                            orientation="vertical"
                                        />
                                        <IconButton
                                            color="primary"
                                            sx={{ p: "10px" }}
                                            aria-label="directions"
                                        >
                                            <TuneIcon />
                                        </IconButton>
                                    </Paper>
                                </Box>
                                <Box>
                                    <ButtonGroup
                                        variant="outlined"
                                        aria-label="outlined button group"
                                    >
                                        <Button sx={{ color: "text.color" }}>
                                            Retry
                                        </Button>
                                        <Button sx={{ color: "text.color" }}>
                                            Return
                                        </Button>
                                        <Button sx={{ color: "text.color" }}>
                                            Returned
                                        </Button>
                                    </ButtonGroup>
                                </Box>
                            </Box>
                        </Box>

                        {/* date time filter */}
                        <Box sx={{ display: "flex" }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mr: 8,
                                }}
                            >
                                <Typography sx={{ fontWeight: "bold" }}>
                                    Start Date :
                                </Typography>
                                <FormControl
                                    sx={{ m: 1, width: "25ch" }}
                                    variant="standard"
                                >
                                    <Input
                                        id="standard-adornment-password"
                                        type="date"
                                    />
                                </FormControl>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography sx={{ fontWeight: "bold" }}>
                                    End Date :
                                </Typography>
                                <FormControl
                                    sx={{ m: 1, width: "25ch" }}
                                    variant="standard"
                                >
                                    <Input
                                        id="standard-adornment-password"
                                        type="date"
                                    />
                                </FormControl>
                            </Box>
                        </Box>

                        {/* check box filter  */}
                        <Box>
                            <Box sx={{ display: "flex", mt: 2 }}>
                                <Card sx={{ p: 2, marginRight: 2 }}>
                                    <Box sx={{ display: "flex" }}>
                                        <FormControlLabel
                                            control={<Checkbox />}
                                        />
                                        <Box>
                                            <Typography
                                                sx={{ fontWeight: "bold" }}
                                            >
                                                803
                                            </Typography>
                                            <Typography
                                                sx={{ color: "inherit" }}
                                            >
                                                Total Way
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Card>
                                <Card sx={{ p: 2, marginRight: 2 }}>
                                    <Box sx={{ display: "flex" }}>
                                        <FormControlLabel
                                            control={<Checkbox />}
                                        />
                                        <Box>
                                            <Typography
                                                sx={{ fontWeight: "bold" }}
                                            >
                                                67
                                            </Typography>
                                            <Typography
                                                sx={{ color: "inherit" }}
                                            >
                                                To Assign
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Card>
                                <Card sx={{ p: 2, marginRight: 2 }}>
                                    <Box sx={{ display: "flex" }}>
                                        <FormControlLabel
                                            control={<Checkbox />}
                                        />
                                        <Box>
                                            <Typography
                                                sx={{ fontWeight: "bold" }}
                                            >
                                                3
                                            </Typography>
                                            <Typography
                                                sx={{ color: "inherit" }}
                                            >
                                                Assigned
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Card>
                                <Card sx={{ p: 2, marginRight: 2 }}>
                                    <Box sx={{ display: "flex" }}>
                                        <FormControlLabel
                                            control={<Checkbox />}
                                        />
                                        <Box>
                                            <Typography
                                                sx={{ fontWeight: "bold" }}
                                            >
                                                8
                                            </Typography>
                                            <Typography
                                                sx={{ color: "inherit" }}
                                            >
                                                On Way
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Card>
                            </Box>
                        </Box>

                        {/* assign button */}
                        <Box sx={{ my: 2 }}>
                            <Button variant="contained" sx={{ mr: 2 }}>
                                Assigned to Delivery Man
                            </Button>
                            <Button variant="contained" sx={{ mr: 2 }}>
                                Way Out
                            </Button>
                            <Button variant="contained" sx={{ mr: 2 }}>
                                Change Delivery Man
                            </Button>
                            <Button variant="contained" sx={{ mr: 2 }}>
                                Date Change
                            </Button>
                            <Button variant="contained" sx={{ mr: 2 }}>
                                Complete Now
                            </Button>
                            <Button variant="contained" sx={{ mr: 2 }}>
                                Contained
                            </Button>
                            <Button variant="contained" sx={{ mr: 2 }}>
                                Contained
                            </Button>
                        </Box>

                        {/* table list */}
                        <Box>
                            <Grid
                                container
                                rowSpacing={1}
                                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                            >
                                {/* gate cha list */}
                                <Grid item xs={showSecondGrid ? 6 : 12}>
                                    <Box>
                                        <Card>
                                            <TableContainer component={Paper}>
                                                <Table
                                                    sx={{ minWidth: 650 }}
                                                    aria-label="simple table"
                                                >
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell padding="checkbox">
                                                                <Checkbox color="primary" />
                                                            </TableCell>
                                                            <TableCell></TableCell>
                                                            <TableCell>
                                                                Dessert (100g
                                                                serving)
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                Calories
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                Fat&nbsp;(g)
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                Carbs&nbsp;(g)
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                Protein&nbsp;(g)
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {rows.map(row => (
                                                            <TableRow
                                                                key={row.name}
                                                                sx={{
                                                                    "&:last-child td, &:last-child th":
                                                                        {
                                                                            border: 0,
                                                                        },
                                                                }}
                                                            >
                                                                <TableCell padding="checkbox">
                                                                    <Checkbox color="primary" />
                                                                </TableCell>
                                                                <TableCell padding="checkbox">
                                                                    <IconButton
                                                                        aria-label="delete"
                                                                        onClick={
                                                                            handleArrowClick
                                                                        }
                                                                    >
                                                                        <ArrowRightAltIcon />
                                                                    </IconButton>
                                                                </TableCell>
                                                                <TableCell
                                                                    component="th"
                                                                    scope="row"
                                                                >
                                                                    {row.name}
                                                                </TableCell>
                                                                <TableCell align="right">
                                                                    {
                                                                        row.calories
                                                                    }
                                                                </TableCell>
                                                                <TableCell align="right">
                                                                    {row.fat}
                                                                </TableCell>
                                                                <TableCell align="right">
                                                                    {row.carbs}
                                                                </TableCell>
                                                                <TableCell align="right">
                                                                    {
                                                                        row.protein
                                                                    }
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                            <TablePagination
                                                rowsPerPageOptions={[5, 10, 25]}
                                                component="div"
                                                count={rows.length}
                                            />
                                        </Card>
                                    </Box>
                                </Grid>

                                {/* gate cha list detail */}
                                <Grid item xs={6}>
                                    {showSecondGrid && (
                                        <Card sx={{mt:2}}>
                                            <Box
                                                sx={{
                                                    width: "100%",
                                                    p: 2,
                                                }}
                                            >
                                                <IconButton
                                                    onClick={
                                                        handleHelloButtonClick
                                                    }
                                                >
                                                    <CloseIcon />
                                                </IconButton>
                                                <Box>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            justifyContent:
                                                                "space-between",
                                                            alignItems:
                                                                "center",
                                                        }}
                                                    >
                                                        <Box>
                                                            <Typography variant="subtitle1">
                                                                Way ID
                                                            </Typography>
                                                            <Typography variant="h6">
                                                                #12346789
                                                            </Typography>
                                                        </Box>
                                                        <Box>
                                                            <Typography variant="subtitle1">
                                                                Total Charges
                                                            </Typography>
                                                            <Typography variant="h6">
                                                                <span
                                                                    style={{
                                                                        fontWeight:
                                                                            "bold",
                                                                    }}
                                                                >
                                                                    500
                                                                </span>{" "}
                                                                MMK
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                    <Box>
                                                        <Card>
                                                            <Box sx={{ m: 2 }}>
                                                                <Typography variant="subtitle1">
                                                                    Gate
                                                                    Delivery
                                                                </Typography>
                                                                <Typography variant="h5">
                                                                    High Way
                                                                    Gate Name -{" "}
                                                                </Typography>
                                                            </Box>
                                                            <Divider
                                                                sx={{ m: 2 }}
                                                            />

                                                            {/* Parcel Status */}
                                                            <Box sx={{ m: 2 }}>
                                                                <Typography
                                                                    variant="h6"
                                                                    sx={{
                                                                        fontWeight:
                                                                            "bold",
                                                                    }}
                                                                >
                                                                    Parcel
                                                                    Status
                                                                </Typography>
                                                                <Box
                                                                    sx={{
                                                                        width: "100%",
                                                                        m: 2,
                                                                    }}
                                                                >
                                                                    <Stepper
                                                                        activeStep={
                                                                            1
                                                                        }
                                                                        alternativeLabel
                                                                    >
                                                                        <Step>
                                                                            <StepLabel>
                                                                                <Typography>
                                                                                    Drafts{" "}
                                                                                </Typography>
                                                                                <Typography
                                                                                    sx={{
                                                                                        fontSize:
                                                                                            "12px",
                                                                                        color: "inherit",
                                                                                    }}
                                                                                >
                                                                                    16/10/2023
                                                                                    12:00PM
                                                                                </Typography>
                                                                            </StepLabel>
                                                                        </Step>
                                                                        <Step>
                                                                            <StepLabel>
                                                                                <Typography>
                                                                                    Pick
                                                                                    Up{" "}
                                                                                </Typography>
                                                                                <Typography
                                                                                    sx={{
                                                                                        fontSize:
                                                                                            "12px",
                                                                                        color: "inherit",
                                                                                    }}
                                                                                >
                                                                                    16/10/2023
                                                                                    12:00PM
                                                                                </Typography>
                                                                            </StepLabel>
                                                                        </Step>
                                                                        <Step>
                                                                            <StepLabel>
                                                                                <Typography>
                                                                                    On
                                                                                    Way{" "}
                                                                                </Typography>
                                                                                <Typography
                                                                                    sx={{
                                                                                        fontSize:
                                                                                            "12px",
                                                                                        color: "inherit",
                                                                                    }}
                                                                                >
                                                                                    16/10/2023
                                                                                    12:00PM
                                                                                </Typography>
                                                                            </StepLabel>
                                                                        </Step>
                                                                        <Step>
                                                                            <StepLabel>
                                                                                <Typography>
                                                                                    Delivered{" "}
                                                                                </Typography>
                                                                            </StepLabel>
                                                                        </Step>
                                                                        <Step>
                                                                            <StepLabel>
                                                                                <Typography>
                                                                                    Complete{" "}
                                                                                </Typography>
                                                                            </StepLabel>
                                                                        </Step>
                                                                    </Stepper>
                                                                </Box>
                                                            </Box>

                                                            {/* Pickup Information */}
                                                            <Divider
                                                                sx={{ m: 2 }}
                                                            />
                                                            <Box sx={{ m: 2 }}>
                                                                <Typography
                                                                    variant="h6"
                                                                    sx={{
                                                                        fontWeight:
                                                                            "bold",
                                                                    }}
                                                                >
                                                                    PickUp
                                                                    Information
                                                                </Typography>
                                                                <Box
                                                                    sx={{
                                                                        mt: 1,
                                                                        display:
                                                                            "flex",
                                                                        alignItems:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    <Avatar
                                                                        alt="Remy Sharp"
                                                                        src="/static/images/avatar/1.jpg"
                                                                        sx={{
                                                                            width: 56,
                                                                            height: 56,
                                                                            mr: 2,
                                                                        }}
                                                                    />
                                                                    <Box>
                                                                        <Typography>
                                                                            Merchant
                                                                            Name
                                                                        </Typography>
                                                                        <Typography>
                                                                            +959
                                                                            73927289
                                                                            /
                                                                            Full
                                                                            Address
                                                                        </Typography>
                                                                    </Box>
                                                                </Box>
                                                                <Box
                                                                    sx={{
                                                                        m: 2,
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        sx={{
                                                                            fontSize:
                                                                                "15px",
                                                                            color: "inherit",
                                                                        }}
                                                                    >
                                                                        Pick Up
                                                                        Date
                                                                    </Typography>
                                                                    <Typography>
                                                                        12/12/2023
                                                                    </Typography>
                                                                </Box>
                                                                <Box
                                                                    sx={{
                                                                        m: 2,
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        sx={{
                                                                            fontSize:
                                                                                "15px",
                                                                            color: "inherit",
                                                                        }}
                                                                    >
                                                                        Remark
                                                                    </Typography>
                                                                    <Typography>
                                                                        Lorem
                                                                        Lorem
                                                                        Lorem
                                                                        Lorem
                                                                        Lorem
                                                                        Lorem
                                                                        Lorem
                                                                        Lorem
                                                                        Lorem
                                                                        Lorem
                                                                        Lorem
                                                                        Lorem
                                                                        Lorem
                                                                        Lorem
                                                                        Lorem
                                                                        Lorem
                                                                        Lorem
                                                                        Lorem
                                                                        Lorem
                                                                        Lorem
                                                                        Lorem
                                                                        Lorem
                                                                        Lorem
                                                                        Lorem
                                                                        Lorem
                                                                        Lorem
                                                                    </Typography>
                                                                </Box>
                                                            </Box>

                                                            {/* Customer Information */}
                                                            <Divider
                                                                sx={{ m: 2 }}
                                                            />
                                                            <Box sx={{ m: 2 }}>
                                                                <Typography
                                                                    variant="h6"
                                                                    sx={{
                                                                        fontWeight:
                                                                            "bold",
                                                                    }}
                                                                >
                                                                    Customer
                                                                    Information
                                                                </Typography>
                                                                <Box
                                                                    sx={{
                                                                        mt: 1,
                                                                        display:
                                                                            "flex",
                                                                        alignItems:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    <Avatar
                                                                        alt="Remy Sharp"
                                                                        src="/static/images/avatar/1.jpg"
                                                                        sx={{
                                                                            width: 56,
                                                                            height: 56,
                                                                            mr: 2,
                                                                        }}
                                                                    />
                                                                    <Box>
                                                                        <Typography>
                                                                            Merchant
                                                                            Name
                                                                        </Typography>
                                                                        <Typography>
                                                                            +959
                                                                            73927289
                                                                            /
                                                                            Full
                                                                            Address
                                                                        </Typography>
                                                                    </Box>
                                                                </Box>
                                                                <Typography
                                                                    sx={{
                                                                        fontSize:
                                                                            "15px",
                                                                        color: "inherit",
                                                                        mt:2
                                                                    }}
                                                                >
                                                                    Remark
                                                                </Typography>
                                                                <Typography>
                                                                    Lorem Lorem
                                                                    Lorem Lorem
                                                                    Lorem Lorem
                                                                    Lorem Lorem
                                                                    Lorem Lorem
                                                                    Lorem Lorem
                                                                    Lorem Lorem
                                                                    Lorem Lorem
                                                                    Lorem Lorem
                                                                    Lorem Lorem
                                                                    Lorem Lorem
                                                                    Lorem Lorem
                                                                    Lorem Lorem
                                                                </Typography>
                                                            </Box>
                                                        </Card>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Card>
                                    )}
                                </Grid>
                            </Grid>
                        </Box>
                    </Card>
                </Box>
            </Box>
        </>
    );
}
