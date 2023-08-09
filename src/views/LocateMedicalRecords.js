
import React , {useState} from "react";
import ServiceStore from "../util/ServiceStore";
import ReactFormInputValidation from "react-form-input-validation";
import { vsmMedicalreord } from "../util/validation"
import { Form, Input, Button, Checkbox,Radio} from "antd";
import { debounce } from "lodash";
import { useHistory } from "react-router-dom";
import { v4 as uuid } from 'uuid';

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
import {AiFillCloseCircle,AiFillEye,AiOutlineFilePdf,AiOutlineFileImage,AiOutlineUsergroupAdd,AiOutlineFile,AiOutlineDiff, AiOutlineUser ,AiOutlineFileText ,AiOutlineMail,AiOutlineVideoCamera,AiOutlineDollar,AiFillPlusCircle} from "react-icons/ai";
import Rightsidebar from "./Rightsidebar"
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select'
import "bootstrap/dist/css/bootstrap.css";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
function LocateMedicalRecords() {
  const [form] = Form.useForm();
  const [isvisible, setIsVisible] = useState(false);  // visibility state
  const [isvisiblehos, setIsvisiblehos] = useState(false);  // visibility state
  const [isvisibleScan, setIsvisibleScan] = useState(false);  // visibility state
  const [isvisiblePhysician, setIsvisiblePhysician] = useState(false);  // visibility state
  const [isbutton, setIsbutton] = useState(false);  // visibility state

  const [resume, setResume] = useState('')
  const [datalist, setDatalist] = useState([])

  const [formValues, setFormValues] = useState([])
  const logEvent = (e) => {
  }
  const [openMenu, setOpenMenu] = useState(false)
  let history = useHistory();


    const pushToRoute = route => {
    history.push(route)
    setOpenMenu(false)
    }
  let addFormFields = () => {
    let data = form.getFieldsValue();

    Object.entries(data).forEach(([key, value]) => {
      value.locationType = {
          value: 'Facilities',
          label: 'Facilities',
      }
    })
    let datas = form.setFieldsValue(data)
    setFormValues([...formValues, { name: "",type:"",city:"",email:"",phoneNumber:"",locationType:{value: 'Facilities',label: 'Facilities'},contactName:""}])
  }

  let handleSubmit = () => {
     const dataid = history.location.state?.detail.id
     console.log("dataid",dataid)
    const methods = '/case/FindCaseByID/'
    new ServiceStore().GetDataByID(methods,dataid).then((res) => {
        const detail = res.data
    const dataArray = []
    let dataField = form.getFieldsValue();
    console.log("data",dataField)
    form
    .validateFields()
    .then((dataField) => {
       
    })
    .catch((e) => {
        
    });
    Object.entries(dataField).forEach(([key, data]) => {
     

      const objdata  = {
        "medicalRecordLocationItem":{
            "name":data.name ? data.name : "",
            "type":data.type ? data.type : "",
            "city":data.city ? data.city : "",
            "email":data.email ? data.email : "",
            "contactName":data.contactName ? data.contactName : "",
            "phoneNumber":data.phoneNumber ? data.phoneNumber : "",
            "dateFrom":"",
            "dateTo":"",
            "dateExpiration":"",
            "locationType":data.locationType.value ?  data.locationType.value : ""
        },
        "medicalRecordsReleaseLicense":
        {"signature":"","date":"","signedTerm":"",
        "signedByName":"","signedByRelation":""},
        "caseId":detail.id,
        "timedCode":"bb5f0275-6e60-42ff-8ae9-23378c65b44c",
        "suspend":false,
        "dob":detail.patientInfo.dob ? detail.patientInfo.dob : "",
        "firstName":detail.patientInfo.firstName ? detail.patientInfo.firstName : "",
        "gender": detail.patientInfo.gender ? detail.patientInfo.gender : "",
        "contactDetailsName":"   ",
        "contactDetailsRelationType":detail.contactDetails.contactRelationType.value ? detail.contactDetails.contactRelationType.value : "",
        "caseState":detail.state ? detail.state : "",
        "whenCreatedEpochMilli":new Date().getTime(),
        "middleName":detail.patientInfo.middleName ? detail.patientInfo.middleName : "",
        "lastName":detail.patientInfo.lastName ? detail.patientInfo.lastName : "",
      }

      const method = '/medicalrecord/addMedicalRecord'
      new ServiceStore().InsertData(method,objdata).then((res) => {
        history.push({
            pathname: '/admin/MedicalRecords',
            search: '?id='+detail.requestCode,
            state: { detail: detail },
          })
      });
     
     
  })
})
}
let buttonSubmit = () =>{
  const dataid = history.location.state?.detail.id
  const methods = '/case/FindCaseByID/'
  new ServiceStore().GetDataByID(methods,dataid).then((res) => {
      const detail = res.data
      history.push({
        pathname: '/admin/MedicalRecords',
        search: '?id='+detail.requestCode,
        state: { detail: detail },
      })
  })
}
const handleChange = debounce(() => {
   let data = form.getFieldsValue();
   setIsbutton(true)
   Object.entries(data).forEach(([key, value]) => {
    console.log(key,value); 
    if(value.locationType.value == 'Facilities' || value.locationType.value ==  'Biopsy Facilities'){
      setIsVisible(true)
      setIsvisiblehos(false)
      setIsvisibleScan(false)
      setIsvisiblePhysician(false)
    }
    if(value.locationType.value == 'Hospitals'){
      setIsvisiblehos(true)
      setIsVisible(false)
      setIsvisibleScan(false)
      setIsvisiblePhysician(false)
    }
    if(value.locationType.value == 'Scan Facilities'){
      setIsvisibleScan(true)
      setIsVisible(false)
      setIsvisiblehos(false)
      setIsvisiblePhysician(false)
    }
    if(value.locationType.value == 'Physicians'){
      setIsvisiblePhysician(true)
      setIsVisible(false)
      setIsvisiblehos(false)
      setIsvisibleScan(false)
    }
  });
  
  // for(var i in formValues){
  //   const data  = formValues[i]
  //   console.log("data",data)
          
  // }
    
  
})
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
    let data = form.getFieldsValue();

    Object.entries(data).forEach(([key, value]) => {
      value.locationType = {
          value: 'Facilities',
          label: 'Facilities',
      }
    })
    let datas = form.setFieldsValue(data)
     
    const detail = history.location.state?.detail
    const method = '/medicalrecord/getMedicalRecordByID'
    if(detail != undefined){
        new ServiceStore().GetDataBYFilter(method,{caseId:detail.id}).then((res) => {
          setDatalist(res.response.data)
        
        });
    }
   
   
      setIsVisible(true)
    
  }, []);
    const dataarray = [{
        value: 'Facilities',
        label: 'Facilities',
      }, {
        value: 'Physicians',
        label: 'Physicians',
        },
        {
            value: 'Hospitals',
            label: 'Hospitals',
        },
        {
            value: 'Scan Facilities',
            label: 'Scan Facilities',
        },
        {
            value: 'Biopsy Facilities',
            label: 'Biopsy Facilities',
        },
       ]
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
                            <h1 className="sc-16qu7j7-0 gGRhvg">Medical record locations and release</h1>
                        </div>
                        <div></div>
                    </div>
                   

                        <Form   
                          layout="vertical"
                            form={form}
                            size="large"
                            id="signupForm"
                            requiredMark={false}
                            onFinish={handleSubmit}
                                              onChange={handleChange}
                            >
                            <div className="sc-1rnyb57-1 hXUzMv">
                                <p>Identify location of prior records, and complete release below.</p>
                            </div>
                            {datalist.map((item, index) => (
                                <div  key={index} className="sc-cqdzqb-0 kBSEna">
                                    <div>
                                        <div className="sc-1dpr5ga-1 eZVzwj fs-exclude">{item.medicalRecordLocationItem.name}</div>
                                        <div className="sc-1dpr5ga-2 hUJbTf fs-exclude"><span><b>Email:</b> {item.medicalRecordLocationItem.email}</span><a
                                                className="link">Edit contacts</a></div>
                                        <div className="sc-1dpr5ga-2 hUJbTf"><span><b>City:</b> {item.medicalRecordLocationItem.city}</span></div>
                                    </div>
                                    <div className="sc-1dpr5ga-3 sc-1dpr5ga-4 bTJMuU fhIAFQ">
                                        <div><span className="Icon-wsq54u-0 bWtdYP"></span>Authorization not signed</div>
                                    </div>
                                    <div className="sc-cqdzqb-1 jnUEby"><button className="Button-qe54pl-1 dHDyaz styled-button"
                                            type="button"><span className="Icon-wsq54u-0 bWtdYP"></span>Request records</button></div>
                                </div>
                             ))}
                            <div className="sc-s43sty-0 iDgCXO">
                                <div className="sc-1rnyb57-2 sc-s43sty-1 hWzldJ">
                                    <div className="sc-z96cfy-0 hIGrJh">
                                    {formValues.map((element, index) => (
                                        <div key={index} className="sc-1pvb7eo-0 fIyuFq">
                                          <span className="Icon-wsq54u-0 sc-1pvb7eo-1 bWtdYP fZNNPm"  onClick={() => removeFormFields(index)}><AiFillCloseCircle size={30}> </AiFillCloseCircle></span>
                                        
                                            <div className="SplitColumnsContainer-sc-1h4sw88-0 ifQTqf">
                                                <div className="Field__Container-p9woft-1 eFssct">
                                                <label>Institution type</label>

                                                    <Form.Item

                                                      name={[index, "locationType"]}
                                                    >
                                                    <Select onChange={handleChange}
                                                        options={dataarray} 
                                                        
                                                    />
                                                        
                                                    </Form.Item>
                                                
                                                </div>
                                            </div>
                                            {isvisible && 
                                              <div className="SplitColumnsContainer-sc-1h4sw88-0 ifQTqf">
                                                  <div className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj">
                                                      <label
                                                          className="Field__Label-p9woft-2 cUWXcG">Facility</label>
                                                        <Form.Item
                                                         name={[index, "name"]}
                                                        >
                                                        <Input onChange={handleChange} 
                                                            className="TextInput__Input-yzpeng-1 kOJOyM"
                                                            
                                                        />
                                                      </Form.Item>
                                                      
                                                  </div>
                                                  <div className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"><label
                                                          className="Field__Label-p9woft-2 cUWXcG">City/State</label>
                                                          <Form.Item
                                                           
                                                            name={[index, "city"]}
                                                          >
                                                            <Input onChange={handleChange}
                                                                className="TextInput__Input-yzpeng-1 kOJOyM"
                                                                
                                                            />
                                                          </Form.Item>
                                                  </div>
                                              </div>
                                            }
                                            {isvisiblehos && 
                                              <div className="SplitColumnsContainer-sc-1h4sw88-0 ifQTqf">
                                                  <div className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj">
                                                      <label
                                                          className="Field__Label-p9woft-2 cUWXcG">Hospital</label>
                                                        <Form.Item
                                                          name={[index, "name"]}
                                                        >
                                                        <Input onChange={handleChange}
                                                            className="TextInput__Input-yzpeng-1 kOJOyM"
                                                            
                                                        />
                                                      </Form.Item>
                                                      
                                                  </div>
                                                  <div className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"><label
                                                          className="Field__Label-p9woft-2 cUWXcG">City/State</label>
                                                          <Form.Item
                                                           
                                                            name={[index, "city"]}
                                                          >
                                                            <Input onChange={handleChange}
                                                                className="TextInput__Input-yzpeng-1 kOJOyM"
                                                                
                                                            />
                                                          </Form.Item>
                                                  </div>
                                              </div>
                                            }
                                            {isvisibleScan && 
                                              <div className="SplitColumnsContainer-sc-1h4sw88-0 ifQTqf">
                                                  <div className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj">
                                                      <label
                                                          className="Field__Label-p9woft-2 cUWXcG">Facility</label>
                                                        <Form.Item
                                                          
                                                          name={[index, "name"]}
                                                        >
                                                        <Input onChange={handleChange}
                                                            className="TextInput__Input-yzpeng-1 kOJOyM"
                                                            
                                                        />
                                                      </Form.Item>
                                                      
                                                  </div>
                                                  <div className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj">
                                                      <label
                                                          className="Field__Label-p9woft-2 cUWXcG">
                                                          Type of scan</label>
                                                        <Form.Item
                                                          name={[index, "type"]}
                                                        >
                                                        <Input onChange={handleChange}
                                                            className="TextInput__Input-yzpeng-1 kOJOyM"
                                                            
                                                        />
                                                      </Form.Item>
                                                      
                                                  </div>
                                                  <div className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"><label
                                                          className="Field__Label-p9woft-2 cUWXcG">City/State</label>
                                                          <Form.Item
                                                        
                                                            name={[index, "city"]}
                                                          >
                                                            <Input onChange={handleChange}
                                                                className="TextInput__Input-yzpeng-1 kOJOyM"
                                                                
                                                            />
                                                          </Form.Item>
                                                  </div>
                                              </div>
                                            }
                                            {isvisiblePhysician && 
                                              <div className="SplitColumnsContainer-sc-1h4sw88-0 ifQTqf">
                                                  <div className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj">
                                                      <label
                                                          className="Field__Label-p9woft-2 cUWXcG">Physician or provider</label>
                                                        <Form.Item
                                                          name={[index, "name"]}
                                                        >
                                                        <Input onChange={handleChange}
                                                            className="TextInput__Input-yzpeng-1 kOJOyM"
                                                            
                                                        />
                                                      </Form.Item>
                                                      
                                                  </div>
                                                  <div className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj">
                                                      <label
                                                          className="Field__Label-p9woft-2 cUWXcG">Speciality</label>
                                                        <Form.Item
                                                          name={[index, "type"]}
                                                        >
                                                        <Input onChange={handleChange}
                                                            className="TextInput__Input-yzpeng-1 kOJOyM"
                                                            
                                                        />
                                                      </Form.Item>
                                                      
                                                  </div>
                                                  <div className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"><label
                                                          className="Field__Label-p9woft-2 cUWXcG">City/State</label>
                                                          <Form.Item
                                                      
                                                            name={[index, "city"]}
                                                          >
                                                            <Input onChange={handleChange}
                                                                className="TextInput__Input-yzpeng-1 kOJOyM"
                                                                
                                                            />
                                                          </Form.Item>
                                                  </div>
                                              </div>
                                            }



                                            <div className="SplitColumnsContainer-sc-1h4sw88-0 ifQTqf">
                                                <div className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"><label
                                                        className="Field__Label-p9woft-2 cUWXcG">Contact name<span
                                                            className="Field__HelpText-p9woft-3 dvTMZI"> (Optional)</span></label>
                                                          <Form.Item
                                                        
                                                          name={[index, "contactName"]}
                                                          >
                                                          <Input onChange={handleChange}
                                                              className="TextInput__Input-yzpeng-1 kOJOyM"
                                                              
                                                          />
                                                        </Form.Item>
                                                        
                                                        </div>
                                                <div className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"><label
                                                        className="Field__Label-p9woft-2 cUWXcG">Email<span
                                                            className="Field__HelpText-p9woft-3 dvTMZI"> (Optional)</span></label>
                                                      <Form.Item
                                                        
                                                          name={[index, "email"]}
                                                          >
                                                          <Input onChange={handleChange}
                                                              className="TextInput__Input-yzpeng-1 kOJOyM"
                                                              
                                                          />
                                                        </Form.Item>
                                                    </div>
                                                <div className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"><label
                                                        className="Field__Label-p9woft-2 cUWXcG">Phone/Fax<span
                                                            className="Field__HelpText-p9woft-3 dvTMZI"> (Optional)</span></label>
                                                      <Form.Item
                                                        
                                                          name={[index, "phoneNumber"]}
                                                          >
                                                          <Input onChange={handleChange}
                                                              className="TextInput__Input-yzpeng-1 kOJOyM"
                                                              
                                                          />
                                                        </Form.Item>
                                                    </div>
                                            </div>
                                            </div>
                                            
                                            ))}
                                            <Button onClick={() => addFormFields()}  className="Button-qe54pl-1 sc-18mwo6g-0 eXugtO iiNBRZ styled-button"
                                            type="button"><span className="Icon-wsq54u-0 bWtdYP"></span>Add provider</Button>
                                    </div>
                                </div>
                            </div>
                            <div className="TransitionDiv__BlockContainer-sc-1sh2xah-0 gjcdiO">
                              
                            </div>
                            {isbutton ?
                                <div className="sc-1rnyb57-5 jKPFjl">
                                      <Button
                                          variant="primary"
                                          type="submit"
                                          className="Button-qe54pl-1 ePXPMS styled-button" 
                                          onClick={handleSubmit}
                                      >
                                        Save
                                          </Button>
                                  
                                  
                                  </div>
                                  :
                                  <div className="sc-1rnyb57-5 jKPFjl">
                                  <Button
                                      variant="primary"
                                      type="submit"
                                      className="Button-qe54pl-1 ePXPMS styled-button" 
                                      onClick={buttonSubmit}
                                  >
                                    Save and advance
                                      </Button>
                              
                              
                              </div>
                              }
                            {/* <div className="sc-1rnyb57-5 jKPFjl"><a  className="Button-qe54pl-1 jYJwHA styled-button" type=""
                                    href="/admin/MedicalRecords">Skip</a></div> */}
                        </Form>

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

export default LocateMedicalRecords
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
                            className="Button-qe54pl-1 ePXPMS styled-button" type="submit" >Yes, confirm agreement</Button>
                        </div>
                </div>
            </div>
        
        </Col>
        </Row>
    )
    
  };