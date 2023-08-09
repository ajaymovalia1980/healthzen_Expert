
import React, {useState , useCallback, useMemo} from "react";
import ServiceStore from "../util/ServiceStore";
import Select from 'react-select'
import { MultiSelect } from "react-multi-select-component";
import { CKEditor } from 'ckeditor4-react';
import { useHistory } from "react-router-dom";
import {AiFillCaretDown,AiOutlineFilePdf,AiOutlineFileImage,AiOutlineUsergroupAdd,AiOutlineFile,AiOutlineDiff, AiOutlineUser ,AiOutlineFileText ,AiOutlineMail,AiOutlineVideoCamera,AiOutlineDollar} from "react-icons/ai";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { AiOutlineDownCircle ,AiOutlineEdit ,AiOutlineEye} from "react-icons/ai";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import LeftsidebarCase from "./LeftsidebarCase"
import Dropdown from 'react-bootstrap/Dropdown';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Input,
  Row,
  Col,
  Table
} from "reactstrap";
function AddDivision() {
  let history = useHistory();
   const [firstname, setFirstName] = useState('');
   const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
   const [cemail,setCEmail] = useState('');
   const [phone,setPhone] = useState('');
   const [specialities,setSpecialities] = useState('');
   const [profile,setProfile] = useState('');
   const [selected, setSelected] = useState([]);
   const [file, setFile] = useState('')
   const [resume, setResume] = useState('')

   const [allData, setAllData] = React.useState([]);
   const countPerPage = 10;
   const [value, setValue] = React.useState("");
   
  
   const [show, setShow] = useState(false);

   const handleShow = () => setShow(true);
   const handleClose = () => setShow(false);
   const [openMenu, setOpenMenu] = useState(false)
  
   const pushToRoute = route => {
    history.push(route)
    setOpenMenu(false)
}
   const onLoginFormSubmit = (e) => {
     e.preventDefault();
     console.log("ddddddddddddddddd",e.target.Cancel)
       if(e.target.Cancel == undefined){
          handleClose();
       }else{
          const data = {category:e.target.divisions.value,active:1}
          const method = '/division/createdivision'
          new ServiceStore().InsertData(method,data).then((res) => {
              if(res.response.status == 1){
                handleClose();
                setAllData(allData)
              }
            });
        }
   };
  React.useEffect(() => {
    const method = "/division/getdivision"
    new ServiceStore().GetAllData(method).then((res) => {
    console.log("res",res)
      setAllData(res.data)
    });
   
  }, []); 
  




 


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("planbyidlist",resume)
   if(file != ''){
    const formData = new FormData();
    formData.append("file", file, file.name);
    console.log("ddddddddddddddd",file.name,formData)
       new ServiceStore().UploadImage(formData).then((res) => {
        console.log("planbyidlist",res)
        const data = {firstname:e.target.firstname.value,lastname:e.target.lastname.value,
          email:e.target.email.value,cemail:e.target.cemail.value,
          specialities:selected,phone:e.target.phone.value,resume:resume,
          profile:res.data.imagename,active:1,opencase:1}
          console.log(data)
            new ServiceStore().AddExpert(data).then((res) => {
              console.log("ddddddddddddddddd",res)
              if(res.data.status == 1){
                history.push("/admin/Experts");
              }
            });
      });
  }else{
      const data = {firstname:e.target.firstname.value,lastname:e.target.lastname.value,
        email:e.target.email.value,cemail:e.target.cemail.value,
        specialities:selected,phone:e.target.phone.value,resume:resume,
        profile:'',active:1,opencase:1}
        console.log(data)
          new ServiceStore().AddExpert(data).then((res) => {
            console.log("ddddddddddddddddd",res)
            if(res.data.status == 1){
              history.push("/admin/Experts");
            }
          });
    
  }
   
   
  }

   

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
              <CardHeader>
                <CardTitle tag="h5">Division settings</CardTitle>
                <label>Group users and cases by using divisions. You can add, edit and remove divisions below.</label>
              </CardHeader>
              <CardBody>
              <Row>
                <Col lg="3" md="6" sm="6">
                    
                </Col>
                  <Col lg="6" md="6" sm="6">
                    </Col>
                  <Col  lg="3" className="text-right" md="3" xs="3">
                  <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-redi"
                        color="primary"
                        type="button"
                        onClick={handleShow}
                      >
                        + Add division
                      </Button>
                     
                    </div>
                      </Col>
                      <Modal show={show} onHide={handleClose}>
                    <Modal.Header >
                    <Modal.Title>Add Division</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <DivisionForm onSubmit={onLoginFormSubmit} />
                    </Modal.Body>
                    <Modal.Footer>
                    {/* <Button variant="secondary" onClick={handleClose}>
                        Close Modal
                    </Button> */}
                    </Modal.Footer>
                </Modal>
              </Row>
              <Row>
                <Col>
                <div className='jwizSo'>
                {allData.map((i,index) => (
                    <div  key={index} className="sc-1t8rvqn-2 brOVDk">
                        <div className="left-wrapper">{i.category}</div>
                        <div className="counters-wrapper">
                            <div className="counter">
                                <span className="Icon-wsq54u-0 bWtdYP"></span> 1
                                </div><div className="counter">
                                    <span className="Icon-wsq54u-0 bWtdYP"></span> 0
                                    </div>
                                    </div>
                                    <div  className="Button-qe54pl-1 iWvyUB " >
                                        <span className="sc-bczRLJ XPRdW">  
        
                                          <Dropdown>
                                            <Dropdown.Toggle>
                                            
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                              <Dropdown.Item href="#/action-1">Manage cases</Dropdown.Item>
                                              <Dropdown.Item href="#/action-2">Manage users</Dropdown.Item>
                                              <Dropdown.Item href="#/action-3">Edit name</Dropdown.Item>
                                              <Dropdown.Item href="#/action-3">Remove</Dropdown.Item>

                                            </Dropdown.Menu>
                                          </Dropdown>
                                          </span>
                                        </div>
                                       
                        </div>
                       ))}
                </div>
                </Col>
              </Row>
               
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default AddDivision;


