
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
function ViewExperts() {
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
   const [CaseList, setCaseList] = useState([]);


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
      const method = '/expertassignment/FindExpertWiseCase'
      const data = {'expertID':dataid}
        new ServiceStore().GetDataBYFilter(method,data).then((res) => {
          setCaseList(res.response.data)
          console.log("GetDataBYFilter",res.response.data)
      })
        //  getExpertByID(dataid)
   },[])

  
   const Edit = (id) => {
    console.log("id",id)
    history.push({
      pathname: '/admin/EditExperts',
      search: '?id='+id,
      state: { detail: id },
    })
  }
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
     
       
          
      {datalist  && 
         <div className="sc-1x4b1gg-0 sc-16rvg6y-0 gNnwan hwJQMV">
            <div className="sc-1x4b1gg-1 itWlZc">
                <div className="sc-1x4b1gg-2 iDykZc">
                    <div className="sc-1x4b1gg-3 dTKuKq">
                      <a className="Icon-wsq54u-0 sc-16qu7j7-2 bWtdYP bLipWM" href="/admin/experts"><span
                                className="Icon-wsq54u-0 bWtdYP"></span></a>
                        <div className="header-content">
                            <h2><span className="title-label">Expert:</span> <span>{datalist.firstname ?datalist.firstname:"" } {datalist.lastname ?datalist.lastname:"" }</span></h2>
                            <div className="buttons-wrapper"><a  className="Button-qe54pl-1 isEdxL styled-button" 
                                    onClick={(e) => Edit(datalist.id)}>Edit</a><button 
                                    className="Button-qe54pl-1 fbkhVv styled-button" type="button"><span
                                        className="sc-bczRLJ XPRdW"></span></button></div>
                        </div>
                    </div>
                    <div className="profile-content">
                        <div className="fields-wrapper">
                            <div className="SplitColumnsContainer-sc-1h4sw88-0 bJeWYd">
                                <div className="Field__Container-p9woft-1 eFssct"><label className="Field__Label-p9woft-2 cUWXcG">First
                                        Name:</label><span>{datalist.firstname ?datalist.firstname:"" }</span></div>
                                <div className="Field__Container-p9woft-1 eFssct"><label className="Field__Label-p9woft-2 cUWXcG">Last
                                        name:</label><span>{datalist.lastname ?datalist.lastname:"" }</span></div>
                            </div>
                            <div className="SplitColumnsContainer-sc-1h4sw88-0 bJeWYd">
                                <div className="Field__Container-p9woft-1 eFssct"><label
                                        className="Field__Label-p9woft-2 cUWXcG">Email:</label><span>{datalist.email ?datalist.email:"" }</span></div>
                                <div className="Field__Container-p9woft-1 eFssct"><label
                                        className="Field__Label-p9woft-2 cUWXcG">Phone:</label><span>{datalist.phone ?datalist.phone:"" }</span></div>
                            </div>
                            <div className="Field__Container-p9woft-1 eFssct"><label
                                    className="Field__Label-p9woft-2 cUWXcG">Specialization(s):</label>
                                <div>
                                    <div className="Tooltip__TooltipContainer-hhprhj-0 iYcqeS"><span
                                            className="specialization-item">{datalist.specialities ? datalist.specialities.map(item => item.label).join(', ') : ""}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="Field__Container-p9woft-1 eFssct resume"><label
                                    className="Field__Label-p9woft-2 cUWXcG">Resume:</label><i className="sc-1igzj-1 kveSwk">
                                    {datalist.resume ? datalist.resume : ""}</i></div>
                        </div>
                        <div className="image-wrapper">
                            <div className="sc-16rvg6y-1 esRQFJ">
                                <div className="sc-16rvg6y-2 sc-bjjgnq-1 kWHNHZ">
                                <img src={ExpertimageURl+datalist.profile} />
                                  <span className="Icon-wsq54u-0 bWtdYP"></span>
                                  </div>
                            </div>
                        </div>
                    </div>
                    <div className="Field__Container-p9woft-1 eFssct sc-bjjgnq-2 dIbHgG"><label
                            className="Field__Label-p9woft-2 cUWXcG">Cases assigned to this expert:</label></div>
                    <div className="sc-17inukh-2 sc-9nqsb5-0 dknurd lirCdl">
                        <div className="sc-17inukh-3 sc-17inukh-4 dlWYtc xNbfD">
                            <div className="case-id">Case ID</div>
                            <div className="patient">Patient</div>
                            <div className="case-date">Date created</div>
                            <div className="status">Status</div>
                            <div className="actions"></div>
                        </div>
                        {CaseList.map((i,index) => (
                          <div key={index} className="sc-17inukh-3 dlWYtc">
                              <div className="case-id">{i.caseCard.requestCode}</div>
                              <div className="patient fs-exclude">
                                  <div className="patient-name"><strong>{i.caseCard.firstName}{i.caseCard.lastName}</strong></div>
                                  <div><span className="nowrap"><strong>DOB:</strong> {i.caseCard.dob}</span></div>
                              </div>
                              <div className="case-date">{i.createdAt}</div>
                              <div className="status">{i.caseCard.status}</div>
                              <div className="actions"><a className="sc-17inukh-5 hYWxOA"><span>Disable<span className="small-screen-hidden">
                                              image</span> download</span></a><a
                                      className="sc-17inukh-5 hYWxOA small-screen-hidden">Unassign</a><a
                                      className="sc-17inukh-5 sc-17inukh-6 hYWxOA hiRQgq small-screen-visible"><span
                                          className="Icon-wsq54u-0 bWtdYP"></span></a></div>
                          </div>
                      ))}
                        <a  className="Button-qe54pl-1 eMPlDz share-case styled-button"  target="_top"><span
                                className="Icon-wsq54u-0 bWtdYP"></span>Assign case</a>
                    </div>
                    {/* <div className="sc-g0n340-1 kixDnN">
                        <div className="sc-q2887l-1 hrEskh"><button 
                                className="Button-qe54pl-1 sc-q2887l-0 crnWPB gIguQO styled-button" type="button"><span
                                    className="Icon-wsq54u-0 bWtdYP"></span></button><button 
                                className="Button-qe54pl-1 sc-q2887l-0 kexCmR cCCiBY styled-button" type="button">1</button><button
                                className="Button-qe54pl-1 sc-q2887l-0 crnWPB gIguQO styled-button" type="button"><span
                                    className="Icon-wsq54u-0 bWtdYP"></span></button></div>
                    </div> */}
                </div>
            </div>
            </div>
  }
    </> 
  );
}

export default ViewExperts;
