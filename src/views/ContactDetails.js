

import React , {useState} from "react";
import ServiceStore from "../util/ServiceStore";
import ReactFormInputValidation from "react-form-input-validation";
import { vsmSignup } from "../util/validation"
import { Form, Input, Button, Checkbox,Radio} from "antd";
import { debounce } from "lodash";
import Select from 'react-select'
import { useHistory } from "react-router-dom";
import { v4 as uuid } from 'uuid';
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
    Row,
    Col,
} from "reactstrap";
import { Link } from "react-router-dom";
import {AiFillEye,AiOutlineCaretDown,AiOutlineDownload,AiFillCloseCircle, AiFillPlusCircle, AiOutlineFilePdf, AiOutlineFileImage, AiOutlineUsergroupAdd, AiOutlineFile, AiOutlineDiff, AiOutlineUser, AiOutlineFileText, AiOutlineMail, AiOutlineVideoCamera, AiOutlineDollar, AiFillEdit } from "react-icons/ai";
import Rightsidebar from "./Rightsidebar"
import Modal from 'react-bootstrap/Modal';

function ContactDetails() {
  let history = useHistory();
  const [form] = Form.useForm();
	const [disabled, setdisabled] = useState(true);
	const [iagree, setiagree] = useState(false);
    const [visible, setVisible] = useState({});  // visibility state
    const [isvisible, setIsVisible] = useState({}); 
    const [medicareVisible, setmedicareVisible] = useState({});  
    const [CaseDetails, setCaseDetails] = useState({});  
    const [datalist, setDatalist] = useState([])

    const [isshow, setIsshow] = useState(false);  // visibility state
    const [isshowContact, setIsshowContact] = useState(false);  // visibility state
    const [isrefering, setIsrefering] = useState(false);  // visibility state
    const [isRelation, setIsRelation] = useState(false); 
    const [expertWiseReview, setexpertWiseReview] = useState({}); 
    
    const unique_id = uuid();
    const small_id = unique_id.slice(0,5)

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const onFormSubmit = (e) => {
        handleClose();
    };


    const [acceptshow, setAcceptShow] = useState(false);

    const handleAcceptShow = () => setAcceptShow(true);
    const handleAcceptClose = () => setAcceptShow(false);
    const onAcceptFormSubmit = (e) => {
        e.preventDefault();
        handleAcceptClose();
    };
    const onButtonClick = (element) => {
        //   console.log("element",element)
           const path = MedicalRecordimageURl+element.originalFileName
        
          // //  window.location.href = path
           window.open(path, "_system");
      
      }


    React.useEffect(() => {
        const dataid = history.location.state?.detail.id
        const loginuser = JSON.parse(localStorage.getItem("loginuser"))
      console.log("data",dataid)
      const methods = '/case/FindCaseByID/'
      new ServiceStore().GetDataByID(methods,dataid).then((res) => {
          const detail = res.data
          console.log("detail",detail)
          setCaseDetails(detail)      
          let expertWiseReviewlist = res.data.expertWiseReview.filter( function (user) {
              if(user.expertID == loginuser.id){
                  return user
                
              }
            })
            console.log("expertWiseReviewlist",expertWiseReviewlist)
            setexpertWiseReview(expertWiseReviewlist[0])
          const editFormValues = detail.patientInfo.insurances
          for(var i in detail.patientInfo.insurances){
            const items =  detail.patientInfo.insurances[i]
           
            if(items.insurancetype == 'Medicare'){
               
                setmedicareVisible({[i]:true})
            }
            if(items.insurancetype == 'Privateinsurance'){
                setVisible({[i]:true})
                
            }
            if(items.insurancetype == 'Other'){
                setIsVisible({[i]:true})
              
            }
            // form.setFieldValue([i],items)
            
          }
          setFormValues(editFormValues);
          console.log("editFormValues",editFormValues)
       
    
      })

      const detail = history.location.state?.detail
      const method = "/fileMedicalrecord/getFileMedicalRecordByID"
    if(detail != undefined){
        new ServiceStore().GetDataBYFilter(method,{caseId:detail.id}).then((res) => {
            console.log("res.response.data",res.response.data)
          setDatalist(res.response.data)
        
        });
    }
          
    
        
    
          
        
        }, []);
    
   
     const username =   localStorage.getItem("username")
  const [formValues, setFormValues] = useState([{ "insurancetype": "", "medicarecode":"","insuranceinformation":"","insurancecarrier":"","member":"","group":""}])

  const RouterChange = () => {
            const dataobj =  history.location.state?.detail
            console.log("dataobj",dataobj)
            history.push({
                pathname: '/admin/ExpertReview',
                search: '?id='+dataobj.requestCode,
                state: { detail: dataobj },
              });
  }



 

const handleSubmit = () => {
    console.log("formValues",formValues)
    
     let data = form.getFieldsValue();
     form
     .validateFields()
     .then((data) => {
         setdisabled(false);
     })
     .catch((e) => {
         setdisabled(true);
     });
     if(disabled == true){
        return
     }
     if(data.treatedOrSurgeryBeforeDescription == undefined){
        data.treatedOrSurgeryBeforeDescription = ''
     }

     
    // console.log("data",dataobj)

    //  
    //  form
    //  .validateFields()

  
        // const method = '/case/UpdateAllData'
        // dataobj.id = history.location.state?.detail.id
        // dataobj.requestCode = history.location.state?.detail.requestCode
        //   new ServiceStore().UpdateData(method,dataobj).then((res) => {
        //     // history.push("/admin/LocateMedicalRecords")
        //     history.push({
        //         pathname: '/admin/LocateMedicalRecords',
        //         search: '?id='+dataobj.requestCode,
        //         state: { detail: dataobj },
        //       });

          
        //   });

        
    
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
            {CaseDetails && 
                <div className="sc-rkx7yu-10 invUFa">
                        <div className="sc-1rnyb57-0 cKwJxbs">
                            <div className="sc-16qu7j7-3 slyWv">
                                <div>
                                    <h1 className="sc-16qu7j7-0 gGRhvg">Case overview</h1>
                                </div>
                                {expertWiseReview?.state == 'WAITING_ACCEPTANCE' && 
                                <div>
                                    <button  onClick={handleShow}  className="Button-qe54pl-1 cMqAGO styled-button" type="button">Decline
                                        case</button>
                                        <button onClick={handleAcceptShow} className="Button-qe54pl-1 beryvo styled-button" type="button">Accept
                                        case</button>
                                </div>
                                }
                                {(expertWiseReview?.state != 'WAITING_ACCEPTANCE') && (expertWiseReview?.state != "CASE_REJECTED")  && 
                                    <button  onClick={() => RouterChange()} className="Button-qe54pl-1 beryvo styled-button" type="button">Go to case review</button>
                                }
                                
                            </div>
                            <div className="sc-1rnyb57-1 hXUzMv">
                                <h3>Patient &amp; contact details</h3>
                            </div>
                            <div className="sc-1rnyb57-2 sc-mucp4k-6 bBCSpc gGRKXW">
                                <div className="sc-mucp4k-0 emxhRY">
                                    <div className="sc-mucp4k-2 imJiPl"><label>Patient</label>
                                        <div className="fs-exclude">{CaseDetails.patientInfo?.firstName} {CaseDetails.patientInfo?.lastName}<span className="sc-mucp4k-3 kBmLNW"> ({CaseDetails.patientInfo?.gender})</span></div>
                                    </div>
                                    <div className="sc-mucp4k-2 imJiPl"><label>Date of birth</label>
                                        <div className="fs-exclude">{CaseDetails.patientInfo?.dob} <span className="sc-mucp4k-3 kBmLNW"></span></div>
                                    </div>
                                    <div className="sc-mucp4k-2 imJiPl"><label>Referring physician</label>
                                        <div> </div>
                                    </div>
                                </div>
                            </div>
                            <div className="sc-1rnyb57-1 hXUzMv">
                                <h3>Primary concern</h3>
                            </div>
                            <div className="sc-1rnyb57-2 sc-mucp4k-7 bBCSpc kvhGMT">
                                <div className="sc-mucp4k-2 imJiPl fs-exclude"><label>Primary diagnosis:</label>{CaseDetails.patientInfo?.firstName} {CaseDetails.caseInfo?.intakeDiagnosis}</div>
                                <div className="sc-mucp4k-2 imJiPl fs-exclude"><label>Patient has been treated or had surgery for this condition
                                        already.</label>
                                    <div>{expertWiseReview.caseInfo?.treatedOrSurgeryBeforeDescription}</div>
                                </div>
                                <div className="sc-mucp4k-2 imJiPl fs-exclude"><label>Reason for seeking this medical opinion:</label>
                                    <div>{expertWiseReview.caseInfo?.clinicalSummary}</div>
                                </div>
                            </div>
                            <div className="sc-1rnyb57-1 hXUzMv">
                                <h3>Clinical summary</h3>
                            </div>
                            <div className="sc-1rnyb57-2 sc-mucp4k-8 bBCSpc cvArzg">
                                <div className="sc-mucp4k-2 imJiPl fs-exclude">
                                    <div className="sc-d679ac-0 foPyMY sc-mucp4k-9 fUbxHy overview fs-exclude">
                                    {expertWiseReview.caseInfo?.caseSummary}
                                    </div>
                                </div>
                            </div>
                            <div className="sc-1rnyb57-1 hXUzMv">
                                <h3>Questions</h3>
                            </div>
                            {expertWiseReview.caseInfo?.questionsConsultant.map((element, index) => (
                                    <div key={index}  className="sc-1rnyb57-2 bBCSpc">
                                        <div className="sc-c0368u-1 hgDIPs"><label>Question {index + 1}</label>
                                            <div className="fs-exclude">
                                                <div className="sc-d679ac-0 iFnCMM sc-c0368u-6 NKYNj">
                                                    <div>  {element.question}</div>
                                                </div>
                                                <div className="field-content fs-exclude">
                                                    <div className="sc-d679ac-0 drNvEc field-content fs-exclude">{element.answer}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))} 
                            <div className="sc-1rnyb57-1 hXUzMv">
                                <h3>Additional Information</h3>
                            </div>
                            
                                 <div className="sc-1rnyb57-2 bBCSpc">
                                 {expertWiseReview.caseInfo?.additionalFields.map((element, index) => (
                                <div key={index} className="sc-c0368u-1 hgDIPs"><label>Additional field {index + 1}</label>
                                    <div className="fs-exclude">
                                        <div className="sc-d679ac-0 iFnCMM sc-c0368u-7 hPPCSe">
                                            <div>{element.title}</div>
                                        </div>
                                        <div className="field-content">
                                            <div className="sc-d679ac-0 drNvEc field-content fs-exclude">
                                                {element.content}
                                                </div>
                                        </div>
                                    </div>
                                </div>
                                  ))} 
                                </div>
                              
                               
                            <div className="sc-1rnyb57-1 hXUzMv">
                                <h3>Medical record files</h3>
                            </div>
                            <div className="sc-1rnyb57-2 bBCSpc">
                                <div className="willUseIsSticky__SentinelStyle-sc-1nsyca-0 iwwSlu sc-1ojytqt-15 fQNbPQ"></div>
                                <div>
                                    <div className="sc-1ojytqt-0 dWjbsZ">
                                        <div className="sc-2my4ol-0 fXlkzp">
                                            <div className="left-container"><span className="sc-2my4ol-1 bePluE">{datalist.length} records</span></div>
                                            <div className="right-container"><a className="link">Select records</a></div>
                                        </div>
                                    
                                    </div>
                                    <div data-rfd-droppable-id="board" data-rfd-droppable-context-id="3" className="sc-1ojytqt-22 hqIIQQ">
                                        <div mode="" className="sc-1ojytqt-6 jPvXMg">
                                            <div data-rfd-draggable-context-id="3" data-rfd-draggable-id="Clinical"
                                                className="sc-1ojytqt-8 icyIhj">
                                                <div className="sc-1ojytqt-7 dfZSSX">
                                                    <div mode="" className="sc-1ojytqt-10 bYNnER">
                                                        <div className="nameWrapper"><span>Clinical </span></div>
                                                        <div className="line"></div><span className="collapseOption"><span
                                                                className="light-link gray">Collapse</span></span>
                                                    </div>
                                                    {datalist.map((element, index) => (
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
                                </div>
                            </div>
                            {expertWiseReview?.state == 'WAITING_ACCEPTANCE' && 
                                <div className="sc-1rnyb57-5 hBQtHk"><button className="Button-qe54pl-1 cMqAGO styled-button"
                                        type="button" onClick={handleShow} >Decline case</button><button className="Button-qe54pl-1 beryvo styled-button"
                                        type="button" onClick={handleAcceptShow}>Accept case</button>
                                </div>
                            }
                            {(expertWiseReview?.state != 'WAITING_ACCEPTANCE') && (expertWiseReview?.state != "CASE_REJECTED")  &&
                                <button onClick={() => RouterChange()} className="Button-qe54pl-1 beryvo styled-button" type="button">Go to case review</button>
                            }
                          
                        </div>

                    </div>
            }
            <Modal show={show} onHide={handleClose}  size="lg">
                   
                   <Modal.Body>
                   <AcceptPatientCase onSubmit={onFormSubmit} />
                   </Modal.Body>
                   <Modal.Footer>
               
                   </Modal.Footer>
               </Modal>
               <Modal show={acceptshow} onHide={handleAcceptClose}  size="lg">
                   
                   <Modal.Body>
                   <RequestAcceptPatientCase onSubmit={onAcceptFormSubmit} />
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

export default ContactDetails;


const AcceptPatientCase = ({ onSubmit }) => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [cemail, setCEmail] = useState("");
    const [isOn, setIsOn] = React.useState(false);
    const [uploadsign, setuploadsign] = React.useState(true);
    const [drawsign, setdrawsign] = React.useState(false);
    const signCanvas = React.useRef({})
    const [file, setFile] = useState('')
    const [name, setName] = useState('');
    const [declineReason, setdeclineReason] = useState('');
    const [ferror, setFError] = useState('');
    const [signatureTyperror, setsignatureTyperror] = useState('');
	const [form] = Form.useForm();
    const [fileURl, setfileURL] = useState('');
    let history = useHistory();
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const onLoginFormSubmit = (e) => {
        e.preventDefault();
        handleClose();
    };
    let handleSubmit = (event) => {
        let data = form.getFieldsValue();
        console.log("data",data)  
        const detail = history.location.state?.detail

        console.log("data",detail)
       
        const loginuser = JSON.parse(localStorage.getItem("loginuser"))
      
        const methods = '/case/FindCaseByID/'
        new ServiceStore().GetDataByID(methods,detail.id).then((res) => {
            let expertWiseReviewlist = res.data.expertWiseReview.filter( function (user) {
                        if(user.expertID == loginuser.id){
                                 return user.state = 'CASE_REJECTED'
                          
                        }
              })
              expertWiseReviewlist[0].caseCard.state = 'CASE_REJECTED'
              console.log("expertWiseReviewlist",expertWiseReviewlist)

              const methods1 = '/expertassignment/UpdatedeclineReason'
              const obj  = {
                "info": {
                    "declineReason": data.declineReason,
                    "revokeReason": ""
                },
                "expertID":expertWiseReviewlist[0].expertID,
                'caseId':expertWiseReviewlist[0].caseId,
            }
              new ServiceStore().UpdateData(methods1,obj).then((res) => {
                  if(res){
                      
                  }
              
              });
      
        const method1 = '/case/UpdateactiveCaseExperteviweARRAYState'
           const dataObJ = {'expertWiseReview':res.data.expertWiseReview,'id':res.data.id}
        new ServiceStore().UpdateData(method1,dataObJ).then((res) => {
            if(res){
                onSubmit()
            }
        
        });


        const method2 = '/expertassignment/UpdateState'
        const dataObJ2 = {'caseCard':expertWiseReviewlist[0].caseCard,'expertID':expertWiseReviewlist[0].expertID,caseId:res.data.id}
            new ServiceStore().UpdateData(method2,dataObJ2).then((res) => {
                if(res){
                  
                }
            
            });
        })
        
        
       
        
    }
    let handleCancel = () => {
        onSubmit()
    }
    const setvalidation = (field,value) => {
    
        if(field == 'declineReason'){
            setdeclineReason(value)
        }
       
        
      };
    const handleChange = debounce(() => {
        let data = form.getFieldsValue();
    })
    return (
        <Row>
          
        <Col md="12">
        
        <Form   
                                 
                                 form={form}
                                 size="large"
                                 id="signupForm"
                                 requiredMark={false}
                                 onFinish={handleSubmit}
                                                 onChange={handleChange}
                                 >
                <div className="Dialog-gai4ey-9 bpkkbL JS-has-wc JS-dialog">
                    <div className="Dialog__DialogAlwaysVisibleDiv-gai4ey-8 klECUW"><span
                            className="Icon-wsq54u-0 Dialog__CloseIcon-gai4ey-1 bWtdYP lgtrXX JS-dialog-close JS-dialog-close"></span>
                        <h2 className="Dialog__DialogTitle-gai4ey-4 LGEMR">Decline case</h2>
                    </div>
                    <div className="LoadingDiv__BlockContainer-sc-1g7ljba-0 gqDJHC Dialog__DialogContentWrapper-gai4ey-7 bYNANT">
                        <div className="Dialog__DialogContent-gai4ey-3 ifAPFT">
                            <p>You will lose access to the following case:</p>
                            <div className="sc-pb0d5p-0 gLgRbG">
                                <div className="main-content">
                                    <div className="patient-name fs-exclude"><span className="Icon-wsq54u-0 bWtdYP"></span> Ronaldo vadiya
                                    </div>
                                    <div className="last-update">Last updated on <span className="nowrap">01/06/2023 at 16:10</span></div>
                                </div>
                            </div>
                            <div className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"><label
                                    className="Field__Label-p9woft-2 cUWXcG">Reason:<span
                                        className="Field__Mandatory-p9woft-0 eOWGWb">*</span><span
                                        className="Field__FieldDescription-p9woft-4 bNrjSU">This will be shared with your Expert View
                                        administrator.</span></label>
                                        
                            
                                <Form.Item
                                    name="declineReason"
                                >
                                    
                                    <Input name = 'declineReason' onChange={(e) => setvalidation('declineReason',e.target.value)} 
                            placeholder="Ex: General practitioner" className="TextInput__Input-yzpeng-1 djeAjD"
                            data-hj-whitelist="true"  type="text"  ></Input>                                 
                                </Form.Item>
                                 
                                
                                </div>
                            <p>This will alert your Expert View administrator, but not the patient.</p>
                            <p>Are you sure you want to proceed?</p>
                            
                        </div>
                        <div className="Dialog__DialogFooter-gai4ey-5 vtrKe">
                            <button 
                                className="Button-qe54pl-1 cMqAGO styled-button" type="button" onClick={handleCancel} >Cancel</button><button 
                                className="Button-qe54pl-1 iYJSWC styled-button" type="submit" onClick={handleSubmit}>Decline</button></div>
                    </div>
                </div>
                </Form>

        </Col>
        </Row>
    )
    
  };

  const RequestAcceptPatientCase = ({ onSubmit }) => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [cemail, setCEmail] = useState("");
    const [isOn, setIsOn] = React.useState(false);
    const [uploadsign, setuploadsign] = React.useState(true);
    const [drawsign, setdrawsign] = React.useState(false);
    const signCanvas = React.useRef({})
    const [file, setFile] = useState('')
    const [name, setName] = useState('');
    const [description, setdescription] = useState('');
    const [ferror, setFError] = useState('');
    const [signatureTyperror, setsignatureTyperror] = useState('');
	const [form] = Form.useForm();
    const [fileURl, setfileURL] = useState('');
    
    const [expertWiseReview, setexpertWiseReview] = useState([]);

    let history = useHistory();
    const [show, setShow] = useState(false);
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
        const loginuser = JSON.parse(localStorage.getItem("loginuser"))
      const methods = '/case/FindCaseByID/'
      new ServiceStore().GetDataByID(methods,dataid).then((res) => {
          const detail = res.data
          let expertWiseReviewlist = res.data.expertWiseReview.filter( function (user) {
              if(user.expertID == loginuser.id){
                  return user
                
              }
            })
            console.log("expertWiseReviewlist",res.data)
            setexpertWiseReview(expertWiseReviewlist[0])
          
    })
}, []);
    
    let handleSubmit = (event) => {
        const detail = history.location.state?.detail
        const loginuser = JSON.parse(localStorage.getItem("loginuser"))
       
        const methods = '/case/FindCaseByID/'
        new ServiceStore().GetDataByID(methods,detail.id).then((res) => {
            let expertWiseReviewlist = res.data.expertWiseReview.filter( function (user) {
                        if(user.expertID == loginuser.id){
                                 return user.state = 'UNDER_REVIEW'
                          
                        }
              })
              expertWiseReviewlist[0].caseCard.state = 'UNDER_REVIEW'

              console.log("expertWiseReviewlist",expertWiseReviewlist)
            
            new ServiceStore().UpdateData('/case/UpdateCaseState',{'state':'UNDER_REVIEW','id':res.data.id}).then((res) => {
                if(res){
                }
            })
            
        const method1 = '/case/UpdateactiveCaseExperteviweARRAYState'
           const dataObJ = {'expertWiseReview':res.data.expertWiseReview,'id':res.data.id}
        new ServiceStore().UpdateData(method1,dataObJ).then((res) => {
            if(res){
                  history.push({
                    pathname: '/admin/ExpertReview',
                    search: '?id='+detail.requestCode,
                    state: { detail: detail },
                  })
            }
        
        });

        const method2 = '/expertassignment/UpdateState'
        const dataObJ2 = {'caseCard':expertWiseReviewlist[0].caseCard,'expertID':expertWiseReviewlist[0].expertID,caseId:res.data.id}
            new ServiceStore().UpdateData(method2,dataObJ2).then((res) => {
                if(res){
                    // history.push({
                    //     pathname: '/admin/ExpertReview',
                    //     search: '?id='+detail.requestCode,
                    //     state: { detail: detail },
                    // })
                }
            
            });
    })
        
    }
   
 
    return (
        <Row>
          
        <Col md="12">
        
        
        <div className="Dialog-gai4ey-9 bpkkbL JS-has-wc JS-dialog" >
    <div className="Dialog__DialogAlwaysVisibleDiv-gai4ey-8 klECUW"><span
            className="Icon-wsq54u-0 Dialog__CloseIcon-gai4ey-1 bWtdYP lgtrXX JS-dialog-close JS-dialog-close"></span>
        <h2 className="Dialog__DialogTitle-gai4ey-4 LGEMR">Accept case</h2>
    </div>
    <div className="LoadingDiv__BlockContainer-sc-1g7ljba-0 gqDJHC Dialog__DialogContentWrapper-gai4ey-7 bYNANT">
        <div className="Dialog__DialogContent-gai4ey-3 ifAPFT">
            <div className="sc-pb0d5p-0 gLgRbG">
                <div className="main-content">
                    <div className="patient-name fs-exclude"><span className="Icon-wsq54u-0 bWtdYP"></span> Ronaldo vadiya
                    </div>
                    <div className="last-update">Last updated on <span className="nowrap">01/09/2023 at 10:47</span></div>
                </div>
            </div>
            <p>By accepting this case you agree to provide a professional opinion.</p>
           
        </div>
        <div className="Dialog__DialogFooter-gai4ey-5 vtrKe"><button 
                className="Button-qe54pl-1 cMqAGO styled-button" type="button" onClick={handleCancel}>Cancel</button><button 
                className="Button-qe54pl-1 beryvo styled-button" type="submit" onClick={handleSubmit}>Accept</button></div>
    </div>
</div>
  

        </Col>
        </Row>
    )
    
  };