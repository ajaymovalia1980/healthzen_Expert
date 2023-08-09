
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
import {AiOutlineCheck,AiFillEye,AiOutlineFilePdf,AiOutlineFileImage,AiOutlineUsergroupAdd,AiOutlineFile,AiOutlineDiff, AiOutlineUser ,AiOutlineFileText ,AiOutlineMail,AiOutlineVideoCamera,AiOutlineDollar,AiFillPlusCircle} from "react-icons/ai";
import LeftsidebarCase from "./LeftsidebarCase"
import {  Button, Form } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select'
import "bootstrap/dist/css/bootstrap.css";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
function NotificationSettings() {
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
            <LeftsidebarCase>

            </LeftsidebarCase>
           
          </Col>
          <Col md="9">
          <Card className="card-user">
          
            <CardBody>
            <div className="sc-rkx7yu-10 jawySI">
    <div className="sc-1rnyb57-0 sc-l7ot0i-0 bOxyAZ gIApHR">
        <div className="sc-1rnyb57-2 hWzldJ">
            <h3>Notification settings</h3>
            <p>Set defaults for email notifications for the following parties. Starred notifications can be toggled
                manually when performing the action.</p>
            <Form >
                <div className="SplitColumnsContainer-sc-1h4sw88-0 sc-l7ot0i-1 euHyId kwQNBI">
                    <div>
                        <h4>Case contact or referring physician</h4>
                        <p>Notify by email when an administrator:</p><label data-drag="false"
                            className="ToggleCheckbox-sc-11ob8ah-4 egvBNw">
                              <Input type="checkbox" name="caseRejected"
                                  className="Checkbox__HiddenInput-sc-19o1zxv-0 bLPSAS" />
                            <div className="ToggleCheckbox__ToggleLabel-sc-11ob8ah-2 kZEOXd">Rejects pending request</div>
                            <div className="ToggleCheckbox__Toggle-sc-11ob8ah-1 jylHKA">
                            
                            </div>
                        </label>
                        <label data-drag="false" className="ToggleCheckbox-sc-11ob8ah-4 egvBNw">
                          <Input
                                type="checkbox" name="caseAccepted"  
                                className="Checkbox__HiddenInput-sc-19o1zxv-0 bLPSAS" />
                            <div className="ToggleCheckbox__ToggleLabel-sc-11ob8ah-2 kZEOXd">Accepts pending request</div>
                            <div className="ToggleCheckbox__Toggle-sc-11ob8ah-1 jylHKA"></div>
                        </label><label data-drag="false" className="ToggleCheckbox-sc-11ob8ah-4 egvBNw">
                          <Input
                                type="checkbox" name="caseArchived"  
                                className="Checkbox__HiddenInput-sc-19o1zxv-0 bLPSAS" />
                            <div className="ToggleCheckbox__ToggleLabel-sc-11ob8ah-2 kZEOXd">Archives case</div>
                            <div className="ToggleCheckbox__Toggle-sc-11ob8ah-1 jylHKA"></div>
                        </label><label data-drag="false" className="ToggleCheckbox-sc-11ob8ah-4 egvBNw">
                          <Input
                                type="checkbox" name="caseCreated"  
                                className="Checkbox__HiddenInput-sc-19o1zxv-0 bLPSAS" />
                            <div className="ToggleCheckbox__ToggleLabel-sc-11ob8ah-2 kZEOXd">Creates new case</div>
                            <div className="ToggleCheckbox__Toggle-sc-11ob8ah-1 jylHKA"></div>
                        </label><label data-drag="false" className="ToggleCheckbox-sc-11ob8ah-4 egvBNw">
                          <Input
                                type="checkbox" name="reportReady"  
                                className="Checkbox__HiddenInput-sc-19o1zxv-0 bLPSAS" />
                            <div className="ToggleCheckbox__ToggleLabel-sc-11ob8ah-2 kZEOXd">Completes case report*</div>
                            <div className="ToggleCheckbox__Toggle-sc-11ob8ah-1 jylHKA"></div>
                        </label>
                    </div>
                    <div>
                        <h4>Expert physician</h4>
                        <p>Notify by email when an administrator:</p><label data-drag="false"
                            className="ToggleCheckbox-sc-11ob8ah-4 egvBNw">
                              <Input type="checkbox" name="assignExpert"
                                  className="Checkbox__HiddenInput-sc-19o1zxv-0 bLPSAS" />
                            <div className="ToggleCheckbox__ToggleLabel-sc-11ob8ah-2 kZEOXd">Assigns case to expert*</div>
                            <div className="ToggleCheckbox__Toggle-sc-11ob8ah-1 jylHKA"></div>
                        </label><label data-drag="false" className="ToggleCheckbox-sc-11ob8ah-4 egvBNw">
                          <Input
                                type="checkbox" name="unassignExpert"  
                                className="Checkbox__HiddenInput-sc-19o1zxv-0 bLPSAS" />
                            <div className="ToggleCheckbox__ToggleLabel-sc-11ob8ah-2 kZEOXd">Unassigns case from expert*
                            </div>
                            <div className="ToggleCheckbox__Toggle-sc-11ob8ah-1 jylHKA"></div>
                        </label>
                    </div>
                </div>
                <div className="sc-l7ot0i-2 gcZzSr"><Button  className="Button-qe54pl-1 jYJwHA styled-button"
                        type="button">Reset changes</Button><Button 
                        className="Button-qe54pl-1 ePXPMS styled-button" type="submit">Save changes</Button></div>
            </Form>
        </div>
    </div>
</div>
                <Modal show={show} onHide={handleClose}  size="md">
                   
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

export default NotificationSettings
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
      const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const onLoginFormSubmit = (e) => {
        e.preventDefault();
        handleClose();
    };
    return (
        <Row>
          
        <Col md="12">
        
    <Form className="DialogContainer__DialogCenter-wendlg-2 dZXIEt JS-has-wc" >
        
        <div className="Dialog-gai4ey-9 jtuVcG JS-has-wc JS-dialog" >
            <div className="Dialog__DialogAlwaysVisibleDiv-gai4ey-8 hvOez"><span
                    className="Icon-wsq54u-0 Dialog__CloseIcon-gai4ey-1 bWtdYP lgtrXX JS-dialog-close JS-dialog-close"></span>
                <h2 className="Dialog__DialogTitle-gai4ey-4 cxtYXo">Create new signature</h2>
            </div>
            <div className="LoadingDiv__BlockContainer-sc-1g7ljba-0 gqDJHC Dialog__DialogContentWrapper-gai4ey-7 bSXPve">
                <div className="Dialog__DialogContent-gai4ey-3 ifAPFT">
                    <div className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"><label
                            className="Field__Label-p9woft-2 cUWXcG">Display name<span
                                className="Field__Mandatory-p9woft-0 eOWGWb">*</span></label>
                                <Input
                            placeholder="Ex: John Doe" className="TextInput__Input-yzpeng-1 bFIQjr" data-hj-whitelist="true"
                             type="text" /></div>
                    <div className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"><label
                            className="Field__Label-p9woft-2 cUWXcG">Description</label>
                            <textarea
                            placeholder="Ex: General practitioner" className="TextInput__Input-yzpeng-1 daPGFg"
                            data-hj-whitelist="true"  type="text"  ></textarea>
                    </div>
                    <div className="Field__Container-p9woft-1 eFssct sc-sx0pb6-8 lbapjN"><label
                            className="Field__Label-p9woft-2 cUWXcG">Digital signature<span
                                className="Field__FieldDescription-p9woft-4 bNrjSU">Select an option to electronically sign
                                your reports</span></label>
                        <div className="InputboxGroup-q49nwm-0 bnipir"><label data-drag="false"
                                className="TabRadiobox-sc-1vu3bcn-2 buNzDE">
                                <Input type="radio"
                                    className="Radiobox__HiddenInput-pelyer-0 jZzYQJ" 
                                    /><a
                                    className="TabRadiobox__InnerButton-sc-1vu3bcn-1 JduRt Button-qe54pl-1 TabRadiobox__TabButton-sc-1vu3bcn-0 jYJwHA cPnkLT styled-button"
                                    type="">Upload a signature</a></label><label data-drag="false"
                                className="TabRadiobox-sc-1vu3bcn-2 buNzDE">
                                    <Input type="radio"
                                    className="Radiobox__HiddenInput-pelyer-0 jZzYQJ" /><a
                                   
                                    className="TabRadiobox__InnerButton-sc-1vu3bcn-1 JduRt Button-qe54pl-1 TabRadiobox__TabButton-sc-1vu3bcn-0 jYJwHA jQTaTO styled-button"
                                    type="">Draw a signature</a></label></div>
                        <div className="Field__Container-p9woft-1 eFssct sc-sx0pb6-9 kBDlQX"><label
                                className="Field__Label-p9woft-2 cUWXcG">Upload your signature<span
                                    className="Field__FieldDescription-p9woft-4 bNrjSU">You can upload images on format JPEG
                                    or PNG</span></label>
                            <div className="sc-1ojytqt-1 sc-sx0pb6-5 hYkokQ eHWayJ">
                                <div>Click or drag and drop an image file here to upload it.</div>
                                <Input
                                    type="file" className="withFormImageInput__FileInput-o7trbb-0 iA-dYhO" /><span
                                    className="Icon-wsq54u-0 bWtdYP"></span>
                            </div>
                        </div>
                    </div>
                    <div className="TransitionDiv__BlockContainer-sc-1sh2xah-0 gjcdiO">
                       
                    </div>
                </div>
                <div className="Dialog__DialogFooter-gai4ey-5 gJumhz"><button 
                        className="Button-qe54pl-1 jYJwHA styled-button" type="button">Cancel</button><button 
                        className="Button-qe54pl-1 ePXPMS styled-button" type="submit">Save</button></div>
            </div>
        </div>
    </Form>

        </Col>
        </Row>
    )
    
  };


