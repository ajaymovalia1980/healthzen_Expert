
import React, {useState , useCallback, useMemo} from "react";
import ServiceStore from "../util/ServiceStore";
import Select from 'react-select'
import { MultiSelect } from "react-multi-select-component";
import { CKEditor } from 'ckeditor4-react';
import { useHistory } from "react-router-dom";
import {AiFillCaretRight,AiFillCaretLeft,AiOutlineDelete, AiOutlineDownCircle ,AiOutlineEdit ,AiOutlineEye ,AiOutlinePlusCircle} from "react-icons/ai";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import {AiOutlineStop,AiOutlineCheck} from "react-icons/ai";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import LeftsidebarCase from "./LeftsidebarCase"
import { observer } from "mobx-react";

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
  Table,
 
} from "reactstrap";
import Dropdown from 'react-bootstrap/Dropdown';

function StaffManagement() {
  let history = useHistory();

  const [userData, setUserData] = React.useState([]);

  const [searchInput, setSearchInput] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [recordsPerPage] = React.useState(10);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = userData.slice(indexOfFirstRecord, 
  indexOfLastRecord);
  const nPages = Math.ceil(userData.length / recordsPerPage)
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1)
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
   const [value, setValue] = React.useState("");
   const [show, setShow] = useState(false);
   const handleShow = () => setShow(true);
   const handleClose = () => setShow(false);
   const [openMenu, setOpenMenu] = useState(false)
   const [isOpen, setIsOpen] = React.useState(false);
   const [removeUsershow, setremoveShow] = useState(undefined);
   const [EditUsershow, setEditUsershow] = useState(undefined);
   const EditShow = (id) => setEditUsershow(id);
   const EditClose = () => setEditUsershow(undefined);
   const removeShow = (id) => setremoveShow(id);
   const removeClose = () => setremoveShow(undefined);
   const pushToRoute = route => {
    history.push(route)
    setOpenMenu(false)
}
   const onLoginFormSubmit = (e) => {
     e.preventDefault();
    //  handleClose();
      if(e.target.Cancel == undefined){
        handleClose();
      }else{
        handleClose();
        getAllUser()
      }
   };
   const onFormSubmit = (e) => {
    removeClose()
    EditClose()
    getAllUser()
  };
   
   React.useEffect(() => {
    getAllUser()
    
     
    }, []); 

    const getAllUser = () => {
      const method = '/user/getUser'
      new ServiceStore().GetAllData(method).then((res) => {
      console.log("res",res)
       setUserData(res.data)
        });
    }


 

const logEvent = (e) => {
  console.log("logEvent",e.editor.getData())
  setResume(e.editor.getData())
}
  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]
  
const options = [
  { label: "Orthopedics", value: "1" },
  { label: "Internal Medicine", value: "2" },
  { label: "Obstetrics and Gynecology", value: "3" },
  { label: "Dermatology", value: "4" },
  { label: "Pediatrics", value: "5" },
  { label: "Radiology", value: "6" },
  { label: "General Surgery", value: "7" },
  { label: "Ophthalmology", value: "8" },
  { label: "Neurology", value: "9" },
  { label: "Nuclear medicine", value: "10" }
];
const nextPage = () => {
  if(currentPage !== nPages) 
      setCurrentPage(currentPage + 1)
}
const prevPage = () => {
  if(currentPage !== 1) 
      setCurrentPage(currentPage - 1)
}
 
