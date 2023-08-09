
import React, {useState , useCallback, useMemo} from "react";
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
import {AiFillCaretDown,AiFillEdit,AiOutlineFilePdf,AiOutlineFileImage,AiOutlineUsergroupAdd,AiOutlineFile,AiOutlineDiff, AiOutlineUser ,AiOutlineFileText ,AiOutlineMail,AiOutlineVideoCamera,AiOutlineDollar,AiOutlineFolderOpen} from "react-icons/ai";
import { AiOutlineDownCircle ,AiOutlineEdit ,AiOutlineEye} from "react-icons/ai";

import {  Button, Form } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select'
import "bootstrap/dist/css/bootstrap.css";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
function LeftsidebarCase() {
    let history = useHistory();

    const [show, setShow] = useState(false);
    const pushToRoute = route => {
        history.push(route)
    }
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
        <div className="sc-rkx7yu-0 sc-1etuk72-0 Bzrip ghZZzW">
                <div className="sc-rkx7yu-1 cDUCqx" >
                    <div className="sc-rkx7yu-2 TKuKf">
                        <div className="sidebar-heading">
                            <div className="sc-rkx7yu-7 xIOHb">Control Panel</div>
                        </div><a className="sc-rkx7yu-3 kqfPDI" onClick={() => pushToRoute("/admin/StaffManagement")}>
                             <AiOutlineMail></AiOutlineMail> <span className="btnmr">Staff management</span></a>
                                <a className="sc-rkx7yu-3 kqfPDI"
                           onClick={() => pushToRoute("/admin/AddDivision")}>
                               <AiOutlineDollar></AiOutlineDollar> <span className="btnmr">Divisions settings </span></a><a
                            className="sc-rkx7yu-3 kqfPDI" onClick={() => pushToRoute("/admin/NotificationSettings")}>
                               <AiOutlineFileText></AiOutlineFileText><span className="btnmr"> Notification settings </span></a>
                                <a className="sc-rkx7yu-3 kqfPDI"
                           onClick={() => pushToRoute("/admin/AuditLog")}>
                                <AiOutlineFileText></AiOutlineFileText><span className="btnmr"> Audit log </span></a>
                    </div>
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
  
  export default LeftsidebarCase;

  const EditCase = ({ onSubmit }) => {
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
    return (
        <Row>
          
        <Col md="12">
          <Card className="card-user">
          <CardTitle>Manage the divisions that can access this case.</CardTitle>

            <CardBody>
              <Form  onSubmit={onSubmit} noValidate>
                <Row>
                    <Col className="pr-1" md="12">
                      <FormGroup>
                        <p><span>Divisions </span> <span className="spnred">*</span></p>
                        <Select options={options} />
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