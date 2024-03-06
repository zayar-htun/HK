import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppStore } from "../appStore";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import DomainIcon from "@mui/icons-material/Domain";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';

const drawerWidth = 240;

const openedMixin = theme => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = theme => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: prop => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

export default function SideNav() {
    const theme = useTheme();
    // const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const updateOpen = useAppStore(state => state.updateOpen);
    const open = useAppStore(state => state.dopen);

    const [openList, setOpenList] = React.useState(true);
    const [openListUser, setOpenListUser] = React.useState(true);
    const [openListSetting, setOpenListSetting] = React.useState(true);
    const [selectedItem, setSelectedItem] = React.useState("");
    const location = useLocation();

    const handleClick = () => {
        setOpenList(!openList);
    };
    const handleClickUser = () => {
        setOpenListUser(!openListUser);
    };
    const handleClickSetting = () => {
        setOpenListSetting(!openListSetting);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <Box height={30} />
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton>
                        {theme.direction === "rtl" ? (
                            <ChevronRightIcon />
                        ) : (
                            <ChevronLeftIcon />
                        )}
                    </IconButton>
                </DrawerHeader>
                <Divider />

                <List>
                    {/* Dashboard */}
                    {/* <ListItem
                        disablePadding
                        sx={{ display: "block" }}
                        onClick={() => {
                            navigate(`/`);
                        }}
                    >
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? "initial" : "center",
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : "auto",
                                    justifyContent: "center",
                                    color:
                                        location.pathname === "/"
                                            ? "sidebar.selectColor"
                                            : "inherit",
                                }}
                            >
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Dashboard"
                                sx={{
                                    opacity: open ? 1 : 0,
                                    color:
                                        location.pathname === "/"
                                            ? "sidebar.selectColor"
                                            : "inherit",
                                }}
                            />
                        </ListItemButton>
                    </ListItem> */}
                    {/* Dashboard */}

                    <Divider sx={{ mx: 1 }} />

                    {/* Organization */}
                    <ListItem
                        disablePadding
                        sx={{ display: "block" }}
                        onClick={() => {
                            navigate(`/organization`);
                        }}
                    >
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? "initial" : "center",
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : "auto",
                                    justifyContent: "center",
                                    color:
                                        location.pathname === "/organization"
                                            ? "sidebar.selectColor"
                                            : "inherit",
                                }}
                            >
                                <Diversity2Icon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Organization"
                                sx={{
                                    opacity: open ? 1 : 0,
                                    color:
                                        location.pathname === "/organization"
                                            ? "sidebar.selectColor"
                                            : "inherit",
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                    {/* Organization */}

                    <Divider sx={{ mx: 1 }} />

                    {/* Clinic */}
                    <ListItem
                        disablePadding
                        sx={{ display: "block" }}
                        onClick={() => {
                            navigate(`/clinic`);
                        }}
                    >
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? "initial" : "center",
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : "auto",
                                    justifyContent: "center",
                                    color:
                                        location.pathname === "/clinic"
                                            ? "sidebar.selectColor"
                                            : "inherit",
                                }}
                            >
                                <LocalHospitalIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Clinic"
                                sx={{
                                    opacity: open ? 1 : 0,
                                    color:
                                        location.pathname === "/clinic"
                                            ? "sidebar.selectColor"
                                            : "inherit",
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                    {/* Clinic */}

                    <Divider sx={{ mx: 1 }} />

                    {/* Domain */}
                    <ListItem
                        disablePadding
                        sx={{ display: "block" }}
                        onClick={() => {
                            navigate(`/domain`);
                        }}
                    >
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? "initial" : "center",
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : "auto",
                                    justifyContent: "center",
                                    color:
                                        location.pathname === "/domain"
                                            ? "sidebar.selectColor"
                                            : "inherit",
                                }}
                            >
                                <DomainIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Domain"
                                sx={{
                                    opacity: open ? 1 : 0,
                                    color:
                                        location.pathname === "/domain"
                                            ? "sidebar.selectColor"
                                            : "inherit",
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                    {/* Domain */}

                    <Divider sx={{ mx: 1 }} />

                    {/* User */}
                    <ListItem
                        disablePadding
                        sx={{ display: "block" }}
                        onClick={() => {
                            navigate(`/user`);
                        }}
                    >
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? "initial" : "center",
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : "auto",
                                    justifyContent: "center",
                                    color:
                                        location.pathname === "/user"
                                            ? "sidebar.selectColor"
                                            : "inherit",
                                }}
                            >
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="User"
                                sx={{
                                    opacity: open ? 1 : 0,
                                    color:
                                        location.pathname === "/user"
                                            ? "sidebar.selectColor"
                                            : "inherit",
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                    {/* User */}

                    <Divider sx={{ mx: 1 }} />

                    {/* Input Field */}
                    <ListItem
                        disablePadding
                        sx={{ display: "block" }}
                        onClick={() => {
                            navigate(`/inputfield`);
                        }}
                    >
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? "initial" : "center",
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : "auto",
                                    justifyContent: "center",
                                    color:
                                        location.pathname === "/inputfield"
                                            ? "sidebar.selectColor"
                                            : "inherit",
                                }}
                            >
                                <QuestionAnswerIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Input Field"
                                sx={{
                                    opacity: open ? 1 : 0,
                                    color:
                                        location.pathname === "/inputfield"
                                            ? "sidebar.selectColor"
                                            : "inherit",
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                    {/* Input Field */}

                    <Divider sx={{ mx: 1 }} />

                    {/* Record */}
                    <ListItem
                        disablePadding
                        sx={{ display: "block" }}
                        onClick={() => {
                            navigate(`/record`);
                        }}
                    >
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? "initial" : "center",
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : "auto",
                                    justifyContent: "center",
                                    color:
                                        location.pathname === "/record"
                                            ? "sidebar.selectColor"
                                            : "inherit",
                                }}
                            >
                                <SpeakerNotesIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Record"
                                sx={{
                                    opacity: open ? 1 : 0,
                                    color:
                                        location.pathname === "/record"
                                            ? "sidebar.selectColor"
                                            : "inherit",
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                    {/* Record */}
                    <Divider sx={{ mx: 1 }} />
                </List>
            </Drawer>
        </Box>
    );
}