const searchItems = (searchValue) => {
  setSearchInput(searchValue)
  if(searchValue.length > 1){
    const filteredData = userData.filter((item) => {
      return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
    })
    setUserData(filteredData)
  }else{
    getAllUser()
  
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
           
              
              <div className="sc-8t6weo-0 hbexxt">
                <div className="sc-8t6weo-1 eKjGgg">
                    <div className="sc-8t6weo-3 kbEYWh">
                        <h3>Staff management</h3>
                        <div className="left-wrapper">
                            <div className="flex-wrapper">
                                <div className="sc-8t6weo-5 lfquFa">
                                    <div className="sc-8t6weo-6 fHNMOo">
                                      <Input placeholder="Search users" onChange={(e) => searchItems(e.target.value)}
                                            className="TextInput__Input-yzpeng-1 btRsWK TextInput-yzpeng-7 gyICpj"
                                            data-hj-whitelist="true" type="text" /><a
                                            className="sc-8t6weo-4 fuSoaL">Advanced</a></div>
                                    <div className="query-count">
                                        <div data-id="QueryCount"><b>{currentRecords.length} users</b></div>
                                        <div className="nowrap">Showing <a className="sc-8t6weo-4 fuSoaL">10 per page</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="right-wrapper"><Button className="Button-qe54pl-1 ghtksn styled-button"
                                type="button"><span className="sc-bczRLJ XPRdW"></span>Sorting by date</Button><Button
                                className="Button-qe54pl-1 beryvo styled-button" type="button"  onClick={handleShow}>Add new user</Button></div>
                    </div>
                    <Modal show={show} onHide={handleClose} size={'lg'}>
                      <Modal.Body>
                      <LoginForm onSubmit={onLoginFormSubmit} />
                      </Modal.Body>
                      <Modal.Footer>
                      </Modal.Footer>
                      </Modal>
                    <div className="sc-1nr1761-0 hdtcOj">
                        <div className="sc-1nr1761-1 sc-1nr1761-2 epkIdt dpNgHR">
                            <div className="sc-1nr1761-3 eGpYcK user">User</div>
                            <div className="sc-1nr1761-3 eGpYcK email">Email</div>
                            <div className="sc-1nr1761-3 eGpYcK divisions">Divisions</div>
                            <div className="sc-1nr1761-3 eGpYcK status">Status</div>
                            <div className="sc-1nr1761-3 eGpYcK date">Date added</div>
                            <div className="sc-1nr1761-3 eGpYcK actions">Actions</div>
                        </div>
                        {currentRecords.map((i,index) => (
                        <div  key={index} className="sc-1nr1761-1 epkIdt">
                            <div className="sc-1nr1761-3 eGpYcK user">
                                <div className="name">
                                    <div className="Tooltip__TooltipContainer-hhprhj-0 iYcqeS">{i.firstname}</div>
                                </div>
                                <div className="role">{i.userRole}</div>
                            </div>
                            <div className="sc-1nr1761-3 eGpYcK email">{i.email}</div>
                            <div className="sc-1nr1761-3 eGpYcK divisions">
                                {i.categories.length > 0 ? (
                                  <div className="sc-igss1y-0 eEDyHT">
                                      <div className="sc-igss1y-1 kSqmyD">
                                          <div className="Tooltip__TooltipContainer-hhprhj-0 iYcqeS">{
                                    i.categories.map(item => item.label).join(', ')
                                  }</div>
                                      </div>
                                    </div>
                                  
                                ) : (
                                  <div className="empty-divisions">Can access all divisions.</div>
                                )}
                                
                            </div>
                            <div className="sc-1nr1761-3 eGpYcK status">{i.status}</div>
                            <div className="sc-1nr1761-3 eGpYcK date">{ new Date(i.createdAt).toLocaleDateString() }</div>
                            <div className="sc-1nr1761-3 eGpYcK actions">
                              {/* <a className="sc-17inukh-5 hYWxOA">
                              <span
                                        className="sc-mx8ukp-1 jDXxQi">Manage
                                          
                                        </span>
                                        </a>  */}
                                        <span className="sc-17inukh-5">
                                              <Dropdown>
                                                
                                                  <Dropdown.Toggle className="mldrop">
                                                  Manage
                                                  </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                  <Dropdown.Item onClick={()=>EditShow(index)}>Edit User Details</Dropdown.Item>
                                                  <Dropdown.Item >Suspend User</Dropdown.Item>
                                                  <Dropdown.Item  onClick={()=>removeShow(index)}>Delete User</Dropdown.Item>
                                                </Dropdown.Menu>
                                              </Dropdown>
                                              <Modal show={EditUsershow== index} onHide={EditClose} size={'lg'}>
                                                <Modal.Body>
                                                <EditUser onSubmit={onFormSubmit}  index={i}/>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                </Modal.Footer>
                                                </Modal>
                                              <Modal show={removeUsershow == index} onHide={removeClose} size={'lg'}>
                                                <Modal.Body>
                                                <RemoveUser onSubmit={onFormSubmit}  index={i}/>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                </Modal.Footer>
                                                </Modal>
                                        </span>
                                        
                                        
                                        
                                        
                            </div>
                        </div>
                         ))}
                        
                        
                    </div>
                    <div className="sc-g0n340-1 kixDnN">
            <div className="sc-q2887l-1 hrEskh">
              <button  onClick={prevPage}
                    className="Button-qe54pl-1 sc-q2887l-0 crnWPB egiaug styled-button" type="button"><span
                        className="Icon-wsq54u-0 bWtdYP"><AiFillCaretLeft></AiFillCaretLeft></span>
                        </button>
                        
                        {pageNumbers.map((index) => (
                          
                        <button key={index}  onClick={(e) => setCurrentPage(index)}
                        className={ currentPage == index ? 'Button-qe54pl-1 sc-q2887l-0 kexCmR styled-button' : 'Button-qe54pl-1 sc-q2887l-0 isEdxL egiaug styled-button' }
                        type="button">{index}
                        </button>
                          
                          ))}
                    <button   onClick={nextPage}
                    className="Button-qe54pl-1 sc-q2887l-0 crnWPB egiaug styled-button" type="button"><span
                        className="Icon-wsq54u-0 bWtdYP"><AiFillCaretRight></AiFillCaretRight></span>
                      </button>
                    </div>
        </div>
                </div>
              </div>
            
            
          </Col>
        </Row>
      </div>
    </>
  );
}

