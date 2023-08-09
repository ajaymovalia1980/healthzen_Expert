
import React,{useState} from "react";
import { CKEditor } from 'ckeditor4-react';
import { Form, Input, Button, Checkbox,Radio,Switch} from "antd";
import { debounce } from "lodash";
import ServiceStore from "../util/ServiceStore";
import { useHistory } from 'react-router-dom';
import { vsmFeepayment } from "../util/validation"
import { observer } from "mobx-react";

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
import {AiOutlineFilePdf,AiOutlineFileImage,AiOutlineUsergroupAdd,AiOutlineFile,AiOutlineDiff, AiOutlineUser ,AiOutlineFileText ,AiOutlineMail,AiOutlineVideoCamera,AiOutlineDollar,AiFillPlusCircle} from "react-icons/ai";
import Rightsidebar from "./Rightsidebar"
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select'
import "bootstrap/dist/css/bootstrap.css";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
function ManagePayment() {
  const [resume, setResume] = useState('')
  const [formValues, setFormValues] = useState([{ resume: ""}])
  const [paymentlist, setPaymentlist] = useState([])
  const history = useHistory();
  const logEvent = (e) => {
    console.log("logEvent",e.editor.getData())
    // setResume(e.editor.getData())
  }
  React.useEffect(() => {
 onloadeddata()
    
    
  }, []);
  let onloadeddata = () => {
    const dataid = history.location.state?.detail.id

    const methods = '/case/FindCaseByID/'
    new ServiceStore().GetDataByID(methods,dataid).then((res) => {
        const detail = res.data    
        console.log("detail:::::::::::::;;",detail.payments)
       
        setPaymentlist(detail.payments)
        
        })

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
const [showrevoked, setShowrevoked] = useState(undefined);
const handleRevokedShow = (id) => setShowrevoked(id);

const handleShow = () => setShow(true);
const handleClose = () => setShow(false);
const onLoginFormSubmit = (e) => {
    e.preventDefault();
    handleClose();
    onloadeddata()
  };
  const handleCloserevoed = () => setShowrevoked(false);

  const onFormSubmit = (e) => {
   
    handleCloserevoed();
    onloadeddata()
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
          <div className="sc-1rnyb57-0 fVXGAv">
                    <div className="sc-16qu7j7-3 hgekMc">
                        <div>
                            <h1 className="sc-16qu7j7-0 gGRhvg">Manage payments</h1>
                        </div>
                        <div></div>
                    </div>
                    <div className="sc-1rnyb57-1 hXUzMv">
                        <h3>Fee and payment history</h3>
                    </div> 
                    {paymentlist.length > 0 &&
                             <div className="sc-1rnyb57-2 bBCSpc">
                            {paymentlist.map((element, index) => (
                                    <div key={index} >
                                        {element.revoked == false && 
                                            <div className="sc-21ha54-0 yjttx">
                                                <div>
                                                    <div className="description"><b>case FEE:</b> {element.chargeValue}.00</div>
                                                    <div className="details"><span><b>Date added: </b>{new Date(element?.requestDate).toLocaleString()}</span>
                                                    {element.paymentMethod == 'DIGITAL' &&
                                                    <span>
                                                        <b>Payment method: </b>{element.paymentMethod} (credit
                                                            card)
                                                    </span>
                                                    }
                                                     {element.paymentMethod == 'OFFLINE' &&
                                                    <span>
                                                        <b>Payment method: </b>{element.paymentMethod} 
                                                    </span>
                                                    }
                                                        </div>
                                                </div>
                                                <div><button  className="Button-qe54pl-1 hJkQQn styled-button" type="button" onClick={()=>handleRevokedShow(index)} >Revoke</button></div>
                                            </div>
                                        }
                                    {element.revoked == true && 
                                        <div className="sc-21ha54-0 jDdBmP">
                                            <div>
                                                <div className="description"><b>no:</b> {element.chargeValue}.00</div>
                                                <div className="details"><span><b>Date added: </b> {new Date(element?.requestDate).toLocaleString()}</span>
                                                {element.paymentMethod == 'DIGITAL' &&
                                                    <span>
                                                        <b>Payment method: </b>{element.paymentMethod} (credit
                                                            card)
                                                    </span>
                                                    }
                                                     {element.paymentMethod == 'OFFLINE' &&
                                                    <span>
                                                        <b>Payment method: </b>{element.paymentMethod} 
                                                    </span>
                                                    }
                                                </div>
                                            </div>
                                            <div>
                                                <div className="sc-21ha54-1 gepAti"><span className="Icon-wsq54u-0 sc-21ha54-2 bWtdYP EhHgx"></span>Revoked on
                                                    12/05/2022 at 14:57</div>
                                            </div>
                                        </div>
                                    }
                                     <Modal show={showrevoked === index} onHide={handleCloserevoed}  size="lg">
                                        <Modal.Body>
                                        <Revoked onSubmit={onFormSubmit} 	propertyData={index}/>
                                        </Modal.Body>
                                        <Modal.Footer>
                                    
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                                ))}
                                </div>
                    }
                      {paymentlist.length == 0 &&
                                <div className="sc-1rnyb57-2 hJuFrK">
                                    <div className="sc-mucp4k-4 kXhSyq">No fees have been added to this case.</div>
                                </div>
                        }   
                    <div className="sc-11e0dya-0 fEdIJr"><Button  onClick={handleShow}  className="Button-qe54pl-1 hgDIaO styled-button" type="button">Add
                            fee</Button></div>
                </div>
                </div>
                <Modal show={show} onHide={handleClose}  size="lg">
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

export default ManagePayment;
const ContactPatient = ({ onSubmit}) => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [cemail, setCEmail] = useState("");
    const [isOn, setIsOn] = React.useState(false);
    const [isshow, setIsshow] = React.useState(false);
    const [detalislist, setDetalislist] = React.useState({});
    const history = useHistory();
	const [disabled, setdisabled] = useState(true);

    const [form] = Form.useForm();
    const [notification, setNotification] = useState({checked:false});
    React.useEffect(() => {
        form.setFieldValue('paymentMethod','DIGITAL')
        form.setFieldValue('revoked',false)
        const dataid = history.location.state?.detail.id
    
        const methods = '/case/FindCaseByID/'
        new ServiceStore().GetDataByID(methods,dataid).then((res) => {
            const detail = res.data    
            console.log("detail:::::::::::::;;",detail)
         
          
            setDetalislist(detail)
            
            })
        
      }, []);
    const handleChange = debounce(() => {
        let data = form.getFieldsValue();
        console.log("data",data)
        form
            .validateFields()
            .then((data) => {
                setdisabled(false);
            })
            .catch((e) => {
                setdisabled(true);
            });
    })
    
    const handleclose = (e) => {
        onSubmit(e)
    }
    const handleSubmit = (e) => {
        let data = form.getFieldsValue();
        console.log("data",data,isshow,notification)
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
            console.log("data",data,detalislist)
            const payment = {
                "paymentMethod": data.paymentMethod ? data.paymentMethod:"",
                "chargeValue": data.chargeValue ? Number(data.chargeValue):"",
                "description": data.description ? data.description:"",
                "requestDate": new Date().getTime(),
                "revoked": data.revoked ? data.revoked:false,
                "revokedDate": "",
                "chargeDate": "",
                "paid":notification.checked ? notification.checked:false,
                "cardInfo": "",
                "stripeChargeID": "",
                "stripeToken": ""
            }
            if(detalislist.payments[0].chargeValue == ''){
                const dataarray = []
                dataarray.push(payment)
                const paymentarray = {'payments':dataarray,'id':detalislist.id}
                console.log("paymentarray",paymentarray)
                    const method  = "/case/UpdateCasePayment"
                    new ServiceStore().UpdateData(method,paymentarray).then((res) => {
                        console.log("res.response",res.response)
                        if(res.response.status == 1){
                            onSubmit(e)
                        }
                    })
            }else{
                
                detalislist.payments.push(payment)
               const paymentarray = {'payments':detalislist.payments,'id':detalislist.id}
               console.log("paymentarray",paymentarray)
               const method  = "/case/UpdateCasePayment"
               new ServiceStore().UpdateData(method,paymentarray).then((res) => {
                   console.log("res.response",res.response)
                   if(res.response.status == 1){
                    onSubmit(e)
                   }
               })
            
            }
            
    }
    return (
        <Row>
          
        <Col md="12">
        <Form   layout="vertical"
                    form={form}
                    size="large"
                    id="signupForm"
                    requiredMark={false}
                    onFinish={handleSubmit}
                    onChange={handleChange} >
                        <div className="Dialog-gai4ey-9 cRbjsh JS-has-wc JS-dialog" >
                    <div className="Dialog__DialogAlwaysVisibleDiv-gai4ey-8 gIWiVc"><span
                            className="Icon-wsq54u-0 Dialog__CloseIcon-gai4ey-1 bWtdYP lgtrXX JS-dialog-close JS-dialog-close"></span>
                        <h2 className="Dialog__DialogTitle-gai4ey-4 hVkvkT">Adding a new fee due now</h2>
                    </div>
                    <div className="LoadingDiv__BlockContainer-sc-1g7ljba-0 gqDJHC Dialog__DialogContentWrapper-gai4ey-7 jLAQmV">
                        <div className="Dialog__DialogContent-gai4ey-3 ifAPFT">
                            <p>You are about to add a new fee due now to the following case:</p>
                            {detalislist.patientInfo && 
                            <div className="sc-pb0d5p-0 ijRKGe sc-72ln41-2 jQyUtC">
                                <div className="main-content">
                                    <div className="patient-name fs-exclude">
                                        <span className="Icon-wsq54u-0 bWtdYP"></span> 
                                        {detalislist?.patientInfo.firstName} {detalislist?.patientInfo.lastName}
                                    </div>
                                    <div className="code"><b>Case ID:</b>{detalislist?.requestCode}</div>
                                    <div className="last-update">Last updated on <span className="nowrap"> {new Date(detalislist?.updatedAt).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                            }   
                            <div className="SplitColumnsContainer-sc-1h4sw88-0 fxYEec">
                                <div className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj" ><label
                                        className="Field__Label-p9woft-2 cUWXcG" >Fee description<span
                                            className="Field__Mandatory-p9woft-0 eOWGWb">*</span></label>
                                            {/* <Input
                                        placeholder="Ex: Additional consultation fee" className="TextInput__Input-yzpeng-1 bVwasA"
                                        data-hj-whitelist="true" type="text" />
                                       */}
                                            <Form.Item
                                            name="description"
                                            rules={vsmFeepayment.validation.description}
                                            >
                                                <Input
                                            placeholder="Ex: Additional consultation fee" className="TextInput__Input-yzpeng-1 bVwasA"
                                            data-hj-whitelist="true"  onChange={handleChange}
                                            ></Input>
                                            </Form.Item>
                                            </div>
                                <div className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"><label
                                        className="Field__Label-p9woft-2 cUWXcG" >Out of pocket fee<span
                                            className="Field__Mandatory-p9woft-0 eOWGWb">*</span></label>
                                            {/* <Input placeholder="Ex: 300.00"
                                        className="TextInput__Input-yzpeng-1 bVwasA" data-hj-whitelist="true"  type="text"
                                        /> */}
                                         <Form.Item
                                            name="chargeValue"
                                            rules={vsmFeepayment.validation.chargeValue}
                                            >
                                                <Input type="number"
                                           placeholder="Ex: 300.00"
                                           className="TextInput__Input-yzpeng-1 bVwasA"
                                            data-hj-whitelist="true"  onChange={handleChange}
                                            ></Input>
                                            </Form.Item>
                                        
                                        </div>
                            </div>
                            <div className="Field__Container-p9woft-1 eFssct"><label className="Field__Label-p9woft-2 cUWXcG">Payment
                                    method<span className="Field__Mandatory-p9woft-0 eOWGWb">*</span></label>
                                <div className="InputboxGroup-q49nwm-0 kJBbpK"><label data-drag="false"
                                        className="SimpleRadiobox-qv83xo-5 cTozDp">
                                           
                                           
                                        <div className="SimpleRadiobox__RadioboxContent-qv83xo-4 keLLfn">
                                            <div className="SimpleRadiobox__TextLabelContainer-qv83xo-3 jzfckW">
                                                     <div className="SimpleRadiobox__CssCircle-qv83xo-0 lphUMS">
                                                    
                                                        <Form.Item
                                                            name="paymentMethod"
                                                            >
                                                                 <Radio.Group onChange={handleChange} >
                                                                        <Radio  name="paymentMethod"
                                                                        value="DIGITAL"
                                                                className="Radiobox__HiddenInput-pelyer-0"
                                                                    data-hj-whitelist="true" 
                                                                    onClick={() => setIsshow(false)}
                                                                    >

                                                                    </Radio>
                                                                    </Radio.Group>
                                                         </Form.Item>
                                                    </div>
                                                    <span
                                                    className="SimpleRadiobox__TextLabel-qv83xo-1 feUDkW">Digital payment</span>
                                            </div>
                                        </div>
                                    </label>
                                    <label data-drag="false" className="SimpleRadiobox-qv83xo-5 cTozDp">
                                        {/* <Input type="radio"
                                        name="paymentMethod" 
                                            className="Radiobox__HiddenInput-pelyer-0 jZzYQJ" value="OFFLINE" /> */}
                                        <div className="SimpleRadiobox__RadioboxContent-qv83xo-4 keLLfn">
                                            <div className="SimpleRadiobox__TextLabelContainer-qv83xo-3 jzfckW">
                                                <div className="SimpleRadiobox__CssCircle-qv83xo-0 lphUMS">

                                                        <Form.Item
                                                            name="paymentMethod"
                                                            >
                                                            <Radio.Group onChange={handleChange} >
                                                                <Radio  name="paymentMethod"
                                                                className="Radiobox__HiddenInput-pelyer-0"
                                                                data-hj-whitelist="true"
                                                                value="OFFLINE"                                                                 onClick={() => setIsshow(true)}
                                                            >
                                                            </Radio>
                                                            </Radio.Group>
                                                         </Form.Item>

                                                </div>
                                                
                                                
                                                <span
                                                    className="SimpleRadiobox__TextLabel-qv83xo-1 feUDkW">Off-line payment</span>
                                            </div>
                                        </div>
                                    </label>
                                </div>

                            </div>
                            <div className="Field__Container-p9woft-1 eFssct sc-nxz9lu-1 jhHyck">
                                <label
                                    className="Field__Label-p9woft-2 cUWXcG">Manual confirmation</label>
                                    {isshow && 
                                    <label data-drag="false"
                                    className="SimpleCheckbox-am8pps-5 iavLHe">
                                       
                                    <div className="SimpleCheckbox__CheckboxContent-am8pps-4 ixRnHN">
                                        <div className="SimpleCheckbox__TextLabelContainer-am8pps-3 fMqJid">
                                            <div className="SimpleCheckbox__CheckboxPseudoInput-am8pps-0 hWuyvs">
                                                    <Form.Item
                                                            name="paid"
                                                            >
                                                            <Checkbox  name="paid"
                                                            className="Checkbox__HiddenInput-sc-19o1zxv-0"
                                                            data-hj-whitelist="true"  onChange={handleChange}
                                                            >
                                                            </Checkbox>
                                                         </Form.Item>
                                             
                                                    </div>
                                                    
                                                    
                                                    <span
                                                className="SimpleCheckbox__TextLabel-am8pps-1 jIuLAR">Mark as paid</span><span
                                                className="Field__HelpText-p9woft-3 dvTMZI">(in case paid externally already)</span>
                                        </div>
                                    </div>
                                     </label>
                                    }
                                     {!isshow && 
                                <label data-drag="false" className="ToggleCheckbox-sc-11ob8ah-4 sc-nxz9lu-0 egvBNw YVSzM">
                               
                                    <div className="ToggleCheckbox__ToggleLabel-sc-11ob8ah-2 kZEOXd">
                                        <b>Send an email requesting payment when adding this fee</b>
                                <div className="ToggleCheckbox__DescText-sc-11ob8ah-3 bbFPxy">
                                    You can also send the payment request by email later
                                </div>
                            </div>
                        <div >
                                    <Form.Item
                                    name="revoked"
                                    >
                                   
                                         <BootstrapSwitchButton   onChange={(checked) => {
                                                setNotification({checked})
                                            }}   name="notification" checked={false} size="sm" onstyle="outline-info" offstyle="outline-primary"/>


                                   
                                    </Form.Item>
                        </div>
                        </label>  
}
                            </div>
                            <div className="TransitionDiv__BlockContainer-sc-1sh2xah-0 gjcdiO">
                            
                            </div>
                        </div>
                        <div className="Dialog__DialogFooter-gai4ey-5 clBDec"><Button 
                                className="Button-qe54pl-1 hgDIaO styled-button" type="button" onClick={handleclose}>Cancel</Button><Button 
                                className="Button-qe54pl-1 iIhlMQ styled-button" type="submit" onClick={handleSubmit}>Add and mark as paid</Button></div>
                    </div>
                
            </div>
        </Form>
        </Col>
        </Row>
    )
    
  };

  const Revoked =  observer((props) =>  {
    const {onSubmit ,propertyData} = props;
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [cemail, setCEmail] = useState("");
    const [isOn, setIsOn] = React.useState(false);
    const [isshow, setIsshow] = React.useState(false);
    const [detalislist, setDetalislist] = React.useState({});
    const [paymentlist, setPaymentlist] = React.useState({});

    const history = useHistory();
	const [disabled, setdisabled] = useState(true);

    const [form] = Form.useForm();
    const [notification, setNotification] = useState({checked:false});
    React.useEffect(() => {
       console.log("propertyData",propertyData)
        form.setFieldValue('paymentMethod','DIGITAL')
        form.setFieldValue('revoked',false)
        const dataid = history.location.state?.detail.id
    
        const methods = '/case/FindCaseByID/'
        new ServiceStore().GetDataByID(methods,dataid).then((res) => {
            const detail = res.data    
           
            //     const date =  new Date(detail.updatedAt)
            //     detail.updatedAt = date.toLocaleString()
            
            // for(var i in detail.payments){
            //     const date =  new Date( detail.payments[i].requestDate)
            //     detail.payments[i].requestDate = date.toLocaleString()
            // }
           
            setDetalislist(detail)
            setPaymentlist(detail.payments[propertyData])
            
            })
        
      }, []);
    //   console.log("propertyData",propertyData)
    const handleChange = debounce(() => {
        let data = form.getFieldsValue();
        console.log("data",data)
        form
            .validateFields()
            .then((data) => {
                setdisabled(false);
            })
            .catch((e) => {
                setdisabled(true);
            });
    })
    
    const handleclose = (e) => {
        onSubmit(e)
    }
    const handleSubmit = (e) => {
       
        
            for(var i in detalislist.payments){
                if(i == propertyData){
                    detalislist.payments[i].revoked = true
                }
            }
            const paymentarray = {'payments':detalislist.payments,'id':detalislist.id}
               console.log("paymentarray",paymentarray)
               const method  = "/case/UpdateCasePayment"
               new ServiceStore().UpdateData(method,paymentarray).then((res) => {
                   console.log("res.response",res.response)
                   if(res.response.status == 1){
                    onSubmit(e)
                   }
               })
            console.log("detalislist",detalislist.payments)
            // if(detalislist.payments[0].chargeValue == ''){
            //     const dataarray = []
            //     dataarray.push(payment)
            //     const paymentarray = {'payments':dataarray,'id':detalislist.id}
            //     console.log("paymentarray",paymentarray)
            //         const method  = "/case/UpdateCasePayment"
            //         new ServiceStore().UpdateData(method,paymentarray).then((res) => {
            //             console.log("res.response",res.response)
            //             if(res.response.status == 1){
            //                 onSubmit(e)
            //             }
            //         })
            // }else{
                
            //     detalislist.payments.push(payment)
            //    const paymentarray = {'payments':detalislist.payments,'id':detalislist.id}
            //    console.log("paymentarray",paymentarray)
            //    const method  = "/case/UpdateCasePayment"
            //    new ServiceStore().UpdateData(method,paymentarray).then((res) => {
            //        console.log("res.response",res.response)
            //        if(res.response.status == 1){
            //         onSubmit(e)
            //        }
            //    })
            
            // }
            
    }
    return (
        <Row>
          
        <Col md="12">
        <Form   layout="vertical"
                    form={form}
                    size="large"
                    id="signupForm"
                    requiredMark={false}
                    onFinish={handleSubmit}
                    onChange={handleChange} >
                        <div className="Dialog-gai4ey-9 bpkkbL JS-has-wc JS-dialog">
                        <div className="Dialog__DialogAlwaysVisibleDiv-gai4ey-8 klECUW"><span
                                className="Icon-wsq54u-0 Dialog__CloseIcon-gai4ey-1 bWtdYP lgtrXX JS-dialog-close JS-dialog-close"></span>
                            <h2 className="Dialog__DialogTitle-gai4ey-4 LGEMR">Revoking payment request</h2>
                        </div>
                        <div className="LoadingDiv__BlockContainer-sc-1g7ljba-0 gqDJHC Dialog__DialogContentWrapper-gai4ey-7 bYNANT">
                            <div className="Dialog__DialogContent-gai4ey-3 ifAPFT">
                                <p>You are about to revoke a payment request regarding the following case:</p>
                                <div className="sc-pb0d5p-0 ijRKGe">
                                    {detalislist.patientInfo &&
                                        <div className="main-content">
                                            <div className="patient-name fs-exclude"><span className="Icon-wsq54u-0 bWtdYP"></span>{detalislist?.patientInfo.firstName} {detalislist?.patientInfo.lastName}</div>
                                            <div className="code"><b>Case ID:</b>{detalislist?.requestCode}</div>
                                            <div className="last-update">Last updated on <span className="nowrap">{new Date(detalislist?.updatedAt).toLocaleString()}</span></div>
                                        </div>
                                    }
                                </div>
                                <p>By revoking a payment request the case contact will no longer be able to make the following payment:</p>
                               {paymentlist && 
                                <div className="sc-21ha54-0 yjttx">
                                    <div>
                                        <div className="description"><b>case FEE:</b>{paymentlist?.chargeValue}.00</div>
                                        <div className="details"><span><b>Date added: </b>{new Date(paymentlist?.requestDate).toLocaleString()}</span>
                                        {paymentlist?.paymentMethod == 'DIGITAL' &&
                                            <span><b>Payment method: </b>{paymentlist?.paymentMethod}
                                                (credit card)</span>
                                        }  

                                             {paymentlist?.paymentMethod == 'OFFLINE' &&
                                            <span><b>Payment method: </b>{paymentlist?.paymentMethod}
                                                </span>
                                        }      
                                                </div>
                                    </div>
                                    <div>
                                
                                    </div>
                              
                                </div>
                                }
                                <p>Are you sure you want to revoke this payment request? You will still be able to request new payments
                                    after that.</p>
                                <div className="TransitionDiv__BlockContainer-sc-1sh2xah-0 gjcdiO">
                                </div>
                            </div>
                            <div className="Dialog__DialogFooter-gai4ey-5 vtrKe"><button 
                                    className="Button-qe54pl-1 cMqAGO styled-button" type="button" onClick={handleclose}>Cancel</button><button 
                                    className="Button-qe54pl-1 iYJSWC styled-button" type="submit">Yes, revoke payment request</button></div>
                        </div>
                    </div>
        </Form>
        </Col>
        </Row>
    )
    
  });