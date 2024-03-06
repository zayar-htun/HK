import React, { useEffect, useState } from "react";
import UserNavBar from "../components/UserNavBar";
import {
    Box,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Snackbar,
    Alert as MuiAlert,
    Link,
    Breadcrumbs,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
    ApiCallDepartmentByUserGuid,
    ApiCallGetAllDepartmentsByAllUser,
    ApiCallSelectDomain,
} from "../apicall";
import { useParams, useNavigate } from "react-router-dom";

export default function SelectDomain() {
    const [domains, setDomains] = useState([]);
    const [domainByUser, setDomainByUser] = useState([]);
    const [domainByAllUser, setDomainByAllUser] = useState([]);
    const [otherDomains, setotherDomains] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [loading, setLoading] = useState(true);
    const [loadingFirst, setLoadingFirst] = useState(true);
    const token = sessionStorage.getItem("access_token");
    const userGuid = sessionStorage.getItem("user_guid");
    const clinicGuid = sessionStorage.getItem("clinicGuid");
    const roleName = sessionStorage.getItem("roleName");
    const clinicName = sessionStorage.getItem("clinicName");
    const { guid } = useParams();
    const navigate = useNavigate();

    // useEffect(() => {
    //     (async () => {
    //         const result = await ApiCallDepartmentByUserGuid(
    //             token,
    //             userGuid,
    //             clinicGuid
    //         );
    //         setDomainByUser(result.data.items);
    //     })();
    // }, [token, userGuid, clinicGuid]);

    useEffect(() => {
        (async () => {
            const result = await ApiCallSelectDomain(token, clinicGuid);
            setDomains(result.data.items);
            // console.log(result.data.items);
        })();
    }, [token, clinicGuid]);

    useEffect(() => {
        (async () => {
            const result = await ApiCallGetAllDepartmentsByAllUser(
                token,
                clinicGuid
            );
            if (result.success === true) {
                setDomainByAllUser(result.data.items);
                setLoadingFirst(false);
            }
        })();
    }, [token, clinicGuid]);

    useEffect(() => {
        // Check if both domainByUser and domains have data
        if (
            !loadingFirst &&
            (domainByAllUser.length > 0 || domains.length > 0)
        ) {
            const updatedOtherDomains = domains.filter(dom => {
                // Filter out domains that have a matching guid in domainByUser
                return !domainByAllUser.some(
                    dbu => dbu.departmentGuid === dom.guid
                );
            });

            setotherDomains(updatedOtherDomains);
            if (updatedOtherDomains.length !== 0) {
                setLoading(false);
            }
            // console.log("otherdomain", updatedOtherDomains);
            // console.log("alldomain", domains);
            // console.log("alluserdomain", domainByAllUser);
        }
    }, [loadingFirst, domainByAllUser, domains]);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };
    return (
        <>
            <UserNavBar />
            <Box>
                <Box>
                    <Box sx={{ my: 4, mx: 8 }}>
                        {clinicName && clinicName !== "" && (
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link
                                    underline="hover"
                                    color="inherit"
                                    href={`/viewaddeddomain`}
                                >
                                    Domain Dashboard
                                </Link>
                                <Link
                                    underline="hover"
                                    color="inherit"
                                    href={`/selectdomain/${guid}`}
                                >
                                    {clinicName}
                                </Link>
                                <Link
                                    underline="hover"
                                    color="text.primary"
                                    aria-current="page"
                                >
                                    Select Domain
                                </Link>
                            </Breadcrumbs>
                        )}
                    </Box>
                </Box>
                <Box
                    sx={{
                        width: "551px",
                        margin: "auto",
                        marginTop: "50px",
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "center",
                    }}
                >
                    <Typography
                        sx={{
                            marginBottom: "12px",
                            color: "var(--Text-800, #141414)",
                            textAlign: "center",
                            fontFamily: "Inter",
                            fontSize: "32px",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "32px",
                        }}
                    >
                        Select Domain
                    </Typography>
                    <Typography
                        sx={{
                            mb: "32px",
                            color: "var(--Text-500, #3F3F3F)",
                            textAlign: "center",
                            fontFamily: "Inter",
                            fontSize: "24px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "28px",
                        }}
                    >
                        Select the domain in which you'd like to record data.
                    </Typography>

                    <Box>
                        <List>
                            {domainByAllUser?.map(domain => {
                                return (
                                    <Box key={domain.guid}>
                                        <ListItem
                                            disablePadding
                                            onClick={() => {
                                                setSnackbarOpen(true);
                                                setSnackbarSeverity("error");
                                                setSnackbarMessage(
                                                    "This domain is already filled !!!"
                                                );
                                            }}
                                        >
                                            <ListItemButton>
                                                <ListItemText
                                                    sx={{
                                                        // Customize the CSS for ListItemText
                                                        "& .MuiListItemText-primary":
                                                            {
                                                                color: "var(--Text-800, #141414)",
                                                                fontFamily:
                                                                    "Inter",
                                                                fontSize:
                                                                    "24px",
                                                                fontStyle:
                                                                    "normal",
                                                                fontWeight: 500,
                                                                lineHeight:
                                                                    "32px",
                                                            },
                                                    }}
                                                    primary={
                                                        domain.departmentName
                                                    }
                                                    secondary="already filled"
                                                />
                                                <ListItemIcon>
                                                    <ArrowForwardIosIcon />
                                                </ListItemIcon>
                                            </ListItemButton>
                                        </ListItem>
                                        <Divider />
                                    </Box>
                                );
                            })}

                            {!loading && (
                                <Box>
                                    {otherDomains?.map(domain => {
                                        return (
                                            <Box key={domain.guid}>
                                                <ListItem
                                                    disablePadding
                                                    onClick={() => {
                                                        sessionStorage.setItem(
                                                            "domainName",
                                                            domain.departmentName
                                                        );
                                                        navigate(
                                                            `/addnewrecord/${guid}/${domain.guid}`
                                                        );
                                                    }}
                                                >
                                                    <ListItemButton>
                                                        <ListItemText
                                                            sx={{
                                                                // Customize the CSS for ListItemText
                                                                "& .MuiListItemText-primary":
                                                                    {
                                                                        color: "var(--Text-800, #141414)",
                                                                        fontFamily:
                                                                            "Inter",
                                                                        fontSize:
                                                                            "24px",
                                                                        fontStyle:
                                                                            "normal",
                                                                        fontWeight: 500,
                                                                        lineHeight:
                                                                            "32px",
                                                                    },
                                                            }}
                                                            primary={
                                                                domain.departmentName
                                                            }
                                                        />
                                                        <ListItemIcon>
                                                            <ArrowForwardIosIcon />
                                                        </ListItemIcon>
                                                    </ListItemButton>
                                                </ListItem>
                                                <Divider />
                                            </Box>
                                        );
                                    })}
                                </Box>
                            )}
                        </List>
                    </Box>
                </Box>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={2000}
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
