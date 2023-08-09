
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Input,
  FormGroup,
  Form,
  Button

} from "reactstrap";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import {AiFillCaretRight,AiFillCaretLeft, AiOutlineDownCircle ,AiOutlineEdit ,AiOutlineEye ,AiOutlinePlusCircle} from "react-icons/ai";
import { useHistory,Link } from 'react-router-dom';
import ServiceStore from "../util/ServiceStore";
import Dropdown from 'react-bootstrap/Dropdown';

const tableHead = {
  firstname: "Name",
  email: "Email",
  specialities: "Specialities",
  createdAt: "Added On",
  phone: "Open Cases",
};
function Experts() {
  const history = useHistory();
  const [allData, setAllData] = React.useState([]);
  const [searchInput, setSearchInput] = React.useState('');
  const [dataList, setDataList] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [recordsPerPage] = React.useState(5);
  const indexOfLastRecord = currentPage * recordsPerPage;
const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
const currentRecords = allData.slice(indexOfFirstRecord, 
  indexOfLastRecord);
  const nPages = Math.ceil(allData.length / recordsPerPage)
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1)
  const [caseitem, setCaseitem] = React.useState(0);

  const nextPage = () => {
    if(currentPage !== nPages) 
        setCurrentPage(currentPage + 1)
}
const prevPage = () => {
    if(currentPage !== 1) 
        setCurrentPage(currentPage - 1)
}
  
 React.useEffect(() => {
  getAllexpert()
  
   
  }, []); 

  const getAllexpert = () => {
    const method = "/expert/getexpert"
    new ServiceStore().GetAllData(method).then((res) => {
    
      setAllData(res.data)
    
    
    });

    
  }
  

  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if(searchValue.length > 1){
      const filteredData = allData.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setAllData(filteredData)
    }else{
      getAllexpert()
    
    }
  }

  
  const Edit = (id) => {
    console.log("id",id)
    history.push({
      pathname: '/admin/EditExperts',
      search: '?id='+id,
      state: { detail: id },
    })
  }
  
      
  const Remove = (id) => {
    console.log("id",id)
    const method = '/expert/removeexpert/'
    new ServiceStore().DeleteData(method,id).then((res) => {
      console.log("res",res)
     
        getAllexpert()
     });
  }
  const ViewExpert = (id) => {
    console.log("id",id)
    history.push({
      pathname: '/admin/ViewExperts',
      search: '?id='+id,
      state: { detail: id },
    })
  }
  
  const handleSubmit = () => {
    history.push("/admin/AddExperts");
  }
  return (
    <>
     
             
              <div className="sc-1x4b1gg-1 itWlZc">
    <div className="sc-1x4b1gg-2 iDykZc">
        <div className="sc-1x4b1gg-3 hMBoLk heading-actions">
            <div className="sc-17inukh-1 jFhLov"><span className="Icon-wsq54u-0 bWtdYP"></span>
            <Input placeholder="Search"  onChange={(e) => searchItems(e.target.value)}
                    className="TextInput__Input-yzpeng-1 btRsWK TextInput-yzpeng-7 gyICpj" data-hj-whitelist="true"
                     type="text"  /></div>
                     <a 
                className="Button-qe54pl-1 eOodRp styled-button"  onClick={handleSubmit} >
                  <span
                    className="Icon-wsq54u-0"><AiOutlinePlusCircle size={30}></AiOutlinePlusCircle></span> Add expert</a>
        </div>
        <div className="sc-17inukh-2 dknurd">
            <div className="sc-17inukh-3 sc-17inukh-4 dlWYtc xNbfD">
                <div className="name">Name</div>
                <div className="email">Email</div>
                <div className="specialities">Specialties</div>
                <div className="date-added">Added on</div>
                <div className="cases-count">Open cases</div>
                <div className="actions"></div>
            </div>
            {currentRecords.map((i,index) => (
                <div key={index} className="sc-17inukh-3 dlWYtc">
                    <div className="name">{i.firstname} {i.lastname}</div>
                    <div className="email">{i.email}</div>
                    <div className="specialities">
                        <div className="Tooltip__TooltipContainer-hhprhj-0 iYcqeS">{i.specialities.map(item => item.label).join(', ')}</div>
                    </div>
                    <div className="date-added">{i.createdAt}</div>
                    <div className="cases-count">{i.opencase ? i.opencase: ""}</div>
                    <div className="actions">
                      <a className="sc-17inukh-5 hYWxOA"  onClick={(e) => ViewExpert(i.id)}>View</a><a
                            className="sc-17inukh-5 hYWxOA" onClick={(e) => Edit(i.id)}>Edit</a>
                            
                            <span className="Icon-wsq54u-0 bWtdYP">
                                <Dropdown>
                                  
                                    <Dropdown.Toggle >
                                    
                                    </Dropdown.Toggle>

                                  <Dropdown.Menu>
                                    <Dropdown.Item onClick={(e) => Remove(i.id)}>Remove Expert</Dropdown.Item>
                                    <Dropdown.Item >Reset Password</Dropdown.Item>
                                    
                                  </Dropdown.Menu>
                                </Dropdown>
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
                {/* <Table responsive>
                  <thead className="text-primary">
                  <tr>
                    <td>Name</td>
                    <td>Email</td>
                    <td>Specialties</td>
                    <td>Added on</td>
                    <td>Open cases</td>
                    <td>Action</td>
                  </tr>
                    
                  </thead>
                  <tbody>
                     {allData.map((i,index) => (
                      <tr key={index}>
                        <td>{i.firstname}</td>
                        <td>{i.email}</td>
                        <td>{i.specialities.map(item => item.label).join(', ')}</td>
                        <td>{i.createdAt}</td>
                        <td>{i.opencase}</td>
                        <td >
                        <div>
                          <span className="icone-cls">
                            <AiOutlineEye></AiOutlineEye>
                          </span>
                          <span className="icone-cls">
                          <AiOutlineEdit></AiOutlineEdit>
                          </span >
                          <span className="icone-cls">
                        <AiOutlineDownCircle></AiOutlineDownCircle>
                        </span>
                        
                      
                        </div>
                      </td>
                      </tr>
                     ))}
                    {/* <tr>
                      {allData.map((i,index) => ( 
                        <td key={index}>{i.firstname}</td>
                      ))}
                      {allData.map((i,index) => ( 
                        <td key={index}>{i.email}</td>
                      ))}
                  </tr> */}
                    {/* <tr>{tableData()}
                    </tr> */}
                      {/* <td >
                        <div>
                          <span className="icone-cls">
                            <AiOutlineEye></AiOutlineEye>
                          </span>
                          <span className="icone-cls">
                          <AiOutlineEdit></AiOutlineEdit>
                          </span >
                          <span className="icone-cls">
                        <AiOutlineDownCircle></AiOutlineDownCircle>
                        </span>
                        
                      
                        </div>
                      </td> */}
                      
                    
                 
                  {/* </tbody>
                 
                </Table> 
                <div className="pagination-left">
                <Pagination 
                  pageSize={countPerPage}
                  onChange={updatePage}
                  current={currentPage}
                  total={allData.length}
                />
                </div>  */}
              
    </>
  );
}

export default Experts;
