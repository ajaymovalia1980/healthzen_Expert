
import React, {useState , useCallback, useMemo} from "react";
import { MultiSelect } from "react-multi-select-component";
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
  Col
} from "reactstrap";
import { Link } from "react-router-dom";
import {AiFillEdit,AiOutlineFilePdf,AiOutlineFileImage,AiOutlineUsergroupAdd,AiOutlineFile,AiOutlineDiff, AiOutlineUser ,AiOutlineFileText ,AiOutlineMail,AiOutlineVideoCamera,AiOutlineDollar,AiOutlineFolderOpen} from "react-icons/ai";
import { AiOutlineStar ,AiFillStar, AiOutlineDownCircle ,AiOutlineEdit ,AiOutlineEye} from "react-icons/ai";
import {  Button, Form } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select'
import ServiceStore from "../util/ServiceStore";
import { useHistory } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.css";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
function Rightsidebar() {
    const [show, setShow] = useState(false);
    const [category, setCatehory] = useState([]);
    const [Alldata, setAlldata] = useState({});
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const onLoginFormSubmit = (e) => {
        e.preventDefault();
        handleClose();
      };
      const history = useHistory();
      const [showMarkAsPriority, setshowMarkAsPriority] = useState(undefined);
      const handleRevokedShow = (id) => setshowMarkAsPriority(id);
      const handleCloserevoed = () => setshowMarkAsPriority(false);

      const [RemoveMarkAsPriority, setRemoveMarkAsPriority] = useState(undefined);
      const RemoveMarkAsPriorityShow = (id) => setRemoveMarkAsPriority(id);
      const RemovehandleCloserevoed = () => setRemoveMarkAsPriority(false);

      const onFormSubmit = (e) => {
        RemovehandleCloserevoed()
        handleCloserevoed()
        GetCASEALLDATA()
      };
  const pushToRoute = (route,e)  => {
    
    const detail = history.location.state?.detail
    // console.log("data",detail)
    history.push({
      pathname: route,
      search: '?id='+detail.requestCode,
      state: { detail: detail },
    });
    // document.querySelectorAll('.hQrsLt').forEach(function(item) {
    //   console.log("item:::::::::::::::::::",item)
		// 	item.classList.remove('hQrsLt');
    // })
    
    
  }
  const GetCASEALLDATA = () => {
    const dataid = history.location.state?.detail.id
    const loginuser = JSON.parse(localStorage.getItem("loginuser"))
    const methods = '/case/FindCaseByID/'
    new ServiceStore().GetDataByID(methods,dataid).then((res) => {
        const detail = res.data
         let expertWiseReviewlist = res.data.expertWiseReview.filter( function (user) {
          if(user.expertID == loginuser.id){
              return user
            
          }
        })
        console.log("expertWiseReviewlist",expertWiseReviewlist)
        setAlldata(expertWiseReviewlist[0])
        setCatehory(detail.categories)
        
        })

  }
  React.useEffect(() => {
    
    GetCASEALLDATA()
  }, []);
    return (
      <>
        
        <Card className="card-user">
        <CardBody>
        <div className="TKuKf">
            <div className="sidebar-heading"> 
            <p className="iCXzEa">
            CASE DETAILS<br />
            </p>
            {Alldata.patientInfo &&
              <div className="xIOHb1">
              {Alldata.patientInfo.firstName}   {Alldata.patientInfo.lastName}<br />
              </div>
            }
            <div className="sc-rkx7yu-13 fspXHa"><span>Actions</span></div>
               <span className="sc-rkx7yu-3 kqfPDI"  onClick={(e) => pushToRoute("/admin/VideoConsultation",e)}>
               <AiOutlineVideoCamera></AiOutlineVideoCamera>
                <span className="btnmr">
                     Video  Consultation
                </span>
               </span>
            
               <div className="sc-rkx7yu-13 fspXHa"><span>Steps</span></div>
               <span className="sc-rkx7yu-3 kqfPDI"  onClick={(e) => pushToRoute("/admin/ContactDetails",e)}>
               <AiOutlineUser></AiOutlineUser>
          
                <span className="btnmr">
                Case overview
                </span>
               </span> 
               {(Alldata.state  != 'WAITING_ACCEPTANCE' && Alldata.state  != 'CASE_REJECTED') && 
                  <span   className="sc-rkx7yu-3 kqfPDI"  onClick={(e) => pushToRoute("/admin/ExpertReview",e)}>
                  <AiOutlineFileImage></AiOutlineFileImage>
                   <span className="btnmr">
                   Expert Review 
                   </span>
                  </span>
                }
                {(Alldata.state  != 'WAITING_ACCEPTANCE' && Alldata.state  != 'CASE_REJECTED')   && 
                  <span   className="sc-rkx7yu-3 kqfPDI"  onClick={(e) => pushToRoute("/admin/CaseReport",e)}>
                  <AiOutlineFilePdf></AiOutlineFilePdf>
              
             
                   <span className="btnmr">
                   Case Report
                   </span>
                  </span>
              
               }
               {Alldata.state  == 'WAITING_ACCEPTANCE' &&
                <span  style={{pointerEvents: 'none',cursor: 'pointer',background: '#efefef'}} className="sc-rkx7yu-3 kqfPDI"  onClick={() => pushToRoute("/admin/ExpertReview")}>
                <AiOutlineFileImage></AiOutlineFileImage>
                  <span className="btnmr">
                  Expert Review 
                  </span>
                </span>
              }
               {Alldata.state  == 'WAITING_ACCEPTANCE' &&
                  <span  style={{pointerEvents: 'none',cursor: 'pointer',background: '#efefef'}} className="sc-rkx7yu-3 kqfPDI"  onClick={() => pushToRoute("/admin/CaseReport")}>
                  <AiOutlineFilePdf></AiOutlineFilePdf>
              
              
                    <span className="btnmr">
                    Case Report
                    </span>
                  </span>
            }   
           
            
           
           
           
            </div>
        </div>
        </CardBody>
        <CardFooter>
            
        </CardFooter>
        </Card>

           
      </>
    );
  }
  
  export default Rightsidebar;

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

  const EditCase = ({ onSubmit }) => {
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
        const dataid = history.location.state?.detail.id

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
          const dataid = history.location.state?.detail.id
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
        <Row>
          
        <Col md="12">
          <Card className="card-user">
          <CardTitle>Manage the divisions that can access this case.</CardTitle>

            <CardBody>
              <Form  onSubmit={onSubmits} noValidate>
                <Row>
                    <Col className="pr-1" md="12">
                      <FormGroup>
                        <p><span>Divisions </span> <span className="spnred">*</span></p>
                        {/* <Select options={options} /> */}
                        <MultiSelect options={options}  value={selected}
                                                onChange={setSelected}
                                               
                                                name = 'divisions'/>
                        {/* <Input
                          placeholder="Divisions"
                          type="text"
                          name = 'firstname'
                          onChange={(e) => setFirstname(e.target.value)}
                          /> */}
                      </FormGroup>
                    </Col>
                   
                </Row>
                
                    <Row>
                    
                        <div className="mr-l ">
                        <Button
                          variant="secondary"
                            type="submit"
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
    )
    
  };