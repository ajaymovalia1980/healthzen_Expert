import { MultiSelect } from "react-multi-select-component";

import React  from "react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Input,
  FormGroup,
  Form,

} from "reactstrap";
// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart
} from "variables/charts.js";
import '@blueprintjs/core/lib/css/blueprint.css';
import { Button, ButtonGroup } from "@blueprintjs/core";
import { Link } from "react-router-dom";
import Select from 'react-select'
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import {AiOutlinePlusCircle,AiFillStar,AiOutlineStar,AiFillCaretDown,AiFillEdit,AiOutlineFilePdf,AiOutlineFileImage,AiOutlineUsergroupAdd,AiOutlineFile,AiOutlineDiff, AiOutlineUser ,AiOutlineFileText ,AiOutlineMail,AiOutlineVideoCamera,AiOutlineDollar,AiOutlineFolderOpen} from "react-icons/ai";
import ServiceStore from "../util/ServiceStore";
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import { observer } from "mobx-react";

function Cases() {
    const [formData, updateFormData] = React.useState(initialFormData);
    const [searchInput, setSearchInput] = React.useState("");
    const [selectedOption, setSelectedOption] = useState(null);
    const [datalist, setDatalist] = useState([]);
    const [pendingcase, setPendingcase] = useState([]);
    const [draftcase, setDraftcase] = useState([]);
    const [underRivewcase, setUnderRivewcase] = useState([]);
    const [totalcaseCount, settotalcaseCount] = useState(0);
    const [storageEvent, setStorageEvent] = useState({});
    const [expertWiseReview, setexpertWiseReview] = useState({}); 

    const [reviewedCase, setReviewedCase] = useState([]);
    const [StateList, setStateList] = React.useState('Opencases');
    const [CaselistByfilter, setCaselistByfilter] = React.useState([]);
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const onLoginFormSubmit = (e) => {
        e.preventDefault();
        handleClose();
      };
      const [showMarkAsPriority, setshowMarkAsPriority] = useState(undefined);
      const handleRevokedShow = (id) => setshowMarkAsPriority(id);
      const handleCloserevoed = () => setshowMarkAsPriority(false);

      const [RemoveMarkAsPriority, setRemoveMarkAsPriority] = useState(undefined);
      const RemoveMarkAsPriorityShow = (id) => setRemoveMarkAsPriority(id);
      const RemovehandleCloserevoed = () => setRemoveMarkAsPriority(false);
      

      const [showCaseDivision, setShowCaseDivision] = useState(undefined);
      const hendelCaseDivision = (id) => setShowCaseDivision(id);
      const hendelCaseDivisionClose = () => setShowCaseDivision(false);

      const [showUnArchiveCase, setshowUnArchiveCase] = useState(undefined);
      const UnarchivShow = (id) => setshowUnArchiveCase(id);
      const UnArchiveCaseClose = () => setshowUnArchiveCase(false);


      const onFormSubmit = (e) => {
        RemovehandleCloserevoed()
        handleCloserevoed();
        hendelCaseDivisionClose()
        UnArchiveCaseClose()
        GetCASEALLDATA()
        Activeclick(StateList,e)
      };
  const history = useHistory();
  React.useEffect(() => {
  const token =   localStorage.getItem('token')
 

  }, []);
  React.useEffect(() => {
    GetCASEALLDATA()
  }, []);

  const GetCASEALLDATA = () => {
    const loginuser = JSON.parse(localStorage.getItem("loginuser"))
    if(loginuser != null){
      const method = '/case/FindExpertCase'
      const data = {'expertID':loginuser.id}
        new ServiceStore().GetDataBYFilter(method,data).then((res) => {
        
          let underRivewcase = res.response.data.filter( function (user) {
            for(var i in user.expertWiseReview){
              if(user.expertWiseReview[i].expertID == loginuser.id){
                if(user.expertWiseReview[i].state == 'UNDER_REVIEW' || user.expertWiseReview[i].state === 'WAITING_ACCEPTANCE'){
                  return user
                }
              }
            }
        
            // return user.state === 'UNDER_REVIEW' || user.state === 'WAITING_ACCEPTANCE'
          });
          console.log("underRivewcase",underRivewcase)
          setCaselistByfilter(underRivewcase)
          let reviewedCase = res.response.data.filter( function (user) {
            for(var i in user.expertWiseReview){
              if(user.expertWiseReview[i].expertID == loginuser.id){
                if(user.expertWiseReview[i].state == 'CASE_REVIEWED' || user.expertWiseReview[i].state === 'CASE_CLOSED'){
                  return user
                
                }
                }
              }
            // return user.state === 'CASE_REVIEWED' || user.state === 'CASE_REVIEWED'
          });
          console.log("reviewedCase",reviewedCase)
          setReviewedCase(reviewedCase)
          const count =  underRivewcase.length 
          settotalcaseCount(count)
      })
    }
  }
   
    const initialFormData = Object.freeze({
        search: "",
        
      });
    const Activeclick = (state,e) => {
        setCaselistByfilter([])
        setStorageEvent(e)
        settotalcaseCount()
    document.querySelectorAll('.active-link').forEach(function(item) {
      console.log("state",state,e)
			item.classList.remove('active-link');
			//console.log("item",item);
      setStateList(state)
      const loginuser = JSON.parse(localStorage.getItem("loginuser"))
      if(loginuser != null){
      console.log("loginuser",loginuser)
      const methods = '/case/FindExpertCase'
      const data = {'expertID':loginuser.id}
          new ServiceStore().GetDataBYFilter(methods,data).then((res) => {
            console.log("res",res)
            if(state == 'Opencases'){
              let closedcase = res.response.data.filter( function (user) {
                for(var i in user.expertWiseReview){
                  if(user.expertWiseReview[i].expertID == loginuser.id){
                    if(user.expertWiseReview[i].state == 'UNDER_REVIEW' || user.expertWiseReview[i].state === 'WAITING_ACCEPTANCE'){
                      return user
                    
                    }
                    }
                  }
                // retur
              
              });
              setCaselistByfilter(closedcase)
              const count = closedcase.length 
              settotalcaseCount(count)
            }
            if(state == 'Reviewed'){
              let closedcase = res.response.data.filter( function (user) {
                for(var i in user.expertWiseReview){
                  if(user.expertWiseReview[i].expertID == loginuser.id){
                    if(user.expertWiseReview[i].state == 'CASE_REVIEWED' || user.expertWiseReview[i].state === 'CASE_CLOSED'){
                      return user
                    
                    }
                    }
                  }
                // return user.state === 'CASE_REVIEWED' || user.state === 'CASE_CLOSED'
              });
              setCaselistByfilter(closedcase)
              const count = closedcase.length 
              settotalcaseCount(count)
            }
            if(state == 'All'){
              let closedcase = res.response.data.filter( function (user) {
                for(var i in user.expertWiseReview){
                  if(user.expertWiseReview[i].expertID == loginuser.id){
                    if(user.expertWiseReview[i].state != 'CASE_REJECTED'){
                      return user
                    
                    }
                    }
                  }
              });
              setCaselistByfilter(closedcase)
              const count = closedcase.length 
              settotalcaseCount(count)
            }
            
          })
        }
		  }) 
      if(e){
          e.target.classList.add('active-link');
      }
		//   this.renderer.addClass(e.target, 'active-link');

        
    }
    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
        console.log("e.target.value",e.target.value)
      };
      
      const Abortandarchive = (index,e) => {
        console.log("e",index)
        
        const method = '/case/UpdateCaseState'
        const obj = {'state':"CASE_ARCHIVED",'id':index.id}
          new ServiceStore().UpdateData(method,obj).then((res) => {
            GetCASEALLDATA()
          })
        
      }

      const handleSubmit = (index,e) => {
        console.log("e",index)
        if(index.state == "UNDER_REVIEW"){
            const methods = '/case/FindCaseByID/'
            new ServiceStore().GetDataByID(methods,index.id).then((res) => {
              console.log("res",res.data)
              history.push({
                pathname: '/admin/ExpertReview',
                search: '?id='+index.requestCode,
                state: { detail: res.data },
              });
              })

        }else if(index.state == "CASE_REVIEWED"){
          const methods = '/case/FindCaseByID/'
          new ServiceStore().GetDataByID(methods,index.id).then((res) => {
            console.log("res",res.data)
            history.push({
              pathname: '/admin/ExpertReview',
              search: '?id='+index.requestCode,
              state: { detail: res.data },
            });
            })
        }
        else{
            const methods = '/case/FindCaseByID/'
            new ServiceStore().GetDataByID(methods,index.id).then((res) => {
              console.log("res",res.data)
              history.push({
                pathname: '/admin/ContactDetails',
                search: '?id='+index.requestCode,
                state: { detail: res.data },
              });
              })
        }
            
      }
      const handleClick = () => {
        history.push("/admin/CreateNewCase");
      }

  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if(searchValue.length > 1){
      const filteredData = draftcase.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setDraftcase(filteredData)
      const underRivewcaseData = underRivewcase.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setUnderRivewcase(underRivewcaseData)

      const reviewedCaseData = reviewedCase.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setReviewedCase(reviewedCaseData)
      const pendingcaseData = pendingcase.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setPendingcase(pendingcaseData)

      const CaselistByfilterData = CaselistByfilter.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setCaselistByfilter(CaselistByfilterData)
    }else{
      GetCASEALLDATA()
      Activeclick(StateList,storageEvent)
    }
  }
      
  return (
    <>
      <div className="content">
        <Row>
          <Col lg="12" >
            <Card className="card-stats">
              <CardBody>
               
                <Row>
                <Col md="4" xs="5">
                  
                  <Form >
                        <FormGroup >
                        <div className="fkoCmW">
                        <div className="sc-8bxaxj-3 NNjQv">
                          <Input placeholder="Search cases"
                        className="TextInput__Input-yzpeng-1 btRsWK TextInput-yzpeng-7 gyICpj" data-hj-whitelist="true" 
                        type="text"  onChange={(e) => searchItems(e.target.value)}/>
                        <a className="sc-8bxaxj-1 hzapRk">Advanced</a>
                        
                       
                        </div>
                        </div>
                
                        </FormGroup>
                        </Form>
                    
                 
                 
                   </Col>
                   <Col md="2" xs="3">
                        <div data-id="QueryCount"><b>{totalcaseCount}  open cases</b></div>
                    </Col>
                  <Col md="6" xs="7">
                  
                    <div className="numbers">
                    

                    <div className="topnav">
                    <span className="active nft-bar active-link" onClick={(e)=>Activeclick('Opencases',e)}>Open cases</span>
                    <span className="active nft-bar" onClick={(e)=>Activeclick('Reviewed',e)}>Reviewed cases</span>
                    <span className="active nft-bar" onClick={(e)=>Activeclick('All',e)}>All cases</span>
                     </div>
                   

                      
                     
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
               
                <div className="stats">
                  
                </div>
              </CardFooter>
            </Card>
          </Col>
         
        </Row>
        <Card className="card-stats">
        <CardBody>
           {StateList == 'Opencases' &&
           <div className="sc-1x4b1gg-2 sc-1ahxnl5-0 bHMBWe khyCjn">
            <div className="sc-18zuvx1-0 gUzXmB">
                <h3>Open cases</h3> 
                
                     <button 
                    className="Button-qe54pl-1 sc-18zuvx1-2 dtlVdq ejWgwv styled-button" type="button"><span
                        className="sc-bczRLJ XPRdW"></span>Sorting by last updated date</button>
            </div>
          
               <div  className="sc-18zuvx1-1 SHqmS">
                  <div className="cards-wrapper">
                  {CaselistByfilter.map((i,index) => (
                      <div key={index} className="sc-pb0d5p-0 dLUxQM" ispriority="1622146333697" > 
                          <div className="actions-wrapper">
                          {i.markedAsPriorityEpochMilli == '' &&
                      <div className="Tooltip__TooltipContainer-hhprhj-0 dropmart" onClick={()=>handleRevokedShow(i)}>
                      <span className="Icon-wsq54u-0 bWtdYP"><AiOutlineStar size={25}></AiOutlineStar></span>
                      </div>
                      }
                      {i.markedAsPriorityEpochMilli != '' &&
                        <div className="Tooltip__TooltipContainer-hhprhj-0 dropmart" onClick={()=>RemoveMarkAsPriorityShow(i)}>
                        <span className="Icon-wsq54u-0 bWtdYP"><AiFillStar size={25}></AiFillStar></span>
                        </div>
                      }
                    

                    
                          <Dropdown className="dropmart">
                              <Dropdown.Toggle >
                              
                              </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item onClick={e => handleSubmit(i, e) }>View Case</Dropdown.Item>
                              <Dropdown.Item  onClick={()=>handleSubmit(i)}>Edit review</Dropdown.Item>
                              {/* {i.markedAsPriorityEpochMilli == '' && 
                              <Dropdown.Item onClick={()=>handleRevokedShow(i)}><AiOutlineStar className="starml" size={20}></AiOutlineStar>Mark as priority</Dropdown.Item>
                              }
                              {i.markedAsPriorityEpochMilli != '' &&
                              <Dropdown.Item onClick={()=>RemoveMarkAsPriorityShow(i)}><AiFillStar className="starml" size={20}></AiFillStar>Remove as priority</Dropdown.Item>
                                } */}
                            </Dropdown.Menu>
                          </Dropdown>
                            
                          </div>
                          <div className="main-content" onClick={e => handleSubmit(i, e) }>
                              <div className="patient-name fs-exclude"><span className="Icon-wsq54u-0 bWtdYP"><AiOutlineUser></AiOutlineUser></span>{i.firstName} {i.lastName}</div>
                              <div className="code"><b>Case ID:</b>{i.requestCode}</div>
                              <div className="last-update">Last updated on <span className="nowrap">{new Date(Number(i.whenModifiedEpochMilli)).toLocaleString()}</span></div>
                          
                          </div>
                          <div className="card-footer">
                            <div className="status">
                              <span className="Icon-wsq54u-0 bWtdYP"><AiFillEdit></AiFillEdit></span>
                               {i.state == 'UNDER_REVIEW' && 
                                <span className="nowrap">Under review</span>
                               }
                                {i.state == 'WAITING_ACCEPTANCE' && 
                                   <span className="nowrap">Pending acceptance</span>
                                }
                              </div>
                            </div>
                          <Modal show={showMarkAsPriority === i} onHide={handleCloserevoed}  size="lg">
                          <Modal.Body>
                          <MarkAsPriorityModel onSubmit={onFormSubmit} 	propertyData={i}/>
                          </Modal.Body>
                          <Modal.Footer>

                          </Modal.Footer>
                      </Modal>

                      <Modal show={RemoveMarkAsPriority === i} onHide={RemovehandleCloserevoed}  size="lg">
                          <Modal.Body>
                          <RemoveMarkAsPriorityModel onSubmit={onFormSubmit} 	propertyData={i}/>
                          </Modal.Body>
                          <Modal.Footer>

                          </Modal.Footer>
                      </Modal>

                      <Modal show={showCaseDivision == i} onHide={hendelCaseDivisionClose}>
                  
                        <Modal.Body>
                        <EditCase onSubmit={onFormSubmit} 	propertyData={i}/>
                        </Modal.Body>
                        <Modal.Footer>
                      
                        </Modal.Footer>
                     </Modal>
                      </div>
                       ))}
                  </div>
              </div>
           
              </div>
            }
             {StateList == 'Reviewed' &&
           <div className="sc-1x4b1gg-2 sc-1ahxnl5-0 bHMBWe khyCjn">
            <div className="sc-18zuvx1-0 gUzXmB">
                <h3>Reviewed cases</h3> 
           
                      <button 
                    className="Button-qe54pl-1 sc-18zuvx1-2 dtlVdq ejWgwv styled-button" type="button"><span
                        className="sc-bczRLJ XPRdW"></span>Sorting by last updated date</button>
            </div>
          
               <div  className="sc-18zuvx1-1 SHqmS">
                  <div className="cards-wrapper">
                  {CaselistByfilter.map((i,index) => (
                      <div key={index} className="sc-pb0d5p-0 dLUxQM" ispriority="1622146333697" >
                          <div className="actions-wrapper">
                          {i.markedAsPriorityEpochMilli == '' &&
                      <div className="Tooltip__TooltipContainer-hhprhj-0 dropmart" onClick={()=>handleRevokedShow(i)}>
                      <span className="Icon-wsq54u-0 bWtdYP"><AiOutlineStar size={25}></AiOutlineStar></span>
                      </div>
                      }
                      {i.markedAsPriorityEpochMilli != '' &&
                        <div className="Tooltip__TooltipContainer-hhprhj-0 dropmart" onClick={()=>RemoveMarkAsPriorityShow(i)}>
                        <span className="Icon-wsq54u-0 bWtdYP"><AiFillStar size={25}></AiFillStar></span>
                        </div>
                      }
                    

                    
                          <Dropdown className="dropmart">
                              <Dropdown.Toggle >
                              
                              </Dropdown.Toggle>
                            <Dropdown.Menu>
                            <Dropdown.Item onClick={e => handleSubmit(i, e) }>View Case</Dropdown.Item>
                              <Dropdown.Item  onClick={()=>handleSubmit(i)}>Edit review</Dropdown.Item>
                              {/* <Dropdown.Item onClick={()=>handleRevokedShow(i)}><AiOutlineStar className="starml" size={20}></AiOutlineStar> Mark as priority</Dropdown.Item>
                              {i.markedAsPriorityEpochMilli == '' && 
                              <Dropdown.Item onClick={()=>handleRevokedShow(i)}><AiOutlineStar className="starml" size={20}></AiOutlineStar>Mark as priority</Dropdown.Item>
                              }
                              {i.markedAsPriorityEpochMilli != '' &&
                              <Dropdown.Item onClick={()=>RemoveMarkAsPriorityShow(i)}><AiFillStar className="starml" size={20}></AiFillStar>Remove as priority</Dropdown.Item>
                                }
                              <Dropdown.Item onClick={()=>UnarchivShow(i)}> Unarchiv</Dropdown.Item> */}

                            </Dropdown.Menu>
                          </Dropdown>
                          </div>
                          <div className="main-content" onClick={e => handleSubmit(i, e) }>
                              <div className="patient-name fs-exclude"><span className="Icon-wsq54u-0 bWtdYP"><AiOutlineUser></AiOutlineUser></span>{i.firstName} {i.lastName}</div>
                              <div className="code"><b>Case ID:</b>{i.requestCode}</div>
                              <div className="last-update">Last updated on <span className="nowrap">{new Date(Number(i.whenModifiedEpochMilli)).toLocaleString()}</span></div>
                          </div>
                          <Modal show={showMarkAsPriority === i} onHide={handleCloserevoed}  size="lg">
                          <Modal.Body>
                          <MarkAsPriorityModel onSubmit={onFormSubmit} 	propertyData={i}/>
                          </Modal.Body>
                          <Modal.Footer>

                          </Modal.Footer>
                      </Modal>

                      <Modal show={RemoveMarkAsPriority === i} onHide={RemovehandleCloserevoed}  size="lg">
                          <Modal.Body>
                          <RemoveMarkAsPriorityModel onSubmit={onFormSubmit} 	propertyData={i}/>
                          </Modal.Body>
                          <Modal.Footer>

                          </Modal.Footer>
                      </Modal>

                      <Modal show={showCaseDivision == i} onHide={hendelCaseDivisionClose}>
                  
                        <Modal.Body>
                        <EditCase onSubmit={onFormSubmit} 	propertyData={i}/>
                        </Modal.Body>
                        <Modal.Footer>
                      
                        </Modal.Footer>
                     </Modal>
                     <Modal show={showUnArchiveCase == i} onHide={UnArchiveCaseClose}>
                  
                        <Modal.Body>
                        <UnArchivModel onSubmit={onFormSubmit} 	propertyData={i}/>
                        </Modal.Body>
                        <Modal.Footer>
                      
                        </Modal.Footer>
                    </Modal>
                     
                      </div>
                       ))}
                  </div>
              </div>
           
              </div>
            }
             {StateList == 'All' &&
           <div className="sc-1x4b1gg-2 sc-1ahxnl5-0 bHMBWe khyCjn">
            <div className="sc-18zuvx1-0 gUzXmB">
                <h3>All cases</h3> 
                     <button 
                    className="Button-qe54pl-1 sc-18zuvx1-2 dtlVdq ejWgwv styled-button" type="button"><span
                        className="sc-bczRLJ XPRdW"></span>Sorting by last updated date</button>
            </div>
          
               <div  className="sc-18zuvx1-1 SHqmS">
                  <div className="cards-wrapper">
                  {CaselistByfilter.map((i,index) => (
                      <div key={index} className="sc-pb0d5p-0 dLUxQM" ispriority="1622146333697" >
                          <div className="actions-wrapper">
                          {i.markedAsPriorityEpochMilli == '' &&
                      <div className="Tooltip__TooltipContainer-hhprhj-0 dropmart" onClick={()=>handleRevokedShow(i)}>
                      <span className="Icon-wsq54u-0 bWtdYP"><AiOutlineStar size={25}></AiOutlineStar></span>
                      </div>
                      }
                      {i.markedAsPriorityEpochMilli != '' &&
                        <div className="Tooltip__TooltipContainer-hhprhj-0 dropmart" onClick={()=>RemoveMarkAsPriorityShow(i)}>
                        <span className="Icon-wsq54u-0 bWtdYP"><AiFillStar size={25}></AiFillStar></span>
                        </div>
                      }
                          <Dropdown className="dropmart">
                              <Dropdown.Toggle >
                              
                              </Dropdown.Toggle>
                            <Dropdown.Menu>
                            <Dropdown.Item onClick={e => handleSubmit(i, e) }>View Case</Dropdown.Item>
                              <Dropdown.Item  onClick={()=>handleSubmit(i)}>Edit review</Dropdown.Item>
                              {/* <Dropdown.Item onClick={()=>handleRevokedShow(i)}><AiOutlineStar className="starml" size={20}></AiOutlineStar>Mark as priority</Dropdown.Item>
                              {i.markedAsPriorityEpochMilli == '' && 
                              <Dropdown.Item onClick={()=>handleRevokedShow(i)}><AiOutlineStar className="starml" size={20}></AiOutlineStar>Mark as priority</Dropdown.Item>
                              }
                              {i.markedAsPriorityEpochMilli != '' &&
                              <Dropdown.Item onClick={()=>RemoveMarkAsPriorityShow(i)}><AiFillStar className="starml" size={20}></AiFillStar>Remove as priority</Dropdown.Item>
                                } */}
                              {/* <Dropdown.Item onClick={e => Abortandarchive(i, e) }>Abort and archive</Dropdown.Item> */}
                             
                            </Dropdown.Menu>
                          </Dropdown>
                             
                          </div>
                          <div className="main-content" onClick={e => handleSubmit(i, e) }>
                              <div className="patient-name fs-exclude"><span className="Icon-wsq54u-0 bWtdYP"><AiOutlineUser></AiOutlineUser></span>{i.firstName} {i.lastName}</div>
                              <div className="code"><b>Case ID:</b>{i.requestCode}</div>
                              <div className="last-update">Last updated on <span className="nowrap">{new Date(Number(i.whenModifiedEpochMilli)).toLocaleString()}</span></div>
                          </div>
                          <div className="card-footer">
                          <div className="status">
                            <span className="Icon-wsq54u-0 bWtdYP"><AiFillEdit></AiFillEdit></span>
                              {i.state == 'UNDER_REVIEW' && 
                              <span className="nowrap">Under review</span>
                              }
                              {i.state == 'WAITING_ACCEPTANCE' && 
                                  <span className="nowrap">Pending acceptance</span>
                              }
                               {i.state == 'CASE_REVIEWED' && 
                                  <span className="nowrap">Review submitted</span>
                              }
                              {i.state == 'CASE_CLOSED' && 
                                  <span className="nowrap">Case finished</span>
                              }
                              {i.state == 'CASE_REJECTED' && 
                                  <span className="nowrap">Case Rejected</span>
                              }
                              
                              
                            </div>
                      </div>
                          <Modal show={showMarkAsPriority === i} onHide={handleCloserevoed}  size="lg">
                          <Modal.Body>
                          <MarkAsPriorityModel onSubmit={onFormSubmit} 	propertyData={i}/>
                          </Modal.Body>
                          <Modal.Footer>

                          </Modal.Footer>
                      </Modal>

                      <Modal show={RemoveMarkAsPriority === i} onHide={RemovehandleCloserevoed}  size="lg">
                          <Modal.Body>
                          <RemoveMarkAsPriorityModel onSubmit={onFormSubmit} 	propertyData={i}/>
                          </Modal.Body>
                          <Modal.Footer>

                          </Modal.Footer>
                      </Modal>

                      <Modal show={showCaseDivision == i} onHide={hendelCaseDivisionClose}>
                  
                        <Modal.Body>
                        <EditCase onSubmit={onFormSubmit} 	propertyData={i}/>
                        </Modal.Body>
                        <Modal.Footer>
                      
                        </Modal.Footer>
                     </Modal>
                      </div>
                       ))}
                  </div>
              </div>
           
              </div>
            }
              
                </CardBody>
                </Card>
                {/* <Modal show={show} onHide={handleClose} >
              <DropdownModal onSubmit={onLoginFormSubmit} />
               </Modal> */}
      </div>
    </>
  );
}

