
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
function VideoConsultation() {
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
            <div className="sc-rkx7yu-10 invUFa">
                    <div className="sc-1rnyb57-0 bOxyAZ">
                        <div className="sc-16qu7j7-3 iMHPqm">
                            <div>
                                <h1 className="sc-16qu7j7-0 gGRhvg">Video consultation</h1>
                            </div>
                            <div></div>
                        </div>
                        <div className="sc-1rnyb57-2 hWzldJ">
                            <p className="sc-utwpj7-2 dSjJWk">To set up a remote video consultation session, schedule it with the
                                appropriate parties and send them the following link, then click 'Launch' to join the session at the
                                scheduled time.</p>
                            <div className="Field__Container-p9woft-1 eFssct fs-unmask"><label
                                    className="Field__Label-p9woft-2 cUWXcG">Consultation link:</label>
                                <div className="sc-utwpj7-0 dliFWU">
                                <div className="sc-utwpj7-3 Wbbuz">
                                    <div className="sc-1r2a57n-8 iBeYBp">
                                        <span className="Icon-wsq54u-0 bWtdYP"></span>
                                    <Input 
                                            className="TextInput__Input-yzpeng-1 btRsWK TextInput-yzpeng-7 gyICpj" data-hj-whitelist="true" 
                                           
                                            defaultValue="https://member.healthzen.io/api/meet//?room=1u8tie&amp;jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJwdXJ2aWV3Iiwic3ViIjoibWVldC5qaXRzaSIsImlzcyI6InB1cnZpZXciLCJleHAiOjE2NzA0OTY3MjMsImlhdCI6MTY3MDQxMDMyMywicm9vbSI6IjF1OHRpZSJ9.ARucJI6GA6U_uh7g8TfRk61rpt0-voXGWuwkJzwZzCk" />
                                     <Button 
                                        className="sc-utwpj7-1 bWJWxM copy-to-clipboard"  onClick={() =>  navigator.clipboard.writeText('https://meet.purview.net/1u8tie?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJwdXJ2aWV3Iiwic3ViIjoibWVldC5qaXRzaSIsImlzcyI6InB1cnZpZXciLCJleHAiOjE2NzA0OTY3MjMsImlhdCI6MTY3MDQxMDMyMywicm9vbSI6IjF1OHRpZSJ9.ARucJI6GA6U_uh7g8TfRk61rpt0-voXGWuwkJzwZzCk')}>Copy
                                    </Button>
                                    </div>
                                   
                                </div>
                                    <Button className="Button-qe54pl-1 cwLMJH styled-button" type="button"><span
                                            className="Icon-wsq54u-0 bWtdYP"></span>Invite</Button>
                                </div>
                            </div>
                        </div>
                        <div className="sc-utwpj7-4 dZsCDr"><a  className="Button-qe54pl-1 dWfJVl styled-button" type=""
                                href="https://member.healthzen.io/api/meet//?room=1u7zsy&amp;jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJwdXJ2aWV3Iiwic3ViIjoibWVldC5qaXRzaSIsImlzcyI6InB1cnZpZXciLCJleHAiOjE2NjgwNzEyMjcsImlhdCI6MTY2Nzk4NDgyNywicm9vbSI6IjF1N3pzeSJ9.m0MwhTj7TeyHwGXppxOFHj-4GRn_52SUr4cGZ3vJFrY"
                                target="_blank"><span className="Icon-wsq54u-0 bWtdYP"></span>Launch</a></div>
                        <div className="sc-ki8u97-1 gGvIwp">
                            <div className="sc-1rnyb57-1 hXUzMv">
                                <h3>Consultation log</h3>
                            </div>
                            <div className="sc-1rnyb57-2 hWzldJ">
                            <Form >
    <div className="sc-1pvb7eo-0 sc-ki8u97-0 fIyuFq cCAYot"><span className="Icon-wsq54u-0 sc-1pvb7eo-1 bWtdYP fZNNPm"></span>
        <div className="SplitColumnsContainer-sc-1h4sw88-0 ifQTqf">
            <div className="Field__Container-p9woft-1 eFssct"><label className="Field__Label-p9woft-2 cUWXcG">Date<span
                        className="Field__Mandatory-p9woft-0 eOWGWb">*</span></label>
                        <Input placeholder="Ex: MM/DD/YYYY"
                    className="TextInput__Input-yzpeng-1 bFIQjr TextInput-yzpeng-7 gyICpj" data-hj-whitelist="true"
                   type="tel" /><span 
                    className="Icon-wsq54u-0 DatePicker__DatePickerInputIcon-sc-1wo8j4d-11 bWtdYP jvQmRG"></span></div>
            <div className="sc-gf8vsc-0 fmlLOT">
                <div className="Field__Container-p9woft-1 eFssct"><label className="Field__Label-p9woft-2 cUWXcG">Time</label>
                    <div className="inputs-wrapper">
                        <Input placeholder="HH"
                            className="TextInput__Input-yzpeng-1 bFIQjr TextInput-yzpeng-7 gyICpj" data-hj-whitelist="true"
                             type="text" />
                            <span className="divider"> : </span>
                        <Input
                            placeholder="MM" className="TextInput__Input-yzpeng-1 bFIQjr TextInput-yzpeng-7 gyICpj"
                            data-hj-whitelist="true" type="text" />
                        <div className="field-fix">
                            <div className="Field__Container-p9woft-1 eFssct">
                                <div className="Combobox__ComboboxInput-u2hz6i-1 hyfFua">AM<span
                                        className="Icon-wsq54u-0 Combobox__ComboboxDropdownIcon-u2hz6i-2 bWtdYP dNSGlG"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"><label
                className="Field__Label-p9woft-2 cUWXcG">Notes</label>
                <textarea
                placeholder="Ex: Patient had concerns regarding medical conditions."
                className="TextInput__Input-yzpeng-1 jSVYRy" data-hj-whitelist="true"  type="text"
                rows="1"></textarea></div>
        <div className="Field__Container-p9woft-1 eFssct"><label className="Field__Label-p9woft-2 cUWXcG">Participants<span
                    className="Field__Mandatory-p9woft-0 eOWGWb">*</span></label>
            <div className="InputboxGroup-q49nwm-0 dpeRId"><label data-drag="false"
                    className="SimpleCheckbox-am8pps-5 iavLHe">
                        <Input type="checkbox" 
                        className="Checkbox__HiddenInput-sc-19o1zxv-0 bLPSAS" />
                    <div className="SimpleCheckbox__CheckboxContent-am8pps-4 gFyeFh">
                        <div className="SimpleCheckbox__TextLabelContainer-am8pps-3 fMqJid">
                            <div className="SimpleCheckbox__CheckboxPseudoInput-am8pps-0 hWuyvs"></div><span
                                className="SimpleCheckbox__TextLabel-am8pps-1 jIuLAR">Dilip Pithiya (Patient)</span>
                        </div>
                    </div>
                </label>
                <label data-drag="false" className="SimpleCheckbox-am8pps-5 iavLHe">
                    <Input type="checkbox"
                        className="Checkbox__HiddenInput-sc-19o1zxv-0 bLPSAS" />
                    <div className="SimpleCheckbox__CheckboxContent-am8pps-4 gFyeFh">
                        <div className="SimpleCheckbox__TextLabelContainer-am8pps-3 fMqJid">
                            <div className="SimpleCheckbox__CheckboxPseudoInput-am8pps-0 hWuyvs"></div><span
                                className="SimpleCheckbox__TextLabel-am8pps-1 jIuLAR">Other</span>
                        </div>
                    </div>
                </label></div>
        </div>
        <div className="TransitionDiv__BlockContainer-sc-1sh2xah-0 gjcdiO">
        </div>
        <div className="sc-ki8u97-2 cesJSX"><Button  className="Button-qe54pl-1 jYJwHA styled-button"
                type="button">Cancel</Button><Button  className="Button-qe54pl-1 ePXPMS styled-button"
                type="submit">Save to log</Button></div>
    </div>
</Form>
                                <Button 
                                    className="Button-qe54pl-1 sc-18mwo6g-0 eXugtO iiNBRZ styled-button" type="button"><span
                                        className="Icon-wsq54u-0 bWtdYP"></span>Register a finished consultation
                                </Button>
                            </div>
                        </div>
                    </div>
                    {/* <div className="sc-1u5rk2a-0 gVYWdu"><a href="https://www.purview.net/" target="_blank">
                        <img
                                src="/static/media/favicon.4e12ab0e.png" alt="Purview Logo" /></a>
                        <div>
                            <div><span className="main-text">Powered by <a href="https://www.purview.net/"
                                        target="_blank">Purview</a></span> © <span>2022</span>. All Rights Reserved.</div>
                        </div>
                    </div> */}
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

export default VideoConsultation;
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