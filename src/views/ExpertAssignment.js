
import React,{useState} from "react";
import { CKEditor } from 'ckeditor4-react';
import { useHistory } from "react-router-dom";
import ServiceStore from "../util/ServiceStore";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  
  Row,
  Col
} from "reactstrap";
import { Link } from "react-router-dom";
import {AiFillCaretDown,AiOutlineCheck,AiFillEye,AiOutlineFilePdf,AiOutlineFileImage,AiOutlineUsergroupAdd,AiOutlineFile,AiOutlineDiff, AiOutlineUser ,AiOutlineFileText ,AiOutlineMail,AiOutlineVideoCamera,AiOutlineDollar,AiFillPlusCircle} from "react-icons/ai";
import Rightsidebar from "./Rightsidebar"
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select'
import "bootstrap/dist/css/bootstrap.css";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { Form, Input, Button, Checkbox,Radio} from "antd";
import { debounce } from "lodash";
function ExpertAssignment() {
  const [resume, setResume] = useState('')
  const [formValues, setFormValues] = useState([{ resume: ""}])
  const [ExpertList, setAllData] = React.useState([]);
  const [openMenu, setOpenMenu] = useState(false)
  const [adddaat, setAdddaat] = React.useState([]);
  const [notification, setNotification] = useState({checked:true});
  const [Casedetails, setCaseDetails] = useState([]);
  const [isvisibale, setIsvisibale] = useState(true);
  const [assigncase, setAssigncase] = React.useState([]);
  const [unAssignShow, setUnAssignShow] = useState(false);
  const [readonlyExpert, setReadonlyExpert] = React.useState([]);

  const handleunAssignShow = () => setUnAssignShow(true);

  const handleShow = () => setShow(true);
  let history = useHistory();
  const [show, setShow] = useState(false);
  const [form] = Form.useForm();
const handleClose = () => setShow(false);
const handleClose1 = () => setUnAssignShow(false);

const onLoginFormSubmit = (e) => {
    e.preventDefault();
    handleClose();
    handleClose1();

  };
  const onFormSubmit = (e) => {
    e.preventDefault();
 
    handleClose1();
    loadDataOnlyOnce();
  };
  React.useEffect(() => {
    loadDataOnlyOnce();
     
    }, []); 

    const loadDataOnlyOnce = () => {
        setIsvisibale(true)
        const method = "/expert/getexpert"
      new ServiceStore().GetAllData(method).then((res) => {
        console.log("res",res.data)
        setAllData(res.data)
      });
      const dataid = history.location.state?.detail.id

      const methods = '/case/FindCaseByID/'
      new ServiceStore().GetDataByID(methods,dataid).then((res) => {
          const detail = res.data
          console.log("detail",detail)
          if(detail.activeCaseExpertId != ''){
            getCaseAssignByID(detail.activeCaseExpertId)
            GetReadOnlyExpert(detail.id,detail.activeCaseExpertId)
          }
          setCaseDetails(detail)
          
      })
       
      }
      const getCaseAssignByID = (id) => {
        setIsvisibale(false)
        const methods = '/expertassignment/getExpertAssignRecordByID/'
        console.log("id",id)
        new ServiceStore().GetDataByID(methods,id).then((res) => {
            const listaaray = []
            listaaray.push(res.data)
            const list = res.data
            console.log("list",listaaray)
            setAssigncase(listaaray)
            
           
        })
      }
      const GetReadOnlyExpert = (id,activeCaseExpertId) => {
       
        const methods = '/expertassignment/getReadOnlyExpertByID'
        console.log("id",id,activeCaseExpertId)
        const data = {"id":id,'activeCaseExpertId':activeCaseExpertId}
        new ServiceStore().GetDataBYFilter(methods,data).then((res) => {
            const readonlyExpertlis = []
            for(var i in res.response.data){
                if(res.response.data[i].id != activeCaseExpertId){
                    readonlyExpertlis.push(res.response.data[i])
                }
            }
            setReadonlyExpert(readonlyExpertlis)
            console.log("getReadOnlyExpertByID",readonlyExpertlis)
            // setAssigncase(res.data)
            
           
        })
      }
    const handleSubmit = () => {
         let data = form.getFieldsValue();
        // const data ={}
        // data.name = 'riddhi'
        // data.email = 'riddhi@ociustechnologies.com'
        // data.phone = '98789799978'
        // data.subject = 'fdgdfgdfdfgdg'
        // data.message = 'vbcbcvbcvbcvbvb'
      
               
        //             const methods = ''
        //             new ServiceStore().EmailSend(methods,data).then((res) => {
        //                 console.log("res",res)
        //             })
                    
        const dataobj = {
            "expert": {
                "firstName": adddaat.firstname ? adddaat.firstname : "",
                "lastName": adddaat.lastname ? adddaat.lastname : "",
                "email": adddaat.email ? adddaat.email : "",
                "id":  adddaat.id ? adddaat.id : "",
                "login":  adddaat.email ? adddaat.email : "",
                "picture": adddaat.profile ? adddaat.profile : "",
                "info": {
                    "phone":  adddaat.phone ? adddaat.phone : "",
                    "specialization":  adddaat.specialities ? adddaat.specialities : "",
                    "resume":  adddaat.resume ? adddaat.resume : ""
                },
                "active": false,
                "expertReviewerInfo": {
                    "id": 0,
                    "picture": adddaat.profile ? adddaat.profile : "",
                    "firstName": adddaat.firstname ? adddaat.firstname : "",
                    "lastName":adddaat.lastname ? adddaat.lastname : "",
                    "specialization":  adddaat.specialities ? adddaat.specialities : "",
                    "resume": adddaat.resume ? adddaat.resume : "",
                    "email": adddaat.email ? adddaat.email : "",
                },
                "whenCreatedEpochMilli": adddaat.createdAt ? adddaat.createdAt : ""
            },
            "caseId":Casedetails.id ? Casedetails.id : "",
            "expertID":adddaat.id ? adddaat.id : "",
            "info": {
                "declineReason": "",
                "revokeReason": ""
            },
            "allowStudyDownload": notification.checked ? notification.checked : true,
            "isCoReview": false,
            "acceptDateEpochMilli": "",
            "caseCard": {
                "id": Casedetails.id ? Casedetails.id : "",
                "requestCode": Casedetails.requestCode ? Casedetails.requestCode : "",
                "firstName": Casedetails.patientInfo.firstName ? Casedetails.patientInfo.firstName : "",
                "lastName": Casedetails.patientInfo.lastName ? Casedetails.patientInfo.lastName : "",
                "middleName": Casedetails.patientInfo.middleName ? Casedetails.patientInfo.middleName : "",
                "dob": Casedetails.patientInfo.dob ? Casedetails.patientInfo.dob : "",
                "complaint": "",
                "institution": "Healthzen",
                "status": "WAITING_ACCEPTANCE",
                "submittedDate": Casedetails.whenCreatedEpochMilli ? Casedetails.whenCreatedEpochMilli : "",
                "whenCreated":Casedetails.whenCreatedEpochMilli ? Casedetails.whenCreatedEpochMilli : "",
                "whenModified": Casedetails.whenModifiedEpochMilli ? Casedetails.whenModifiedEpochMilli : "",
                "whenReturned": ""
            },
            "declineDateEpochMilli": "",
            "lastUpdatedEpochMilli": new Date().getTime(),
            "reviewDateEpochMilli": "",
            "revokeDateEpochMilli": new Date().getTime()
        }

        const method = "/expertassignment/addExpertAssignRecord"
        new ServiceStore().InsertData(method,dataobj).then((res) => {
             Casedetails.activeCaseExpertId = res.response.data.data.id
             Casedetails.state = 'WAITING_ACCEPTANCE'
             const methods = '/case/UpdateactiveCaseExpertId'
           
               new ServiceStore().UpdateData(methods,Casedetails).then((res) => {
                loadDataOnlyOnce();
                setIsvisibale(false)
                getCaseAssignByID(Casedetails.activeCaseExpertId)
               });
        });




    }
    const handleChange = debounce(() => {
        let data = form.getFieldsValue();
        console.log("data",data)
    })
    const onChange = (i,e) => {
        console.log("i",i,e)
        setAdddaat(e)
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
                {isvisibale && 
                    <Form   
                                     layout="vertical"
									form={form}
									size="large"
									id="signupForm"
									requiredMark={false}
									onFinish={handleSubmit}
                                    onChange={handleChange}
									>
                        <div className="sc-1rnyb57-0">
                            <div className="sc-16qu7j7-3 slyWv">
                                <div>
                                    <h1 className="sc-16qu7j7-0 gGRhvg">Expert assignment</h1>
                                </div>
                                <div></div>
                            </div>
                            <div className="sc-1mnpidt-1 sc-1igzj-10 fqlOjq cCxhlU">
                                <div className="sc-1rnyb57-1 hXUzMv">
                                    <p>Select the existing expert you would like to assign this case to, or add a new expert:</p>
                                </div>
                                <div className="sc-1mnpidt-2 sc-1igzj-11 dbxSFU jrmTUb"><span>No payment has been made.</span><span
                                        className="Icon-wsq54u-0 bWtdYP"></span></div>
                            </div>
                          
                                <div  className="sc-1rnyb57-2 bBCSpc">
                                    <div className="sc-1igzj-2 vOeNP">
                                        <div className="sc-17inukh-1 jFhLov"><span className="Icon-wsq54u-0 bWtdYP"></span>
                                        <Input placeholder="Search"
                                                className="TextInput__Input-yzpeng-1 btRsWK TextInput-yzpeng-7 gyICpj" data-hj-whitelist="true"
                                                type="text" /></div>
                                        <button 
                                            className="Button-qe54pl-1 iywgEP styled-button" type="button"><span
                                                className="Icon-wsq54u-0 bWtdYP"></span>Add expert</button>
                                    </div>
                                    <div className="sc-1igzj-8 jgrZOf">
                                    {ExpertList.map((element, index) => (
                                        <div key={index} className="sc-1igzj-9 bdNIvJ">
                                            <div>
                                                <div><b>{element.firstname } {element.lastname }</b> {element.email}</div>
                                                <div className="speciality">Speciality: {element.specialities.map(item => item.label).join(', ')}</div>
                                            </div>
                                            <div className="sc-1igzj-13 jnaPYK check">
                                                
                                                  
                                                <Form.Item
                                                    name="selectedExpert"
                                                >
                                                    
                                                <Radio  name="selectedExpert" value={element.id} onClick={() => onChange(index,element)}></Radio>
                                                
                                                </Form.Item>

                                                
                                                </div>
                                        </div>
                                        ))}
                                    
                                    </div><label data-drag="false" className="ToggleCheckbox-sc-11ob8ah-4 sc-1igzj-12 egvBNw SrUSA"><Input
                                            type="checkbox" name="allowDownload" 
                                            className="Checkbox__HiddenInput-sc-19o1zxv-0 bLPSAS" />
                                        <div className="ToggleCheckbox__ToggleLabel-sc-11ob8ah-2 kZEOXd">
                                            <b>Enable expert to download image files from
                                                this case</b>
                                            </div>
                                            <BootstrapSwitchButton onChange={(checked) => {
                                                    setNotification({checked})
                                                }}  name="allowStudyDownload" checked={true} size="sm" onstyle="outline-info" offstyle="outline-primary"/>

                                        
                                    </label>
                                </div>
                             
                            <div className="sc-1rnyb57-5 hBQtHk"><button onClick={handleSubmit} className="Button-qe54pl-1 beryvo styled-button" type="button"
                                    >Assign case to selected expert</button></div>
                        </div>
                    </Form>
                }  
                 {!isvisibale &&  
                    <div className="sc-1rnyb57-0 bOxyAZ">
                        <div className="sc-16qu7j7-3 iMHPqm">
                            <div>
                                <h1 className="sc-16qu7j7-0 gGRhvg">Expert assignment</h1>
                            </div>
                            <div></div>
                        </div>
                        <div className="sc-ufd8b0-0 sc-561ekr-0 hNdeTZ fYcOZw">
                            <div className="waitingBoxContent">
                                <span className="Icon-wsq54u-0 bWtdYP beforebb ">
                                    <AiOutlineCheck></AiOutlineCheck>
                                </span>
                                <h4>This case has already been reviewed</h4>
                                <p>The expert physician(s) listed below have reviewed this case.</p>
                            </div><a  className="Button-qe54pl-1 ePXPMS styled-button" type=""
                                href="/admin/request/QXGMV/report">View report</a>
                        </div>
                        {assigncase.length > 0 &&
                            <div className="sc-1rnyb57-1 hXUzMv">
                                <h4>Assigned Expert(s)</h4>
                            </div>
                        }
                        {assigncase.length > 0 &&
                            <div className="sc-1rnyb57-2 hWzldJ">
                                <div className="sc-561ekr-2 ennlYe">
                                    <div className="info-wrapper">
                                        <div className="sc-561ekr-18 avatar-wrapper">
                                            <span className="Icon-wsq54u-0 bWtdYP"><AiOutlineUser></AiOutlineUser></span></div>
                                        <div>
                                            <div className="expert">{assigncase[0].expert.firstName ? assigncase[0].expert.firstName:""} {assigncase[0].expert.lastName ? assigncase[0].expert.lastName :""}</div>
                                            <div className="details"><span><strong>Email:</strong>
                                            {assigncase[0].expert.email ? assigncase[0].expert.email: ""}</span><span><strong>Phone:</strong> {assigncase[0].expert.info.phone}</span></div>
                                        </div>
                                    </div>
                                    {/* <div className="buttons-wrapper">
                                        <div className="sc-21ha54-1 sc-561ekr-3 gepAti chZEcd"><span className="Icon-wsq54u-0 bWtdYP"><AiOutlineDiff></AiOutlineDiff></span>Reviewed
                                            on  {assigncase[0].createdAt ? assigncase[0].createdAt : ""}</div><button  className="Button-qe54pl-1 cbbkBB styled-button"
                                            type="button"><span className="sc-bczRLJ XPRdW"></span></button>
                                    </div> */}
                                    <div className="buttons-wrapper"><button  className="Button-qe54pl-1 jhHpLd styled-button" type="button">
                                        <span>   <AiOutlineMail size={30}></AiOutlineMail></span>Send reminder</button>
                                          <button 
                                            className="Button-qe54pl-1 isEdxL styled-button" type="button"  onClick={handleunAssignShow} >Unassign</button><button 
                                            className="Button-qe54pl-1 fbkhVv styled-button" type="button"><span className="sc-bczRLJ XPRdW">
                                                <AiFillCaretDown></AiFillCaretDown>
                                            </span>
                                        </button>
                                    </div>
                                </div><Button  className="Button-qe54pl-1 sc-561ekr-10 fsFIEf bRytJD styled-button"
                                    type="button">Reassign</Button>
                            </div>
                            }
                        <div className="sc-1rnyb57-1 hXUzMv">
                            <h4>Additional Expert(s)</h4>
                        </div>
                        <div className="sc-1rnyb57-2 hWzldJ">
                            <div className="sc-561ekr-14 hVZgmQ">
                                <p className="sc-561ekr-15 linQSn">Additional Experts that are added are given read-only access to this case.
                               
                                </p>
                                {readonlyExpert.map((element, index) => (
                                <div key={index} className="sc-561ekr-2 ennlYe">
                                    <div className="info-wrapper">
                                        <div className="sc-561ekr-19 avatar-wrapper"><span className="Icon-wsq54u-0 bWtdYP"></span></div>
                                        <div>
                                            <div className="expert">{element.expert.firstName} {element.expert.lastName}</div>
                                            <div className="details"><span><strong>Email:</strong>  {element.expert.email}</span></div>
                                        </div>
                                    </div>
                                    <div className="buttons-wrapper"><button className="Button-qe54pl-1 isEdxL styled-button" type="button">Remove
                                            access</button></div>
                                </div>
                                ))}
                                <Button   onClick={handleShow} className="Button-qe54pl-1 sc-561ekr-16 fsFIEf boJhcx styled-button" type="button">Add
                                    expert</Button>
                            </div>
                        </div>
                    </div>
                }

                <Modal show={show} onHide={handleClose}  size="md">
                   
                    <Modal.Body>
                    <ContactPatient onSubmit={onLoginFormSubmit} />
                    </Modal.Body>
                    <Modal.Footer>
                
                    </Modal.Footer>
                </Modal>
                <Modal show={unAssignShow} onHide={handleClose1}  size="md">
                   
                   <Modal.Body>
                   <UnAssignExpert onSubmit={onFormSubmit} />
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

export default ExpertAssignment
const ContactPatient = ({ onSubmit }) => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [cemail, setCEmail] = useState("");
    const [isOn, setIsOn] = React.useState(false);
    const [caselist, setCaselist] = useState({});
    const [expertlist, setAllData] = useState([]);
    const [array, setArray] = useState([]);
    const [ReadonlyExpert, setReadonlyExpert] = useState([]);
    
    let history = useHistory();
    const options = [
        { value: 'Leads Medical Center', label: 'Leads Medical Center' },
        { value: 'Healthzen-Practice', label: 'Healthzen-Practice' },
        { value: 'Orthopedics', label: 'Orthopedics' }
      ]
      const [show, setShow] = useState(false);
      React.useEffect(() => {
        const dataid = history.location.state?.detail.id
    
        const methods = '/case/FindCaseByID/'
        new ServiceStore().GetDataByID(methods,dataid).then((res) => {
            const detail = res.data
           console.log("detail",detail)
            if(detail.activeCaseExpertId != ''){
                GetReadOnlyExpert(detail.id,detail.activeCaseExpertId)
            }
            setCaselist(detail)
        })
        loadDataOnlyOnce()
         
        }, []); 
        const GetReadOnlyExpert = (id,activeCaseExpertId) => {
       
            const methods = '/expertassignment/getReadOnlyExpertByID'
            console.log("id",id,activeCaseExpertId)
            const data = {"id":id,'activeCaseExpertId':activeCaseExpertId}
            new ServiceStore().GetDataBYFilter(methods,data).then((res) => {
                const readonlyExpertlis = []
                for(var i in res.response.data){
                    if(res.response.data[i].id != activeCaseExpertId){
                        readonlyExpertlis.push(res.response.data[i])
                    }
                }
                 setReadonlyExpert(readonlyExpertlis)
                console.log("getReadOnlyExpertByID",ReadonlyExpert)
                // setAssigncase(res.data)
                
               
            })
          }
        const loadDataOnlyOnce = () => {
            const method = "/expert/getexpert"
          new ServiceStore().GetAllData(method).then((res) => {
            console.log("ReadonlyExpert",ReadonlyExpert,res.data)

            setAllData(res.data)
          });
        }
       
        const onChange = (event,i,e) => {
            console.log("i",event.target.checked,i,e)
            
            if(event.target.checked == true){
                array.push(e)
            }
            if(event.target.checked == false){
                const itemToBeRemoved = e
                array.splice(array.findIndex(a => a.id === itemToBeRemoved.id) , 1)

            }
            console.log("array",array)
            setArray(array)
        }

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const onLoginFormSubmit = (e) => {
        e.preventDefault();
        handleClose();
    };
    const CancelExpert = (e) => {
        onSubmit(e)
    };
    
    const handleSubmit = (e) => {
        for(var i in array){
            const adddaat = array[i]
            const dataobj = {
                "expert": {
                    "firstName": adddaat.firstname ? adddaat.firstname : "",
                    "lastName": adddaat.lastname ? adddaat.lastname : "",
                    "email": adddaat.email ? adddaat.email : "",
                    "id":  adddaat.id ? adddaat.id : "",
                    "login":  adddaat.email ? adddaat.email : "",
                    "picture": adddaat.profile ? adddaat.profile : "",
                    "info": {
                        "phone":  adddaat.phone ? adddaat.phone : "",
                        "specialization":  adddaat.specialities ? adddaat.specialities : "",
                        "resume":  adddaat.resume ? adddaat.resume : ""
                    },
                    "active": false,
                    "expertReviewerInfo": {
                        "id": 0,
                        "picture": adddaat.profile ? adddaat.profile : "",
                        "firstName": adddaat.firstname ? adddaat.firstname : "",
                        "lastName":adddaat.lastname ? adddaat.lastname : "",
                        "specialization":  adddaat.specialities ? adddaat.specialities : "",
                        "resume": adddaat.resume ? adddaat.resume : "",
                        "email": adddaat.email ? adddaat.email : "",
                    },
                    "whenCreatedEpochMilli": adddaat.createdAt ? adddaat.createdAt : ""
                },
                "caseId":caselist.id ? caselist.id : "",
                "expertID":adddaat.id ? adddaat.id : "",
                "info": {
                    "declineReason": "",
                    "revokeReason": "Primary Expert has been updated"
                },
                "allowStudyDownload": false,
                "isCoReview": true,
                "acceptDateEpochMilli": "",
                "caseCard": {
                    "id": caselist.id ? caselist.id : "",
                    "requestCode": caselist.requestCode ? caselist.requestCode : "",
                    "firstName": caselist.patientInfo.firstName ? caselist.patientInfo.firstName : "",
                    "lastName": caselist.patientInfo.lastName ? caselist.patientInfo.lastName : "",
                    "middleName": caselist.patientInfo.middleName ? caselist.patientInfo.middleName : "",
                    "dob": caselist.patientInfo.dob ? caselist.patientInfo.dob : "",
                    "complaint": "",
                    "institution": "Healthzen",
                    "status": "WAITING_ACCEPTANCE",
                    "submittedDate": caselist.whenCreatedEpochMilli ? caselist.whenCreatedEpochMilli : "",
                    "whenCreated":caselist.whenCreatedEpochMilli ? caselist.whenCreatedEpochMilli : "",
                    "whenModified": caselist.whenModifiedEpochMilli ? caselist.whenModifiedEpochMilli : "",
                    "whenReturned": ""
                },
                "declineDateEpochMilli": "",
                "lastUpdatedEpochMilli": new Date().getTime(),
                "reviewDateEpochMilli": "",
                "revokeDateEpochMilli": new Date().getTime()
            }

            const method = "/expertassignment/addExpertAssignRecord"
            new ServiceStore().InsertData(method,dataobj).then((res) => {
                onSubmit(e)
            });
           
        }



   }
    return (
        <Row>
          
        <Col md="12">
        
        <div className="Dialog-gai4ey-9 jtuVcG JS-has-wc JS-dialog" >
    <div className="Dialog__DialogAlwaysVisibleDiv-gai4ey-8 hvOez"><span
            className="Icon-wsq54u-0 Dialog__CloseIcon-gai4ey-1 bWtdYP lgtrXX JS-dialog-close JS-dialog-close"></span>
        <h2 className="Dialog__DialogTitle-gai4ey-4 cxtYXo">Add expert</h2>
    </div>
    <div className="LoadingDiv__BlockContainer-sc-1g7ljba-0 gqDJHC Dialog__DialogContentWrapper-gai4ey-7 bSXPve">
        <div className="Dialog__DialogContent-gai4ey-3 ifAPFT">
            <p>This will give the selected Expert(s) read-only access to this case.</p>
            <div className="sc-pb0d5p-0 ijRKGe">
                {caselist.patientInfo &&
                <div className="main-content">
                    <div className="patient-name fs-exclude"><span className="Icon-wsq54u-0 bWtdYP"></span>{caselist.patientInfo.firstName}{caselist.patientInfo.lastName}</div>
                    <div className="code"><b>Case ID:</b>{caselist.requestCode}</div>
                    <div className="last-update">Last updated on <span className="nowrap">{caselist.updatedAt}</span></div>
                </div>
                }
            </div>
            <div className="sc-561ekr-7 jOfmQd"><span>Select a registered Expert or add by email:</span></div>
            <div className="sc-17inukh-1 sc-561ekr-8 gIsngu VPPYy">
            <span className="Icon-wsq54u-0 bWtdYP"></span>
            <Input
                    placeholder="Search experts" className="TextInput__Input-yzpeng-1 bFIQjr TextInput-yzpeng-7 gyICpj"
                    data-hj-whitelist="true"  type="text" /></div>
            <div className="sc-561ekr-1 jzEqnz">
            {expertlist.map((element, index) => (
                <div key= {index} className="sc-561ekr-6 ewDGoX">
                    <div>
                        <div><b>{element.firstname}{element.lastname}</b> ({element.email})</div>
                        <div className="speciality">Speciality: {element.specialities.map(item => item.label).join(', ')}</div>
                    </div>
                    <label data-drag="false" className="SimpleCheckbox-am8pps-5 iavLHe">
                    <Input type="checkbox" name="selectedExpert" value={element.id} onClick={(e) => onChange(e,index,element)}/>
                        <div className="SimpleCheckbox__CheckboxContent-am8pps-4 gFyeFh">
                            <div className="SimpleCheckbox__TextLabelContainer-am8pps-3 fMqJid">
                               
                            </div>
                        </div>
                    </label>
                </div>
            ))}
            </div>
            {/* <div className="TextButton-sc-1eydmhc-0 sc-561ekr-20 focshk jTTnfw" onClick={handleShow}><b>Add new expert by email</b> </div> */}
            <div className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"><label
                    className="Field__Label-p9woft-2 cUWXcG">Message<span
                        className="Field__FieldDescription-p9woft-4 bNrjSU">This will be included in the email sent to the
                        expert(s).</span></label><textarea className="TextInput__Input-yzpeng-1 dCSYTn"
                    data-hj-whitelist="true"  type="text" ></textarea></div>
            <div className="sc-561ekr-5 eNWjaw">
                <h4>This email may contain confidential and protected health care information.</h4>
                <p>Please be sure that the email of the recipient has been entered correctly and that you are using
                    appropriately confidential mechanisms for this communication.</p>
            </div>
            <div className="TransitionDiv__BlockContainer-sc-1sh2xah-0 gjcdiO">
               
            </div>
        </div>
        <div className="Dialog__DialogFooter-gai4ey-5 gJumhz"><Button 
                className="Button-qe54pl-1 jYJwHA styled-button" type="button" onClick={CancelExpert}>Cancel</Button><Button 
                className="Button-qe54pl-1 ePXPMS styled-button" type="submit" onClick={handleSubmit}>Add Expert</Button></div>
    </div>
</div>
            <Modal show={show} onHide={handleClose}  size="md">
                   
                   <Modal.Body>
                   <AddExpert onSubmit={onLoginFormSubmit} />
                   </Modal.Body>
                   <Modal.Footer>
               
                   </Modal.Footer>
               </Modal> 
               
        </Col>
        </Row>
    )
    
  };


  const AddExpert = ({ onSubmit }) => {
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
        <h2 className="Dialog__DialogTitle-gai4ey-4 cxtYXo">Add expert</h2>
    </div>
    <div className="LoadingDiv__BlockContainer-sc-1g7ljba-0 gqDJHC Dialog__DialogContentWrapper-gai4ey-7 bSXPve">
        <div className="Dialog__DialogContent-gai4ey-3 ifAPFT">
            <p>Type the expert's email below to add them to your experts list</p>
            <div className="sc-14dqu3h-0 eaxHSm">
                <div className="SplitColumnsContainer-sc-1h4sw88-0 kDCrJy">
                    <div className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"><label
                            className="Field__Label-p9woft-2 cUWXcG">Expert's email</label>
                            <Input
                            placeholder="expert@email.com" className="TextInput__Input-yzpeng-1 bFIQjr"
                            data-hj-whitelist="true"  type="text" /></div>
                    <div className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"><label
                            className="Field__Label-p9woft-2 cUWXcG">Confirm email</label>
                            <Input
                            placeholder="expert@email.com" className="TextInput__Input-yzpeng-1 bFIQjr"
                            data-hj-whitelist="true"  type="text" /></div>
                </div>
            </div>
            <div className="TransitionDiv__BlockContainer-sc-1sh2xah-0 gjcdiO">
              
            </div>
        </div>
        <div className="Dialog__DialogFooter-gai4ey-5 gJumhz"><button 
                className="Button-qe54pl-1 jYJwHA styled-button" type="button">Cancel</button><button 
                className="Button-qe54pl-1 ePXPMS styled-button" type="submit">Add expert</button></div>
    </div>
</div>

        
        </Col>
        </Row>
    )
    
  };

  const UnAssignExpert = ({ onSubmit }) => {
    const [message, setMessage] = useState("");
    const [sendEmail, setSendEmail] = useState(false);
    const [email, setEmail] = useState("");
    const [cemail, setCEmail] = useState("");
    const [isOn, setIsOn] = React.useState(false);
    const [caselist, setCaselist] = useState({});
    const [assignExpertlist, setAssignExpertlist] = useState({});
    let history = useHistory();
    const [form] = Form.useForm();
    const options = [
        { value: 'Leads Medical Center', label: 'Leads Medical Center' },
        { value: 'Healthzen-Practice', label: 'Healthzen-Practice' },
        { value: 'Orthopedics', label: 'Orthopedics' }
      ]
      React.useEffect(() => {
        const dataid = history.location.state?.detail.id
    
        const methods = '/case/FindCaseByID/'
        new ServiceStore().GetDataByID(methods,dataid).then((res) => {
            const detail = res.data
           
            if(detail.activeCaseExpertId != ''){
              getCaseAssignByID(detail.activeCaseExpertId)
            }
            setCaselist(detail)
        })
        GetData();
         
        }, []); 
        const handleSubmit = (e) => {
            let data = form.getFieldsValue();

            console.log("ddddddddddddddddd",data,sendEmail)
            console.log("data",caselist,assignExpertlist)
            
                const methods = '/case/UpdateactiveCaseExpertId'
           
               
                new ServiceStore().DeleteData( "/expertassignment/deleteExpertAssignRecord/",assignExpertlist.id).then((res) => {
                    caselist.activeCaseExpertId = ''
                    caselist.state = 'PENDING_ASSIGNMENT'
                    new ServiceStore().UpdateData(methods,caselist).then((res) => {
                        console.log("res",res)
                        onSubmit(e)
                        });
                });
                const obj = {}
            obj.name = assignExpertlist.expert.firstName
            obj.email = assignExpertlist.expert.email
            obj.phone = data.message?data.message:""
            obj.subject = 'Expert Unassign case'
            obj.message = 'unAssignCase.html'
            obj.file = 'unAssignCase.html'
                  console.log("data",obj)
                  new ServiceStore().EmailSend('',obj).then((res) => {
                      console.log("res",res)
                  })
        
                
            //   onSubmit(e)
            
          }
          const handleClose = (e) => {
      
            onSubmit(e)
          
        }
         
        const handleChange = debounce((e) => {
            let data = form.getFieldsValue();
            console.log("data",data,e.target.checked)
            setSendEmail(e.target.checked)
        })
        const GetData = () => {
            
        
           
          }
          const getCaseAssignByID = (id) => {
            const methods = '/expertassignment/getExpertAssignRecordByID/'
            new ServiceStore().GetDataByID(methods,id).then((res) => {
                const listaaray = []
                listaaray.push(res.data)
                console.log("list::::::::::::::::::::::;;",res.data.expert)
                setAssignExpertlist(res.data)
                
               
            })
          }
    
    return (
        <Row>
          
        <Col md="12">
        
                <div className="Dialog-gai4ey-9 bpkkbL JS-has-wc JS-dialog" >
            <div className="Dialog__DialogAlwaysVisibleDiv-gai4ey-8 klECUW"><span
                    className="Icon-wsq54u-0 Dialog__CloseIcon-gai4ey-1 bWtdYP lgtrXX JS-dialog-close JS-dialog-close"></span>
                <h2 className="Dialog__DialogTitle-gai4ey-4 LGEMR">Unassign case</h2>
            </div>
           
                <div className="LoadingDiv__BlockContainer-sc-1g7ljba-0 gqDJHC Dialog__DialogContentWrapper-gai4ey-7 bYNANT">
                <Form   layout="vertical"
									form={form}
									size="large"
									id="signupForm"
									requiredMark={false}
									onFinish={handleSubmit}
                                    onChange={handleChange} >
                    <div className="Dialog__DialogContent-gai4ey-3 ifAPFT">
                        <p>Please review case details below:</p>
                        {caselist.patientInfo &&
                        <div className="sc-pb0d5p-0 ijRKGe">
                            
                                <div className="main-content">
                                    <div className="patient-name fs-exclude">
                                        <span className="Icon-wsq54u-0 bWtdYP"></span>
                                        
                                        {caselist.patientInfo.firstName ? caselist.patientInfo.firstName : ""} 
                                        {caselist.patientInfo.lastName ? caselist.patientInfo.lastName : ""}</div>
                                    <div className="code"><b>Case ID:</b>{caselist.requestCode ? caselist.requestCode : ""}</div>
                                    <div className="last-update">Last updated on <span className="nowrap">{caselist.createdAt ? caselist.createdAt : ""}</span>
                                </div>
                                </div>
                        
                        </div>
                        }
                        
                            <p>Unassign case from:</p>
                            {assignExpertlist.expert && 
                                <div className="sc-hvhfcr-0 eiCrqi">
                                    <div className="sc-hvhfcr-2 avatar-wrapper"><span className="Icon-wsq54u-0 bWtdYP"><AiOutlineUser></AiOutlineUser></span></div>
                                    <div>
                                        <div className="expert-name"><span>{assignExpertlist.expert.firstName ? assignExpertlist.expert.firstName : ""} {assignExpertlist.expert.lastName ? assignExpertlist.expert.lastName : ""}</span></div>
                                        <div className="email"><b>Email:</b> {assignExpertlist.expert.email ? assignExpertlist.expert.email : ""}</div>
                                    </div>
                                </div>
                            }
                        
                        <label data-drag="false" className="ToggleCheckbox-sc-11ob8ah-4 egvBNw">
                            
                            <div className="ToggleCheckbox__ToggleLabel-sc-11ob8ah-2 kZEOXd">
                                <strong>Notify expert that the case was
                                    unassigned</strong></div>
                            {/* <div className="ToggleCheckbox__Toggle-sc-11ob8ah-1 jylHKA"></div> */}
                            <Form.Item
                                name="sendEmail"
                                >
                                <Checkbox   
                                    onChange={handleChange}
                                
                                />
                                </Form.Item>
                                
                                
                        </label>
                    
                        <div>
                            <div  className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"><label 
                                    className="Field__Label-p9woft-2 cUWXcG">Message</label>
                                 
                                        {/* <textarea
                                        placeholder="Insert custom message here" className="TextInput__Input-yzpeng-1 djeAjD"
                                        data-hj-whitelist="true"  type="text"   name = 'message' onChange={(e) => setMessage(e.target.value)}
                                        ></textarea> */}
                                          <Form.Item
                                            name="message"
                                            >
                                                <Input
                                            placeholder="Insert custom message here" className="TextInput__Input-yzpeng-1 djeAjD"
                                            data-hj-whitelist="true"  onChange={handleChange}
                                            ></Input>
                                            </Form.Item>
                                    
                            </div>
                        </div>
                        <p>The expert will no longer be able to access or review this case.</p>
                        <div className="TransitionDiv__BlockContainer-sc-1sh2xah-0 gjcdiO">
                        </div>
                    </div>
                    <div className="Dialog__DialogFooter-gai4ey-5 vtrKe">
                        <Button className="Button-qe54pl-1 cMqAGO styled-button" type="button"   onClick={handleClose}>Cancel</Button>
                        <Button   type="submit"  className="Button-qe54pl-1 iYJSWC styled-button" onClick={handleSubmit} >Unassign</Button>
                    </div>
                    </Form>
                </div>
            
                </div>
        
        </Col>
        </Row>
    )
    
  };