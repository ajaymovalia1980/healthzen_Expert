
import React,{useState} from "react";
import { CKEditor } from 'ckeditor4-react';
import { useHistory } from "react-router-dom";
import ServiceStore from "../util/ServiceStore";
import { Form, Input, Button, Checkbox,Radio} from "antd";

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
function ClinicalInformation() {
  const [dataResume, setDataResume] = useState('')
  const [formValues, setFormValues] = useState([{ title: "",createdByExpert:false,hide:false,id:"",content:''}])
  const [details, setDetail] =  useState({})
  const [informationlist, setInformationlist] =  useState([])
  const [questionlist, setQuestionlist] =  useState([])
  const [caseSummary, setCaseSummary] =  useState('')

  const [form] = Form.useForm();

  React.useEffect(() => {
    const dataid = history.location.state?.detail.id

    const methods = '/case/FindCaseByID/'
    new ServiceStore().GetDataByID(methods,dataid).then((res) => {
        const detail = res.data
        console.log("detail",detail)

        setDetail(detail)
        setInformationlist(detail.caseInfo.additionalFields)
        setQuestionlist(detail.caseInfo.questionsConsultant)
        // CKEditor.instances['resume'].setData(detail.caseSummary);
 
        if(res.data.caseInfo.caseSummary != undefined){
            setDataResume(res.data.caseInfo.caseSummary)
        }
        const obj1 = Object.assign({}, detail.caseInfo.questionsConsultant)
        form.setFieldsValue(obj1)


        const obj2 = Object.assign({}, detail.caseInfo.additionalFields)
        form.setFieldsValue({obj2})
        const obj3 = {};
        detail.caseInfo.additionalFields.forEach((element, index) => {
            obj3[index] = { "title": element.title};
            form.setFieldsValue(obj3)
        });
        })
    
  }, []);


  const logEvent = (e) => {
    setCaseSummary(e.editor.getData())
  }
  
  const [openMenu, setOpenMenu] = useState(false)
  let history = useHistory();

    const pushToRoute = route => {
    history.push(route)
    setOpenMenu(false)
    }
  let addFormFields = () => {
    setInformationlist([...informationlist, { title: "",createdByExpert:false,hide:false,id:"",content:''}])
  }
  let  addQuestion = () => {
    setQuestionlist([...questionlist, { question: "",hide:false,id:"",answer:''}])
  }
  let QuestionChange = () => {
    let data = form.getFieldsValue();
    let newFormValues = [...questionlist];
    for(var i in newFormValues){
        Object.entries(data).forEach(([key, value]) => {
            if(key == i){
                newFormValues[i].question =   value.question ? value.question : ""
                newFormValues[i].id = '"kz1j7ilz"'+key
            }
        })
    }
}
  let handleSubmit = (event) => {
    event.preventDefault();
    let data = form.getFieldsValue();
    console.log("formValues",informationlist)
    console.log("questionlist",questionlist)
    console.log("caseSummary",caseSummary)
    const detail = details
    console.log("detail",detail)
    const method  = "/case/UpdateCase"
    const datobj = {obj:{   
        "clinicalSummary":detail.caseInfo.clinicalSummary ? detail.caseInfo.clinicalSummary : "" ,
        "caseSummary": caseSummary ? caseSummary : "",
        "hasBeenTreatedOrSurgeryBefore": detail.caseInfo.hasBeenTreatedOrSurgeryBefore ? detail.caseInfo.hasBeenTreatedOrSurgeryBefore : "",
        "treatedOrSurgeryBeforeDescription": detail.caseInfo.treatedOrSurgeryBeforeDescription ?  detail.caseInfo.treatedOrSurgeryBeforeDescription :"",
        "hasNewDiagnosisChangedTreatmentOrRecommendation": "",
        "newDiagnosisChangedTreatmentOrRecommendationDescription": "",
        "questionsConsultant": questionlist ? questionlist : detail.caseInfo.questionsConsultant,
        "additionalFields": informationlist ? informationlist : detail.caseInfo.additionalFields,
        "signatures": [],
        "careProviders": "",
        "declineReason": "",
        "intakeDiagnosis": detail.caseInfo.intakeDiagnosis ? detail.caseInfo.intakeDiagnosis : "",
        "secondaryDiagnosis": ""
    },casId:detail.id}

    console.log("datobj",datobj)
    
    new ServiceStore().UpdateData(method,datobj).then((res) => {
        console.log("res.response",res.response)
        if(res.response.status == 1){
          
        //   setFileList(res.response.data)
        const dataid = history.location.state?.detail.id
        const methods = '/case/FindCaseByID/'
        new ServiceStore().GetDataByID(methods,dataid).then((res) => {
            const detail = res.data
            history.push({
              pathname: '/admin/ExpertAssignment',
              search: '?id='+detail.requestCode,
              state: { detail: detail },
            })
        })

          
        }
      });
    
    
}
let handleChange = () => {
    let data = form.getFieldsValue();
    let newFormValues = [...informationlist];
    for(var i in newFormValues){
        Object.entries(data).forEach(([key, value]) => {
            if(key == i){
                newFormValues[i].title =   value.title ? value.title : ""
                newFormValues[i].id = 'kz1iofqv'+key
            }
        })
    }
//   newFormValues[i]['title'] = data;
//   setFormValues(newFormValues);
}


let removeFormFields = (i) => {
  let newFormValues = [...informationlist];
  newFormValues.splice(i, 1);
  setInformationlist(newFormValues)
}

let removequestion = (i) => {
    let newFormValues = [...questionlist];
    newFormValues.splice(i, 1);
    setQuestionlist(newFormValues)
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
                <div className="sc-1rnyb57-0 bOxyAZ">
                            <Form   
                                 
                                 form={form}
                                 size="large"
                                 id="signupForm"
                                 requiredMark={false}
                                 onFinish={handleSubmit}
                                                 onChange={handleChange}
                                 >
                        <div className="sc-16qu7j7-3 iMHPqm">
                            <div>
                                <h1 className="sc-16qu7j7-0 gGRhvg">Clinical information</h1>
                            </div>
                            <div></div>
                        </div>
                       
                            <div className="sc-1rnyb57-1 hXUzMv">
                                <h3>Clinical summary<sup>*</sup></h3>
                                <p>Provide additional relevant information about this case.</p>
                            </div>
                            <div className="sc-1rnyb57-2 hWzldJ">
                                <CKEditor
                                        onChange={logEvent}
                                        data={dataResume}
                                        initData={dataResume}
                            
                                />
                               
                            </div>
                            <div className="sc-1rnyb57-1 hXUzMv">
                                <h3>Questions<sup>*</sup></h3>
                                <p>Require assigned expert(s) to answer the following questions</p>
                            </div>
                            <div className="sc-1rnyb57-2 hWzldJ">
                                <div className="sc-z96cfy-0 hIGrJh" >
                                
                                    <div className="sc-tiwj57-0 gJrIba undefined drag-drop-item">
                               
                                    {questionlist.map((element, index) => (
                                        <div key={index}  data-drag="false">
                                            <span data-drag="false" className="Icon-wsq54u-0 sc-1aw9jna-0 bWtdYP jHbkTm" onClick={() => removequestion(index)}><AiFillCloseCircle size={30}> </AiFillCloseCircle></span>
                                             <div className="SlateStyles__RichTextContainer-sc-xm7wp-1 brULiI" >
                                                <Form.Item

                                                name={[index, "question"]}
                                                >
                                                <Input onChange={QuestionChange} 
                                                        className="TextInput__Input-yzpeng-1 kOJOyM"
                                                        
                                                    />
                                                    
                                                </Form.Item>
                                            </div>
                                           
                                        </div>
                                        ))} 
                                    <span data-drag="false" className="Icon-wsq54u-0 sc-1aw9jna-0 bWtdYP jHbkTm"></span>
                                    </div>
                                    <Button onClick={() => addQuestion()} className="Button-qe54pl-1 sc-18mwo6g-0 eXugtO iiNBRZ styled-button"
                                        type="button">
                                            <span className="Icon-wsq54u-0 bWtdYP"></span>Add question</Button>
                                    
                                </div>
                            </div>
                            {/* <div className="sc-1rnyb57-2 hWzldJ">
                                <div className="sc-z96cfy-0 hIGrJh">
                                    <div className="sc-tiwj57-0 gJrIba">
                                        <div data-drag="false">
                                            <div className="SlateStyles__RichTextContainer-sc-xm7wp-1 brULiI">
                                                <div className="SlateStyles__ToolsContainer-sc-xm7wp-0 hKePIf rich-text-tools"></div>
                                                <div className="sc-yalrc6-2 jedTpp">
                                                    <div role="textbox" aria-multiline="true" data-slate-editor="true"
                                                        data-slate-node="value"
                                                        className="SlateStyles__RichTextInput-sc-xm7wp-4 bCWXse"
                                                       >
                                                        <div data-slate-node="element"><span data-slate-node="text"><span
                                                                    data-slate-leaf="true"><span
                                                                        data-slate-string="true">test</span></span></span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div><span data-drag="false" className="Icon-wsq54u-0 sc-1aw9jna-0 bWtdYP jHbkTm"></span>
                                    </div><Button className="Button-qe54pl-1 sc-18mwo6g-0 eXugtO iiNBRZ styled-button"
                                        type="button"><span className="Icon-wsq54u-0 bWtdYP"></span>Add question</Button>
                                </div>
                            </div> */}
                            <div className="sc-1rnyb57-1 hXUzMv">
                                <h3>Request additional information</h3>
                                <p>Require assigned expert(s) to provide the following information</p>
                            </div>
                            <div className="sc-1rnyb57-2 hWzldJ">
                                <div className="sc-z96cfy-0 hIGrJh" >
                                
                                    <div className="sc-tiwj57-0 gJrIba undefined drag-drop-item">
                               
                                    {informationlist.map((element, index) => (
                                        <div key={index}  data-drag="false">
                                        <span data-drag="false" className="Icon-wsq54u-0 sc-1aw9jna-0 bWtdYP jHbkTm" onClick={() => removeFormFields(index)}><AiFillCloseCircle size={30}> </AiFillCloseCircle></span>
                                             <div className="SlateStyles__RichTextContainer-sc-xm7wp-1 brULiI" >
                                                <Form.Item

                                                name={[index, "title"]}
                                                >
                                                <Input onChange={handleChange} 
                                                        className="TextInput__Input-yzpeng-1 kOJOyM"
                                                        
                                                    />
                                                    
                                                </Form.Item>
                                            </div>
                                           
                                        </div>
                                        ))} 
                                    <span data-drag="false" className="Icon-wsq54u-0 sc-1aw9jna-0 bWtdYP jHbkTm"></span>
                                    </div>
                                    <Button onClick={() => addFormFields()} className="Button-qe54pl-1 sc-18mwo6g-0 eXugtO iiNBRZ styled-button"
                                        type="button">
                                            <span className="Icon-wsq54u-0 bWtdYP"></span>Add field</Button>
                                    
                                </div>
                            </div>
                            <div className="TransitionDiv__BlockContainer-sc-1sh2xah-0 gjcdiO">
                                
                            </div>
                            <div className="sc-1rnyb57-5 jKPFjl">
                                <Button  className="Button-qe54pl-1 ePXPMS styled-button"
                                    type="button" onClick={handleSubmit}>Save</Button>
                                    </div>
                    </Form>
                       
                    </div>
                </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ClinicalInformation
