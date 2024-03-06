import React, { useEffect, useState } from "react";
import UserNavBar from "../components/UserNavBar";
import {
    Box,
    Button,
    Divider,
    List,
    ListItem,
    MenuItem,
    IconButton,
    Modal,
    TextField,
    Typography,
} from "@mui/material";
import {
    ApiCallGetAllClinicByAllUserAnswer,
    ApiCallGetUserInfo,
    ApiCallOldUser,
    ApiCallSelectClinic,
} from "../apicall";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

export default function UserHome() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const listItemHeight = 72; // Adjust this value based on your ListItem height
    const visibleItems = 3;
    const [clinics, setClinics] = useState([]);
    const token = sessionStorage.getItem("access_token");
    const userGuid = sessionStorage.getItem("user_guid");
    const orgGuid = sessionStorage.getItem("organizationGuid");
    const userName = sessionStorage.getItem("user_name");
    const [clinicGuid, setClinicGuid] = useState("");
    const [clinicName, setClinicName] = useState("");
    const [clinicTownship, setClinicTownship] = useState("");
    const [clinicState, setClinicState] = useState("");
    const [orgguid, setOrgguid] = useState("");
    const [oldUserClinics, setOldUserClinics] = useState([]);
    const [allUserClinics, setAllUserClinics] = useState([]);
    const [otherClinic, setOtherClinic] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingAll, setLoadingAll] = useState(true);
    const [loadingOther, setLoadingOther] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const resultInfo = await ApiCallGetUserInfo(token);
            setOrgguid(resultInfo.data.organizationGuid);
        })();
    }, [token]);

    useEffect(() => {
        (async () => {
            const result = await ApiCallSelectClinic(token, orgguid);
            setClinics(result.data.items);
        })();
    }, [token, orgguid]);

    useEffect(() => {
        if (userGuid) {
            (async () => {
                const result = await ApiCallOldUser(token, userGuid);
                if (result.success === true) {
                    setOldUserClinics(result.data.items);
                    // console.log(result.data.items);
                }
                setLoading(false);
            })();
        }
    }, [token, userGuid]);

    useEffect(() => {
        if (orgGuid) {
            (async () => {
                const result = await ApiCallGetAllClinicByAllUserAnswer(
                    token,
                    orgGuid
                );
                if (result.success === true) {
                    setAllUserClinics(result.data.items);
                    // console.log("all user clinics", result.data.items);
                }
                setLoadingAll(false);
            })();
        }
    }, [token, orgGuid]);

    useEffect(() => {
        // Check if both domainByUser and domains have data
        if (oldUserClinics.length > 0 || allUserClinics.length > 0) {
            const updateClinics = allUserClinics.filter(dom => {
                // Filter out domains that have a matching guid in domainByUser
                return !oldUserClinics.some(
                    dbu => dbu.clinicGuid === dom.clinicGuid
                );
            });

            setOtherClinic(updateClinics);
            if (updateClinics.length !== 0) {
                setLoadingOther(false);
            }
            // console.log("other clinic", updateClinics);
        }
    }, [oldUserClinics, allUserClinics]);

    const handleListItemClick = (
        clinicGuid,
        clinicName,
        clinicTownship,
        clinicState
    ) => {
        setClinicGuid(clinicGuid);
        setClinicName(clinicName);
        setClinicTownship(clinicTownship);
        setClinicState(clinicState);
        sessionStorage.setItem("clinicGuid", clinicGuid);
    };

    return (
        <>
            <UserNavBar />

            {!loading && !loadingAll && !loadingOther && (
                <Box>
                    {oldUserClinics?.length !== 0 && (
                        <Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    my: 4,
                                    alignItems: "center",
                                }}
                            >
                                <Box
                                    sx={{
                                        fontFamily: "Inter",
                                        fontSize: "20px",
                                        fontStyle: "normal",
                                        fontWeight: "bold",
                                        lineHeight: "20px",
                                        ml: {
                                            xs: "30px",
                                            md: "110px",
                                            lg: "150px",
                                        },
                                    }}
                                >
                                    Dashboard
                                </Box>
                                <Box>
                                    <Button
                                        variant="contained"
                                        onClick={handleOpen}
                                        sx={{
                                            color: "white",
                                            mr: {
                                                xs: "30px",
                                                md: "110px",
                                                lg: "150px",
                                            },
                                        }}
                                    >
                                        Add New Clinic
                                    </Button>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    bgcolor: "var(--Primary-500, #EC7800)",
                                    py: "32px",
                                    px: "24px",
                                    mr: {
                                        xs: "30px",
                                        md: "110px",
                                        lg: "150px",
                                    },
                                    ml: {
                                        xs: "30px",
                                        md: "110px",
                                        lg: "150px",
                                    },
                                    my: 2,
                                    borderRadius: "12px",
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: "var(--Text-50, #FFF)",
                                        fontFamily: "Inter",
                                        fontSize: "32px",
                                        fontStyle: "normal",
                                        fontWeight: 600,
                                        lineHeight: "32px",
                                        mb: "12px",
                                    }}
                                >
                                    {oldUserClinics.length + otherClinic.length}
                                </Typography>
                                <Typography
                                    sx={{
                                        color: "var(--Text-50, #FFF)",
                                        fontFamily: "Inter",
                                        fontSize: "20px",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        lineHeight: "20px",
                                        mb: "8px",
                                    }}
                                >
                                    Total number of recently added clinics
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    mr: {
                                        xs: "30px",
                                        md: "110px",
                                        lg: "150px",
                                    },
                                    ml: {
                                        xs: "30px",
                                        md: "110px",
                                        lg: "150px",
                                    },
                                    my: 2,
                                }}
                            >
                                {oldUserClinics?.map(oldUser => {
                                    return (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                bgcolor: "#FBFBFB",
                                                px: "16px",
                                                py: "24px",
                                                mt: 3,
                                                borderRadius: "10px",
                                                cursor: "pointer",
                                            }}
                                            key={oldUser.clinicGuid}
                                            onClick={() => {
                                                navigate(`/viewaddeddomain`);
                                                sessionStorage.setItem(
                                                    "clinicName",
                                                    oldUser.clinicName
                                                );
                                                sessionStorage.setItem(
                                                    "clinicTownship",
                                                    oldUser.township
                                                );
                                                sessionStorage.setItem(
                                                    "clinicState",
                                                    oldUser.state
                                                );
                                                sessionStorage.setItem(
                                                    "clinicGuid",
                                                    oldUser.clinicGuid
                                                );
                                            }}
                                        >
                                            <Box>
                                                <Typography variant="h5">
                                                    <b>{oldUser.clinicName}</b>{" "}
                                                    <span
                                                        style={{
                                                            color: "#888888",
                                                            fontStyle: "italic",
                                                            fontSize: "20px",
                                                        }}
                                                    >
                                                        (clinic added by{" "}
                                                        {userName})
                                                    </span>
                                                </Typography>
                                                <Typography
                                                    variant="h7"
                                                    sx={{ mt: 1.5 }}
                                                >
                                                    {oldUser.township},{" "}
                                                    {oldUser.state}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    );
                                })}
                                {!loadingOther && (
                                    <Box>
                                        {otherClinic?.map(oldUser => {
                                            return (
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "space-between",
                                                        alignItems: "center",
                                                        bgcolor: "#FBFBFB",
                                                        px: "16px",
                                                        py: "24px",
                                                        mt: 3,
                                                        borderRadius: "10px",
                                                        cursor: "pointer",
                                                    }}
                                                    key={oldUser.clinicGuid}
                                                    onClick={() => {
                                                        navigate(
                                                            `/viewaddeddomain`
                                                        );
                                                        sessionStorage.setItem(
                                                            "clinicName",
                                                            oldUser.clinicName
                                                        );
                                                        sessionStorage.setItem(
                                                            "clinicTownship",
                                                            oldUser.township
                                                        );
                                                        sessionStorage.setItem(
                                                            "clinicState",
                                                            oldUser.state
                                                        );
                                                        sessionStorage.setItem(
                                                            "clinicGuid",
                                                            oldUser.clinicGuid
                                                        );
                                                    }}
                                                >
                                                    <Box>
                                                        <Typography variant="h5">
                                                            <b>
                                                                {
                                                                    oldUser.clinicName
                                                                }
                                                            </b>{" "}
                                                            <span
                                                                style={{
                                                                    color: "#888888",
                                                                    fontStyle:
                                                                        "italic",
                                                                    fontSize:
                                                                        "20px",
                                                                }}
                                                            >
                                                                (clinic added by
                                                                other user)
                                                            </span>
                                                        </Typography>
                                                        <Typography
                                                            variant="h7"
                                                            sx={{ mt: 1.5 }}
                                                        >
                                                            {oldUser.township},{" "}
                                                            {oldUser.state}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            );
                                        })}
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    )}
                </Box>
            )}

            {!loading && !loadingAll && (
                <Box>
                    {oldUserClinics?.length === 0 &&
                        allUserClinics?.length === 0 && (
                            <Box
                                sx={{
                                    width: "360px",
                                    height: "100vh",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    margin: "auto", // This centers the box horizontally
                                }}
                            >
                                {!open && (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            margin: "auto",
                                        }}
                                    >
                                        <img
                                            src="/home_health.svg"
                                            alt=""
                                            style={{ marginBottom: "24px" }}
                                        />
                                        <Typography
                                            sx={{
                                                color: "var(--Text-800, #141414)",
                                                textAlign: "center",
                                                fontFamily: "Inter",
                                                fontSize: "24px",
                                                fontStyle: "normal",
                                                fontWeight: 600,
                                                lineHeight: "32px",
                                                marginBottom: "12px",
                                            }}
                                        >
                                            Clinic List is Empty
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: "var(--Text-500, #3F3F3F)",
                                                textAlign: "center",
                                                fontFamily: "Inter",
                                                fontSize: "18px",
                                                fontStyle: "normal",
                                                fontWeight: 400,
                                                lineHeight: "28px",
                                                marginBottom: "24px",
                                            }}
                                        >
                                            Get ready to record your data entry
                                            by adding a new clinic.
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            onClick={handleOpen}
                                            sx={{ color: "white" }}
                                        >
                                            Add New Clinic
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                        )}
                </Box>
            )}

            {!loading && !loadingAll && !loadingOther && (
                <Box>
                    {oldUserClinics?.length === 0 &&
                        allUserClinics?.length !== 0 && (
                            <Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        my: 4,
                                        alignItems: "center",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            fontFamily: "Inter",
                                            fontSize: "20px",
                                            fontStyle: "normal",
                                            fontWeight: "bold",
                                            lineHeight: "20px",
                                            ml: {
                                                xs: "30px",
                                                md: "110px",
                                                lg: "150px",
                                            },
                                        }}
                                    >
                                        Dashboard
                                    </Box>
                                    <Box>
                                        <Button
                                            variant="contained"
                                            onClick={handleOpen}
                                            sx={{
                                                color: "white",
                                                mr: {
                                                    xs: "30px",
                                                    md: "110px",
                                                    lg: "150px",
                                                },
                                            }}
                                        >
                                            Add New Clinic
                                        </Button>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        bgcolor: "var(--Primary-500, #EC7800)",
                                        py: "32px",
                                        px: "24px",
                                        mr: {
                                            xs: "30px",
                                            md: "110px",
                                            lg: "150px",
                                        },
                                        ml: {
                                            xs: "30px",
                                            md: "110px",
                                            lg: "150px",
                                        },
                                        my: 2,
                                        borderRadius: "12px",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: "var(--Text-50, #FFF)",
                                            fontFamily: "Inter",
                                            fontSize: "32px",
                                            fontStyle: "normal",
                                            fontWeight: 600,
                                            lineHeight: "32px",
                                            mb: "12px",
                                        }}
                                    >
                                        {allUserClinics.length}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: "var(--Text-50, #FFF)",
                                            fontFamily: "Inter",
                                            fontSize: "20px",
                                            fontStyle: "normal",
                                            fontWeight: 400,
                                            lineHeight: "20px",
                                            mb: "8px",
                                        }}
                                    >
                                        Total number of recently added clinics
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        mr: {
                                            xs: "30px",
                                            md: "110px",
                                            lg: "150px",
                                        },
                                        ml: {
                                            xs: "30px",
                                            md: "110px",
                                            lg: "150px",
                                        },
                                        my: 2,
                                    }}
                                >
                                    {allUserClinics?.map(oldUser => {
                                        return (
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-between",
                                                    alignItems: "center",
                                                    bgcolor: "#FBFBFB",
                                                    px: "16px",
                                                    py: "24px",
                                                    mt: 3,
                                                    borderRadius: "10px",
                                                    cursor: "pointer",
                                                }}
                                                key={oldUser.clinicGuid}
                                                onClick={() => {
                                                    navigate(
                                                        `/viewaddeddomain`
                                                    );
                                                    sessionStorage.setItem(
                                                        "clinicName",
                                                        oldUser.clinicName
                                                    );
                                                    sessionStorage.setItem(
                                                        "clinicTownship",
                                                        oldUser.township
                                                    );
                                                    sessionStorage.setItem(
                                                        "clinicState",
                                                        oldUser.state
                                                    );
                                                    sessionStorage.setItem(
                                                        "clinicGuid",
                                                        oldUser.clinicGuid
                                                    );
                                                }}
                                            >
                                                <Box>
                                                    <Typography variant="h5">
                                                        <b>
                                                            {oldUser.clinicName}
                                                        </b>{" "}
                                                        <span
                                                            style={{
                                                                color: "#888888",
                                                                fontStyle:
                                                                    "italic",
                                                                fontSize:
                                                                    "20px",
                                                            }}
                                                        >
                                                            (clinic added by
                                                            other user)
                                                        </span>
                                                    </Typography>
                                                    <Typography
                                                        variant="h7"
                                                        sx={{ mt: 1.5 }}
                                                    >
                                                        {oldUser.township},{" "}
                                                        {oldUser.state}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        );
                                    })}
                                </Box>
                            </Box>
                        )}
                </Box>
            )}

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
                        border: "0.1px solid #FFD",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "auto", // This centers the box horizontally
                        }}
                    >
                        <img
                            src="/home_health.svg"
                            alt=""
                            style={{ marginBottom: "24px" }}
                        />
                        <Typography
                            sx={{
                                color: "var(--Text-800, #141414)",
                                textAlign: "center",
                                fontFamily: "Inter",
                                fontSize: "24px",
                                fontStyle: "normal",
                                fontWeight: 600,
                                lineHeight: "32px",
                                marginBottom: "12px",
                            }}
                        >
                            Add New Clinic
                        </Typography>
                        <Typography
                            sx={{
                                color: "var(--Text-500, #3F3F3F)",
                                textAlign: "center",
                                fontFamily: "Inter",
                                fontSize: "18px",
                                fontStyle: "normal",
                                fontWeight: 400,
                                lineHeight: "28px",
                                marginBottom: "24px",
                            }}
                        >
                            Choose a clinic from the list to add.
                        </Typography>
                        {clinicGuid !== "" ? (
                            <Box
                                sx={{
                                    width: "80%",
                                    mb: 4,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    border: "0.3px solid",
                                    py: 1,
                                    px: 2,
                                    borderRadius: "5px",
                                }}
                            >
                                <Box>
                                    <Typography
                                        sx={{
                                            color: "var(--Text-800, #141414)",
                                            fontFamily: "Inter",
                                            fontSize: "24px",
                                            fontStyle: "normal",
                                            fontWeight: 500,
                                            lineHeight: "32px",
                                        }}
                                    >
                                        {clinicName}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: "var(--Text-500, #3F3F3F)",
                                            fontFamily: "Inter",
                                            fontSize: "16px",
                                            fontStyle: "normal",
                                            fontWeight: 400,
                                            lineHeight: "23px",
                                        }}
                                    >
                                        {clinicTownship} , {clinicState}
                                    </Typography>
                                </Box>
                                <IconButton
                                    aria-label="delete"
                                    onClick={() => {
                                        setClinicGuid("");
                                        setClinicName("");
                                        setClinicTownship("");
                                        setClinicState("");
                                    }}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Box>
                        ) : (
                            <TextField
                                id="outlined-select-currency"
                                select
                                label="Select"
                                value={clinicName || ""}
                                fullWidth
                                sx={{ mb: "24px" }}
                            >
                                <div
                                    style={{
                                        maxHeight:
                                            listItemHeight * visibleItems,
                                        overflowY: "auto",
                                    }}
                                >
                                    <List>
                                        {clinics.map((option, index) => (
                                            <ListItem
                                                key={option.guid}
                                                value={option.guid}
                                                onClick={() =>
                                                    handleListItemClick(
                                                        option.guid,
                                                        option.clinicName,
                                                        option.township,
                                                        option.state
                                                    )
                                                }
                                                style={{
                                                    height: listItemHeight,
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Box>
                                                        <img
                                                            src="/home_health.svg"
                                                            alt=""
                                                            style={{
                                                                width: "24px",
                                                                height: "24px",
                                                                marginRight:
                                                                    "16px",
                                                            }}
                                                        />
                                                    </Box>
                                                    <Box>
                                                        <Typography
                                                            sx={{
                                                                color: "var(--Text-800, #141414)",
                                                                fontFamily:
                                                                    "Inter",
                                                                fontSize:
                                                                    "16px",
                                                                fontStyle:
                                                                    "normal",
                                                                fontWeight: 500,
                                                                lineHeight:
                                                                    "24px",
                                                            }}
                                                        >
                                                            {option.clinicName}
                                                        </Typography>
                                                        <Typography
                                                            sx={{
                                                                color: "var(--Text-500, #3F3F3F)",
                                                                fontFamily:
                                                                    "Inter",
                                                                fontSize:
                                                                    "12px",
                                                                fontStyle:
                                                                    "normal",
                                                                fontWeight: 400,
                                                                lineHeight:
                                                                    "17px",
                                                            }}
                                                        >
                                                            {option.township} ,{" "}
                                                            {option.state}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </ListItem>
                                        ))}
                                    </List>
                                </div>
                            </TextField>
                        )}
                        <Button
                            variant="contained"
                            onClick={() => {
                                navigate(`/clinicsuccessful/${clinicGuid}`);
                                sessionStorage.setItem(
                                    "clinicName",
                                    clinicName
                                );
                                sessionStorage.setItem(
                                    "clinicTownship",
                                    clinicTownship
                                );
                                sessionStorage.setItem(
                                    "clinicState",
                                    clinicState
                                );
                            }}
                            disabled={clinicGuid === ""}
                        >
                            Add New Clinic
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}
