const api = process.env.REACT_APP_API_URL;

export async function ApiCallLogin(username, password) {
    const res = await fetch(`${api}/v1/user/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
        const result = await res.json();

        // Save the data in sessionStorage
        sessionStorage.setItem("access_token", result.data.access_token);
        sessionStorage.setItem("token_type", result.data.token_type);
        sessionStorage.setItem("refresh_token", result.data.refresh_token);
        sessionStorage.setItem("expires_in", result.data.expires_in);

        setTimeout(async () => {
            const tokenRefreshed = await ApiCallRefreshToken(
                result.data.access_token,
                result.data.refresh_token
            );
            if (tokenRefreshed) {
                console.log("Token refreshed successfully");
            } else {
                console.error("Token refresh failed");
            }
        }, result.data.expires_in - 2000);

        return result;
    }

    return false;
}

// refresh token
export async function ApiCallRefreshToken(token, refresh) {
    const res = await fetch(`${api}/v1/user/refresh_token/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ accessToken: refresh }),
    });

    if (res.ok) {
        const result = await res.json();

        // Save the data in sessionStorage
        sessionStorage.setItem("access_token", result.data.access_token);
        sessionStorage.setItem("token_type", result.data.token_type);
        sessionStorage.setItem("refresh_token", result.data.refresh_token);
        sessionStorage.setItem("expires_in", result.data.expires_in);

        return result;
    }

    return false;
}

//get clinic by organization
export async function ApiCallSelectClinic(token, organizationGuid) {
    const res = await fetch(`${api}/v1/clinic/${organizationGuid}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (res.ok) {
        const result = await res.json();

        return result;
    }

    return false;
}

//get domain by clinic
export async function ApiCallSelectDomain(token, clinicGuid) {
    const res = await fetch(`${api}/v1/department/${clinicGuid}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (res.ok) {
        const result = await res.json();

        return result;
    }

    return false;
}

//get question by domain
export async function ApiCallSelectQuestion(token, domainGuid) {
    const res = await fetch(`${api}/v1/question/${domainGuid}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (res.ok) {
        const result = await res.json();

        return result;
    }

    return false;
}

//get user info

export async function ApiCallGetUserInfo(token) {
    const res = await fetch(`${api}/v1/user/brief`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (res.ok) {
        const result = await res.json();

        // Save the data in sessionStorage
        sessionStorage.setItem("user_name", result.data.name);
        sessionStorage.setItem("email", result.data.email);
        sessionStorage.setItem("phone", result.data.phone);
        sessionStorage.setItem("user_guid", result.data.guid);
        sessionStorage.setItem(
            "organizationType",
            result.data.organizationType
        );
        sessionStorage.setItem(
            "organizationGuid",
            result.data.organizationGuid
        );
        sessionStorage.setItem("roleGuid", result.data.roleGuid);
        sessionStorage.setItem("roleName", result.data.roleName);

        return result;
    }

    return false;
}

//upload answer

export async function ApiCallUploadAnswer(token, userGuid, answers) {
    const res = await fetch(`${api}/v1/answer/create`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userGuid: userGuid,
            answers: answers,
        }),
    });

    if (res.ok) {
        const result = await res.json();

        return result;
    }

    return false;
}

//update answer

export async function ApiCallUpdateAnswer(token, guid, answers) {
    const res = await fetch(`${api}/v1/answer/update/${guid}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(answers),
    });

    if (res.ok) {
        const result = await res.json();

        return result;
    }

    return false;
}

