
import React,{useState} from "react";
import { CKEditor } from 'ckeditor4-react';
import { useHistory } from "react-router-dom";
import ServiceStore from "../util/ServiceStore";
import axios from "axios";
import {
	MedicalRecordimageURl
	
} from "../util/constants"
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
import {AiOutlineCaretDown,AiOutlineDownload,AiFillEye,AiOutlineFilePdf,AiOutlineFileImage,AiOutlineUsergroupAdd,AiOutlineFile,AiOutlineDiff, AiOutlineUser ,AiOutlineFileText ,AiOutlineMail,AiOutlineVideoCamera,AiOutlineDollar,AiFillPlusCircle} from "react-icons/ai";
import Rightsidebar from "./Rightsidebar"
import {  Button, Form } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select'
import "bootstrap/dist/css/bootstrap.css";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
function MedicalRecords() {
  const [resume, setResume] = useState('')
  const [formValues, setFormValues] = useState([{ resume: ""}])
  const logEvent = (e) => {
    console.log("logEvent",e.editor.getData())
  }
  const [openMenu, setOpenMenu] = useState(false)
  let history = useHistory();
  const [file, setFile] = useState('')
  const [fileList, setFileList] = useState([])

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
  React.useEffect(() => {
    const detail = history.location.state?.detail
    console.log("detail",detail)
          const methods = "/fileMedicalrecord/getFileMedicalRecordByID"
          const data = {caseId :detail.id }
              new ServiceStore().GetDataBYFilter(methods,data).then((res) => {
                console.log("res.response",res.response)
                if(res.response.status == 1){
                  
                  setFileList(res.response.data)

                  
                }
              });
    
  }, []);
  const onFileSelect = event => {
    const file = event.target.files[0];
    console.log("file",file)
    if (event.target.files[0].size < 100000000) {
        const reader = new FileReader();
        reader.readAsDataURL(file); // toBase64
        setFile(file)
        // reader.onload = () => {
        //   // this.imagess = reader.result // base64 Image src
        // };
      /* checking size here - 2MB */ 
      const formData = new FormData();
      formData.append("file", file, file.name);
      const method  = '/fileMedicalrecord/fileupload'
        new ServiceStore().UploadFile(method,formData).then((res) => {
        console.log("res",res.data)
        const detail = history.location.state?.detail
        console.log("data",detail)
        if(res.data){
            const dataobj  =   {
                "patientUID" : detail.id ? detail.id : "",
                "patientMRN" : "",
                "caseUID" : detail.requestCode ? detail.requestCode : "",
                "recordClass" : "Clinical",
                "format" : "PDF",
                "originalFileName" :res.data.data.originalname ? res.data.data.originalname : "",
                "fileExtension" : "pdf",
                "fileType" : res.data.data.mimetype ?  res.data.data.mimetype :"",
                "fileSize" : res.data.data.size ?  res.data.data.size :"",
                "state" : "Submitted",
                "notes" : {
                  "note" : ""
                },
                "metadata" : { },
                "recordContext" : { },
                "stateContext" : {
                  "Submitted" : {
                    "by" : localStorage.getItem("username"),
                    "on" : new Date().getTime()
                  }
                },
                "info" : {
                  "type" : "NonDicomFile",
                  "fileName" : "1788a64b-94e6-36b9-b8f5-e67a8c693122",
                  "fileExtension" : "pdf",
                  "fileType" : "pdf",
                  "fileSize" : res.data.data.size ?  res.data.data.size :"",
                  "uid" : "case_Q080X_c41b8322-20a5-415f-97b0-62836e473512",
                  "description" : res.data.data.originalname ? res.data.data.originalname : "",
                  "docType" : "",
                  "locationFormId" : 0,
                  "uploadDate" : new Date().getTime()
                },
                "quarantined" : false,
                "whenCreatedEpochMilli" : new Date().getTime(),
                "whenModifiedEpochMilli" : new Date().getTime(),
              } 

              const methods = "/fileMedicalrecord/addFileMedicalRecord"
              new ServiceStore().InsertData(methods,dataobj).then((res) => {
                if(res.response.status == 1){
                  // React.useEffect(() => {
                    const detail = history.location.state?.detail
                    console.log("detail",detail)
                          const methods = "/fileMedicalrecord/getFileMedicalRecordByID"
                          const data = {caseId :detail.id }
                              new ServiceStore().GetDataBYFilter(methods,data).then((res) => {
                                console.log("res.response",res.response)
                                if(res.response.status == 1){
                                  
                                  setFileList(res.response.data)
                
                                  
                                }
                              });
                    
                  // }, []);
                }
              });
       }
       
        });

    }else{
      this.imgeerror = 'Please Select Max 100MB Size File'
    }

    

    
  }
  const onButtonClick = (element) => {
  //   console.log("element",element)
     const path = MedicalRecordimageURl+element.originalFileName
  
    // //  window.location.href = path
     window.open(path, "_system");

}
let buttonSubmit = () =>{
  const dataid = history.location.state?.detail.id
  const methods = '/case/FindCaseByID/'
  new ServiceStore().GetDataByID(methods,dataid).then((res) => {
      const detail = res.data
      history.push({
        pathname: '/admin/ClinicalInformation',
        search: '?id='+detail.requestCode,
        state: { detail: detail },
      })
  })
}

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
            <div className="sc-1rnyb57-0 bOxyAZ">
    <div className="sc-16qu7j7-3 iMHPqm">
        <div>
            <h1 className="sc-16qu7j7-0 gGRhvg">Medical record files</h1>
        </div>
        <div></div>
    </div>
    <div className="sc-1rnyb57-1 hXUzMv">
        <div className="sc-1yasssh-3 fHQKgt">Let's collect medical records related to this case.<p
                className="sc-1yasssh-15 iTrFgZ"> These may include: medical imaging or digital pathology, radiology or
                pathology reports, exam or office notes, other medical reports, videos or pictures of symptoms, etc.
            </p>
        </div>
    </div>
    <div className="sc-1rnyb57-2 hWzldJ">
        <div className="willUseIsSticky__SentinelStyle-sc-1nsyca-0 iwwSlu sc-1ojytqt-15 fQNbPQ"></div>
        <div>
            <div className="sc-1ojytqt-0 ihqdtr">
                <div className="sc-1ojytqt-1 hYkokQ">
                    <div>
                        <a  className="Button-qe54pl-1 fsFIEf sc-1ojytqt-16 gVWyHD styled-button"
                           >
                                {/* <Input type="file"  />Select files</a> */}
                                <Input type="file" className="withFormImageInput__FileInput-o7trbb-0 iA-dYhO"   onChange={onFileSelect}/>Select files</a>

                            <a 
                            className="Button-qe54pl-1 fsFIEf sc-1ojytqt-17 zzMfm styled-button" >
                        <Input
                                webkitdirectory="true" type="file"  />Select folders or discs</a>
                        <div>Drag and drop them into this box or <a className="light-link">Add studies from Radiology
                                Worklist</a></div>
                    </div>
                </div>
                <div className="TransitionDiv__BlockContainer-sc-1sh2xah-0 gjcdiO">
                </div>
            </div>
            <div data-rfd-droppable-id="board" data-rfd-droppable-context-id="3" className="sc-1ojytqt-22 hqIIQQ">
                <div mode="" className="sc-1ojytqt-6 jPvXMg">
                    <div data-rfd-draggable-context-id="3" data-rfd-draggable-id="Pathology"
                        className="sc-1ojytqt-8 icyIhj">
                        <div className="sc-1ojytqt-7 dfZSSX">
                            <div mode="" className="sc-1ojytqt-10 eXpqKQ">
                                <div role="button" aria-describedby="rfd-hidden-text-3-hidden-text-24"
                                    data-rfd-drag-handle-draggable-id="Pathology" data-rfd-drag-handle-context-id="3"
                                    draggable="false"><span className="Icon-wsq54u-0 sc-1ojytqt-9 bWtdYP jNxUZN"></span>
                                </div>
                                <div className="nameWrapper"><span>Pathology <span
                                            className="Icon-wsq54u-0 bWtdYP edit"></span></span></div>
                                <div className="line"></div><span className="collapseOption"><span
                                        className="light-link gray">Collapse</span></span>
                            </div>
                            <div data-rfd-droppable-id="Pathology" data-rfd-droppable-context-id="3"
                                className="sc-1ojytqt-25 CYrgR">
                                <div></div>
                                <div>
                                    <div>
                                        <div className="sc-1ojytqt-11 iZXCES">This group is empty. <a>Remove group</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div mode="" className="sc-1ojytqt-6 jPvXMg">
                    <div data-rfd-draggable-context-id="3" data-rfd-draggable-id="Radiology"
                        className="sc-1ojytqt-8 icyIhj">
                        <div className="sc-1ojytqt-7 dfZSSX">
                            <div mode="" className="sc-1ojytqt-10 eXpqKQ">
                                <div role="button" aria-describedby="rfd-hidden-text-3-hidden-text-24"
                                    data-rfd-drag-handle-draggable-id="Radiology" data-rfd-drag-handle-context-id="3"
                                    draggable="false"><span className="Icon-wsq54u-0 sc-1ojytqt-9 bWtdYP jNxUZN"></span>
                                </div>
                                <div className="nameWrapper"><span>Radiology <span
                                            className="Icon-wsq54u-0 bWtdYP edit"></span></span></div>
                                <div className="line"></div><span className="collapseOption"><span
                                        className="light-link gray">Collapse</span></span>
                            </div>
                            <div data-rfd-droppable-id="Radiology" data-rfd-droppable-context-id="3"
                                className="sc-1ojytqt-25 CYrgR" >
                                <div ></div>
                                <div >
                                    <div >
                                        <div className="sc-1ojytqt-11 iZXCES">This group is empty. <a>Remove group</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div  className="sc-1ojytqt-6 jPvXMg">
                    <div data-rfd-draggable-context-id="3" data-rfd-draggable-id="Clinical" className="sc-1ojytqt-8 icyIhj">
                        <div className="sc-1ojytqt-7 dfZSSX">
                            <div  className="sc-1ojytqt-10 eXpqKQ">
                                <div  role="button" aria-describedby="rfd-hidden-text-3-hidden-text-24"
                                    data-rfd-drag-handle-draggable-id="Clinical" data-rfd-drag-handle-context-id="3"
                                    draggable="false"><span className="Icon-wsq54u-0 sc-1ojytqt-9 bWtdYP jNxUZN"></span>
                                </div>
                                <div className="nameWrapper"><span>Clinical <span
                                            className="Icon-wsq54u-0 bWtdYP edit"></span></span></div>
                                <div className="line"></div><span className="collapseOption"><b>0 records</b> <span
                                        className="sc-1ojytqt-29 dBIhyl light-link gray">Expand</span></span>
                            </div>
                            
                            {fileList.map((element, index) => (
                              <div key={index}  data-rfd-droppable-id="Clinical" data-rfd-droppable-context-id="0" className="sc-1ojytqt-25 CYrgR">
                                <div>
                                    <div data-rfd-draggable-context-id="0" data-rfd-draggable-id="76043"  className="sc-2eyrtx-0 cgAnAH"><span
                                            className="Icon-wsq54u-0 sc-2eyrtx-3 bWtdYP bFaYOY"><AiOutlineFilePdf></AiOutlineFilePdf></span>
                                        <div className="sc-2eyrtx-2 brxvrt">
                                            <div className="sc-2eyrtx-4 hhrCYs fs-exclude"><b className="nowrap">Description: </b>
                                                <div className="sc-1wxwmu0-0 czdWVW">{element.info.description}<span
                                                        className="Icon-wsq54u-0 bWtdYP"></span></div>
                                            </div><a className="sc-15xqfyx-2 gZhinB light-link">Add note</a>
                                            <div className="sc-pt0z2q-4 hPhjEv JS-blur-container"><a 
                                                    className="sc-pt0z2q-5 dioJTl light-link">Add tag</a></div>
                                        </div>
                                        <div className="sc-2eyrtx-7 cDXKPj">
                                            <div className="buttons-wrapper">
                                                  <a   onClick={() => onButtonClick(element)}
                                                    className="sc-2eyrtx-10 fWIDKh"> 
                                                      <span className="Icon-wsq54u-0 bWtdYP">
                                                        <AiOutlineDownload></AiOutlineDownload></span>
                                                        Download</a>
                                                        <a  onClick={() => onButtonClick(element)}
                                                    className="sc-2eyrtx-10 fWIDKh"><span className="Icon-wsq54u-0 bWtdYP"><AiFillEye></AiFillEye></span>View</a><a
                                                    className="sc-2eyrtx-10 sc-2eyrtx-11 fWIDKh eupzbs"><span
                                                        className="Icon-wsq54u-0 sc-2eyrtx-6 bWtdYP"><AiOutlineCaretDown></AiOutlineCaretDown></span></a></div>
                                            <div className="sc-2eyrtx-19 dHwLpe">
                                                <div className="sc-2eyrtx-8 bZGLgz">Uploaded: {element.createdAt }</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
    
                              </div>
                              ))}
                        </div>
                    </div>
                </div>
            </div>
            <Button 
                className="Button-qe54pl-1 sc-1ojytqt-3 sc-1ojytqt-4 eXugtO eLVJtb gJdevk styled-button" type="button"><span
                    className="Icon-wsq54u-0 bWtdYP"></span>Add record group</Button>
        </div>
    </div>
    <div className="sc-1rnyb57-5 jKPFjl">
        <Button  onClick={buttonSubmit} className="Button-qe54pl-1 jYJwHA styled-button"
            type="button"><a>Skip</a></Button></div>
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

export default MedicalRecords
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