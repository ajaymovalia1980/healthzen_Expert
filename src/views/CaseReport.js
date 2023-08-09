
import React,{useState} from "react";
import { CKEditor } from 'ckeditor4-react';
import { useHistory } from "react-router-dom";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { renderToString } from "react-dom/server";

import {
	SignatureimageuRl
	
} from "../util/constants"
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
import {AiOutlineCheck,AiFillEye,AiOutlineFilePdf,AiOutlineFileImage,AiOutlineUsergroupAdd,AiOutlineFile,AiOutlineDiff, AiOutlineUser ,AiOutlineFileText ,AiOutlineMail,AiOutlineVideoCamera,AiOutlineDollar,AiFillPlusCircle} from "react-icons/ai";
import Rightsidebar from "./Rightsidebar"
import {  Button, Form } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select'
import "bootstrap/dist/css/bootstrap.css";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import ServiceStore from "../util/ServiceStore";

function CaseReport() {
  const [resume, setResume] = useState('')
  const [formValues, setFormValues] = useState([{ resume: ""}])
  const [expertWiseReview, setexpertWiseReview] = useState({}); 

  const logEvent = (e) => {
    console.log("logEvent",e.editor.getData())
    // setResume(e.editor.getData())
  }
  const [assigncase, setAssigncase] = React.useState([]);

  const [CaseDetails, setCaseDetails] = useState({});  

  React.useEffect(() => {
    const dataid = history.location.state?.detail.id
    const loginuser = JSON.parse(localStorage.getItem("loginuser"))

  console.log("data",dataid)
  const methods = '/case/FindCaseByID/'
  new ServiceStore().GetDataByID(methods,dataid).then((res) => {
      const detail = res.data
      console.log("detail",detail)
      setCaseDetails(detail)      
      if(res.data.expertWiseReview.length > 0){
        let expertWiseReviewlist = res.data.expertWiseReview.filter( function (user) {
            if(user.expertID == loginuser.id){
                return user
            
            }
        })
        console.log("expertWiseReviewlist",expertWiseReviewlist)
      setexpertWiseReview(expertWiseReviewlist[0])
      }
            
      
   

  })
    }, []);
    const reportTemplateRef = React.useRef(null);

    const handleGeneratePdf = () => {
        const doc = new jsPDF({
            format: 'a4',
            unit: 'px',
        });
        // const doc = new jsPDF("p", "mm", "a4");

       
        // // Adding the fonts.
        // doc.setFont('Inter-Regular', 'normal');
    
        // doc.html(reportTemplateRef.current, {
        //     async callback(doc) {
        //         await doc.save('document');
        //     },
        // });

        const input = document.getElementById("reportTemplateRef");
        // const pdf = new jsPDF({ unit: "px", format: "letter", userUnit: "px" });
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.setFont("Helvetica");
        pdf.setFontSize(50);
        pdf.setTextColor(50);
        pdf.html(input, { html2canvas: { scale: 0.57 } }).then(() => {
          pdf.save("test.pdf");
        });
    };
    // const getCaseAssignByID = (id) => {
    //     const methods = '/expertassignment/getExpertAssignRecordByID/'
    //     console.log("id",id)
    //     new ServiceStore().GetDataByID(methods,id).then((res) => {
    //         const listaaray = []
    //         listaaray.push(res.data)
    //         const list = res.data
    //         console.log("list",listaaray)
    //         setAssigncase(listaaray)
            
           
    //     })
    //   }
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
    handleClose();
  };

  const onButtonClick = (element) => {
    //   console.log("element",element)
       const path = MedicalRecordimageURl+element.originalFileName
      // //  window.location.href = path
       window.open(path, "_system");
  
  }
  const RouterChange = () => {
    const dataobj =  history.location.state?.detail
    console.log("dataobj",dataobj)
    history.push({
        pathname: '/admin/ExpertReview',
        search: '?id='+dataobj.requestCode,
        state: { detail: dataobj },
      });
}

