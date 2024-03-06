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
import { ApiCallSelectQuestion, ApiCallUploadAnswer } from "../apicall";

export default function AddNewRecord() {
    const domainName = sessionStorage.getItem("domainName");
    const clinicName = sessionStorage.getItem("clinicName");
    const navigate = useNavigate();
    const { categoryGuid, domainGuid } = useParams();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState([]);
    const token = sessionStorage.getItem("access_token");
    const userGuid = sessionStorage.getItem("user_guid");
    const clinicGuid = sessionStorage.getItem("clinicGuid");
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
            const result = await ApiCallSelectQuestion(token, domainGuid);
            setQuestions(result.data.items);
            setLoading(false);
        })();
    }, [token, domainGuid]);

    console.log(answers);
    return (
        <>
            <UserNavBar />
            <Box>
                <Box sx={{ my: 4, mx: 8 }}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link
                            underline="hover"
                            color="inherit"
                            href={`/clinicsuccessful/${categoryGuid}`}
                        >
                            {clinicName}
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            href={`/selectdomain/${categoryGuid}`}
                        >
                            {domainName}
                        </Link>
                        <Link
                            underline="hover"
                            color="text.primary"
                            aria-current="page"
                        >
                            Add New Records
                        </Link>
                    </Breadcrumbs>
                </Box>
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
                        Add New Record
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
                            {!loading && (
                                <Box>
                                    {questions.map(question => {
                                        const selectedValue = answers.find(
                                            a =>
                                                a.questionGuid === question.guid
                                        )?.answer;

                                        return (
                                            <Card
                                                sx={{
                                                    bgcolor: "#FBFBFB",
                                                    boxShadow: 0,
                                                }}
                                                key={question.guid}
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
                                                        name={`radio-group-${question.guid}`}
                                                        onChange={e =>
                                                            handleRadioChange(
                                                                question.guid,
                                                                e.target.value
                                                            )
                                                        }
                                                        value={
                                                            selectedValue !==
                                                            undefined
                                                                ? selectedValue.toString()
                                                                : ""
                                                        }
                                                    >
                                                        <FormControlLabel
                                                            value="1"
                                                            control={<Radio />}
                                                            label="Yes"
                                                        />
                                                        <FormControlLabel
                                                            value="0"
                                                            control={<Radio />}
                                                            label="No"
                                                        />
                                                    </RadioGroup>
                                                </FormControl>

                                                <Box
                                                    sx={{ mx: 4, mb: 2, mt: 1 }}
                                                >
                                                    <TextField
                                                        fullWidth
                                                        id={`text-field-${question.guid}`}
                                                        placeholder="Remark: Please mention incomplete findings or reasons for NO and NA"
                                                        variant="outlined"
                                                        onChange={e =>
                                                            handleTextFieldChange(
                                                                question.guid,
                                                                e.target.value
                                                            )
                                                        }
                                                        disabled={
                                                            selectedValue !==
                                                                1 &&
                                                            selectedValue !== 0
                                                        }
                                                    />
                                                </Box>
                                            </Card>
                                        );
                                    })}
                                </Box>
                            )}
                            <Box sx={{ mt: "50px" }}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    disabled={
                                        questions.length !== answers.length
                                    }
                                    onClick={() => {
                                        uploadServer();
                                    }}
                                >
                                    Save
                                </Button>
                            </Box>
                            <Box sx={{ mt: "25px" }}>
                                <Button
                                    fullWidth
                                    onClick={() => {
                                        navigate(`/selectdomain/${clinicGuid}`);
                                    }}
                                >
                                    Cancel
                                </Button>
                            </Box>
                        </Container>
                    </Box>
                </Box>
            </Box>
        </>
    );
}
