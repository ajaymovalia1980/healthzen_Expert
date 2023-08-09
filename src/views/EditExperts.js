
import React, {useState , useCallback, useMemo} from "react";
import ServiceStore from "../util/ServiceStore";
import Select from 'react-select'
import { MultiSelect } from "react-multi-select-component";
import { CKEditor } from 'ckeditor4-react';
import { useHistory } from "react-router-dom";
import {
	ExpertimageURl
	
} from "../util/constants"
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";
function EditExperts() {
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
   const [password, setPassword] = useState('')
   const [message, setMessage] = useState('');
   const [error, setError] = useState('');
   const [cerror, setCError] = useState('');
   const [ferror, setFError] = useState('');
   const [lerror, setLError] = useState('');
   const [paserror, setPasError] = useState('');
   const [phonerror, setPhonError] = useState('');
   const [ematch, setEmatch] = useState('');
   const [specialitieserror, setSpecialitieserror] = useState('');
   const [datalist, setDatalistbyID] = useState({});


   React.useEffect(() => {
        const dataid = history.location.state?.detail
        console.log("id",dataid)
        const methods = '/expert/FindExpertByID/'
        new ServiceStore().GetDataByID(methods,dataid).then((res) => {
        
            res.data.profileurl = ExpertimageURl+res.data.profile
            // dataarraylist.push( res.data)
           
             setSelected(res.data.specialities)
             setResume(res.data.resume.toString())
            setDatalistbyID(res.data)
            console.log("dataarraylist",res.data)
        })
        //  getExpertByID(dataid)
   },[])

   const getDataBtID = (id) => {
   
  }
   const setvalidation = (field,value) => {
    
      if(field == 'firstname'){
        setFirstName(value)
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
      if(field == 'phone'){
        setPhone(value)
      }
      if(field == 'password'){
        setPassword(value)
      }
    };

   function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
   
 
const logEvent = (e) => {
  console.log("logEvent",e.editor.getData())
  if(e.editor.getData().length > 0){
    setResume(e.editor.getData())
  }
  // setResume(e.editor.getData())
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


  const handleSubmit = (e) => {
    e.preventDefault();
   
    if(e.target.firstname.value == ""){
      setFError('Please Enter Yor Name ');
    }
    if(e.target.lastname.value == ""){
      setLError('Please Enter Yor Last Name ');
      
    }
    if(e.target.phone.value == ""){
      setPhonError('Please Enter Yor Phone  ');
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
    if(selected.length == 0){
      setSpecialitieserror('Please Enter Specialities  ');
    }
  if(ematch.length > 0 || selected == 0 || e.target.firstname.value == '' || e.target.lastname.value == '' || e.target.phone.value == "" || e.target.email.value == "" || e.target.cemail.value == ""){
    return
  }
  console.log("file",file)
   if(file != ''){
    const formData = new FormData();
    formData.append("file", file, file.name);
       new ServiceStore().UploadImage(formData).then((res) => {
        console.log("res",res)
        const data = {firstname:e.target.firstname.value,lastname:e.target.lastname.value,
          email:e.target.email.value,cemail:e.target.cemail.value,
          specialities:selected,phone:e.target.phone.value,resume:resume,
          profile:res.data.data.imagename,active:1,opencase:1,password:e.target.password.value,createdby:"",updatedby:""}
          console.log(data)
          data.id = history.location.state?.detail
          const method = "/expert/UpdateExpert"
            new ServiceStore().UpdateData(method,data).then((res) => {
              if(res.response.status == 1){
                history.push("/admin/Experts");
              }
            });
      });
  }else{
      const data = {firstname:e.target.firstname.value,lastname:e.target.lastname.value,
        email:e.target.email.value,cemail:e.target.cemail.value,
        specialities:selected,phone:e.target.phone.value,resume:resume,
        profile:datalist.profile?datalist.profile:"",active:1,opencase:1,password:e.target.password.value,createdby:"",updatedby:""}
        console.log(data)
        data.id = history.location.state?.detail
          const method = "/expert/UpdateExpert"
          new ServiceStore().UpdateData(method,data).then((res) => {
            if(res.response.status == 1){
              history.push("/admin/Experts");
            }
          });
    
  }
   
   
  }
  const onCancle = () =>{
    history.push("/admin/Experts");
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
  return (
    <>
      <div className="content">
        <Row>
          
          <Col md="12">
            <Card className="card-user">
            <Form onSubmit={handleSubmit} noValidate>
                <div className="sc-1x4b1gg-0 sc-16rvg6y-0 gNnwan fjTqzB">
                    <div className="sc-1x4b1gg-1 itWlZc">
                      <div className="sc-1x4b1gg-2 iDykZc">
                          <div className="sc-1x4b1gg-3 hMBoLk">
                              <h2>Expert:{datalist.firstname?datalist.firstname:""} {datalist.lastname?datalist.lastname:""} </h2>
                          </div>
                          <div className="profile-content">
                              <div className="fields-wrapper">
                                  <div className="SplitColumnsContainer-sc-1h4sw88-0 bJeWYd">
                                      <div className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"><label
                                              className="Field__Label-p9woft-2 cUWXcG">First name:<span
                                                  className="Field__Mandatory-p9woft-0 eOWGWb">*</span></label>
                                          <Input placeholder="John"  name = 'firstname'  defaultValue={datalist.firstname?datalist.firstname:""} onChange={(e) => setvalidation('firstname',e.target.value)}
                                              className={ferror.length > 0 ? "is-invalid form-control TextInput__Input-yzpeng-1 btRsWK" : "form-control TextInput__Input-yzpeng-1 btRsWK"}
                                               data-hj-whitelist="true"  type="text"
                                            />&nbsp;
                                            {ferror.length > 0 && (
                                            <span className="invalid-feedback">{ferror}</span>
                                            )}
                                      </div>
                                      <div className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"><label
                                              className="Field__Label-p9woft-2 cUWXcG">Last name:<span
                                                  className="Field__Mandatory-p9woft-0 eOWGWb">*</span></label>
                                          <Input placeholder="Doe"  name = 'lastname'  defaultValue={datalist.lastname?datalist.lastname:""}
                                                    onChange={(e) => setvalidation('lastname',e.target.value)}
                                                    className={lerror.length > 0 ? "is-invalid form-control TextInput__Input-yzpeng-1 btRsWK" : "form-control TextInput__Input-yzpeng-1 btRsWK"}
                                               data-hj-whitelist="true"  type="text"
                                            />
                                             {lerror.length > 0 && (
                                                <span className="invalid-feedback">{lerror}</span>
                                                )}
                                        </div>
                                  </div>
                                  <div className="SplitColumnsContainer-sc-1h4sw88-0 bJeWYd">
                                      <div className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"><label
                                              className="Field__Label-p9woft-2 cUWXcG">Email:<span
                                                  className="Field__Mandatory-p9woft-0 eOWGWb">*</span></label>
                                                  <Input
                                              placeholder="expert@email.com"    name = 'email' defaultValue={datalist.email?datalist.email:""}
                                              onChange={(e) => setvalidation('email',e.target.value)}
                                              className={error.length > 0  ? "is-invalid form-control extInput__Input-yzpeng-1 btRsWK" : "form-control extInput__Input-yzpeng-1 btRsWK"} 
                                              
                                              data-hj-whitelist="true"  type="text" />
                                               {error.length > 0 && (
                                                  <span className="invalid-feedback">{error}</span>
                                                  )}
                                            </div>
                                      <div className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"><label
                                              className="Field__Label-p9woft-2 cUWXcG">Confirm email:<span
                                                  className="Field__Mandatory-p9woft-0 eOWGWb">*</span></label>
                                            <Input
                                              placeholder="expert@email.com"  name = 'cemail'  defaultValue={datalist.cemail?datalist.cemail:""}
                                              onChange={(e) => setvalidation('cemail',e.target.value)}
                                              className={cerror.length > 0 || ematch.length > 0 ? "is-invalid form-control TextInput__Input-yzpeng-1 btRsWK" : "form-control TextInput__Input-yzpeng-1 btRsWK"}
                                       
                                              data-hj-whitelist="true"  type="text"/>
                                              {cerror.length > 0 && (
                                                  <span className="invalid-feedback">{cerror}</span>
                                                  )}
                                                  {ematch.length > 0 && (
                                                  <span className="invalid-feedback">{ematch}</span>
                                                  )}
                                              </div>
                                  </div>
                                  <div className="SplitColumnsContainer-sc-1h4sw88-0 bJeWYd split-wrapper">
                                        <div className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"><label
                                              className="Field__Label-p9woft-2 cUWXcG">Password:</label>
                                              
                                              <Input placeholder="" name = 'password' defaultValue={datalist.password?datalist.password:""}
                                                onChange={(e) => setvalidation('password',e.target.value)}
                                                className={paserror.length > 0 ? "is-invalid form-control TextInput__Input-yzpeng-1 btRsWK" : "form-control TextInput__Input-yzpeng-1 btRsWK"}
                                                  data-hj-whitelist="true"  type="text"
                                            />{paserror.length > 0 && (
                                              <span className="invalid-feedback">{paserror}</span>
                                              )}
                                            
                                            </div>
                                            
                                            
                                            <div className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"><label
                                              className="Field__Label-p9woft-2 cUWXcG">Phone:</label>
                                              
                                              <Input placeholder="+1 123-456-789" name = 'phone' defaultValue={datalist.phone?datalist.phone:""}
                                                onChange={(e) => setvalidation('phone',e.target.value)}
                                                className={phonerror.length > 0 ? "is-invalid form-control TextInput__Input-yzpeng-1 btRsWK" : "form-control TextInput__Input-yzpeng-1 btRsWK"}
                                                  data-hj-whitelist="true"  type="number"
                                            />{phonerror.length > 0 && (
                                              <span className="invalid-feedback">{phonerror}</span>
                                              )}
                                            
                                            </div>
                                      <div className="Field__Container-p9woft-1 eFssct"><label
                                              className="Field__Label-p9woft-2 cUWXcG">Specialization(s):<span
                                                  className="Field__Mandatory-p9woft-0 eOWGWb">*</span>
                                            </label>
                                            <MultiSelect
                                                options={options}
                                                value={selected}
                                                onChange={setSelected}
                                                labelledBy="Select"
                                                name = 'specialities'
                                                className={specialitieserror.length > 0 ? "is-invalid" : ""}
                                              />
                                              {specialitieserror.length > 0 && (
                                              <span className="invalid-feedback">{specialitieserror}</span>
                                              )}
                                          <span
                                              className="Field__FieldDescription-p9woft-4 Field__BellowFieldDescription-p9woft-5 bNrjSU dqmYsV">Use
                                              comma, enter or tab to add multiple.</span>
                                      </div>
                                  </div>
                                  <div className="Field__Container-p9woft-1 eFssct"><label
                                          className="Field__Label-p9woft-2 cUWXcG">Resume:</label>
                                      <div className="RichText__RichTextContainer-x8c1ig-1 dlWylu">
                                     {resume &&    
                                        <CKEditor
                                          onChange={logEvent}
                                            data={resume}   initData={resume}/>
                                     }
                                      {!resume &&    
                                        <CKEditor
                                        onChange={logEvent}
                                            />
                                     }
                                      </div>
                                  </div>
                              </div>
                              <div className="image-wrapper">
                                  <div className="sc-16rvg6y-1 cXDRAZ">
                                    <Input  type="file" onChange={onFileSelect}
                                          className="withFormImageInput__FileInput-o7trbb-0 iA-dYhO" />
                                        
                                      <div className="sc-16rvg6y-2 sc-1vwtanf-0 bSMHSm">
                                      <img src={datalist.profileurl?datalist.profileurl:""} />
                                      </div>
                                     
                                      <button className="Button-qe54pl-1 kexCmR styled-button" type="button">Change image</button>
                                  </div>
                                 
                                  {/* <div className="sc-16rvg6y-1 cXDRAZ"><Input type="file" onChange={onFileSelect}
                                              className="withFormImageInput__FileInput-o7trbb-0 iA-dYhO" />
                                          <div className="sc-16rvg6y-2 sc-1vwtanf-0 bSMHSm djUKaq"></div>
                                          <button 
                                              className="Button-qe54pl-1 kexCmR styled-button" type="button">Change image</button>
                                      </div> */}
                              </div>
                          </div>
                          <div>
                              <div className="TransitionDiv__BlockContainer-sc-1sh2xah-0 gjcdiO">
                                  
                              </div>
                          </div>
                          <div className="sc-1x4b1gg-4 fJFZFH">
                              <div className="right-block"><button  className="Button-qe54pl-1 cMqAGO styled-button"
                                      type="button" onClick={onCancle}>Cancel</button><button  className="Button-qe54pl-1 beryvo styled-button"
                                      type="submit">Add expert</button></div>
                          </div>
                      </div>
                  </div>
                </div>
              
            </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default EditExperts;