export default Cases;
const MarkAsPriorityModel = observer((props) =>  {
  const {onSubmit ,propertyData} = props;
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
    console.log("propertyData",propertyData)
    const handleclose = (e) => {
      onSubmit(e)
  }
  const handleSubmit = (e) => {
       
        
   
    const paymentarray = {'markedAsPriorityEpochMilli':new Date().getTime(),'id':propertyData.id}
       console.log("paymentarray",paymentarray)
       const method  = "/case/UpdateMarkAsPriority"
       new ServiceStore().UpdateData(method,paymentarray).then((res) => {
           console.log("res.response",res.response)
           if(res.response.status == 1){
            onSubmit(e)
           }
       })
    
}
  return (
    <div className="Dialog-gai4ey-9 bpkkbL JS-has-wc JS-dialog" >
    <div className="Dialog__DialogAlwaysVisibleDiv-gai4ey-8 klECUW"><span
            className="Icon-wsq54u-0 Dialog__CloseIcon-gai4ey-1 bWtdYP lgtrXX JS-dialog-close JS-dialog-close"></span>
        <h2 className="Dialog__DialogTitle-gai4ey-4 LGEMR">Mark case as priority</h2>
    </div>
    <div className="LoadingDiv__BlockContainer-sc-1g7ljba-0 gqDJHC Dialog__DialogContentWrapper-gai4ey-7 bYNANT">
        <div className="Dialog__DialogContent-gai4ey-3 ifAPFT">
            <p>Priority cases are pinned at the top of the case list.</p>
            <div className="sc-pb0d5p-0 ijRKGe">
                <div className="main-content">
                    <div className="patient-name fs-exclude"><span className="Icon-wsq54u-0 bWtdYP"><AiOutlineUser size={25}></AiOutlineUser></span> {propertyData?.firstName}{propertyData?.lastName}
                    </div>
                    <div className="code"><b>Case ID:</b>{propertyData?.requestCode}</div>
                    <div className="last-update">Last updated on <span className="nowrap">{new Date(Number(propertyData?.whenModifiedEpochMilli)).toLocaleString()}</span></div>
                </div>
            </div>
          
        </div>
        <div className="Dialog__DialogFooter-gai4ey-5 vtrKe"><button 
                className="Button-qe54pl-1 cMqAGO styled-button" type="button" onClick={handleclose}>Cancel</button><button 
                className="Button-qe54pl-1 beryvo styled-button" type="submit" onClick={handleSubmit}>Mark</button></div>
    </div>
</div>
  )
  
});
const RemoveMarkAsPriorityModel = observer((props) =>  {
  const {onSubmit ,propertyData} = props;
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
    console.log("propertyData",propertyData)
    const handleclose = (e) => {
      onSubmit(e)
  }
  const handleSubmit = (e) => {
       
        
   
    const paymentarray = {'markedAsPriorityEpochMilli':'','id':propertyData.id}
       console.log("paymentarray",paymentarray)
       const method  = "/case/UpdateMarkAsPriority"
       new ServiceStore().UpdateData(method,paymentarray).then((res) => {
           console.log("res.response",res.response)
           if(res.response.status == 1){
            onSubmit(e)
           }
       })
    
}
  return (
    <div className="Dialog-gai4ey-9 eHqKdF JS-has-wc JS-dialog" >
    <div className="Dialog__DialogAlwaysVisibleDiv-gai4ey-8 jSxcBU"><span
            className="Icon-wsq54u-0 Dialog__CloseIcon-gai4ey-1 bWtdYP lgtrXX JS-dialog-close JS-dialog-close"></span>
        <h2 className="Dialog__DialogTitle-gai4ey-4 leLoRL">Remove as priority</h2>
    </div>
    <div className="LoadingDiv__BlockContainer-sc-1g7ljba-0 gqDJHC Dialog__DialogContentWrapper-gai4ey-7 bFGauR">
        <div className="Dialog__DialogContent-gai4ey-3 ifAPFT">
            <p>The case will no longer be pinned at the top of the case list.</p>
            <div className="sc-pb0d5p-0 jzJdxl">
                <div className="actions-wrapper">
                    <div className="sc-pb0d5p-1 fyBeSM priority-icon">
                        <div className="Tooltip__TooltipContainer-hhprhj-0 iYcqeS">
                            <div className="priority-icon"><span className="Icon-wsq54u-0 bWtdYP"><AiFillStar size={25}></AiFillStar></span></div>
                        </div>
                    </div>
                </div>
                <div className="main-content">
                    <div className="patient-name fs-exclude">
                      <span className="Icon-wsq54u-0 bWtdYP"></span>  
                      {propertyData?.firstName}{propertyData?.lastName}
                    </div>
                    <div className="code"><b>Case ID:</b>{propertyData?.requestCode}</div>
                    <div className="last-update">Last updated on <span className="nowrap">{new Date(Number(propertyData?.whenModifiedEpochMilli)).toLocaleString()}</span></div>
                </div>
               
            </div>
            <p>Do you wish to proceed?</p>
           
        </div>
        <div className="Dialog__DialogFooter-gai4ey-5 brKreg"><button 
                className="Button-qe54pl-1 cYDRcW styled-button" type="button" onClick={handleclose}>Cancel</button><button 
                className="Button-qe54pl-1 eAhuOY styled-button" type="submit" onClick={handleSubmit}>Remove</button></div>
    </div>
</div>
  )
  
});

