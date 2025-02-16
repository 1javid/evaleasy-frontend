import { h } from "preact";
import { Router, Route } from "preact-router";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Shared/Navbar";
import Login from "./components/Auth/Login";
import AdminDashboard from "./components/Admin/AdminDashboard";
import RepresentativeDashboard from "./components/Representative/RepresentativeDashboard";
import InstructorDashboard from "./components/Instructor/InstructorDashboard";
import InstitutionDetails from "./components/Admin/InstitutionDetails";
import SubjectDetails from "./components/Instructor/SubjectDetails";
import QuestionPoolDetails from "./components/Instructor/QuestionPoolDetails";
import TestDetails from "./components/Instructor/TestDetails";
import PrivateRoute from "./components/PrivateRoute";
import RedirectHandler from "./components/RedirectHandler";

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <RedirectHandler />
      <Router>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/admin" allowedRoles={["admin"]} component={AdminDashboard} />
        <PrivateRoute path="/representative" allowedRoles={["institution representative"]} component={RepresentativeDashboard} />
        <PrivateRoute path="/instructor" allowedRoles={["instructor"]} component={InstructorDashboard} />
        <PrivateRoute path="/institution/:id" allowedRoles={["admin"]} component={InstitutionDetails} />
        <PrivateRoute path="/subject/:id" allowedRoles={["instructor"]} component={SubjectDetails} />
        <PrivateRoute path="/question-pool/:id" allowedRoles={["instructor"]} component={QuestionPoolDetails} />
        <PrivateRoute path="/test/:id" allowedRoles={["instructor"]} component={TestDetails} />
        <Route default component={Login} />
      </Router>
    </AuthProvider>
  );
};

export default App;