//get all organization
export async function ApiCallOrganizations(token) {
    const res = await fetch(`${api}/v1/organization/`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (res.ok) {
        const result = await res.json();

        return result;
    }

    return false;
}

//get all role
export async function ApiCallRoles(token) {
    const res = await fetch(`${api}/v1/role/`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (res.ok) {
        const result = await res.json();

        return result;
    }

    return false;
}

//get all questions
export async function ApiCallQuestions(token, search, first, max) {
    if (search && search !== "") {
        const res = await fetch(`${api}/v1/question/?keyword=${search}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (res.ok) {
            const result = await res.json();

            return result;
        }

        return false;
    } else {
        const res = await fetch(
            `${api}/v1/question//?first=${first}&max=${max}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (res.ok) {
            const result = await res.json();

            return result;
        }

        return false;
    }
}

//get all clinic
export async function ApiCallClinics(token) {
    const res = await fetch(`${api}/v1/clinic/`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (res.ok) {
        const result = await res.json();

        return result;
    }

    return false;
}

// get all users
export async function ApiCallUsers(token) {
    const res = await fetch(`${api}/v1/user/`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (res.ok) {
        const result = await res.json();

        return result;
    }

    return false;
}

//delete organization
export async function ApiCallDeleteOrganization(token, orgGuid) {
    const res = await fetch(`${api}/v1/organization/delete/${orgGuid}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (res.ok) {
        const result = await res.json();
        return result;
    }
    return false;
}

//delete clinic

export async function ApiCallDeleteClinic(token, clinicGuid) {
    const res = await fetch(`${api}/v1/clinic/delete/${clinicGuid}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (res.ok) {
        const result = await res.json();
        return result;
    }
    return false;
}

// delete user
export async function ApiCallDeleteUser(token, userGuid) {
    const res = await fetch(`${api}/v1/user/delete/${userGuid}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (res.ok) {
        const result = await res.json();
        return result;
    }
    return false;
}

//create organization
export async function ApiCallCreateOrganization(token, name) {
    const res = await fetch(`${api}/v1/organization/create`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            organizationType: name,
        }),
    });
    if (res.ok) {
        const result = await res.json();
        return result;
    }
    return false;
}

//create clinic
export async function ApiCallCreateClinic(
    token,
    orgGuid,
    name,
    township,
    state
) {
    const res = await fetch(`${api}/v1/clinic/create`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            organizationGuid: orgGuid,
            clinicName: name,
            township: township,
            state: state,
        }),
    });
    if (res.ok) {
        const result = await res.json();
        return result;
    }
    return false;
}

//create user
export async function ApiCallCreateUser(
    token,
    orgGuid,
    roleGuid,
    name,
    password,
    email,
    phone
) {
    const res = await fetch(`${api}/v1/user/create`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            roleGuid: roleGuid,
            organizationGuid: orgGuid,
            name: name,
            password: password,
            email: email,
            phone: phone,
        }),
    });
    if (res.ok) {
        const result = await res.json();
        return result;
    }
    return false;
}

//update organization
export async function ApiCallUpdateOrganization(token, guid, text) {
    const res = await fetch(`${api}/v1/organization/update/${guid}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            organizationType: text,
        }),
    });
    if (res.ok) {
        const result = await res.json();
        return result;
    }
    return false;
}

//update user
export async function ApiCallUpdateUser(
    token,
    userGuid,
    orgGuid,
    roleGuid,
    name,
    password,
    email,
    phone
) {
    const res = await fetch(`${api}/v1/user/update/${userGuid}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            roleGuid: roleGuid,
            organizationGuid: orgGuid,
            name: name,
            password: password,
            email: email,
            phone: phone,
        }),
    });
    if (res.ok) {
        const result = await res.json();
        return result;
    }
    return false;
}

//update clinic
export async function ApiCallUpdateClinic(
    token,
    guid,
    organizationGuid,
    clinicName,
    township,
    state
) {
    const res = await fetch(`${api}/v1/clinic/update/${guid}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            organizationGuid: organizationGuid,
            clinicName: clinicName,
            township: township,
            state: state,
        }),
    });
    if (res.ok) {
        const result = await res.json();
        return result;
    }
    return false;
}