const DivisionForm = ({ onSubmit }) => {
    const [divisions, setDivisions] = useState("");
   
    const [isError, setIsError] = useState('')
    const divisionclick = (e) => {
      console.log("e.target.value",e.target.value)
       setDivisions(e.target.value)
       setIsError('')
    }
    const onSubmits = (e) => {
      e.preventDefault();
      console.log("ddddddddddddddddd",e.target.divisions.value)
      if(e.target.divisions.value == ''){
        const isError = 'Please Enter Division First'
        setIsError(isError)
      }else{
        onSubmit(e)
      }
    }
    const handleClose = (e) => {
      
        onSubmit(e)
      
    }
    return (
        <Row>
          
        <Col md="12">
          <Card className="card-user">
     
            <CardBody>
              <Form  onSubmit={onSubmits} noValidate>
                <Row>
                    <Col className="pr-1" md="12">
                      <FormGroup>
                        <p><span>New divisions </span> <span className="spnred">*</span></p>
                        <Input
                          placeholder="Type the new division(s) name(s) here"
                          type="text"
                          name = 'divisions'
                          onChange={(e) => divisionclick(e)}
                          className={isError.length > 0 ? "is-invalid form-control" : "form-control"}

                          />
                           {isError.length > 0 && (
                          <span className="invalid-feedback">{isError}</span>
                          )}
                      </FormGroup>
                    </Col>

                
                    
                    </Row>
                    <Row>
                    
                        <div className="mr-l ">
                        <Button
                          variant="secondary"
                            type="button"
                            onClick={handleClose}
                            name = 'Cancel'
                        >
                            Cancel
                        </Button>
                        </div>
                        <div className="update ml-auto mr-auto">
                        <Button
                            color="primary"
                            type="submit"
                        >
                            Submit
                        </Button>
                        </div>
                  </Row>
                </Form>
                </CardBody>
                </Card>
                </Col>
                </Row>
        
    
    );
  };