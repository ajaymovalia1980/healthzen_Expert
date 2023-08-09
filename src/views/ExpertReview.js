
import React,{useState} from "react";
import { CKEditor } from 'ckeditor4-react';
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox,Radio} from "antd";
import SignatureCanvas from 'react-signature-canvas'
import { v4 as uuid } from 'uuid';
import { debounce } from "lodash";
import Dropdown from 'react-bootstrap/Dropdown';
import {
	SignatureimageuRl
	
} from "../util/constants"
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
import {AiFillCloseCircle,AiOutlineCheck,AiFillEye,AiOutlineFilePdf,AiOutlineFileImage,AiOutlineUsergroupAdd,AiOutlineFile,AiOutlineDiff, AiOutlineUser ,AiOutlineFileText ,AiOutlineMail,AiOutlineVideoCamera,AiOutlineDollar,AiFillPlusCircle} from "react-icons/ai";
import Rightsidebar from "./Rightsidebar"
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select'
import "bootstrap/dist/css/bootstrap.css";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import ServiceStore from "../util/ServiceStore";

function ExpertReview() {
  const [resume, setResume] = useState('')
  const [formValues, setFormValues] = useState([{ resume: ""}])
  const [form] = Form.useForm();
  const [informationlist, setInformationlist] =  useState([])
  const [details, setDetail] =  useState({})
  const [Signatures, setSignatures] =  useState([])
  const [expertWiseReview, setexpertWiseReview] =  useState({})

  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  
  const [questionlist, setQuestionlist] =  useState([])
  const [answer, setAnswer] = useState('')
  React.useEffect(() => {
    signaturesdata()
    GetData()

    
  }, []);
const GetData = () =>{
    const dataid = history.location.state?.detail.id
    const loginuser = JSON.parse(localStorage.getItem("loginuser"))

    const datas = {caseId:dataid.toString(),expert:loginuser.id.toString()}
    const method1 = '/signature/dataByID'
    new ServiceStore().GetDataBYFilter(method1,datas).then((res) => {
        setSignatures(res.response.data)

    })
}
  const signaturesdata  = () => {
    const dataid = history.location.state?.detail.id
    const loginuser = JSON.parse(localStorage.getItem("loginuser"))

    const methods = '/case/FindCaseByID/'
    new ServiceStore().GetDataByID(methods,dataid).then((res) => {
        let expertWiseReviewlist = res.data.expertWiseReview.filter( function (user) {
            if(user.expertID == loginuser.id){
                return user
              
            }
          })
        console.log("expertWiseReviewlist",expertWiseReviewlist[0])
        setexpertWiseReview(expertWiseReviewlist[0])
        setQuestionlist(expertWiseReviewlist[0].caseInfo.questionsConsultant)
        setInformationlist(expertWiseReviewlist[0].caseInfo.additionalFields)
        const detail = res.data
        setDetail(detail)
        console.log("detail",detail)
        
        // for(var i in detail.caseInfo.additionalFields){
        //     const items =  detail.caseInfo.additionalFields[i]
        //     form.setFieldValue([i],items)
        // }
        // for(var j in detail.caseInfo.questionsConsultant){
        //     const obj =  detail.caseInfo.questionsConsultant[j]
        //     informationlist.push(obj)
        //     form.setFieldValue([j],obj)
           
        // }
                
        })
        

}
  let  addQuestion = () => {
    setQuestionlist([...questionlist, { question: "",hide:false,id:"",answer:''}])
  }

  let QuestionChange = (index, e,element) => {
    console.log(" e.editor.getData()", e)
    let newFormValues = [...questionlist];
     if(e.target  == undefined){
        for(var i in newFormValues){
            if(index  == i ){   
                newFormValues[i].answer =   e.editor.getData() ? e.editor.getData()  : ""
                newFormValues[i].id = 'kz1j7ilz'+index
            }
        }

     }else{
        
            for(var i in newFormValues){
                if(index  == i ){
                newFormValues[i].question =   e.target.value? e.target.value : ""
                newFormValues[i].id = 'kz1j7ilz'+index
                }
            }
        }
    //console.log("newFormValues",newFormValues)
}
let InformationChange = (index, e,element) => {
    let newFormValues = [...informationlist];
     if(e.target  == undefined){
        for(var i in newFormValues){
            if(index  == i ){
                newFormValues[i].content = e.editor.getData() ? e.editor.getData() : ""
                newFormValues[i].id = 'kz1iofqv'+index
            }
        }

     }else{
        
            for(var i in newFormValues){
                if(index  == i ){
                    newFormValues[i].title = e.target.value ?  e.target.value : ""
                     newFormValues[i].id = 'kz1iofqv'+index
                }
            }
        }
    //console.log("newFormValues",newFormValues)
}


let removequestion = (i) => {
    let newFormValues = [...questionlist];
    newFormValues.splice(i, 1);
    setQuestionlist(newFormValues)
  }


  let addFormFields = () => {
    setInformationlist([...informationlist, { title: "",createdByExpert:false,hide:false,id:"",content:''}])
  }



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
    
    let handleCloseEvent = (event) => {
        history.push({
            pathname: '/admin/Cases'
            
          })
    }

  let handleSubmit = (event) => {
    event.preventDefault();
    let data = form.getFieldsValue();
    console.log("questionlist",questionlist)
    console.log("informationlist",informationlist)
    const datobj = {   
        "clinicalSummary":expertWiseReview.caseInfo.clinicalSummary ? expertWiseReview.caseInfo.clinicalSummary : "" ,
        "caseSummary": expertWiseReview.caseInfo.caseSummary ? expertWiseReview.caseInfo.caseSummary : "",
        "hasBeenTreatedOrSurgeryBefore": expertWiseReview.caseInfo.hasBeenTreatedOrSurgeryBefore ? expertWiseReview.caseInfo.hasBeenTreatedOrSurgeryBefore : "",
        "treatedOrSurgeryBeforeDescription": expertWiseReview.caseInfo.treatedOrSurgeryBeforeDescription ?  expertWiseReview.caseInfo.treatedOrSurgeryBeforeDescription :"",
        "hasNewDiagnosisChangedTreatmentOrRecommendation": "",
        "newDiagnosisChangedTreatmentOrRecommendationDescription": "",
        "questionsConsultant": questionlist,
        "additionalFields": informationlist,
        "signatures": Signatures ? Signatures : [],
        "careProviders": "",
        "declineReason": "",
        "intakeDiagnosis": expertWiseReview.caseInfo.intakeDiagnosis ? expertWiseReview.caseInfo.intakeDiagnosis : "",
        "secondaryDiagnosis": ""
    }

     
     for(var i in details.expertWiseReview){
        if(expertWiseReview.expertID == details.expertWiseReview[i].expertID){
            details.expertWiseReview[i].caseInfo = datobj
        }
     }
    const method  = "/case/UpdateactiveCaseExperteviweARRAYState"
    const ExpertObject = {'expertWiseReview':details.expertWiseReview,'id':details.id}
    console.log("ExpertObject",ExpertObject)
    new ServiceStore().UpdateData(method,ExpertObject).then((res) => {
        console.log("res.response",res.response)
        if(res.response.status == 1){
        history.push({
            pathname: '/admin/CaseReport',
            search: '?id='+details.requestCode,
            state: { detail: details },
          })
          
        }
      });
    
}
// let handleChange = (i, e) => {
//   console.log("logEvent",i, e.editor.getData())
//   let newFormValues = [...formValues];
//   newFormValues[i]['resume'] = e.editor.getData();
//   setFormValues(newFormValues);
// }
let handleChange = () => {
    let data = form.getFieldsValue();
}

let removeFormFields = (i) => {
    let newFormValues = [...informationlist];
    newFormValues.splice(i, 1);
    setInformationlist(newFormValues)
  }
  
const [show, setShow] = useState(false);

const handleShow = () => setShow(true);
const handleClose = () => setShow(false);
const onLoginFormSubmit = (e) => {
    e.preventDefault();
    handleClose();
    GetData()
  };

const Remove = (id) => {
    console.log("id",id)
    const method = '/signature/removesignature/'
    new ServiceStore().DeleteData(method,id).then((res) => {
      console.log("res",res)
     
      GetData()
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
            <Form   
                                 
                                 form={form}
                                 size="large"
                                 id="signupForm"
                                 requiredMark={false}
                                 onFinish={handleSubmit}
                                                 onChange={handleChange}
                                 >
            <div className="sc-1rnyb57-0 bOxyAZ">
                <div className="sc-16qu7j7-3 iMHPqm">
                    <div>
                        <h1 className="sc-16qu7j7-0 gGRhvg">Expert review</h1>
                    </div>
                    <div>
                    <Button onClick={handleCloseEvent}  className="Button-qe54pl-1 dWfJVl styled-button" type="button"><span
                        className="Icon-wsq54u-0 bWtdYP"></span>Save and view all cases</Button><Button 
                    className="Button-qe54pl-1 ePXPMS styled-button" type="submit" onClick={handleSubmit}>Save and advance</Button></div>
                </div>
                <div className="sc-1rnyb57-1 hXUzMv">
                    <h3>Questions &amp; answers</h3>
                </div>
                <div className="sc-1rnyb57-2 sc-i44ypk-5 bBCSpc">
                    <div className="sc-z96cfy-0 hIGrJh" >
                        <div className="sc-o17b9m-0 Frhkt undefined drag-drop-item">
                        {questionlist.map((element, index) => (
                            <div key={index}  data-drag="false">
                                <span data-drag="false" className="Icon-wsq54u-0 sc-1aw9jna-0 bWtdYP jHbkTm" onClick={() => removequestion(index)}><AiFillCloseCircle size={30}> </AiFillCloseCircle></span>

                                    <div className="SlateStyles__RichTextContainer-sc-xm7wp-1 brULiI" >
                                        <Form.Item

                                        name={[index, "question"]}
                                        >
                                        <Input     onChange={e => QuestionChange(index, e,element)}  defaultValue = {element.question}
                                                className="TextInput__Input-yzpeng-1 kOJOyM"
                                                
                                            />
                                            
                                        </Form.Item>
                                    </div>
                                    <div >
                                    <Form.Item name={[index, "answer"]}>
                                    <CKEditor className="cke_contents"
                                           onChange={e => QuestionChange(index, e,element)}
                                            data={element.answer}
                                            initData={element.answer}
                                
                                    />
                                    </Form.Item>
                                </div>
                            </div>
                             ))} 
                            <span data-drag="false" className="Icon-wsq54u-0 sc-o17b9m-1 bWtdYP fJDZUF"></span>
                        </div><Button  onClick={() => addQuestion()} className="Button-qe54pl-1 sc-18mwo6g-0 eXugtO iiNBRZ styled-button" type="button"><span
                                className="Icon-wsq54u-0 bWtdYP"></span>Add question</Button>
                    </div>
                </div>
                    <div className="sc-1rnyb57-1 hXUzMv">
                        <h3>Additional information</h3>
                    </div>
                    <div className="sc-1rnyb57-2 sc-i44ypk-1 hWzldJ hrzTfi">
                        <div className="sc-z96cfy-0 hIGrJh" >
                            <div className="sc-1ovhbqj-0 crgxFD undefined drag-drop-item">
                            {informationlist.map((element, index) => (
                                        <div key={index}  data-drag="false">
                                            <span data-drag="false" className="Icon-wsq54u-0 sc-1aw9jna-0 bWtdYP jHbkTm" onClick={() => removeFormFields(index)}><AiFillCloseCircle size={30}> </AiFillCloseCircle></span>
                                             <div className="SlateStyles__RichTextContainer-sc-xm7wp-1 brULiI" >
                                                <Form.Item
                                                name={[index, "title"]}
                                                > 
                                                <Input onChange={e => InformationChange(index, e,element)}   defaultValue = {element.title}
                                                        className="TextInput__Input-yzpeng-1 kOJOyM"
                                                        
                                                    />
                                                    
                                                </Form.Item>
                                            </div>
                                            <Form.Item

                                                name={[index, "content"]}
                                                >
                                            <CKEditor className="cke_contents"
                                            onChange={e => InformationChange(index, e,element)}
                                            data={element.content}
                                            initData={element.content}
                                            
                                
                                    />
                                    </Form.Item>
                                           
                                        </div>
                                        ))} 
                                <span  className="Icon-wsq54u-0 sc-1ovhbqj-1 bWtdYP kxtWSQ"></span>
                            </div><Button onClick={() => addFormFields()} className="Button-qe54pl-1 sc-18mwo6g-0 eXugtO iiNBRZ styled-button"
                                type="button"><span className="Icon-wsq54u-0 bWtdYP"></span>Add a new field</Button>
                        </div>
                    </div>
            <div className="sc-1rnyb57-1 hXUzMv">
                <h3>Signatures</h3>
            </div>
             <div className="sc-1rnyb57-2 sc-i44ypk-4 hWzldJ hQfClD"><span></span>
             <div className="sc-i44ypk-0 hkkesa"><span>Drag and drop items to reorder</span></div><span></span>
             {Signatures && 
                            <div className="sc-sx0pb6-2 bJrzgT">
                               
                                    {Signatures.map((element, index) => (
                                        <div key={index} className="sc-sx0pb6-3 juOWYn">
                                            <div className="signature-content">
                                                <div className="signature-image"></div>
                                                <img src={SignatureimageuRl+element.imagePath} />
                                                <div className="signature-line"></div>
                                                <div className="display-name">{element.name}</div>
                                                <div className="description">{element.description}</div>
                                            </div>
                                            <Dropdown >
                    
                                                <Dropdown.Toggle >
                                                Edit
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu >
                                                <Dropdown.Item onClick={(e) => Remove(element.id)}>Remove Expert</Dropdown.Item>
                                                
                                                </Dropdown.Menu>
                                            </Dropdown>
                                              
                                        </div>
                                        ))}
                             
                            </div>
                            }
                        <Button  onClick={handleShow}   className="Button-qe54pl-1 sc-18mwo6g-0 eXugtO iiNBRZ styled-button" type="button"><span
                        className="Icon-wsq54u-0 bWtdYP"></span>Add signature</Button>
                </div>
    
        <div className="sc-1rnyb57-5 jKPFjl"><Button onClick={handleCloseEvent}  className="Button-qe54pl-1 dWfJVl styled-button"
            type="button"><span className="Icon-wsq54u-0 bWtdYP"></span>Save and view all cases</Button><Button
           className="Button-qe54pl-1 ePXPMS styled-button" type="submit" onClick={handleSubmit}>Save and advance</Button></div>
            </div>
        </Form>
                <Modal show={show} onHide={handleClose}  size="lg">
                   
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

export default ExpertReview
const ContactPatient = ({ onSubmit }) => {
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
    let history = useHistory();

    const setvalidation = (field,value) => {
    
        if(field == 'name'){
          setName(value)
        }
        if(field == 'description'){
          setdescription(value)
        }
       
        
      };
  
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
    const ClearSign = () => {
        signCanvas.current.clear()
    }
    const onFileSelect = event => {
        const file = event.target.files[0];
        console.log("file",file)
        if (event.target.files[0].size < 100000000) {
            const reader = new FileReader();
            reader.readAsDataURL(file); // toBase64
            setFile(file)
            reader.onload = () => {
              // this.imagess = reader.result // base64 Image src
            };
          /* checking size here - 2MB */ 
        }else{
          this.imgeerror = 'Please Select Max 100MB Size File'
        }
    
        
    
        
      }
    const handleSubmit = (e) => {
        e.preventDefault();
        const loginuser = JSON.parse(localStorage.getItem("loginuser"))
        let data = form.getFieldsValue();
        console.log("data",data,signCanvas)
        if(data.name == undefined || data.name == '' ){
          setFError('Please Enter Yor Name ');
        }
        if(data.signatureType == undefined || data.signatureType == '' ){
            setsignatureTyperror('Please Enter Yor Signature Type ');
        }
        if(data.name == undefined || data.name == ''|| data.signatureType == undefined || data.signatureType == ''){
            return
        }
        if(data.description == undefined){
            data.description = ''
        }
        data.expert = loginuser.id
        data.hide = false
        data.caseId = history.location.state?.detail.id
        data.imagePath = ''

      
                if(signCanvas.current != null ){
                    if(Object.keys(signCanvas.current).length > 0){
                        const signCanvased =   signCanvas.current.getTrimmedCanvas().toDataURL("image/png")
                        const filedata = DataURIToBlob(signCanvased)
                        console.log("signCanvased",signCanvased)
                        const unique_id = uuid();
                        const formData = new FormData();
                        formData.append('file', filedata, unique_id+'image.png') 
                        const method = '/signature/uploadsignature'
                        new ServiceStore().UploadFile(method,formData).then((res) => {
                            console.log("res",res)
                            // setfileURL(res.data.data.imagename)
                            data.imagePath = res.data.data.filename

                            console.log("signCanvas.current",data)

                            const methos ='/signature/createsignature'
                            new ServiceStore().InsertData(methos,data).then((res) => {
                                onSubmit(e)
                            })

                        })
                    }
                }
                if(file != '') {
                    const formData = new FormData();
                    formData.append('file', file, file.name) 
                    const method = '/signature/uploadsignature'
                    new ServiceStore().UploadFile(method,formData).then((res) => {
                        console.log("res",res)
                        data.imagePath = res.data.data.filename
                        console.log("signCanvas.current",data)
                        const methos ='/signature/createsignature'
                        new ServiceStore().InsertData(methos,data).then((res) => {
                            onSubmit(e)
                        })
                        // setfileURL(res.data.data.imagename)
                    })
                }
                console.log("signCanvas.current")
                if(file == '' && (signCanvas.current == null)){
                    console.log("signCanvas.current",data)
                    const methos ='/signature/createsignature'
                    new ServiceStore().InsertData(methos,data).then((res) => {
                        onSubmit(e)
                    })
                }
                if(file == '' && (Object.keys(signCanvas.current).length == 0)){
                    console.log("signCanvas.current",data)
                    const methos ='/signature/createsignature'
                    new ServiceStore().InsertData(methos,data).then((res) => {
                        onSubmit(e)
                    })
                }
              
                


    }
    function DataURIToBlob(dataURI) {
        const splitDataURI = dataURI.split(',')
        const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
        const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

        const ia = new Uint8Array(byteString.length)
        for (let i = 0; i < byteString.length; i++)
            ia[i] = byteString.charCodeAt(i)

        return new Blob([ia], { type: mimeString })
      }
    const Activeclick = (state,e) => {
        console.log("state,e",state)
        setdrawsign(false)
        setuploadsign(false)
        if(state == 'Draw' ){
            setdrawsign(true)
        }
        if(state == 'Upload' ){
            setuploadsign(true)
        }
        document.querySelectorAll('.cPnkLT').forEach(function(item) {
            item.classList.remove('cPnkLT');
            item.classList.add('jQTaTO');
        })
        if(e){
            e.target.classList.add('cPnkLT');
            e.target.classList.remove('jQTaTO');
        }
    }
    const handleChange = debounce(() => {
        let data = form.getFieldsValue();
    })
    return (
        <Row>
          
        <Col md="12">
        
        
        <div className="Dialog-gai4ey-9 jtuVcG JS-has-wc JS-dialog" >
            <div className="Dialog__DialogAlwaysVisibleDiv-gai4ey-8 hvOez"><span
                    className="Icon-wsq54u-0 Dialog__CloseIcon-gai4ey-1 bWtdYP lgtrXX JS-dialog-close JS-dialog-close"></span>
                <h2 className="Dialog__DialogTitle-gai4ey-4 cxtYXo">Create new signature</h2>
            </div>
            <Form   layout="vertical"
									form={form}
									size="large"
									id="signupForm"
									requiredMark={false}
									onFinish={handleSubmit}
                                    onChange={handleChange}   >

            <div className="LoadingDiv__BlockContainer-sc-1g7ljba-0 gqDJHC Dialog__DialogContentWrapper-gai4ey-7 bSXPve">
                <div className="Dialog__DialogContent-gai4ey-3 ifAPFT">
                    <div className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"><label
                            className="Field__Label-p9woft-2 cUWXcG">Display name<span
                                className="Field__Mandatory-p9woft-0 eOWGWb">*</span></label>
                                <Form.Item
                                name="name"
                                className="textLeft Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"
                                        
                                        >
                                <Input   onChange={(e) => setvalidation('name',e.target.value)}
                            placeholder="Ex: John Doe"   className={ferror.length > 0 ? "is-invalid form-control TextInput__Input-yzpeng-1 bFIQjr" : "form-control TextInput__Input-yzpeng-1 bFIQjr"} data-hj-whitelist="true"
                             type="text" />
                              </Form.Item>
                              {ferror.length > 0 && (
                                 <span className="invalid-feedback">{ferror}</span>
                            )}
                            
                             </div>
                    <div className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"><label
                            className="Field__Label-p9woft-2 cUWXcG">Description</label>
                            <Form.Item
                                name="description"
                                className="textLeft Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"
                                        
                                        >
                            <Input name = 'description' onChange={(e) => setvalidation('description',e.target.value)} 
                            placeholder="Ex: General practitioner" className="TextInput__Input-yzpeng-1 daPGFg"
                            data-hj-whitelist="true"  type="text"  ></Input>
                        </Form.Item>
                    </div>
                  
                    <div className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"><label
                            className="Field__Label-p9woft-2 cUWXcG">Signature type <span
                            className="Field__Mandatory-p9woft-0 eOWGWb">*</span>
                              
                            </label>
                            <Form.Item
                                name="signatureType"
                                className="textLeft Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"
                                        
                                        >
                                <Radio.Group  className={signatureTyperror.length > 0 ? "is-invalid ml-left form-control" : "form-control  ml-left"}>
                                <Radio value={'DIGITAL'} className="ml-left"><span className="ml-left">Digitally signed</span>  </Radio>
                                <Radio value={'PEN'} className="ml-left"><span className="ml-left">Sign after printing </span></Radio>
                                <Radio value={'NONE'} className="ml-left"><span className="ml-left">Name only (without signature) </span></Radio>
                            </Radio.Group>
                        </Form.Item>
                        {signatureTyperror.length > 0 && (
                    <span className="invalid-feedback">{signatureTyperror}</span>
                    )}
                                 
                            
                    </div>
                    <div className="Field__Container-p9woft-1 eFssct sc-sx0pb6-8 lbapjN"><label
                            className="Field__Label-p9woft-2 cUWXcG">Digital signature<span
                                className="Field__FieldDescription-p9woft-4 bNrjSU">Select an option to electronically sign
                                your reports</span></label>
                        <div className="InputboxGroup-q49nwm-0 bnipir"><label data-drag="false"
                                className="TabRadiobox-sc-1vu3bcn-2 buNzDE">
                                <Input type="radio" name="signature" 
                                    className="Radiobox__HiddenInput-pelyer-0 jZzYQJ" value="Upload a signature"
                                    />
                                    <a onClick={(e)=>Activeclick('Upload',e)}
                                    className="TabRadiobox__InnerButton-sc-1vu3bcn-1 JduRt Button-qe54pl-1 TabRadiobox__TabButton-sc-1vu3bcn-0 jYJwHA cPnkLT styled-button"
                                    type="">Upload a signature
                                    </a>
                                    
                                    </label>
                                    <label data-drag="false"
                                className="TabRadiobox-sc-1vu3bcn-2 buNzDE">
                                    <Input type="radio" name="signature" 
                                                    
                                    className="Radiobox__HiddenInput-pelyer-0 jZzYQJ" value="Draw a signature" />
                                    <a
                                   onClick={(e)=>Activeclick('Draw',e)}
                                    className="TabRadiobox__InnerButton-sc-1vu3bcn-1 JduRt Button-qe54pl-1 TabRadiobox__TabButton-sc-1vu3bcn-0 jYJwHA jQTaTO styled-button"
                                    type="">Draw a signature</a></label>
                                    
                                    </div>
                                    {uploadsign && 
                                            <div className="Field__Container-p9woft-1 eFssct sc-sx0pb6-9 kBDlQX"><label
                                                    className="Field__Label-p9woft-2 cUWXcG">Upload your signature<span
                                                        className="Field__FieldDescription-p9woft-4 bNrjSU">You can upload images on format JPEG
                                                        or PNG</span></label>
                                                <div className="sc-1ojytqt-1 sc-sx0pb6-5 hYkokQ eHWayJ">
                                                    <div>Click or drag and drop an image file here to upload it.</div>
                                                    <Form.Item
                                                        name="file"
                                                       
                                        
                                                        >
                                                  
                                                    <Input onChange={onFileSelect}
                                                        type="file" className="withFormImageInput__FileInput-o7trbb-0 iA-dYhO" />
                                                    </Form.Item>
                                                        {/* <SignatureCanvas penColor='green' ref={signCanvas}
                        canvasProps={{width: 500, height: 200, className: 'sigCanvas'}} /> */}
                                                        <span
                                                        className="Icon-wsq54u-0 bWtdYP"></span>
                                                </div>
                                            </div>
                                    }
                                {drawsign && 

                                                <div className="Field__Container-p9woft-1 eFssct sc-sx0pb6-1 cjddJa">
                                                    <label className="Field__Label-p9woft-2 cUWXcG">Draw your signature
                                                    <span className="Field__FieldDescription-p9woft-4 bNrjSU">Sign using the cursor in the space below
                                                    </span></label>
                                                    <button  onClick={ClearSign} className="Button-qe54pl-1 isEdxL styled-button" type="button">
                                                            Clear</button>
                                                            <Form.Item
                                                        name="canvas"
                                        
                                                        >
                                                            <span className="sc-sx0pb6-0 iJatSG" height="120"  width="492">
                                                            <SignatureCanvas ref={signCanvas} penColor='green'  canvasProps={{className: 'sigCanvas'}}>
                                                            </SignatureCanvas>
                                                            
                                                        </span>
                                                        </Form.Item>
                                                       
                                                </div>
                            }
                    </div>
                    <div className="TransitionDiv__BlockContainer-sc-1sh2xah-0 gjcdiO">
                       
                    </div>
                </div>
                <div className="Dialog__DialogFooter-gai4ey-5 gJumhz">
                    <button 
                        className="Button-qe54pl-1 jYJwHA styled-button" type="button">Cancel
                        </button>
                        <button 
                        className="Button-qe54pl-1 ePXPMS styled-button" type="submit"    onClick={handleSubmit}>Save
                        </button>
            </div>
            </div>
            </Form>
        </div>
  

        </Col>
        </Row>
    )
    
  };