const EditCase = observer((props) =>  {
  const {onSubmit ,propertyData} = props;
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [cemail, setCEmail] = useState("");
  const [isOn, setIsOn] = React.useState(false);
  const [selected, setSelected] = useState([]);
  const [datalist, setAllData] = useState([]);
  let history = useHistory();

    const options = []
    const method = "/division/getdivision"
    new ServiceStore().GetAllData(method).then((res) => {
    console.log("res::::::::::::::::::::",res)
    for(var i in res.data ){
      const obj = {value: res.data[i].id, label: res.data[i].category }
      options.push(obj)
    }
      
    });

    
    React.useEffect(() => {
      const dataid = propertyData.id

    const methods = '/case/FindCaseByID/'
    new ServiceStore().GetDataByID(methods,dataid).then((res) => {
        const detail = res.data
       

       
        const catarrayobj = []
        for(var i in detail.categories){
          const obj = {value: detail.categories[i].id, label: detail.categories[i].name }
          catarrayobj.push(obj)
        }
        setSelected(catarrayobj)
        console.log("detail",catarrayobj)
        })
      
    }, []);
     
      const onSubmits  =  (e) => {
        e.preventDefault();
        const dataid = propertyData.id
        const categories = []
        console.log("selected",selected,dataid)
        for(var i  in  selected){
          const obj = {'id':selected[i].value,'name':selected[i].label}
          categories.push(obj)

        }
        const datobj = {'categories':categories,id:dataid}
        const method  = "/case/UpdateCaseCategory"
        new ServiceStore().UpdateData(method,datobj).then((res) => {
          console.log("res.response",res.response)
          if(res.response.status == 1){
            onSubmit(e)
          }
        })
      }
  return (


    <div className="Dialog-gai4ey-9 eHqKdF JS-has-wc JS-dialog" >
    <div className="Dialog__DialogAlwaysVisibleDiv-gai4ey-8 jSxcBU"><span
            className="Icon-wsq54u-0 Dialog__CloseIcon-gai4ey-1 bWtdYP lgtrXX JS-dialog-close JS-dialog-close"></span>
        <h2 className="Dialog__DialogTitle-gai4ey-4 leLoRL">Edit case divisions</h2>
    </div>
    <Form  onSubmit={onSubmits} noValidate>
    <div className="LoadingDiv__BlockContainer-sc-1g7ljba-0 gqDJHC Dialog__DialogContentWrapper-gai4ey-7 bFGauR">
        <div className="Dialog__DialogContent-gai4ey-3 ifAPFT">
            <p>Manage the divisions that can access this case.</p>
            <div>
                <div value="[object Object]" className="Field__Container-p9woft-1 eFssct"><label value="[object Object]"
                        className="Field__Label-p9woft-2 cUWXcG">Divisions <span className="spnred">*</span></label>
                    <FormGroup>
                          
                          <MultiSelect options={options}  value={selected}
                                                  onChange={setSelected}
                                                
                                                  name = 'divisions'/>
                          
                        </FormGroup>
                   <span
                        className="Field__FieldDescription-p9woft-4 Field__BellowFieldDescription-p9woft-5 bNrjSU dqmYsV">Use
                        comma, enter or tab to add multiple.</span>
                </div>
            </div>
           
        </div>
        <div className="Dialog__DialogFooter-gai4ey-5 brKreg"><button 
                className="Button-qe54pl-1 cYDRcW styled-button" type="submit">Cancel</button>
                <button 
                className="Button-qe54pl-1 eAhuOY styled-button" type="submit">Update</button></div>
    </div>
  </Form>
</div>
     
  )
  
});