const CaseRouterChange = () => {
    const dataobj =  history.location.state?.detail
    console.log("dataobj",dataobj)
    history.push({
        pathname: '/admin/ContactDetails',
        search: '?id='+dataobj.requestCode,
        state: { detail: dataobj },
      });
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
            <div className="sc-rkx7yu-10 invUFa">
                <div className="sc-1rnyb57-0 cKwJxb">
            <div className="sc-16qu7j7-3 slyWv">
            <div>
                <h1 className="sc-16qu7j7-0 gGRhvg">Case report</h1>
            </div>
            {expertWiseReview?.state != 'UNDER_REVIEW' &&
            <div>
                <div className="sc-17u96k-1 ehToIp"><span className="Icon-wsq54u-0 bWtdYP"></span><span>Review already
                        submitted</span></div>
                <button   onClick={() => RouterChange()} 
                    className="Button-qe54pl-1 sc-1ssfy4t-0 cMqAGO cfoUdC styled-button" type="button">View answers</button>
            </div>
            }
            {expertWiseReview?.state == 'UNDER_REVIEW' && 
                    <div>
                        <button  onClick={() => RouterChange()} className="Button-qe54pl-1 cMqAGO styled-button" type="button">Edit answers
                        </button><button onClick={() => handleShow()}  className="Button-qe54pl-1 beryvo styled-button" type="button">Submit review
                        </button>
                    </div>
            }
        </div>
        {expertWiseReview?.state == 'CASE_REVIEWED' && 
        <div className="sc-1rnyb57-6 hRECuN">
                    <div className="left-wrapper">
                        <button onClick={() => CaseRouterChange()}  className="Button-qe54pl-1 cMqAGO styled-button" type="button">Go to
                            overview</button></div>
                    <div className="right-wrapper">
                        <a className="Button-qe54pl-1 iywgEP styled-button" onClick={handleGeneratePdf}
                           ><span
                                className="Icon-wsq54u-0 bWtdYP"></span>Save PDF</a><a 
                            className="Button-qe54pl-1 iywgEP styled-button" 
                            type="" target="_blank"
                            href="/api/report/preview?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2Nlc3NUeXBlIjoiRVhQRVJUIiwiZXhwZXJ0SWQiOiIzNjgiLCJsb2dpbiI6ImFqYXlAcWxvZ2ljLmlvIiwiZXhwIjoxNjc0MDQwNTI2LCJpYXQiOjE2NzM5NTQxMjYsInByb3ZpZGVyTmFtZSI6ImhlYWx0aHplbiJ9.qLFxa8seV3BWXZTfcKmd-MIDHFz0WWNGCk3U26m9Jco&amp;requestId=2384"><span
                                className="Icon-wsq54u-0 bWtdYP"></span>Print</a><button 
                            className="Button-qe54pl-1 eOodRp styled-button" type="button"><span
                                className="Icon-wsq54u-0 bWtdYP"></span>Share</button>
                    </div>
        </div>
}
        <div ref={reportTemplateRef} className="sc-16n3hkv-0 fWMJoB" id="reportTemplateRef" >
            <div className="report-page"
            >
                <div className="sc-1mhdh3d-2 cwdJBV">
                    <div className="organization-logo"></div>
                    <div className="organization-details"><span className="organization-name">Healthzen</span>
                        <div className="address-details"></div>
                        <div className="email">Email: </div>
                    </div>
                </div>
                <div className="sc-16n3hkv-1 fTAieZ">
                    <div className="cover-filler">
                        <div className="sc-1mhdh3d-3 cfpdLc">
                            {CaseDetails && 
                                <div className="sc-1mhdh3d-4 jkprEK">
                                    <div className="title">Case report</div>
                                    <div className="report-date"> {new Date(CaseDetails?.updatedAt).toLocaleString()}<span className="case-id"> (Case ID: {CaseDetails.patientInfo?.requestCode} )</span></div>
                                    <div className="patient-info">
                                        <div className="name"><label>Patient</label>
                                            <div><strong className="fs-exclude">{CaseDetails.patientInfo?.firstName}  {CaseDetails.patientInfo?.lastName}</strong></div>
                                        </div>
                                        <div className="dob"><label>Date of birth</label>
                                            <div><strong className="fs-exclude">{CaseDetails.patientInfo?.dob} ( years old)</strong></div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="sc-1mhdh3d-6 jRUvwT">
                            <div className="sc-1mhdh3d-7 dSknGv">Created with Purview Expert View™</div>
                            <div className="sc-1mhdh3d-9 eFpYjj">
                                <div className="field-content"><strong>Disclaimer:</strong> The information contained in this
                                    report is privileged and confidential and/or protected health information (PHI) and may
                                    be subject to protection under the law. This report is intended for the sole use of the
                                    individual or entity to whom it is intended. If you are not the intended recipient, you
                                    are notified that any use, dissemination, distribution, printing or copying of this
                                    transmission is strictly prohibited and may subject you to criminal or civil penalties.
                                    If you have received this report in error, please delete both the report and any email
                                    communication. If you continue to receive correspondence in error, please report your
                                    accidental involvement.</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="remove-on-clear" ></div>
                    <div className="page-filler" ></div>
                    <div className="page-break"><span className="page-counter"></span>
                        <div className="clear-border clear-border-top"></div>
                        <div className="clear-border clear-border-bottom"></div>
                    </div>
                   
                    <div className="has-broken NODE-TO-BREAK"></div>
                    <div className="sc-1a3h7wi-1 fuMavN">
                        <h3>Expert physician</h3>
                        <p>This expert review was provided by:</p>
                    </div>
                    <div className="sc-1ca16ab-0 sc-1ca16ab-1 hsHjrq NODE-TO-BREAK">
                        {expertWiseReview && 
                        <div className="expertbox-heading">
                            <div className="sc-16rvg6y-1 esRQFJ">
                                <div className="sc-16rvg6y-2 sc-1ca16ab-2 kWHNHZ">
                                    <span className="Icon-wsq54u-0 bWtdYP"></span>
                                </div>
                            </div>
                            <div className="expert-name">{expertWiseReview.expert?.firstName}  {expertWiseReview.expert?.lastName}</div>
                            <div className="specializations">
                                <div><strong>Specialization:</strong></div>
                                <div className="specialization-wrapper"><span>{expertWiseReview.expert?.info.specialization.map(item => item.label).join(', ')}</span></div>
                            </div>
                            {/* <div className="expertbox-actions"><a  className="Button-qe54pl-1 isEdxL styled-button"
                                    type="" href="/expert/profile">Edit profile</a></div> */}
                           
                        </div>
                        }
                    </div>
                    <div className="remove-on-clears" ></div>
                    <div className="page-filler" ></div>
                    <div className="page-break"><span className="page-counter">Page 2 / 4</span>
                        <div className="clear-border clear-border-top"></div>
                        <div className="clear-border clear-border-bottom"></div>
                    </div>
                    {/* <div className="report-header-fix-container" >
                        <div className="report-compact-header" >
                            <div className="report-compact-header-content"><span>Healthzen</span><span
                                    className="fs-exclude">Patient: jyoti patel patel - DOB: 12/07/2022</span></div>
                            <div className="report-compact-header-margin"></div>
                        </div>
                    </div> */}
                    <div className="has-broken NODE-TO-BREAK"></div>
                    <div className="sc-1a3h7wi-1 fuMavN">
                        <h3>Expert review</h3>
                    </div>
                    <div className="sc-1mhdh3d-9 kzhKBX NODE-TO-BREAK">
                        <div className="field-heading fs-exclude">
                            <h4>Reason for seeking medical opinion:</h4>
                        </div>
                        <div className="field-content fs-exclude">{expertWiseReview.caseInfo?.clinicalSummary}</div>
                    </div>
                    <div className="sc-1mhdh3d-9 kzhKBX NODE-TO-BREAK">
                        <div className="field-heading fs-exclude">
                            <h4>Clinical summary:</h4>
                        </div>
                        <div className="sc-d679ac-0 iFnCMM field-content fs-exclude">
                            <div>{expertWiseReview.caseInfo?.caseSummary}</div>
                        </div>
                    </div>
                    <div className="sc-1mhdh3d-9 NtGl">
                        <div className="field-heading">
                            <h4>Questions &amp; answers</h4>
                        </div>
                    </div>
                    {expertWiseReview.caseInfo?.questionsConsultant.map((element, index) => (

                    <div  key={index}  className="NODE-TO-BREAK question-and-answer">
                        <div className="field-content question fs-exclude">
                            <div>{element.question}</div>
                        </div>
                        <div className="sc-d679ac-0 iFnCMM field-content answer fs-exclude">
                            <div>{element.answer}</div>
                        </div>
                    </div>
                    ))} 
                    <div className="sc-1mhdh3d-9 NtGl">
                        <div className="field-heading">
                            <h4>Additional information</h4>
                        </div>
                    </div>
                    {expertWiseReview.caseInfo?.additionalFields.map((element, index) => (
                    <div  key={index} className="sc-1mhdh3d-9 eYicGp NODE-TO-BREAK">
                        <div className="field-heading fs-exclude">
                            <h4>
                                <div className="sc-d679ac-0 lakcIg">{element.title}</div>
                            </h4>
                        </div>
                        <div className="sc-d679ac-0 iFnCMM field-content fs-exclude">
                            <div>{element.content}</div>
                        </div>
                    </div>
                       ))} 
                       <div className="sc-1mhdh3d-9 NtGl field-content">
                        <div className="field-heading"><h4>Signatures</h4></div>
                        </div>
                        {expertWiseReview.caseInfo?.signatures.map((element, index) => (
                        <div key={index} className="sc-sx0pb6-2 bJrzgT">
                            <div className="sc-sx0pb6-3 sc-1od4e1-1 gOAFET">
                                <div className="signature-content">
                                    <div className="signature-image">
                                    <img src={SignatureimageuRl+element.imagePath} />

                                        </div>
                                        <div className="signature-line">
                                            </div>
                                            <div className="display-name">{element.name}</div>
                                <div className="description">{element.description}</div>
                                </div><div className="field-actions">
                                    </div>
                            </div>
                        </div>
 ))} 
                    {/* <div className="remove-on-clears1" ></div> */}
                    {/* <div className="page-filler" ></div> */}
                    <div className="page-break"><span className="page-counter">Page 3 / 4</span>
                        {/* <div className="clear-border clear-border-top"></div>
                        <div className="clear-border clear-border-bottom"></div> */}
                    </div>
                    {/* <div className="report-header-fix-container" >
                        <div className="report-compact-header" >
                            <div className="report-compact-header-content"><span>Healthzen</span><span
                                    className="fs-exclude">Patient: jyoti patel patel - DOB: 12/07/2022</span></div>
                            <div className="report-compact-header-margin"></div>
                        </div>
                    </div>
                    <div className="has-broken NODE-TO-BREAK"></div> */}
                </div>
                {/* <div className="report-compact-header" >
                    <div className="report-compact-header-content"><span>Healthzen</span><span className="fs-exclude">Patient: jyoti
                            patel patel - DOB: 12/07/2022</span></div>
                    <div className="report-compact-header-margin"></div>
                </div> */}
                <div className="footer-filler" >
                    <div className="sc-1c2rcaq-0 bVLQcu">
                        <div className="sc-1c2rcaq-2 kcNfjh">Thank you for choosing Healthzen</div>
                    </div>
                    <div className="sc-1c2rcaq-1 jxxFfe">
                        <div className="sc-1mhdh3d-2 cwdJBV">
                            <div className="organization-logo"></div>
                            <div className="organization-details"><span className="organization-name">Healthzen</span>
                                <div className="address-details"></div>
                                <div className="email">Email: </div>
                            </div>
                        </div>
                    </div>
                    <div className="report-footer" >
                        <div className="sc-1mhdh3d-7 dSknGv">Created with Purview Expert View™</div>
                        <div className="sc-1mhdh3d-9 eFpYjj">
                            <div className="field-content"><strong>Disclaimer:</strong> The information contained in this report
                                is privileged and confidential and/or protected health information (PHI) and may be subject
                                to protection under the law. This report is intended for the sole use of the individual or
                                entity to whom it is intended. If you are not the intended recipient, you are notified that
                                any use, dissemination, distribution, printing or copying of this transmission is strictly
                                prohibited and may subject you to criminal or civil penalties. If you have received this
                                report in error, please delete both the report and any email communication. If you continue
                                to receive correspondence in error, please report your accidental involvement.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                  {expertWiseReview?.state != 'UNDER_REVIEW' &&
                <div className="sc-1rnyb57-5 hBQtHk"><button  onClick={() => RouterChange()}
                className="Button-qe54pl-1 sc-1ssfy4t-0 cMqAGO cfoUdC styled-button" type="button">View answers
                </button></div>
            }
              {expertWiseReview?.state == 'UNDER_REVIEW' && 
                    <div className="sc-1rnyb57-5 hBQtHk">
                        <button  onClick={() => RouterChange()} className="Button-qe54pl-1 cMqAGO styled-button" type="button">Edit answers
                        </button><button  onClick={() => handleShow()}  className="Button-qe54pl-1 beryvo styled-button" type="button">Submit review
                        </button>
                    </div>
            }
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

export default CaseReport
const ContactPatient = ({ onSubmit }) => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [cemail, setCEmail] = useState("");
    const [isOn, setIsOn] = React.useState(false);
    
    const [CaseDetailslist, setCaseDetailslist] = useState([]);

      const [show, setShow] = useState(false);
      let history = useHistory();

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const onLoginFormSubmit = (e) => {
        e.preventDefault();
        handleClose();
    };
    let handleCancel = () => {
        onSubmit()
    }
    React.useEffect(() => {
        const dataid = history.location.state?.detail.id
      console.log("data",dataid)
      const methods = '/case/FindCaseByID/'
      new ServiceStore().GetDataByID(methods,dataid).then((res) => {
          const detail = res.data
          console.log("detail",detail)
          setCaseDetailslist(detail)      
        
       
    
      })
        }, []);
    let handleSubmit = (event) => {
        const loginuser = JSON.parse(localStorage.getItem("loginuser"))
        const detail = history.location.state?.detail
        let expertWiseReviewlist = CaseDetailslist.expertWiseReview.filter( function (user) {
            if(user.expertID == loginuser.id){
                     return user.state = 'CASE_REVIEWED'
              
            }
        })
            expertWiseReviewlist[0].caseCard.state = 'CASE_REVIEWED'
            const method1 = '/case/UpdateactiveCaseExperteviweARRAYState'
            const dataObJ = {'expertWiseReview':CaseDetailslist.expertWiseReview,'id':CaseDetailslist.id}
            new ServiceStore().UpdateData(method1,dataObJ).then((res) => {
                if(res){
                    onSubmit()
                }
            
            });
            const method2 = '/expertassignment/UpdateState'
            const dataObJ2 = {'caseCard':expertWiseReviewlist[0].caseCard,'expertID':expertWiseReviewlist[0].expertID,caseId:CaseDetailslist.id}
                new ServiceStore().UpdateData(method2,dataObJ2).then((res) => {
                    if(res){
                        onSubmit()
                                history.push({
                                    pathname: '/admin/CaseReport',
                                    search: '?id='+CaseDetailslist.requestCode,
                                    state: { CaseDetailslist: CaseDetailslist },
                                  })
                    }
                
                });
                new ServiceStore().UpdateData('/case/UpdateCaseState',{'state':'CASE_REVIEWED','id':CaseDetailslist.id}).then((res) => {
                    if(res){
                    }
                })
                
            
        // const method1 = '/case/UpdateCaseState'
        //    const dataObJ = {'state':"CASE_REVIEWED",'id':detail.id}
        // new ServiceStore().UpdateData(method1,dataObJ).then((res) => {
        //     if(res){
        //         onSubmit()
        //         history.push({
        //             pathname: '/admin/CaseReport',
        //             search: '?id='+detail.requestCode,
        //             state: { detail: detail },
        //           })
        //     }
        
        // });
        
    }
    return (
        <Row>
          
        <Col md="12">
        <div className="Dialog-gai4ey-9 bpkkbL JS-has-wc JS-dialog" >
    <div className="Dialog__DialogAlwaysVisibleDiv-gai4ey-8 klECUW"><span
            className="Icon-wsq54u-0 Dialog__CloseIcon-gai4ey-1 bWtdYP lgtrXX JS-dialog-close JS-dialog-close"></span>
        <h2 className="Dialog__DialogTitle-gai4ey-4 LGEMR">Submit case review</h2>
    </div>
    <div className="LoadingDiv__BlockContainer-sc-1g7ljba-0 gqDJHC Dialog__DialogContentWrapper-gai4ey-7 bYNANT">
        <div className="Dialog__DialogContent-gai4ey-3 ifAPFT">
            <p>Your review of the following case will be shared with your administrator:</p>
            {CaseDetailslist && 
            <div className="sc-pb0d5p-0 gLgRbG">
                <div className="main-content">
                    <div className="patient-name fs-exclude"><span className="Icon-wsq54u-0 bWtdYP"></span> {CaseDetailslist.patientInfo?.firstName}  {CaseDetailslist.patientInfo?.lastName}
                    </div>
                    <div className="last-update">Last updated on <span className="nowrap">{new Date(CaseDetailslist?.updatedAt).toLocaleString()}</span></div>
                </div>
            </div>
                }
            <p>A custom report was uploaded. Would you like to use it as the final report?</p>
            <div className="InputboxGroup-q49nwm-0 sc-v25hzx-0 kJBbpK emJhdb"><label data-drag="false"
                    className="SimpleRadiobox-qv83xo-5 cTozDp">
                        <Input type="radio"  name="useCustomReport"
                         className="Radiobox__HiddenInput-pelyer-0 jZzYQJ" value="false" ></Input>
                    <div className="SimpleRadiobox__RadioboxContent-qv83xo-4 itQytk">
                        <div className="SimpleRadiobox__TextLabelContainer-qv83xo-3 jzfckW">
                            <div className="SimpleRadiobox__CssCircle-qv83xo-0 gJFbnj"></div><span
                                className="SimpleRadiobox__TextLabel-qv83xo-1 feUDkW">Use default report</span>
                        </div>
                    </div>
                </label>
                {/* <label data-drag="false" className="SimpleRadiobox-qv83xo-5 cTozDp">
                    <Input type="radio" 
                        name="useCustomReport"  className="Radiobox__HiddenInput-pelyer-0 jZzYQJ" value="true"> </Input>
                    <div className="SimpleRadiobox__RadioboxContent-qv83xo-4 fffXwB">
                        <div className="SimpleRadiobox__TextLabelContainer-qv83xo-3 jzfckW">
                            <div className="SimpleRadiobox__CssCircle-qv83xo-0 lphUMS"></div><span
                                className="SimpleRadiobox__TextLabel-qv83xo-1 feUDkW">Use custom report</span>
                        </div>
                    </div>
                </label> */}
                
                </div>
            <p>You will no longer be able to edit this case, unless you are requested to provide additional information.
            </p>
            <p>Are you sure you want to proceed?</p>
           
        </div>
        <div className="Dialog__DialogFooter-gai4ey-5 vtrKe">
            <button 
                className="Button-qe54pl-1 cMqAGO styled-button" onClick={handleCancel} type="button">Cancel</button><button 
                className="Button-qe54pl-1 beryvo styled-button" onClick={handleSubmit} type="submit">Submit</button></div>
    </div>
</div>

        </Col>
        </Row>
    )
    
  };


