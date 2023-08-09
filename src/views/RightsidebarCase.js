
import React, {useState , useCallback, useMemo} from "react";
import ServiceStore from "../util/ServiceStore";

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
import {AiFillCaretDown,AiFillEdit,AiOutlineFilePdf,AiOutlineFileImage,AiOutlineUsergroupAdd,AiOutlineFile,AiOutlineDiff, AiOutlineUser ,AiOutlineFileText ,AiOutlineMail,AiOutlineVideoCamera,AiOutlineDollar,AiOutlineFolderOpen} from "react-icons/ai";
import { AiOutlineDownCircle ,AiOutlineEdit ,AiOutlineEye} from "react-icons/ai";
import { MultiSelect } from "react-multi-select-component";

import {  Button, Form } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select'
import "bootstrap/dist/css/bootstrap.css";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
function RightsidebarCase() {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const onLoginFormSubmit = (e) => {
        e.preventDefault();
        handleClose();
      };
    return (
      <>
        
        <Card className="card-user">
        <CardBody>
        <div className="sc-w3rr1k-0 iTCZJP">
            <div className="sc-rkx7yu-2 sc-w3rr1k-2 TKuKf dqhaZo">
                <h4>Case creation settings</h4>
                <div className="sc-rkx7yu-13 sc-w3rr1k-3 fspXHa gZEckd">
                    <span>DIVISIONS</span>
                    </div>
                    <div className="sc-igss1y-0 isjPtI">
                        <div className="sc-igss1y-1 fdYTsn" onClick={handleShow}>
                            <div>Edit divisions <AiFillEdit></AiFillEdit>
                            </div>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header >
                                <Modal.Title>Edit case divisions</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                <EditCase onSubmit={onLoginFormSubmit} />
                                </Modal.Body>
                                <Modal.Footer>
                            
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                <div className="sc-rkx7yu-13 sc-w3rr1k-4 fspXHa kcNwLi">
                    <span>CASE PRIORITY</span></div>
                <button className="Button-qe54pl-1 sc-w3rr1k-1 cJGvUx dLUPZY styled-button" type="button">
                <span className="Icon-wsq54u-0 bWtdYP"></span>Mark as priority</button>
            </div>
        </div>
        {/* <div className="TKuKf">
            <div className="sidebar-heading"> 
            <p className="iCXzEa">
            CASE DETAILS<br />
            </p>
            <div className="xIOHb1">
            Ramarao Pothula <br />
            </div>
            <p className="kiDipV">
            Case ID : czdfdxfdsf
            </p>
            <div className="sc-igss1y-0 isjPtI">
                <div className="sc-igss1y-1 fdYTsn">
                    <div>Edit divisions <span className="Icon-wsq54u-0 bWtdYP">
                        </span>
                    </div>
                </div>
            </div>
            <div className="sidebar-icons">
                <div className="priority-icon">
                    <div className="Tooltip__TooltipContainer-hhprhj-0 iYcqeS">
                        <span className="Icon-wsq54u-0 bWtdYP"></span>
                    </div>
                </div>
            </div>
            <a className="sc-rkx7yu-3 kqfPDI" href="/admin/CaseNotes">
                 <AiOutlineFolderOpen></AiOutlineFolderOpen>
                 <span className="btnmr"> Case notes</span>
                <span className="Icon-wsq54u-0 bWtdYP secondaryActionIcon">
                </span>
            </a>
        
          </div>
        </div> */}
        </CardBody>
        <CardFooter>
            
        </CardFooter>
        </Card>

           
      </>
    );
  }
  
  export default RightsidebarCase;

  const EditCase = ({ onSubmit }) => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [cemail, setCEmail] = useState("");
    const [isOn, setIsOn] = React.useState(false);
    const [selected, setSelected] = useState([]);
    const [datalist, setAllData] = useState([]);
    const options = []
    const method = "/division/getdivision"
    new ServiceStore().GetAllData(method).then((res) => {
    console.log("res::::::::::::::::::::",res)
    for(var i in res.data ){
      const obj = {value: res.data[i].id, label: res.data[i].category }
      options.push(obj)
    }
      
    });
   
     
      const onSubmits  =  (e) => {
        e.preventDefault();
        console.log("selected",selected)
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