export default StaffManagement;


const LoginForm = ({ onSubmit }) => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [cemail, setCEmail] = useState("");
    const [isOn, setIsOn] = React.useState(false);
    const [allData, setAllData] = React.useState([]);
    const [visible, setVisible] = useState(false);  // visibility state
    const [division, setDivisions] = useState([]);
    const [notification, setNotification] = useState({checked:true});
    const [isError, setIsError] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');
    const [cerror, setCError] = useState('');
    const [ferror, setFError] = useState('');
    const [lerror, setLError] = useState('');
    const [paserror, setPasError] = useState('');
    const [phonerror, setPhonError] = useState('');
    const [ematch, setEmatch] = useState('');
    const [specialitieserror, setSpecialitieserror] = useState('');
  const options = []
  const setvalidation = (field,value) => {
    
    if(field == 'firstname'){
      setFirstname(value)
    }
    if(field == 'lastname'){
      setLastName(value)
    }
    if(field == 'email'){
      console.log("value",value)
     
        if (!isValidEmail(value)) {
          setError('Email is invalid');
        } else {
          setError('');
        }
        setEmail(value)
    }
    if(field == 'cemail'){
      console.log("email",email,value)
      const matchemail = email.match(value)
      if(matchemail == null){
        setEmatch('Email and Confirm Email does not match!');
      }
      else {
        setEmatch('');
      }
      
      if (!isValidEmail(value)) {
         
       setCError('Email is invalid');
      } else {
        setCError('');
      }
      setCEmail(value)
    }
    // if(field == 'phone'){
    //   setPhone(value)
    // }
    if(field == 'password'){
      setPassword(value)
    }
  };
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
    React.useEffect(() => {
      const method = '/division/getdivision'
      new ServiceStore().GetAllData(method).then((res) => {
      console.log("res",res.data)
      for(var i in res.data){
        const obj = {'value':res.data[i].id,'label':res.data[i].category}
        options.push(obj)
      }
      setAllData(options)
      });
     
    }, []); 

  
