import React,{useContext,useState, useEffect} from 'react';
import { Container, Navbar,Nav,NavDropdown, Dropdown, DropdownButton } from 'react-bootstrap';
import { typeWell, typeImprove, typeDone, typeAction,typeAll } from '../../constants/categoryTypes';
import {NavigationContext} from '../../context/naviagtionContext';
import {CustomDropdown} from './CustomDropdown';
function Navigation() {
    const navigate = useContext(NavigationContext);
    const sortOptions = [{label:"Default",value:""},{label:"CreatedAt",value:"createdAt"}]

    const [sortHeader, setSortHeader] = useState('');
    //called when sorting parameter changes
    useEffect(() => {
      const param=navigate.sorting;
      var header = sortOptions.filter(opt=>opt.value===param).map(obj=>(obj.label))
      setSortHeader(header);
      
    }, [navigate.sorting])
    const handleSortKey = (sortingParameter)=>{
      navigate.setSorting(sortingParameter);
    }
    const options =[typeAll, typeWell,typeImprove,typeDone,typeAction];
    const [selectedOptions, setSelectedOptions] = useState(navigate.section);
    //initially when the page loads select all sections by default
    useEffect(()=>{
         setSelectedOptions(options);
    },[])
      //called when selection changes
      useEffect(() => {
        handleSection();
      }, [selectedOptions])
    const handleSection = () =>{
        const options = selectedOptions.filter(opt=>{return opt.value !== typeAll.value});
        navigate.setSection(options);
    }
    const updateSelectedOptions= (opts) =>{
      setSelectedOptions(opts)
    }
    return (
        <Container>
            <Navbar className="bg-background" collapseOnSelect fixed="top">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="justify-content-end mr-lg-5 ml-lg-5" id="responsive-navbar-nav">
                <p className="text-center mt-4 mb-4">View Section &nbsp;</p>
                    <Nav>
                      <NavDropdown as={CustomDropdown} update={updateSelectedOptions} selectedOptions={selectedOptions}></NavDropdown>
                      {/* <CustomDropdown update={updateSelectedOptions} selectedOptions={selectedOptions} ></CustomDropdown> */}
                    </Nav>
                    <p className="text-center mt-4 mb-4">&nbsp;Sort By &nbsp;</p>
                    <Nav >
                      <DropdownButton  variant="navigate"
                      menuAlign="right"
                      title={sortHeader}
                      id="dropdown-menu-align-right"
                      >
                      {
                           sortOptions.map(opt=>(
                            <Dropdown.Item onSelect={handleSortKey} key={opt.value} 
                            eventKey={opt.value}>{opt.label}</Dropdown.Item> 
                          ))
                      }

                      </DropdownButton>
                    {/* <NavDropdown  title={sortHeader} id="collasible-nav-dropdown">
                      {
                        sortOptions.map(opt=>(
                          <NavDropdown.Item onSelect={handleSortKey} key={opt.value} eventKey={opt.value}>{opt.label}</NavDropdown.Item> 
                        ))
                      }
                        </NavDropdown> */}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    )
}

export default Navigation
