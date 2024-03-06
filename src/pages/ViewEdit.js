import React, { useEffect, useState } from "react";
import UserNavBar from "../components/UserNavBar";
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    FormControl,
    Radio,
    RadioGroup,
    TextField,
    Typography,
    FormControlLabel,
    Snackbar,
    Alert as MuiAlert,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { ApiCallAnswersAndQuestions, ApiCallUpdateAnswer } from "../apicall";

export default function ViewEdit() {
    const domainName = sessionStorage.getItem("domainName");
    const clinicName = sessionStorage.getItem("clinicName");
    const navigate = useNavigate();
    const { dguid } = useParams();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState([]);
    const token = sessionStorage.getItem("access_token");
    const userGuid = sessionStorage.getItem("user_guid");
    const userName = sessionStorage.getItem("user_name");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [updateRadio, setUpdateRadio] = useState(null);
    const handleRadioChange = (answerGuid, value, desc) => {
        console.log(value);
        console.log(typeof value);
        // Convert the value to a boolean
        const boolValue = value === "true";
        setUpdateRadio(boolValue);

        console.log(answerGuid);

        setAnswers(prevAnswers => {
            const updatedAnswers = [...prevAnswers];
            const index = updatedAnswers.findIndex(
                a => a.answerGuid === answerGuid
            );

            if (index !== -1) {
                updatedAnswers[index].answer = boolValue;
            } else {
                updatedAnswers.push({
                    answerGuid,
                    answer: boolValue,
                    description: desc,
                });
            }

            return updatedAnswers;
        });
    };

    const handleTextFieldChange = (answerGuid, value, bool) => {
        setAnswers(prevAnswers => {
            const updatedAnswers = [...prevAnswers];
            const index = updatedAnswers.findIndex(
                a => a.answerGuid === answerGuid
            );

            if (index !== -1) {
                updatedAnswers[index].description = value;
            } else {
                updatedAnswers.push({
                    answerGuid,
                    answer: bool,
                    description: value,
                });
            }

            return updatedAnswers;
        });
    };

    useEffect(() => {
        (async () => {
            const result = await ApiCallAnswersAndQuestions(token, dguid);
            setQuestions(result.data.items);
            // console.log(result.data.items);
        })();
    }, [token, dguid]);

    const uploadUpdateAnswer = async () => {
        const result = await ApiCallUpdateAnswer(token, userGuid, answers);
        if (result.success === true) {
            setSnackbarOpen(true);
            setSnackbarSeverity("success");
            setSnackbarMessage(result.message);
            navigate(`/viewaddeddomain`);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    console.log(answers);

    return (
        <>
            <UserNavBar />
            <Box>
                <Box sx={{ my: 4, mx: 8 }}></Box>
                <Box sx={{ mt: "50px" }}>
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
                        Edit Record
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
                        Complete the data recording process by filling in
                        necessary information.
                    </Typography>
                    <Box>
                        <Container>
                            <Box>
                                {questions.map(question => {
                                    const selectedValue = answers.find(
                                        a => a.questionGuid === question.guid
                                    )?.answer;

                                    return (
                                        <Card
                                            sx={{
                                                bgcolor: "#FBFBFB",
                                                boxShadow: 0,
                                            }}
                                            key={question.answerGuid}
                                        >
                                            <CardContent>
                                                <Typography
                                                    variant="body1"
                                                    color="#000"
                                                >
                                                    {question.questionText}
                                                </Typography>
                                            </CardContent>
                                            <FormControl sx={{ ml: 4 }}>
                                                <RadioGroup
                                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                                    name={`radio-group-${question.answerGuid}`}
                                                    onChange={e =>
                                                        handleRadioChange(
                                                            question.answerGuid,
                                                            e.target.value,
                                                            question.description
                                                        )
                                                    }
                                                    value={
                                                        answers.find(
                                                            a =>
                                                                a.answerGuid ===
                                                                question.answerGuid
                                                        )?.answer !== undefined
                                                            ? answers.find(
                                                                  a =>
                                                                      a.answerGuid ===
                                                                      question.answerGuid
                                                              )?.answer
                                                            : question.answer
                                                    }
                                                >
                                                    <FormControlLabel
                                                        value={true}
                                                        control={<Radio />}
                                                        label="Yes"
                                                    />
                                                    <FormControlLabel
                                                        value={false}
                                                        control={<Radio />}
                                                        label="No"
                                                    />
                                                </RadioGroup>
                                            </FormControl>

                                            <Box sx={{ mx: 4, mb: 2, mt: 1 }}>
                                                <TextField
                                                    fullWidth
                                                    id={`text-field-${question.answerGuid}`}
                                                    placeholder="Remark: Please mention incomplete findings or reasons for NO and NA"
                                                    variant="outlined"
                                                    value={
                                                        answers.find(
                                                            a =>
                                                                a.answerGuid ===
                                                                question.answerGuid
                                                        )?.description ||
                                                        question.description
                                                    }
                                                    // value={question.description}
                                                    onChange={e =>
                                                        handleTextFieldChange(
                                                            question.answerGuid,
                                                            e.target.value,
                                                            question.answer
                                                        )
                                                    }
                                                />
                                            </Box>
                                        </Card>
                                    );
                                })}
                            </Box>
                            <Box sx={{ mt: "50px" }}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    disabled={answers.length === 0}
                                    onClick={() => {
                                        uploadUpdateAnswer();
                                    }}
                                >
                                    Save
                                </Button>
                            </Box>
                            <Box sx={{ mt: "25px" }}>
                                <Button
                                    fullWidth
                                    onClick={() => {
                                        navigate(-1);
                                    }}
                                >
                                    Cancel
                                </Button>
                            </Box>
                        </Container>
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
