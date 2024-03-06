import React, { useEffect } from "react";
import SideNav from "./components/SideNav";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Dashboard";
import Setting from "./pages/Setting";
import DeliveryWay from "./pages/DeliveryWay";
import Login from "./pages/Login";
import GateCharges from "./pages/GateCharges";
import UserHome from "./pages/UserHome";
import ClinicSuccessful from "./pages/ClinicSuccessful";
import SelectDomain from "./pages/SelectDomain";
import AddNewRecord from "./pages/AddNewRecord";
import ViewAddedDomain from "./pages/ViewAddedDomain";
import ViewAdmin from "./pages/admin/ViewAdmin";
import Organization from "./pages/admin/Organization";
import Clinic from "./pages/admin/Clinic";
import Domain from "./pages/admin/Domain";
import User from "./pages/admin/User";
import InputField from "./pages/admin/InputField";
import ViewEdit from "./pages/ViewEdit";
import ViewOnly from "./pages/ViewOnly";
import Record from "./pages/admin/Record";
import ViewRecord from "./pages/admin/record/ViewRecord";
import EditRecord from "./pages/admin/record/EditRecord";

export default function App() {
    const navigate = useNavigate();
    const token = sessionStorage.getItem("access_token");
    const refresh_token = sessionStorage.getItem("refresh_token");
    const expires_in = sessionStorage.getItem("expires_in");
    useEffect(() => {
        // Check if there is no data in sessionStorage
        const isLoggedIn = !!sessionStorage.getItem("access_token");
        const userRole = sessionStorage.getItem("roleName");

        // If not logged in, navigate to the "/login" page
        if (!isLoggedIn) {
            navigate("/login");
        }

        // If user is logged in, check their role
        if (userRole === "user") {
            // Navigate away from specified routes for "user" role
            navigate("/userhome"); // Add any other allowed routes for "user" role here
        }
    }, [navigate]);

    

    return (
        <>
            <Routes>
                {/* Add condition to render routes based on the user's role */}
                {sessionStorage.getItem("roleName") === "Administrator" && (
                    <>
                        <Route path="/" exact element={<Home />} />
                        <Route
                            path="/organization"
                            exact
                            element={<Organization />}
                        />
                        <Route path="/clinic" exact element={<Clinic />} />
                        <Route path="/domain" exact element={<Domain />} />
                        <Route path="/user" exact element={<User />} />
                        <Route
                            path="/inputfield"
                            exact
                            element={<InputField />}
                        />
                        <Route path="/record" exact element={<Record />} />
                        <Route
                            path="/viewrecord/:dguid"
                            element={<ViewRecord />}
                        />
                        <Route
                            path="/editrecord/:dguid"
                            element={<EditRecord />}
                        />
                    </>
                )}

                {/* Common routes for both "admin" and "user" roles */}
                <Route path="/login" exact element={<Login />} />
                <Route path="/userhome" element={<UserHome />} />
                <Route
                    path="/clinicsuccessful/:guid"
                    element={<ClinicSuccessful />}
                />
                <Route path="/selectdomain/:guid" element={<SelectDomain />} />
                <Route
                    path="/addnewrecord/:categoryGuid/:domainGuid"
                    element={<AddNewRecord />}
                />
                <Route path="/viewaddeddomain" element={<ViewAddedDomain />} />
                <Route path="/viewadmin" element={<ViewAdmin />} />
                <Route path="/viewedit/:dguid" element={<ViewEdit />} />
                <Route path="/viewonly/:dguid" element={<ViewOnly />} />
            </Routes>
            {/* <SideNav /> */}
        </>
    );
}
