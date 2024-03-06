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
    Link,
    FormControlLabel,
    Breadcrumbs,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {
    ApiCallAnswersAndQuestions,
    ApiCallSelectQuestion,
    ApiCallUploadAnswer,
} from "../apicall";

export default function ViewOnly() {
    const domainName = sessionStorage.getItem("domainName");
    const clinicGuid = sessionStorage.getItem("clinicGuid");
    const navigate = useNavigate();
    const { dguid } = useParams();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState([]);
    const token = sessionStorage.getItem("access_token");
    const userGuid = sessionStorage.getItem("user_guid");
    const handleRadioChange = (questionGuid, value) => {
        // Convert the value to an integer
        const intValue = parseInt(value, 10);

        setAnswers(prevAnswers => {
            const updatedAnswers = [...prevAnswers];
            const index = updatedAnswers.findIndex(
                a => a.questionGuid === questionGuid
            );

            if (index !== -1) {
                updatedAnswers[index].answer = intValue;
            } else {
                updatedAnswers.push({
                    questionGuid,
                    answer: intValue,
                    description: "",
                });
            }

            return updatedAnswers;
        });
    };

    const handleTextFieldChange = (questionGuid, value) => {
        setAnswers(prevAnswers => {
            const updatedAnswers = [...prevAnswers];
            const index = updatedAnswers.findIndex(
                a => a.questionGuid === questionGuid
            );

            if (index !== -1) {
                updatedAnswers[index].description = value;
            } else {
                updatedAnswers.push({
                    questionGuid,
                    answer: 0,
                    description: value,
                });
            }

            return updatedAnswers;
        });
    };

    const uploadServer = async () => {
        const result = await ApiCallUploadAnswer(token, userGuid, answers);
        if (result.success === true) {
            navigate(`/viewaddeddomain`);
        }
    };

    useEffect(() => {
        (async () => {
            const result = await ApiCallAnswersAndQuestions(token, dguid);
            setQuestions(result.data.items);
            setLoading(false);
            // console.log(result.data.items);
        })();
    }, [token, dguid]);

    console.log(questions);
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
                        View Record
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
                        {/* Complete the data recording process by filling in
                        necessary information. */}
                    </Typography>
                    {!loading && (
                        <Box>
                            {questions.length === 0 ? (
                                <Container>
                                    <Box>
                                        <Typography variant="h5" sx={{ my: 4 }}>
                                            No records have been filled yet!!!
                                        </Typography>

                                        <Typography variant="h7" sx={{ my: 4 }}>
                                            This domain has not yet filled
                                            records, so please click{" "}
                                            <Button
                                                onClick={() => {
                                                    navigate(
                                                        `/selectdomain/${clinicGuid}`
                                                    );
                                                }}
                                            >
                                                {" "}
                                                this button{" "}
                                            </Button>{" "}
                                            or{" "}
                                            <Button
                                                onClick={() => {
                                                    navigate(
                                                        `/viewaddeddomain`
                                                    );
                                                }}
                                            >
                                                go back
                                            </Button>{" "}
                                            to view other domain records to fill
                                            records.
                                        </Typography>
                                    </Box>
                                </Container>
                            ) : (
                                <Box>
                                    <Container>
                                        <Box>
                                            {questions?.map(question => {
                                                return (
                                                    <Card
                                                        sx={{
                                                            bgcolor: "#FBFBFB",
                                                            boxShadow: 0,
                                                        }}
                                                        key={
                                                            question.answerGuid
                                                        }
                                                    >
                                                        <CardContent>
                                                            <Typography
                                                                variant="body1"
                                                                color="#000"
                                                            >
                                                                {
                                                                    question.questionText
                                                                }
                                                            </Typography>
                                                        </CardContent>
                                                        <FormControl
                                                            sx={{ ml: 4 }}
                                                        >
                                                            <RadioGroup
                                                                aria-labelledby="demo-controlled-radio-buttons-group"
                                                                name={`radio-group-${question.answerGuid}`}
                                                                onChange={e =>
                                                                    handleRadioChange(
                                                                        question.answerGuid,
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                value={
                                                                    question.answer
                                                                }
                                                            >
                                                                <FormControlLabel
                                                                    value={true}
                                                                    control={
                                                                        <Radio />
                                                                    }
                                                                    readOnly
                                                                    label="Yes"
                                                                />
                                                                <FormControlLabel
                                                                    value={
                                                                        false
                                                                    }
                                                                    control={
                                                                        <Radio />
                                                                    }
                                                                    readOnly
                                                                    label="No"
                                                                />
                                                            </RadioGroup>
                                                        </FormControl>

                                                        <Box
                                                            sx={{
                                                                mx: 4,
                                                                mb: 2,
                                                                mt: 1,
                                                            }}
                                                        >
                                                            <TextField
                                                                fullWidth
                                                                id={`text-field-${question.answerGuid}`}
                                                                placeholder="Remark: Please mention incomplete findings or reasons for NO and NA"
                                                                variant="outlined"
                                                                value={
                                                                    question.description
                                                                }
                                                                readOnly
                                                            />
                                                        </Box>
                                                    </Card>
                                                );
                                            })}
                                        </Box>
                                        {/* <Box sx={{ mt: "50px" }}>
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                disabled
                                                onClick={() => {
                                                    uploadServer();
                                                }}
                                            >
                                                Save
                                            </Button>
                                        </Box> */}
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
                            )}
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    );
}
