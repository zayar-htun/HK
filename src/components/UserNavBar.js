import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonIcon from "@mui/icons-material/Person";
import {
    Avatar,
    Card,
    CardActions,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Menu,
    MenuItem,
    useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function UserNavBar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const name = sessionStorage.getItem("user_name");
    const email = sessionStorage.getItem("email");
    const phone = sessionStorage.getItem("phone");
    const org = sessionStorage.getItem("organizationType");
    const role = sessionStorage.getItem("roleName");
    const navigate = useNavigate();
    const theme = useTheme();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ bgcolor: "#FFFFFF" }}>
                <Toolbar>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                            ml: {
                                xs: "20px",
                                md: "100px",
                                lg: "140px",
                            },
                        }}
                        onClick={() => {
                            navigate(`/userhome`);
                        }}
                    >
                        <img
                            src="/hk.png"
                            alt=""
                            style={{
                                width: "56px",
                                height: "48px",
                                marginRight: "8px",
                            }}
                        />
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                color: "#000",
                                textAlign: "center",
                                fontFamily: "Inter",
                                fontSize: "32px",
                                fontStyle: "normal",
                                fontWeight: 700,
                                lineHeight: "24px",
                            }}
                        >
                            HK
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            mr: {
                                xs: "20px",
                                md: "100px",
                                lg: "140px",
                            },
                        }}
                    >
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
                                {role === "Customer" ? (
                                    <Typography
                                        gutterBottom
                                        variant="h6"
                                        component="div"
                                    >
                                        User
                                    </Typography>
                                ) : (
                                    <Typography
                                        gutterBottom
                                        variant="h6"
                                        component="div"
                                    >
                                        Admin
                                    </Typography>
                                )}
                                <Typography
                                    gutterBottom
                                    variant="h6"
                                    component="div"
                                ></Typography>
                                {role === "Administrator" && (
                                    <Button
                                        fullWidth
                                        variant="text"
                                        onClick={() => {
                                            navigate(`/organization`);
                                        }}
                                    >
                                        Go to Dashboard
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
