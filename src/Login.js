import React from "react";
import {useState, useEffect} from 'react'
// react router
import { useHistory,Link } from 'react-router-dom';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Redirect } from "react-router-dom";



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
    Col,
    form,
  } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch, useLocation } from "react-router-dom";

import ServiceStore from "./util/ServiceStore";


  const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [viewOtpForm, setViewOtpForm] = useState(false);
    const [user, setUser] = useState(false);
    const [iserror, setIsError] = useState('');

    const [otpgenerate, setotpgenerate] = useState('');
    const [otptru, setotptru] = useState(false);
    
    const [storeotp, setstoreotp] = useState('');
    const [emailset, setemailset] = useState("");
    const PostRuoter = () =>{
      history.push("/patient/start");
    }
      
    const emailonclick = (e) => {
      setemailset(e.target.value)
      
    }

    const otponclick = (e) => {
      setstoreotp(e.target.value)
      
    }
 
    const handleSubmit = (e) => {
      e.preventDefault();
      const data = {"email":emailset}
      if(storeotp == ''){
        new ServiceStore().Login('expert/expertlogin',data).then((res) => {
          console.log("res",res.response.data.user)
          if(res.response.status == 1){
              setotptru(true)
              setIsError(res.response.message)
              setUser(res.response.data.user)
          }else{
            const error = 'Email not Fount '
            setIsError(error)
          }
        })
      }else{
        console.log("user",user)
        const otpob = {"otp":storeotp,"id":user.id}
        new ServiceStore().Login('expert/expertotpmatch',otpob).then((res) => {
          if(res.response.status == 1){
              localStorage.setItem('token', res.response.data.token)
              localStorage.setItem("username",emailset)
              // localStorage.setItem("loginuser",JSON.stringify(obj))
              const obj ={}
              localStorage.setItem("loginuser",JSON.stringify(user))
              history.push({
                pathname: '/admin/cases'
              
              })

            }else{
              setIsError(res.response.data.message)
            }
        })
      }
      // const OtpGenerate = Math.floor(100000 + Math.random() * 900000)
      // console.log("OtpGenerate",OtpGenerate)
      // setotpgenerate(OtpGenerate)
      //       if(storeotp == ''){
      //           const obj = {}
      //           obj.name = "HealthZEN"
      //           obj.email = e.target.email.value
      //           obj.phone = OtpGenerate?OtpGenerate:""
      //           obj.subject = "Let's Verify Your Account"
      //           obj.message = OtpGenerate?OtpGenerate:""
      //                 console.log("data",obj)
             
      //             new ServiceStore().EmailSend('',obj).then((res) => {
      //                 console.log("res",res)
      //                 if(res.response.success == 1){
      //                     setotptru(true)
      //                     setstoreotp(OtpGenerate)
      //                 }
      //             })
      //         }else{
      //           if(storeotp == e.target.otp.value){
      //             const data = {"email":emailset}
      //             const method = "case/patientlogin"
      //               new ServiceStore().Login(method,data).then((res) => {
                    
      //                 console.log("res",res)
      //                 if(res.response.status == 1){
      //                   const obj = {"id":res.response.data.user.id}
      //                   localStorage.setItem('token', res.response.data.token)
      //                   localStorage.setItem("username",res.response.data.user.patientemail)
      //                   localStorage.setItem("loginuser",JSON.stringify(obj))

                        
      //                   history.push({
      //                     pathname: '/admin/cases'
                        
      //                   })
          
      //                 }else{
      //                   setIsError(res.response.data.message)
      //                 }
      //               });
      //           }else{
      //             const isError = 'Please Enter Correct Otp'
      //             setIsError(isError)
      //           }
                

      //         }
     


    };
  
    return (
 
        <div className="eMkYrD">
        <div className="sc-1cfv0gy-2 vXMxA">
          <div className="sc-1cfv0gy-3 loXCNQ">
              <div>
                <img src="https://bucket.purview.net/pacsdbhealthzen/logo/HealthZenLogo.png" alt="Logo" />

                </div>
          </div>
          <div className="sc-1cfv0gy-4 hPFEuF">
              <div className="sc-1cfv0gy-6 jzAGJM">
                  <h1>Expert View</h1>
                  <p className="sc-18oj9u9-0 hmTbTh">To access an existing Expert View request enter the following:</p>
              </div>
              <Form onSubmit={handleSubmit}>
              {otptru == false && 
                        <div  className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"><label 
                          className="Field__Label-p9woft-2 cUWXcG">Email ID</label>
                          <Input placeholder="Email ID" name = "email"   onChange={(e) => emailonclick(e)}
                          className="TextInput__Input-yzpeng-1 btRsWK" data-hj-whitelist="true" type="text" 
                          />
                         
                          </div>
              }
               {otptru == true && 
                   <div  className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"><label 
                          className="Field__Label-p9woft-2 cUWXcG">Enter OTP</label>
                          <Input placeholder="OTP" name='otp'   onChange={(e) => otponclick(e)}
                          className="TextInput__Input-yzpeng-1 btRsWK" data-hj-whitelist="true"  type="text" 
                          />
                  </div> 
                }
                 
                 <span className="isred">{iserror}</span>  
                  <Button className="Button-qe54pl-1 sc-1cfv0gy-5 beryvo hSPXfl styled-button"
                      type="submit">Access</Button>
              </Form>
          </div>
        
      </div>
      </div>
    );

    
  }
  
  export default Login;


  