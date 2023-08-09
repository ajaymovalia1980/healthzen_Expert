
import React,{useState} from "react";
import { CKEditor } from 'ckeditor4-react';
import { useHistory } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Input,
  Row,
  Col
} from "reactstrap";
import { Link } from "react-router-dom";
import {AiFillEye,AiOutlineFilePdf,AiOutlineFileImage,AiOutlineUsergroupAdd,AiOutlineFile,AiOutlineDiff, AiOutlineUser ,AiOutlineFileText ,AiOutlineMail,AiOutlineVideoCamera,AiOutlineDollar,AiFillPlusCircle} from "react-icons/ai";
import Rightsidebar from "./Rightsidebar"
import {  Button, Form } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select'
import "bootstrap/dist/css/bootstrap.css";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
function ReviewAgreements() {
  const [resume, setResume] = useState('')
  const [formValues, setFormValues] = useState([{ resume: ""}])
  const logEvent = (e) => {
    console.log("logEvent",e.editor.getData())
    // setResume(e.editor.getData())
  }
  const [openMenu, setOpenMenu] = useState(false)
  let history = useHistory();

    const pushToRoute = route => {
    history.push(route)
    setOpenMenu(false)
    }
  let addFormFields = () => {
    setFormValues([...formValues, { resume: ""}])
  }
  let handleSubmit = (event) => {
    event.preventDefault();
    alert(JSON.stringify(formValues));
}
let handleChange = (i, e) => {
  console.log("logEvent",i, e.editor.getData())
  let newFormValues = [...formValues];
  newFormValues[i]['resume'] = e.editor.getData();
  setFormValues(newFormValues);
}


let removeFormFields = (i) => {
  let newFormValues = [...formValues];
  newFormValues.splice(i, 1);
  setFormValues(newFormValues)
}
const [show, setShow] = useState(false);

const handleShow = () => setShow(true);
const handleClose = () => setShow(false);
const onLoginFormSubmit = (e) => {
    e.preventDefault();
    handleClose();
  };
  return (
    <>
      <div className="content">
        <Row>
          <Col md="3">
            <Rightsidebar>

            </Rightsidebar>
           
          </Col>
          <Col md="9">
          <Card className="card-user">
          
            <CardBody>
            <div className="sc-1rnyb57-0 fVXGAv">
                    <div className="sc-16qu7j7-3 hgekMc">
                        <div>
                            <h1 className="sc-16qu7j7-0 gGRhvg">Review agreements</h1>
                        </div>
                        <div></div>
                    </div>
                    <div className="sc-8jxpf9-0 cGpaRz">
                        <div className="intro">
                            <p>Review this case's agreements status:</p><button 
                                className="Button-qe54pl-1 juboVv fsvgdR styled-button" type="button" onClick={handleShow}>Mark all unsigned as agreed</button>
                        </div>
                        <div className="hJuFrK">
                            <div className="bLshGM">
                                <div className="bNrycT">
                                    <div className="left-wrapper">
                                        <span className="title">
                                        <span className="Icon-wsq54u-0 bWtdYP"><AiOutlineFileImage></AiOutlineFileImage></span>Remote
                                            Second Opinion Services Agreement and Payment Authorization</span>
                                        <div className="sc-8jxpf9-3 kYZnDr"><span>Not signed</span></div>
                                    </div>
                                    <a className="sc-17inukh-5 hmXBUB"  onClick={() => pushToRoute("/admin/viewReviewAgreements")}>
                                        <span className="Icon-wsq54u-0 bWtdYP"><AiFillEye size={25}></AiFillEye>
                                     </span> View
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sc-1rnyb57-5 lfsvji"><a  className="Button-qe54pl-1 iIhlMQ styled-button" 
                            href="/admin/Contact">Contact patient</a></div>
                </div>
                <Modal show={show} onHide={handleClose}  size="md">
                    {/* <Modal.Header >
                    <Modal.Title>Request updates</Modal.Title>
                    </Modal.Header> */}
                    <Modal.Body>
                    <ContactPatient onSubmit={onLoginFormSubmit} />
                    </Modal.Body>
                    <Modal.Footer>
                
                    </Modal.Footer>
                </Modal>
                </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ReviewAgreements;
const ContactPatient = ({ onSubmit }) => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [cemail, setCEmail] = useState("");
    const [isOn, setIsOn] = React.useState(false);
    const options = [
        { value: 'Leads Medical Center', label: 'Leads Medical Center' },
        { value: 'Healthzen-Practice', label: 'Healthzen-Practice' },
        { value: 'Orthopedics', label: 'Orthopedics' }
      ]
    return (
        <Row>
          
        <Col md="12">
        
            <div className="Dialog-gai4ey-9 jtuVcG JS-has-wc JS-dialog" >
            <div className="Dialog__DialogAlwaysVisibleDiv-gai4ey-8 hvOez"><span
                className="Icon-wsq54u-0 Dialog__CloseIcon-gai4ey-1 bWtdYP lgtrXX JS-dialog-close JS-dialog-close"></span>
            <h2 className="Dialog__DialogTitle-gai4ey-4 cxtYXo">Confirm agreement</h2>
            </div>
                <div className="LoadingDiv__BlockContainer-sc-1g7ljba-0 gqDJHC Dialog__DialogContentWrapper-gai4ey-7 bSXPve">
                    <div className="Dialog__DialogContent-gai4ey-3 ifAPFT">
                        <p>Confirm the case contact’s agreement to all unsigned <a className="link">agreements</a>?</p>
                        <div className="sc-pb0d5p-0 ijRKGe">
                            <div className="main-content">
                                <div className="patient-name fs-exclude"><span className="Icon-wsq54u-0 bWtdYP"></span> David Andrew James
                                </div>
                                <div className="code"><b>Case ID:</b>NKJWM</div>
                                <div className="last-update">Last updated on <span className="nowrap">06/10/2022 at 11:15</span></div>
                            </div>
                        </div>
                        <p>This is recommended if the agreement was given offline.</p>
                        <p>Are you sure you want to proceed?</p>
                        <div className="TransitionDiv__BlockContainer-sc-1sh2xah-0 gjcdiO">
                        </div>
                    </div>
                    <div className="Dialog__DialogFooter-gai4ey-5 gJumhz"><Button 
                            className="Button-qe54pl-1 jYJwHA styled-button" type="button">Cancelar</Button>
                            <Button 
                            className="Button-qe54pl-1 ePXPMS styled-button" type="submit">Yes, confirm agreement</Button>
                        </div>
                </div>
            </div>
        
        </Col>
        </Row>
    )
    
  };