//update domain
export async function ApiCallUpdateDomain(token, guid, text) {
    const res = await fetch(`${api}/v1/clinic/update/${guid}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            organizationType: text,
            status: 1,
        }),
    });
    if (res.ok) {
        const result = await res.json();
        return result;
    }
    return false;
}

//get department by user guid
export async function ApiCallDepartmentByUserGuid(token, userGuid, clinicGuid) {
    const res = await fetch(
        `${api}/v1/department/listAllDepartmentUsers/${userGuid}`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                guid: clinicGuid,
            }),
        }
    );
    if (res.ok) {
        const result = await res.json();
        return result;
    }
    return false;
}

//get clinic by organization
export async function ApiCallAnswersAndQuestions(token, domainGuid) {
    const res = await fetch(`${api}/v1/answer/${domainGuid}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (res.ok) {
        const result = await res.json();

        return result;
    }

    return false;
}

// delete answers
export async function ApiCallDeleteAnswer(token, userGuid) {
    const res = await fetch(`${api}/v1/department/deleteAnswer/${userGuid}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (res.ok) {
        const result = await res.json();
        return result;
    }
    return false;
}

//get all domains
// export async function ApiCallAllDomain(token) {
//     const res = await fetch(`${api}/v1/department/`, {
//         method: "GET",
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     });

//     if (res.ok) {
//         const result = await res.json();
//         return result;
//     }
//     return false;
// }

export async function ApiCallAllDomain(token, search) {
    if (search && search !== "") {
        const res = await fetch(`${api}/v1/department/?keyword=${search}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (res.ok) {
            const result = await res.json();

            return result;
        }

        return false;
    } else {
        const res = await fetch(`${api}/v1/department/`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (res.ok) {
            const result = await res.json();

            return result;
        }

        return false;
    }
}

// create questions

export async function ApiCallCreateQuestion(
    token,
    questionText,
    departmentGuid
) {
    const res = await fetch(`${api}/v1/question/create`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            questionText: questionText,
            departmentGuid: departmentGuid,
        }),
    });

    if (res.ok) {
        const result = await res.json();

        return result;
    }

    return false;
}

// update questions

export async function ApiCallUpdateQuestion(
    token,
    questionGuid,
    questionText,
    departmentGuid
) {
    const res = await fetch(`${api}/v1/question/update/${questionGuid}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            questionText: questionText,
            departmentGuid: departmentGuid,
        }),
    });

    if (res.ok) {
        const result = await res.json();

        return result;
    }

    return false;
}

//delete question
export async function ApiCallDeleteQuestion(token, guid) {
    const res = await fetch(`${api}/v1/question/delete/${guid}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (res.ok) {
        const result = await res.json();
        return result;
    }
    return false;
}

//delete domain
export async function ApiCallDeleteDomain(token, guid) {
    const res = await fetch(`${api}/v1/department/delete/${guid}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (res.ok) {
        const result = await res.json();
        return result;
    }
    return false;
}
//delete record
export async function ApiCallDeleteRecord(token, guid) {
    const res = await fetch(`${api}/v1/department/deleteAnswer/${guid}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (res.ok) {
        const result = await res.json();
        return result;
    }
    return false;
}

// assign department with Clinic

export async function ApiCallAssignDepartmentWithClinic(
    token,
    clinicGuid,
    departmentGuid
) {
    const res = await fetch(`${api}/v1/clinic_department/assign/create`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            clinicGuid: clinicGuid,
            departmentGuid: departmentGuid,
        }),
    });

    if (res.ok) {
        const result = await res.json();

        return result;
    }

    return false;
}

//create domain
export async function ApiCallCreateDomain(token, departmentName, clinicGuid) {
    const res = await fetch(`${api}/v1/department/create`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            departmentName: departmentName,
            clinicGuid: clinicGuid,
        }),
    });
    if (res.ok) {
        const result = await res.json();

        return result;
    }

    return false;
}

//get old user
export async function ApiCallOldUser(token, userGuid) {
    const res = await fetch(`${api}/v1/department/user/${userGuid}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (res.ok) {
        const result = await res.json();

        return result;
    }

    return false;
}

//edit department name
export async function ApiCallUpdateDepartmentName(
    token,
    domainGuid,
    domainName
) {
    const res = await fetch(`${api}/v1/department/update/${domainGuid}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            departmentName: domainName,
        }),
    });
    if (res.ok) {
        const result = await res.json();

        return result;
    }

    return false;
}

//get all departments by all users
export async function ApiCallGetAllDepartmentsByAllUser(token, clinicGuid) {
    const res = await fetch(`${api}/v1/department/clinic/${clinicGuid}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (res.ok) {
        const result = await res.json();

        return result;
    }

    return false;
}

// get all clinic by all user answers
export async function ApiCallGetAllClinicByAllUserAnswer(token, orgGuid) {
    const res = await fetch(`${api}/v1/department/organization/${orgGuid}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (res.ok) {
        const result = await res.json();

        return result;
    }

    return false;
}
