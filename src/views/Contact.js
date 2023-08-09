
import React,{useState} from "react";
import { CKEditor } from 'ckeditor4-react';

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
import {AiOutlineFilePdf,AiOutlineFileImage,AiOutlineUsergroupAdd,AiOutlineFile,AiOutlineDiff, AiOutlineUser ,AiOutlineFileText ,AiOutlineMail,AiOutlineVideoCamera,AiOutlineDollar,AiFillPlusCircle} from "react-icons/ai";
import Rightsidebar from "./Rightsidebar"
import {  Button, Form } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select'
import "bootstrap/dist/css/bootstrap.css";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
function Contact() {
  const [resume, setResume] = useState('')
  const [formValues, setFormValues] = useState([{ resume: ""}])
  const logEvent = (e) => {
    console.log("logEvent",e.editor.getData())
    // setResume(e.editor.getData())
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
            <CardHeader>
            </CardHeader>
            <CardBody>
                <div className="sc-1rnyb57-0 fVXGAv">
                <div className="sc-16qu7j7-3 hgekMc">
                <div><h1 className="sc-16qu7j7-0 gGRhvg">Contact patient
                </h1></div><div>
                </div></div>
                <Form >
                    <div className="sc-1rnyb57-1 hXUzMv"><p>
                    Request that the case contact or referring physician review and update this case.
                    </p></div><div className="sc-1rnyb57-2 hJuFrK">
                    <div className="Field__Container-p9woft-1 eFssct">
                        <label className="Field__Label-p9woft-2 cUWXcG">
                            Select the actions you would like them to complete:</label>
                            <div className="InputboxGroup-q49nwm-0 bCkiWs">
                                <label data-drag="false" className="SimpleCheckbox-am8pps-5 sc-ii7kon-9 iavLHe btTogQ">
                                    <Input type="checkbox" name="askedPatientDetails"   />
                                        <div className="SimpleCheckbox__CheckboxContent-am8pps-4 ixRnHN">
                                            <div className="SimpleCheckbox__TextLabelContainer-am8pps-3 fMqJid">
                                                {/* <div className="SimpleCheckbox__CheckboxPseudoInput-am8pps-0 hWuyvs">
                                                    <span className="Icon-wsq54u-0 bWtdYP"></span>
                                                    </div> */}
                                                <span className="SimpleCheckbox__TextLabel-am8pps-1 jIuLAR">Update patient &amp; contact details</span>
                                                </div>
                                            </div>
                                        </label>
                                    <label data-drag="false" className="SimpleCheckbox-am8pps-5 iavLHe">
                                    <Input type="checkbox" name="askedRecords"    />
                                    <div className="SimpleCheckbox__CheckboxContent-am8pps-4 lBVIL">
                                        <div className="SimpleCheckbox__TextLabelContainer-am8pps-3 fMqJid">
                                            {/* <div className="SimpleCheckbox__CheckboxPseudoInput-am8pps-0 hWuyvs">
                                            </div> */}
                                                <span className="SimpleCheckbox__TextLabel-am8pps-1 jIuLAR">Medical records and releases</span>
                                    </div>
                                    </div>
                                    </label>
                                    <label data-drag="false" className="SimpleCheckbox-am8pps-5 kvjUII">
                                        <Input type="checkbox" name="askForPayments" />
                                            <div disabled="" className="SimpleCheckbox__CheckboxContent-am8pps-4 kXOUUk">
                                                <div className="SimpleCheckbox__TextLabelContainer-am8pps-3 fMqJid">
                                                    
                                                <span className="SimpleCheckbox__TextLabel-am8pps-1 jIuLAR">Provide payment </span>
                                                </div>
                                            </div>
                                    </label>
                            </div>
                    </div>
                </div>
                {/* <div class="sc-1rnyb57-2 hJuFrK"><div class="sc-ii7kon-2 jyXFVi">
                                    <p>This contact has already signed the required 
                                        <a class="link" href="/admin/request/N63D1/agreements">agreements</a>.
                                        </p><div class="sc-ii7kon-10 kpibKu">
                                            <div class="sc-72ln41-0 cdhlDW">
                                                <span class="Icon-wsq54u-0 bWtdYP">
                                                </span>All agreements signed</div>
                                                </div>
                                                </div>
                </div> */}
                {/* <div class="TransitionDiv__BlockContainer-sc-1sh2xah-0 gjcdiO">
                    <div style="display: none;">
                        </div>
                        </div> */}
                {/* <div class="sc-1rnyb57-5 lfsvji">
                    <button tabindex="1" class="Button-qe54pl-1 hNmVql styled-button" type="submit">
                        <span class="Icon-wsq54u-0 bWtdYP"></span>Send request</button>
                        </div> */}
                </Form>
                    <div className="sc-1rnyb57-2 hJuFrK">
                    <div className="sc-ii7kon-2 jyXFVi">
                    <p>This contact has already signed the required 
                        <a className="link" href="/admin/request/N63D1/agreements">agreements</a>.
                        </p><div className="sc-ii7kon-10 kpibKu">
                            <div className="sc-72ln41-0 cdhlDW">
                                <span className="Icon-wsq54u-0 bWtdYP"></span>
                            All agreements signed</div>
                            </div>
                        </div>
                    </div>
                    <div className="TransitionDiv__BlockContainer-sc-1sh2xah-0 gjcdiO">
                               
                    </div>
                    <div className="sc-1rnyb57-5 lfsvji">
                        <button  className="Button-qe54pl-1 hNmVql styled-button" type="submit" onClick={handleShow}>
                        <AiOutlineMail></AiOutlineMail>
                       <span className="btnmr" > Send request</span> 
                        </button>
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
                           
        </div>
        </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Contact;
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
        
            <div className="Dialog-gai4ey-9 cRbjsh JS-has-wc JS-dialog" >
            <div className="Dialog__DialogAlwaysVisibleDiv-gai4ey-8 gIWiVc"><span
            className="Icon-wsq54u-0 Dialog__CloseIcon-gai4ey-1 bWtdYP lgtrXX JS-dialog-close JS-dialog-close"></span>
        <h2 className="Dialog__DialogTitle-gai4ey-4 hVkvkT">Request updates</h2>
    </div>
    <div className="LoadingDiv__BlockContainer-sc-1g7ljba-0 gqDJHC Dialog__DialogContentWrapper-gai4ey-7 jLAQmV">
        <div className="Dialog__DialogContent-gai4ey-3 ifAPFT">
            <p>You are about to request that the indicated contact complete the previously selected actions on this
                case:</p>
            <div className="sc-pb0d5p-0 ijRKGe">
                <div className="main-content">
                    <div className="patient-name fs-exclude"><span className="Icon-wsq54u-0 bWtdYP"></span> David Andrew James
                    </div>
                    <div className="code"><b>Case ID:</b>NKJWM</div>
                    <div className="last-update">Last updated on <span className="nowrap">06/10/2022 at 11:15</span></div>
                </div>
            </div>
            <div className="sc-1a8auos-1 iEwbXL">
                <span>An e-mail will be delivered to the case primary contact with your
                    request:</span> 
                    <a className="link" href="/admin/request/NKJWM/patient">Edit contacts</a>
            </div>
            <div className="InputboxGroup-q49nwm-0 sc-1a8auos-0 bCkiWs lbYgFQ"><label data-drag="false"
                    className="sc-h3wm4p-0 boFNvc">
                        <Input type="radio" 
                        className="Radiobox__HiddenInput-pelyer-0 jZzYQJ" value="true" />
                    <div className="sc-pzqd1o-0 brqWpc">
                        <h3><span><span className="fs-exclude">David Andrew James</span><span className="contact-type">
                                    (Patient)</span></span></h3>
                        <div className="contact-info">
                            <div className="fs-exclude"><strong>Email:</strong> davidjames@example.com</div>
                            <div className="fs-exclude"><strong>Phone:</strong> +1 (555) 123 456</div>
                        </div>
                    </div>
                </label>
                </div>
                    <div className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"><label
                    className="Field__Label-p9woft-2 cUWXcG">Message<span
                        className="Field__FieldDescription-p9woft-4 bNrjSU">This will be shown to the contact along with the
                        request.</span></label>
                        <Input placeholder="Insert custom message here."
                        className="TextInput__Input-yzpeng-1 iqXThv" data-hj-whitelist="true"  type="text" 
                       />
                    </div>
            <p>To avoid data loss, you will not be able to update the "Patient &amp; contact details" of this case until
                the contact is finished or the request is revoked.</p>
            <div className="TransitionDiv__BlockContainer-sc-1sh2xah-0 gjcdiO">
            </div>
        </div>
        <div className="Dialog__DialogFooter-gai4ey-5 clBDec"><Button 
                className="Button-qe54pl-1 hgDIaO styled-button" type="button">Cancel</Button><Button
                className="Button-qe54pl-1 hNmVql styled-button" type="submit"><AiOutlineMail size={25}></AiOutlineMail>
               <span className="btnmr">Request</span> 
                </Button>
                </div>
    </div>
</div>
        
        </Col>
        </Row>
    )
    
  };