const UnArchivModel = observer((props) =>  {
  const {onSubmit ,propertyData} = props;
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
    console.log("propertyData",propertyData)
    const handleclose = (e) => {
      onSubmit(e)
  }
  const handleSubmit = (e) => {
       
        
    const method = '/case/UpdateCaseState'
    const obj = {'state':"CASE_DRAFT",'id':propertyData.id}
      new ServiceStore().UpdateData(method,obj).then((res) => {
        if(res.response.status == 1){
          onSubmit(e)
         }
      })
    
    
}
  return (
  
<div className="Dialog-gai4ey-9 eHqKdF JS-has-wc JS-dialog" >
    <div className="Dialog__DialogAlwaysVisibleDiv-gai4ey-8 jSxcBU"><span
            className="Icon-wsq54u-0 Dialog__CloseIcon-gai4ey-1 bWtdYP lgtrXX JS-dialog-close JS-dialog-close"></span>
        <h2 className="Dialog__DialogTitle-gai4ey-4 leLoRL">Confirm unarchiving case</h2>
    </div>
    <div className="LoadingDiv__BlockContainer-sc-1g7ljba-0 gqDJHC Dialog__DialogContentWrapper-gai4ey-7 bFGauR">
        <div className="Dialog__DialogContent-gai4ey-3 ifAPFT">
            <p>By unarchiving the following case it will become a "Case draft" in "Active cases":</p>
            <div className="sc-pb0d5p-0 ijRKGe">
                <div className="main-content">
                    <div className="patient-name fs-exclude"><span className="Icon-wsq54u-0 bWtdYP"></span> {propertyData.firstName} {propertyData.lastName} </div>
                    <div className="code"><b>Case ID:</b>{propertyData.requestCode}</div>
                    <div className="last-update">Last updated on <span className="nowrap">{new Date(Number(propertyData?.whenModifiedEpochMilli)).toLocaleString()}</span></div>
                </div>
            </div>
            <p>You will no longer be able to access this case under "Archived cases", but it will be available in
                "Active cases" and "All cases".</p>
            <p>Are you sure you want to unarchive this case?</p>
            
        </div>
        <div className="Dialog__DialogFooter-gai4ey-5 brKreg"><button 
                className="Button-qe54pl-1 cYDRcW styled-button" type="button" onClick={handleclose}>Cancel</button><button 
                className="Button-qe54pl-1 eAhuOY styled-button" type="submit"  onClick={handleSubmit}>  Yes, unarchive case</button></div>
    </div>
</div>
  )
  
});