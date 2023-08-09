
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import Maps from "views/Map.js";
import UserPage from "views/User.js";
import UpgradeToPro from "views/Upgrade.js";
import Login from "Login.js";
import Cases from "views/Cases.js";
import Experts from "views/Experts.js";
import AddExperts from "views/AddExperts.js";
import ContactDetails from "views/ContactDetails.js";
import StaffManagement from "views/StaffManagement.js";
import AddDivision from "views/AddDivision.js";
import CaseNotes from "views/Notes.js"
import Contact from "views/Contact.js"
import CreateNewCase from "views/CreateNewCase.js"
import ManagePayment from "views/ManagePayment.js"
import ReviewAgreements from "views/ReviewAgreements.js"
import ViewReviewAgreements from "views/ViewReviewAgreements.js"
import VideoConsultation from "views/VideoConsultation.js"
import LocateMedicalRecords from "views/LocateMedicalRecords.js"
import MedicalRecords from "views/MedicalRecords.js"
import ClinicalInformation from "views/ClinicalInformation.js"
import ExpertAssignment from "views/ExpertAssignment.js"
import ExpertReview from "views/ExpertReview.js"
import CaseReport from "views/CaseReport.js"
import NotificationSettings from "views/NotificationSettings.js"
import EditExperts from "views/EditExperts.js"
import ViewExperts from "views/ViewExperts.js"




import AuditLog from "views/AuditLog.js"




var routes = [
    {
    path: "/login",
    name: "Login",
    icon: "nc-icon nc-bank",
    component: Login,
    layout: ""
  },
  {
    path: "/cases",
    name: "Cases",
    icon: "nc-icon nc-bank",
    component: Cases,
    layout: "/admin"
  },
  // {
  //   path: "/experts",
  //   name: "Experts",
  //   icon: "nc-icon nc-bank",
  //   component: Experts,
  //   layout: "/admin"
  // },
  // {
  //   path: "/addExperts",
  //   name: "AddExperts",
  //   icon: "nc-icon nc-diamond",
  //   component: AddExperts,
  //   layout: "/admin"
  // },
  {
    path: "/EditExperts",
    name: "EditExperts",
    icon: "nc-icon nc-diamond",
    component: EditExperts,
    layout: "/admin"
  },
  // {
  //   path: "/ViewExperts",
  //   name: "ViewExperts",
  //   icon: "nc-icon nc-diamond",
  //   component: ViewExperts,
  //   layout: "/admin"
  // },
  
  // {
  //   path: "/staffManagement",
  //   name: "StaffManagement",
  //   icon: "nc-icon nc-diamond",
  //   component: StaffManagement,
  //   layout: "/admin"
  // },
  // {
  //   path: "/addDivision",
  //   name: "AddDivision",
  //   icon: "nc-icon nc-diamond",
  //   component: AddDivision,
  //   layout: "/admin"
  // },
  {
    path: "/contactDetails",
    name: "ContactDetails",
    icon: "nc-icon nc-diamond",
    component: ContactDetails,
    layout: "/admin"
  },
  // {
  //   path: "/caseNotes",
  //   name: "CaseNotes",
  //   icon: "nc-icon nc-diamond",
  //   component: CaseNotes,
  //   layout: "/admin"
  // },
  // {
  //   path: "/contact",
  //   name: "Contact",
  //   icon: "nc-icon nc-diamond",
  //   component: Contact,
  //   layout: "/admin"
  // },
  // {
  //   path: "/createNewCase",
  //   name: "CreateNewCase",
  //   icon: "nc-icon nc-diamond",
  //   component: CreateNewCase,
  //   layout: "/admin"
  // },
  // {
  //   path: "/managePayment",
  //   name: "ManagePayment",
  //   icon: "nc-icon nc-diamond",
  //   component: ManagePayment,
  //   layout: "/admin"
  // },
  // {
  //   path: "/reviewAgreements",
  //   name: "ReviewAgreements",
  //   icon: "nc-icon nc-diamond",
  //   component: ReviewAgreements,
  //   layout: "/admin"
  // },
  // {
  //   path: "/ViewReviewAgreements",
  //   name: "ViewReviewAgreements",
  //   icon: "nc-icon nc-diamond",
  //   component: ViewReviewAgreements,
  //   layout: "/admin"
  // },
  {
    path: "/VideoConsultation",
    name: "VideoConsultation",
    icon: "nc-icon nc-diamond",
    component: VideoConsultation,
    layout: "/admin"
  },
  // {
  //   path: "/LocateMedicalRecords",
  //   name: "LocateMedicalRecords",
  //   icon: "nc-icon nc-diamond",
  //   component: LocateMedicalRecords,
  //   layout: "/admin"
  // },
  // {
  //   path: "/MedicalRecords",
  //   name: "MedicalRecords",
  //   icon: "nc-icon nc-diamond",
  //   component: MedicalRecords,
  //   layout: "/admin"
  // },
  
  // {
  //   path: "/ClinicalInformation",
  //   name: "ClinicalInformation",
  //   icon: "nc-icon nc-diamond",
  //   component: ClinicalInformation,
  //   layout: "/admin"
  // },
  // {
  //   path: "/ExpertAssignment",
  //   name: "ExpertAssignment",
  //   icon: "nc-icon nc-diamond",
  //   component: ExpertAssignment,
  //   layout: "/admin"
  // },
  {
    path: "/ExpertReview",
    name: "ExpertReview",
    icon: "nc-icon nc-bank",
    component: ExpertReview,
    layout: "/admin"
  },
  {
    path: "/CaseReport",
    name: "CaseReport",
    icon: "nc-icon nc-bank",
    component: CaseReport,
    layout: "/admin"
  },
  {
    path: "/NotificationSettings",
    name: "NotificationSettings",
    icon: "nc-icon nc-bank",
    component: NotificationSettings,
    layout: "/admin"
  },
  {
    path: "/AuditLog",
    name: "AuditLog",
    icon: "nc-icon nc-bank",
    component: AuditLog,
    layout: "/admin"
  },
  
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin"
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin"
  },
  {
    path: "/tables",
    name: "Table List",
    icon: "nc-icon nc-tile-56",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-caps-small",
    component: Typography,
    layout: "/admin"
  },
  {
    pro: true,
    path: "/upgrade",
    name: "Upgrade to PRO",
    icon: "nc-icon nc-spaceship",
    component: UpgradeToPro,
    layout: "/admin"
  }
];
export default routes;
