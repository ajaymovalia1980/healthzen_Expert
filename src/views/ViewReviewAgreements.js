
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
import {AiOutlineLeft,AiFillEye,AiOutlineFilePdf,AiOutlineFileImage,AiOutlineUsergroupAdd,AiOutlineFile,AiOutlineDiff, AiOutlineUser ,AiOutlineFileText ,AiOutlineMail,AiOutlineVideoCamera,AiOutlineDollar,AiFillPlusCircle} from "react-icons/ai";
import Rightsidebar from "./Rightsidebar"
import {  Button, Form } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select'
import "bootstrap/dist/css/bootstrap.css";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
function ViewReviewAgreements() {
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
        
                <div className="sc-rkx7yu-10 invUFa">
                   
                            <div className="sc-16qu7j7-3 iMHPqm">
                                <div>
                                    <h1 className="sc-16qu7j7-0 gGRhvg">Review agreements - Document preview</h1>
                                </div>
                                <div>
                                    <Button className="Button-qe54pl-1 fsFIEf styled-button" type="button" onClick={() => pushToRoute("/admin/ReviewAgreements")}>View all
                                        documents</Button></div>
                            </div>
                            <div className="sc-8jxpf9-4 krJzCx">
                                <div className="left-wrapper" >
                                    <span className="Icon-wsq54u-0 sc-16qu7j7-2 bWtdYP fdqhgC" onClick={() => pushToRoute("/admin/ReviewAgreements")}>
                                    <span
                                            className="Icon-wsq54u-0 bWtdYP"><AiOutlineLeft size={30}></AiOutlineLeft>
                                        </span>
                                    </span>
                                <span className="title"><span
                                            className="Icon-wsq54u-0 bWtdYP"></span>Remote Second Opinion Services Agreement and Payment
                                        Authorization</span>
                                    <div className="sc-8jxpf9-3 kYZnDr"><span>Not signed</span></div>
                                </div>
                                <div className="right-wrapper">
                                    <a  className="Button-qe54pl-1 dWfJVl styled-button" 
                                        target="_blank" href={require("assets/img/defaultexpertviewserviceterms.pdf")}><span
                                            className="Icon-wsq54u-0 bWtdYP"></span>Print</a><a 
                                        className="Button-qe54pl-1 dWfJVl styled-button" type="" download=""
                                        href={require("assets/img/defaultexpertviewserviceterms.pdf")}><span
                                            className="Icon-wsq54u-0 bWtdYP"></span>Download</a></div>
                            </div>
                            <div className="sc-il8b1y-6 fuVuxe">
                                <iframe src={require("assets/img/defaultexpertviewserviceterms.pdf")}
                                    className="sc-8rlj2z-0 sc-il8b1y-8 epwalI hiKmao">
                                    </iframe>
                                </div>
                            <div className="sc-1rnyb57-5 jKPFjl"><a className="Button-qe54pl-1 dWfJVl styled-button" type=""
                                    target="_blank" href="/api/serviceTerms/defaultexpertviewserviceterms"><span
                                        className="Icon-wsq54u-0 bWtdYP"></span>Print</a><a 
                                    className="Button-qe54pl-1 dWfJVl styled-button" type="" download=""
                                    href="/api/serviceTerms/defaultexpertviewserviceterms"><span
                                        className="Icon-wsq54u-0 bWtdYP"></span>Download</a></div>
                       
                        <div className="sc-1u5rk2a-0 gVYWdu"><a href="https://www.purview.net/" target="_blank">
                            {/* <img src="/static/media/favicon.4e12ab0e.png" alt="Purview Logo" /> */}
                            </a>
                            <div>
                                <div><span className="main-text">Powered by <a href="https://www.purview.net/"
                                            target="_blank">Purview</a></span> © <span>2022</span>. All Rights Reserved.</div>
                            </div>
                        </div>
                    </div>
                  
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ViewReviewAgreements;
