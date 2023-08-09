
import React,{useState} from "react";
import { CKEditor } from 'ckeditor4-react';
import { debounce } from "lodash";
import ServiceStore from "../util/ServiceStore";
import { useHistory } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert'
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
import { Link } from "react-router-dom";
import {AiOutlineFilePdf,AiOutlineFileImage,AiOutlineUsergroupAdd,AiOutlineFile,AiOutlineDiff, AiOutlineUser ,AiOutlineFileText ,AiOutlineMail,AiOutlineVideoCamera,AiOutlineDollar,AiFillPlusCircle} from "react-icons/ai";
import Rightsidebar from "./Rightsidebar"
function CaseNotes() {
  const [notes, setNotes] = useState('')
  const history = useHistory();
  const [formValues, setFormValues] = useState([])
  const [caseNotelist, setCaseNotelist] = useState([])
  const [editformValues, seteditformValues] = useState({})
  const [editformdata, seteditformdata] = useState("")
  const [showswetalert, setshowswetalert] = useState({})
  React.useEffect(() => {
    onloadeddata()
       
       
     }, []);
     let onloadeddata = () => {
      const dataid = history.location.state?.detail.id
  
      const methods = '/casenotes/FindeCaseNoteByID'
      const dataobj = {'caseId':dataid.toString()}
      console.log("detail:::::::::::::;;",dataobj)
      new ServiceStore().GetDataBYFilter(methods,dataobj).then((res) => {
          const detail = res.response.data    
          console.log("detail:::::::::::::;;",detail)
         
          setCaseNotelist(detail)
          
          })
  
    }
  const logEvent = (e) => {
    console.log("logEvent",e.editor.getData())
    // setResume(e.editor.getData())
  }
  let addFormFields = () => {
    setFormValues([...formValues, { notes: ""}])
  }
  let handleSubmit = (event) => {
    event.preventDefault();
    // alert(JSON.stringify(formValues));
    console.log("formValues",formValues)
    const dataid = history.location.state?.detail.id

    for(var i in formValues){
      const obj  = {'caseId':dataid,'creatorId':"",'external':false,"info":{'note':formValues[i].notes,'phoneNumber':"",'email':""}}
      console.log("obj",obj)
      const method = '/casenotes/createcasenotes'
      new ServiceStore().InsertData(method,obj).then((res) => {
        console.log("res.data",res.response.data,res)
        
        if(res.response.status == 1){
            onloadeddata()
            setFormValues([])
        }
      });
    
    }
}

let handleEdit = (item,index) => {
  console.log("logEvent",item,index,editformdata)
  const dataid = history.location.state?.detail.id
  const obj  = {'id':item.id,"info":{'note':editformdata,'phoneNumber':"",'email':""}}
  const method = '/casenotes/UpdateCaseNote'
  new ServiceStore().UpdateData(method,obj).then((res) => {
    console.log("res.data",res.response.data,res)
    
    if(res.response.status == 1){
        onloadeddata()
        seteditformValues({})
    }
  });
  // 
}
let handleChange = (i, e) => {
  console.log("logEvent",i, e.editor.getData())
  let newFormValues = [...formValues];
  newFormValues[i]['notes'] = e.editor.getData();
  setFormValues(newFormValues);
}

let handleEditChange = (i, e) => {
  console.log("logEvent",i, e.editor.getData())
  seteditformdata(e.editor.getData());
}
let removeFormFields = (i) => {
  let newFormValues = [...formValues];
  newFormValues.splice(i, 1);
  setFormValues(newFormValues)
}

let removeEditFormFields = (i) => {
  seteditformValues({})
}
let EditFields = (item,index) => {
 console.log("item",item,index)
 seteditformValues(index)
}
let DeleteFields = (item,index) => {
  // console.log("item",item,index)
  setshowswetalert(index)
  // seteditformValues(index)
  
 }
 let deleteFile = (item,index) => {
  const method = '/casenotes/DeleteCaseNote/'
  new ServiceStore().DeleteData(method,item.id).then((res) => {
    console.log("res.data::::::::::::::::::::",res)
    if(res.data == 1){
      onloadeddata()
        setshowswetalert({})
    }
  
    
  });
  
 }
 let onCancel = () => {
  setshowswetalert({})
  // console.log("item",item,index)
  // seteditformValues(index)
  
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
              <CardHeader>
                {/* <CardTitle tag="h5">Case Notes</CardTitle> */}
                <div className="sc-16qu7j7-3 slyWv">
                  <div><h1 className="sc-16qu7j7-0 gGRhvg">Case Notes</h1></div>
                  <div>
                    <Button  className="Button-qe54pl-1 iywgEP styled-button" type="button">
                      <span className="Icon-wsq54u-0 bWtdYP"></span>Open floating panel</Button>
                  </div>
                </div>
                
               
                  <div className="sc-1rnyb57-2 hJuFrK">
                  <p className="sc-18u1su5-2 iicFAp">
                    Notes are for internal use and can be created by Administrators here, or by anyone accessing a shared case. These notes will not be presented in the final report, and are not visible to Experts or patient representatives.</p>
                    <div className="sc-k9poye-0 kqNWtE">No notes have been added to case</div>
                      <div className="bTGgso">
                      {caseNotelist.length > 0 &&
                        <div>
                      {caseNotelist.map((element, index) => (
                          <div  key={index} className="sc-15f9lx8-0 bTGgso">
                              <div className="sc-15f9lx8-1 jZZwRD">
                                  <div><span className="Icon-wsq54u-0 bWtdYP"></span><span className="title">{element.createdby}</span>
                                      <div className="Tooltip__TooltipContainer-hhprhj-0 iYcqeS">{new Date(element.createdAt).toLocaleString()}</div>
                                  </div>
                                  <div><button  className="Button-qe54pl-1 isEdxL styled-button" type="button" onClick={() => EditFields(element,index)}>Edit</button><button
                                          className="Button-qe54pl-1 isEdxL styled-button" type="button" onClick={() => DeleteFields(element,index)}>Delete</button>
                                                
                                          </div>
                                          {showswetalert == index && 
                                                <SweetAlert
                                                      warning
                                                      showCancel
                                                      confirmBtnText="Yes, delete it!"
                                                      confirmBtnBsStyle="danger"
                                                      title="Are you sure?"
                                                      onConfirm={()=>deleteFile(element,index)}
                                                      onCancel={onCancel}
                                                      focusCancelBtn
                                                    >
                                                      You will not be able to recover this imaginary file!
                                                    </SweetAlert> 
                                          }
                              </div>
                              {editformValues == index && 
                                  <Form  noValidate>
                                    <Row>
                                      <Col >
                                      <FormGroup>
                                          <label>Notes</label>
                                          <CKEditor
                                          data={notes}
                                          name="notes"
                                          onChange={e => handleEditChange(index, e)}
                                          value={element.info.note || ""}
                                          initData={element.info.note}
                                        />
                                        </FormGroup>
                                        <div className="sc-15f9lx8-2 kYLiNL">
                                        <button className="Button-qe54pl-1 hgDIaO styled-button" type="button" onClick={() => removeEditFormFields(index)}>Cancel</button>
                                        <button  className="Button-qe54pl-1 iIhlMQ styled-button" type="button" onClick={()=>handleEdit(element, index)}>Save note</button>
                                        </div>
                                      </Col>
                                      
                                    </Row>
                              </Form>
                                }
                               
                                  <div className="sc-d679ac-0 drNvEc fs-exclude">
                                      <div>{element.info.note.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}</div>
                                  </div>
                                
                          </div>
                       ))}
                       </div>
                  }
                    <Form onSubmit={handleSubmit} noValidate>
                        {formValues.map((element, index) => (
                          <Row key={index}>
                            <Col >
                            <FormGroup>
                                <label>Notes</label>
                                <CKEditor
                                
                                data={notes}
                                name="notes"
                                onChange={e => handleChange(index, e)}
                                value={element.notes || ""}
                              />
                              </FormGroup>
                              <div className="sc-15f9lx8-2 kYLiNL">
                              <button className="Button-qe54pl-1 hgDIaO styled-button" type="button" onClick={() => removeFormFields(index)}>Cancel</button>
                              <button  className="Button-qe54pl-1 iIhlMQ styled-button" type="submit">Save note</button>
                              </div>
                            </Col>
                            
                          </Row>
                          
                          ))}
                          
                          
                          </Form>
                          </div>  
                      <Button onClick={() => addFormFields()} className="Button-qe54pl-1 sc-18mwo6g-0 sc-18u1su5-3 cfbZNM iiNBRZ eaZA-Dh styled-button" type="button">
                     <AiFillPlusCircle size={30}></AiFillPlusCircle> 
                     <span>  Add note </span></Button>
                    
                  </div>
                  
                  {/* <Form  onSubmit={handleSubmit}>
                      {formValues.map((element, index) => (
                        <div className="form-inline" key={index}>
                          <label>Name</label>
                          <input type="text" name="name" value={element.name || ""} onChange={e => handleChange(index, e)} />
                          <label>Email</label>
                          <input type="text" name="email" value={element.email || ""} onChange={e => handleChange(index, e)} />
                          {
                            index ? 
                              <button type="button"  className="button remove" onClick={() => removeFormFields(index)}>Remove</button> 
                            : null
                          }
                        </div>
                      ))}
                    </Form> */}
              </CardHeader>
           
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default CaseNotes;
