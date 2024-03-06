import * as React from "react";
import { styled } from "@mui/system"; // Add this import
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonIcon from "@mui/icons-material/Person";
import { useAppStore } from "../appStore";
import {
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Menu,
} from "@mui/material";
import { themeContext } from "../ThemedDetail";
import { useNavigate } from "react-router-dom";
// import HeaderChangeLanguage from "./HeaderLanguageChange";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const AppBar = styled(
    MuiAppBar,
    {}
)(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
}));

export default function NavBar() {
    const updateOpen = useAppStore(state => state.updateOpen);
    const dopen = useAppStore(state => state.dopen);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const name = sessionStorage.getItem("user_name");
    const email = sessionStorage.getItem("email");
    const phone = sessionStorage.getItem("phone");
    const org = sessionStorage.getItem("organizationType");
    const role = sessionStorage.getItem("roleName");
    const open = Boolean(anchorEl);
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    // const { translate } = React.useContext(themeContext);
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ bgcolor: "#FFFFFF" }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => {
                            updateOpen(!dopen);
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        Admin Dashboard
                    </Typography>

                    <Box>
                        <List>
                            <ListItem
                                style={{ cursor: "pointer" }}
                                onClick={handleClick}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete">
                                        <ExpandMoreIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        <PersonIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={name} />
                            </ListItem>
                        </List>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                "aria-labelledby": "basic-button",
                            }}
                        >
                            <Box sx={{ p: 3, width: "353px" }}>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Name
                                </Typography>
                                <Typography
                                    gutterBottom
                                    variant="h6"
                                    component="div"
                                >
                                    {name}
                                </Typography>
                                <Divider sx={{ my: 2 }} />
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    E-mail
                                </Typography>
                                <Typography
                                    gutterBottom
                                    variant="h6"
                                    component="div"
                                >
                                    {email}
                                </Typography>
                                <Divider sx={{ my: 2 }} />
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Phone
                                </Typography>
                                <Typography
                                    gutterBottom
                                    variant="h6"
                                    component="div"
                                >
                                    {phone}
                                </Typography>
                                <Divider sx={{ my: 2 }} />
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Organization
                                </Typography>
                                <Typography
                                    gutterBottom
                                    variant="h6"
                                    component="div"
                                >
                                    {org}
                                </Typography>
                                <Divider sx={{ my: 2 }} />
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Role
                                </Typography>
                                <Typography
                                    gutterBottom
                                    variant="h6"
                                    component="div"
                                >
                                    {role}
                                </Typography>
                                {role === "Administrator" && (
                                    <Button
                                        fullWidth
                                        variant="text"
                                        onClick={() => {
                                            navigate(`/userhome`);
                                        }}
                                    >
                                        Go to User Home 
                                    </Button>
                                )}

                                <Button
                                    fullWidth
                                    variant="text"
                                    startIcon={<LogoutIcon />}
                                    onClick={() => {
                                        sessionStorage.clear();
                                        navigate(`/login`);
                                    }}
                                >
                                    Logout
                                </Button>
                            </Box>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