const Divisions = (e) => {
  console.log("e",e)
  const divarray = []
  divarray.push(e)
  setDivisions(divarray)
}
    const onSubmits = (e) => {
      e.preventDefault();
     
      if(e.target.firstname.value == ""){
        setFError('Please Enter Yor Name ');
      }
      if(e.target.lastname.value == ""){
        setLError('Please Enter Yor Last Name ');
        
      }
      if(division.length == 0){
        setPhonError('Please Enter Yor Division   ');
      }
      if(e.target.password.value == ""){
        setPasError('Please Enter Yor Password  ');
      }
      if(e.target.email.value == ""){
        setError('Please Enter Yor Email  ');
      }
      if(e.target.cemail.value == ""){
        setCError('Please Enter Yor Conform Email  ');
      }
      if(e.target.cemail.value == ""){
        setCError('Please Enter Yor Conform Email  ');
      }
      // if(selected.length == 0){
      //   setSpecialitieserror('Please Enter Specialities  ');
      // }
    
      if(e.target.gender.value == 'Operator' || e.target.gender.value == 'DivisionAdmin'){
        console.log("if:::::::::::::::",e.target.gender.value)
        if(division.length == 0 || ematch.length > 0  ||  e.target.firstname.value == '' || e.target.lastname.value == '' || e.target.gender.value == "" || e.target.email.value == "" || e.target.cemail.value == ""){
          return
        }
      }
      else{
        console.log("else",e.target.gender.value)
        if(ematch.length > 0  ||  e.target.firstname.value == '' || e.target.lastname.value == '' || e.target.gender.value == "" || e.target.email.value == "" || e.target.cemail.value == ""){
              return
        }
      }
       console.log("division",e.target.gender.value)
      
      console.log("ddddddddddddddddd",notification.checked,e.target.firstname.value)
      const dataobj = {password:e.target.password.value,"userRole":e.target.gender.value,"notification":notification.checked,"categories":division,
      "firstname":e.target.firstname.value,"lastname":e.target.lastname.value,"email":e.target.email.value,
      "cemail":e.target.cemail.value,"status":'ACTIVE',createdby:"",updatedby:""}
      console.log("dataobj",dataobj)
      const method = "/user/addSuperUser"
        new ServiceStore().InsertData(method,dataobj).then((res) => {
            onSubmit(e)    
        });
        
      // if(e.target.divisions.value == ''){
      //   const isError = 'Please Enter Division First'
      //   setIsError(isError)
      // }else{
      //   onSubmit(e)
      // }
    }
    const handleClose = (e) => {
      
      onSubmit(e)
    
  }
    return (
        <Row>
          
        <Col md="12">
          <Card className="card-user">
              <CardTitle> <h5> Add new user </h5></CardTitle>
            <CardBody>
              <Form  onSubmit={onSubmits} noValidate>
                <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <p><span>First Name </span> <span className="spnred">*</span></p>
                        <Input
                          placeholder="First Name"
                          type="text"
                          name = 'firstname'
                          onChange={(e) => setvalidation('firstname',e.target.value)}
                          className={ferror.length > 0 ? "is-invalid form-control TextInput__Input-yzpeng-1 btRsWK" : "form-control TextInput__Input-yzpeng-1 btRsWK"}
                          />
                          {ferror.length > 0 && (
                            <span className="invalid-feedback">{ferror}</span>
                            )}
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <p><span>Last Name </span> <span className="spnred">*</span></p>
                        <Input
                          placeholder="Last Name"
                          type="text"
                          name = 'lastname'
                          onChange={(e) => setvalidation('lastname',e.target.value)}
                          className={lerror.length > 0 ? "is-invalid form-control TextInput__Input-yzpeng-1 btRsWK" : "form-control TextInput__Input-yzpeng-1 btRsWK"}
                          />
                          {lerror.length > 0 && (
                            <span className="invalid-feedback">{lerror}</span>
                            )}
                      </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <p><span>Email </span> <span className="spnred">*</span></p>
                        <Input
                          placeholder="Email"
                          type="email"
                          name = 'email'
                          onChange={(e) => setvalidation('email',e.target.value)}
                          className={error.length > 0  ? "is-invalid form-control extInput__Input-yzpeng-1 btRsWK" : "form-control extInput__Input-yzpeng-1 btRsWK"} 

                          />
                           {error.length > 0 && (
                                                  <span className="invalid-feedback">{error}</span>
                                                  )}
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <p><span>Confirm Email</span> <span className="spnred">*</span></p>
                        <Input
                          placeholder="Confirm Email"
                          type="email"
                          name = 'cemail'
                          onChange={(e) => setvalidation('cemail',e.target.value)}
                          className={cerror.length > 0 || ematch.length > 0 ? "is-invalid form-control TextInput__Input-yzpeng-1 btRsWK" : "form-control TextInput__Input-yzpeng-1 btRsWK"}
                          />
                         {cerror.length > 0 && (
                          <span className="invalid-feedback">{cerror}</span>
                          )}
                          {ematch.length > 0 && (
                          <span className="invalid-feedback">{ematch}</span>
                          )}
                      </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <p><span>Password </span> <span className="spnred">*</span></p>
                        <Input
                          placeholder="Password"
                          type="text"
                          name = 'password'
                          onChange={(e) => setvalidation('password',e.target.value)}
                          className={paserror.length > 0 ? "is-invalid form-control TextInput__Input-yzpeng-1 btRsWK" : "form-control TextInput__Input-yzpeng-1 btRsWK"}

                          />
                          {paserror.length > 0 && (
                            <span className="invalid-feedback">{paserror}</span>
                            )}
                      </FormGroup>
                    </Col>
                    </Row>
                <Row>
                    <Col className="pr-1" md="12">
                        <FormGroup>
                            <p><span>User Role</span> <span className="spnred">*</span></p>

                        </FormGroup>
                        <FormGroup>
                            <div className="ZSshF ">
                                <div className="kSUKnW">
                                <div className="cPNYYC ">
                                <Input type="radio" value="SuperAdmin" name="gender" onClick={() => setVisible(false)}  />
                                Super Admin
                                </div> 
                                
                                <ul className="sc-usmo7d-4 Yokut"><li>
                                  <span className="Icon-wsq54u-0 bWtdYPss"><AiOutlineCheck></AiOutlineCheck></span> 
                                  Access to cases (all)</li><li>
                                    <span className="Icon-wsq54u-0 bWtdYPss"> <AiOutlineCheck></AiOutlineCheck></span> 
                                  Manage staff (all)</li><li className="false">
                                    <span className="Icon-wsq54u-0 bWtdYPss"><AiOutlineCheck></AiOutlineCheck></span>
                                     Notification settings</li><li className="false">
                                      <span className="Icon-wsq54u-0 bWtdYPss"><AiOutlineCheck></AiOutlineCheck></span> Access to audit log</li></ul>
                              
                                </div>
                                <div className="kSUKnW">
                                <div className="cPNYYC ">
                                    <Input type="radio" value="DivisionAdmin" name="gender" onClick={() => setVisible(true)}/>
                                    Division Admin 
                                </div>                        
                                <ul className="sc-usmo7d-4 Yokut"><li>
                                  <span className="Icon-wsq54u-0 bWtdYPss"><AiOutlineCheck></AiOutlineCheck></span>
                                   Access to cases (all)</li><li>
                                    <span className="Icon-wsq54u-0 bWtdYPss"><AiOutlineCheck></AiOutlineCheck></span> 
                                    Manage staff (all)</li><li className="false">
                                      <span className="Icon-wsq54u-0 bWtdYPss"><AiOutlineStop></AiOutlineStop>
                                      </span>  Notification settings </li>
                                      <li className="false">
                                        <span className="Icon-wsq54u-0 bWtdYPss"><AiOutlineStop></AiOutlineStop></span>
                                         Access to audit log</li></ul>
                                </div>
                                <div className="kSUKnW">
                                <div className="cPNYYC ">
                                
                                    <Input type="radio" value="Operator" name="gender" onClick={() => setVisible(true)}/>
                                        Operator   </div>                       
                                <ul className="sc-usmo7d-4 Yokut">
                                    <li><span className="Icon-wsq54u-0 bWtdYPss"><AiOutlineCheck></AiOutlineCheck></span>
                                     Access to cases (all)</li><li className="false">
                                      <span className="Icon-wsq54u-0 bWtdYPss"><AiOutlineStop></AiOutlineStop></span> 
                                      Manage staff (all)</li><li className="false">
                                        <span className="Icon-wsq54u-0 bWtdYPss"><AiOutlineStop></AiOutlineStop></span>
                                         Notification settings</li><li className="false">
                                          <span className="Icon-wsq54u-0 bWtdYPss"><AiOutlineStop></AiOutlineStop></span>
                                           Access to audit log</li></ul>
                                </div>
                            </div>
                           
                       </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                    <Col className="pr-1" md="12">
                        <FormGroup>
                        <span>Receive administrative email notifications</span>
                        <label><div >According to notification settings and division restrictions (if applicable)</div></label>
                        <BootstrapSwitchButton   onChange={(checked) => {
        setNotification({checked})
    }}   name="notification" checked={true} size="sm" onstyle="outline-info" offstyle="outline-primary"/>

                        </FormGroup>
                    </Col>
                    </Row>
                    {visible &&
                      <Row>
                      <Col className="pr-1" md="12">
                          <FormGroup>
                          <p><span>Division</span> <span className="spnred">*</span></p>
                          <Select options={allData} name="division"  onChange={(e) => Divisions(e)}  className={phonerror.length > 0 ? "is-invalid" : ""}
 />
                             {phonerror.length > 0 && (
                              <span className="invalid-feedback">{phonerror}</span>
                              )}
                        </FormGroup>
                      </Col>
                      </Row>
                    }
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

  const RemoveUser =  observer((props) =>  {
    const {onSubmit ,index} = props;
  console.log("index",index)
  const handleclose = (e) => {
    onSubmit(e)
  } 
  const Remove = (id) => {
    console.log("id",id)
    const method = '/user/deleteUser/'
    new ServiceStore().DeleteData(method,id).then((res) => {
      console.log("res",res)
      onSubmit(id)
      
     });
  }
    return (
        <Row>
          
          <div className="Dialog-gai4ey-9 bpkkbL JS-has-wc JS-dialog" >
            <div className="Dialog__DialogAlwaysVisibleDiv-gai4ey-8 klECUW"><span
                    className="Icon-wsq54u-0 Dialog__CloseIcon-gai4ey-1 bWtdYP lgtrXX JS-dialog-close JS-dialog-close"></span>
                <h2 className="Dialog__DialogTitle-gai4ey-4 LGEMR">Confirm deleting user</h2>
            </div>
            <div className="LoadingDiv__BlockContainer-sc-1g7ljba-0 gqDJHC Dialog__DialogContentWrapper-gai4ey-7 bYNANT">
                <div className="Dialog__DialogContent-gai4ey-3 ifAPFT">
                    <p>Please confirm deleting the following user's account:</p>
                    <div className="sc-17u96k-0 fuMDCF">
                        <div className="sc-j5ljy5-0 iuXZel"><strong>{index.firstname} {index.lastname} ({index.userRole})</strong></div>
                        <div><strong>Email:</strong> {index.email}</div>
                    </div>
                    <p>This action is irreversible. Are you sure you want to delete?</p>
                    
                </div>
                <div className="Dialog__DialogFooter-gai4ey-5 vtrKe"><Button 
                        className="Button-qe54pl-1 cMqAGO styled-button" type="button" onClick={handleclose}>Cancel</Button><Button 
                        className="Button-qe54pl-1 gJUUHH styled-button" type="submit" onClick={()=>Remove(index.id)} ><span
                           ><AiOutlineDelete size={30}></AiOutlineDelete></span>Delete user</Button></div>
            </div>
        </div>
      </Row>
        
   
    );
  });

  const EditUser =  observer((props) =>  {
    const {onSubmit ,index} = props;
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [cemail, setCEmail] = useState("");
    const [isOn, setIsOn] = React.useState(false);
    const [allData, setAllData] = React.useState([]);
    const [visible, setVisible] = useState(false);  // visibility state
    const [division, setDivisions] = useState([]);
    const [notification, setNotification] = useState({checked:true});
    const [isError, setIsError] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');
    const [cerror, setCError] = useState('');
    const [ferror, setFError] = useState('');
    const [lerror, setLError] = useState('');
    const [paserror, setPasError] = useState('');
    const [phonerror, setPhonError] = useState('');
    const [ematch, setEmatch] = useState('');
    const [specialitieserror, setSpecialitieserror] = useState('');
  const options = []
 
  const setvalidation = (field,value) => {
    
    if(field == 'firstname'){
      setFirstname(value)
    }
    if(field == 'lastname'){
      setLastName(value)
    }
    if(field == 'email'){
      console.log("value",value)
     
        if (!isValidEmail(value)) {
          setError('Email is invalid');
        } else {
          setError('');
        }
        setEmail(value)
    }
    if(field == 'cemail'){
      console.log("email",email,value)
      const matchemail = email.match(value)
      if(matchemail == null){
        setEmatch('Email and Confirm Email does not match!');
      }
      else {
        setEmatch('');
      }
      
      if (!isValidEmail(value)) {
         
       setCError('Email is invalid');
      } else {
        setCError('');
      }
      setCEmail(value)
    }
    // if(field == 'phone'){
    //   setPhone(value)
    // }
    if(field == 'password'){
      setPassword(value)
    }
  };
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
    React.useEffect(() => {
      const method = '/division/getdivision'
      new ServiceStore().GetAllData(method).then((res) => {
      console.log("res",res.data)
      for(var i in res.data){
        const obj = {'value':res.data[i].id,'label':res.data[i].category}
        options.push(obj)
      }
      setAllData(options)
      });
      console.log("index",index)
      if(index.userRole  == "DivisionAdmin" || index.userRole  == "Operator"){
        if(index.categories.length > 0 ){
              Divisions(index.categories[0])
        }
        setVisible(true)
      }
      if(index.notification == 'true'){
        index.notification  = true
      }else{
        index.notification  = false
      }
     
    }, []); 

  
const Divisions = (e) => {
  console.log("e",e)
  const divarray = []
  divarray.push(e)
  setDivisions(divarray)
}
    const onSubmits = (e) => {
      e.preventDefault();
    
      if(e.target.firstname.value == ""){
        setFError('Please Enter Yor Name ');
      }
      if(e.target.lastname.value == ""){
        setLError('Please Enter Yor Last Name ');
        
      }
      if(division.length == 0){
        setPhonError('Please Enter Yor Division   ');
      }
      if(e.target.password.value == ""){
        setPasError('Please Enter Yor Password  ');
      }
      if(e.target.email.value == ""){
        setError('Please Enter Yor Email  ');
      }
      if(e.target.cemail.value == ""){
        setCError('Please Enter Yor Conform Email  ');
      }
      if(e.target.cemail.value == ""){
        setCError('Please Enter Yor Conform Email  ');
      }
      // if(selected.length == 0){
      //   setSpecialitieserror('Please Enter Specialities  ');
      // }
    
      if(e.target.gender.value == 'Operator' || e.target.gender.value == 'DivisionAdmin'){
        console.log("if:::::::::::::::",e.target.gender.value)
        if(division.length == 0 || ematch.length > 0  ||  e.target.firstname.value == '' || e.target.lastname.value == '' || e.target.gender.value == "" || e.target.email.value == "" || e.target.cemail.value == ""){
          return
        }
      }
      else{
        console.log("else",e.target.gender.value)
        if(ematch.length > 0  ||  e.target.firstname.value == '' || e.target.lastname.value == '' || e.target.gender.value == "" || e.target.email.value == "" || e.target.cemail.value == ""){
              return
        }
      }
       console.log("division",e.target.gender.value)
      
      console.log("ddddddddddddddddd",notification.checked,e.target.firstname.value)
      const dataobj = {password:e.target.password.value,"userRole":e.target.gender.value,"notification":notification.checked,"categories":division,
      "firstname":e.target.firstname.value,"lastname":e.target.lastname.value,"email":e.target.email.value,
      "cemail":e.target.cemail.value,"status":'ACTIVE',createdby:"",updatedby:""}
      console.log("dataobj",dataobj)
      dataobj.id = index.id

      
      const method = "/user/UpdateSuperUser"
        new ServiceStore().UpdateData(method,dataobj).then((res) => {
            onSubmit(e)    
        });

        
      // if(e.target.divisions.value == ''){
      //   const isError = 'Please Enter Division First'
      //   setIsError(isError)
      // }else{
      //   onSubmit(e)
      // }
    }
    const handleClose = (e) => {
      
      onSubmit(e)
    
  }
    return (
        <Row>
          
        <Col md="12">
          <Card className="card-user">
              <CardTitle> <h5> Add new user </h5></CardTitle>
            <CardBody>
              <Form  onSubmit={onSubmits} noValidate>
                <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <p><span>First Name </span> <span className="spnred">*</span></p>
                        <Input
                          placeholder="First Name"
                          type="text"
                          name = 'firstname'
                          defaultValue={index.firstname?index.firstname:""}
                          onChange={(e) => setvalidation('firstname',e.target.value)}
                          className={ferror.length > 0 ? "is-invalid form-control TextInput__Input-yzpeng-1 btRsWK" : "form-control TextInput__Input-yzpeng-1 btRsWK"}
                          />
                          {ferror.length > 0 && (
                            <span className="invalid-feedback">{ferror}</span>
                            )}
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <p><span>Last Name </span> <span className="spnred">*</span></p>
                        <Input
                          placeholder="Last Name"
                          type="text"
                          name = 'lastname'
                          defaultValue={index.lastname?index.lastname:""}
                          onChange={(e) => setvalidation('lastname',e.target.value)}
                          className={lerror.length > 0 ? "is-invalid form-control TextInput__Input-yzpeng-1 btRsWK" : "form-control TextInput__Input-yzpeng-1 btRsWK"}
                          />
                          {lerror.length > 0 && (
                            <span className="invalid-feedback">{lerror}</span>
                            )}
                      </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <p><span>Email </span> <span className="spnred">*</span></p>
                        <Input
                          placeholder="Email"
                          type="email"
                          name = 'email'
                          disabled={true}
                          defaultValue={index.email?index.email:""}
                          onChange={(e) => setvalidation('email',e.target.value)}
                          className={error.length > 0  ? "is-invalid form-control extInput__Input-yzpeng-1 btRsWK" : "form-control extInput__Input-yzpeng-1 btRsWK"} 

                          />
                           {error.length > 0 && (
                                                  <span className="invalid-feedback">{error}</span>
                                                  )}
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <p><span>Confirm Email</span> <span className="spnred">*</span></p>
                        <Input
                          placeholder="Confirm Email"
                          type="email"
                          name = 'cemail'
                          disabled={true}
                          defaultValue={index.cemail?index.cemail:""}
                          onChange={(e) => setvalidation('cemail',e.target.value)}
                          className={cerror.length > 0 || ematch.length > 0 ? "is-invalid form-control TextInput__Input-yzpeng-1 btRsWK" : "form-control TextInput__Input-yzpeng-1 btRsWK"}
                          />
                         {cerror.length > 0 && (
                          <span className="invalid-feedback">{cerror}</span>
                          )}
                          {ematch.length > 0 && (
                          <span className="invalid-feedback">{ematch}</span>
                          )}
                      </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <p><span>Password </span> <span className="spnred">*</span></p>
                        <Input
                          placeholder="Password"
                          type="text"
                          name = 'password'
                          defaultValue={index.password?index.password:""}
                          onChange={(e) => setvalidation('password',e.target.value)}
                          className={paserror.length > 0 ? "is-invalid form-control TextInput__Input-yzpeng-1 btRsWK" : "form-control TextInput__Input-yzpeng-1 btRsWK"}

                          />
                          {paserror.length > 0 && (
                            <span className="invalid-feedback">{paserror}</span>
                            )}
                      </FormGroup>
                    </Col>
                    </Row>
                <Row>
                    <Col className="pr-1" md="12">
                        <FormGroup>
                            <p><span>User Role</span> <span className="spnred">*</span></p>

                        </FormGroup>
                        <FormGroup>
                            <div className="ZSshF ">
                                <div className="kSUKnW">
                                <div className="cPNYYC ">
                                <Input defaultChecked={'SuperAdmin' == index.userRole} type="radio" value="SuperAdmin" name="gender" onClick={() => setVisible(false)}  />
                                Super Admin
                                </div> 
                                
                                <ul className="sc-usmo7d-4 Yokut"><li>
                                  <span className="Icon-wsq54u-0 bWtdYPss"><AiOutlineCheck></AiOutlineCheck></span> 
                                  Access to cases (all)</li><li>
                                    <span className="Icon-wsq54u-0 bWtdYPss"> <AiOutlineCheck></AiOutlineCheck></span> 
                                  Manage staff (all)</li><li className="false">
                                    <span className="Icon-wsq54u-0 bWtdYPss"><AiOutlineCheck></AiOutlineCheck></span>
                                     Notification settings</li><li className="false">
                                      <span className="Icon-wsq54u-0 bWtdYPss"><AiOutlineCheck></AiOutlineCheck></span> Access to audit log</li></ul>
                              
                                </div>
                                <div className="kSUKnW">
                                <div className="cPNYYC ">
                                    <Input defaultChecked={'DivisionAdmin' == index.userRole} type="radio" value="DivisionAdmin" name="gender" onClick={() => setVisible(true)}/>
                                    Division Admin 
                                </div>                        
                                <ul className="sc-usmo7d-4 Yokut"><li>
                                  <span className="Icon-wsq54u-0 bWtdYPss"><AiOutlineCheck></AiOutlineCheck></span>
                                   Access to cases (all)</li><li>
                                    <span className="Icon-wsq54u-0 bWtdYPss"><AiOutlineCheck></AiOutlineCheck></span> 
                                    Manage staff (all)</li><li className="false">
                                      <span className="Icon-wsq54u-0 bWtdYPss"><AiOutlineStop></AiOutlineStop>
                                      </span>  Notification settings </li>
                                      <li className="false">
                                        <span className="Icon-wsq54u-0 bWtdYPss"><AiOutlineStop></AiOutlineStop></span>
                                         Access to audit log</li></ul>
                                </div>
                                <div className="kSUKnW">
                                <div className="cPNYYC ">
                                
                                    <Input defaultChecked={'Operator' == index.userRole} type="radio" value="Operator" name="gender" onClick={() => setVisible(true)}/>
                                        Operator   </div>                       
                                <ul className="sc-usmo7d-4 Yokut">
                                    <li><span className="Icon-wsq54u-0 bWtdYPss"><AiOutlineCheck></AiOutlineCheck></span>
                                     Access to cases (all)</li><li className="false">
                                      <span className="Icon-wsq54u-0 bWtdYPss"><AiOutlineStop></AiOutlineStop></span> 
                                      Manage staff (all)</li><li className="false">
                                        <span className="Icon-wsq54u-0 bWtdYPss"><AiOutlineStop></AiOutlineStop></span>
                                         Notification settings</li><li className="false">
                                          <span className="Icon-wsq54u-0 bWtdYPss"><AiOutlineStop></AiOutlineStop></span>
                                           Access to audit log</li></ul>
                                </div>
                            </div>
                           
                       </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                    <Col className="pr-1" md="12">
                        <FormGroup>
                        <span>Receive administrative email notifications</span>
                        <label><div >According to notification settings and division restrictions (if applicable)</div></label>
                        <BootstrapSwitchButton   onChange={(checked) => {
        setNotification({checked})
    }}   name="notification" checked={index.notification} size="sm" onstyle="outline-info" offstyle="outline-primary"/>

                        </FormGroup>
                    </Col>
                    </Row>
                    {visible &&
                      <Row>
                      <Col className="pr-1" md="12">
                          <FormGroup>
                          <p><span>Division</span> <span className="spnred">*</span></p>
                          <Select value={index.categories} options={allData} name="division"  onChange={(e) => Divisions(e)}  className={phonerror.length > 0 ? "is-invalid" : ""}
 />
                             {phonerror.length > 0 && (
                              <span className="invalid-feedback">{phonerror}</span>
                              )}
                        </FormGroup>
                      </Col>
                      </Row>
                    }
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
  })