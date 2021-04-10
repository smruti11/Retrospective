import React,{useContext,useState, useEffect} from 'react';
import { Container, Navbar,Nav,NavDropdown } from 'react-bootstrap';
import { typeWell, typeImprove, typeDone, typeAction,typeAll } from '../../constants/categoryTypes';
import {NavigationContext} from '../../context/naviagtionContext';
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
function Navigation() {
    const navigate = useContext(NavigationContext);
    const sortOptions = [{label:"Default",value:""},{label:"Creation Time",value:"createdAt"}]
    const options =[typeAll, typeWell,typeImprove,typeDone,typeAction];
    const [selectedOptions, setSelectedOptions] = useState(navigate.section);
    const [sortHeader, setSortHeader] = useState('');
    //initially when the page loads select all sections by default
    useEffect(()=>{
         setSelectedOptions(options);
    },[])
    //called when sorting parameter changes
    useEffect(() => {
      const param=navigate.sorting;
      var header = sortOptions.filter(opt=>opt.value===param).map(obj=>(obj.label))
      setSortHeader(header);
     
    }, [navigate.sorting])
    function getDropdownButtonLabel({ placeholderButtonLabel, value }) {
        if (value && value.some((o) => o.value === typeAll.value)) {
          return `All`;
        } else {
          return `${value.length} selected`;
        }
      }
    function onChange(value, event) {
        if (event.action === "select-option" && event.option.value === typeAll.value) {
          setSelectedOptions(options);
        } else if (
          event.action === "deselect-option" &&
          event.option.value === typeAll.value
        ) {
          setSelectedOptions([]);
        } else if (event.action === "deselect-option") {
          setSelectedOptions(value.filter((o) => o.value !== typeAll.value));
        } else if (value.length === options.length - 1) {
          setSelectedOptions(options);
        } else {
          setSelectedOptions(value);
        }

      }
      //called when selection changes
      useEffect(() => {
        handleSection();
      }, [selectedOptions])
    const handleSection = () =>{
        const options = selectedOptions.filter(opt=>{return opt.value !== typeAll.value});
        navigate.setSection(options);
    }
    const handleSortKey = (sortingParameter)=>{
       navigate.setSorting(sortingParameter);
    }
    return (
        <Container>
            <Navbar className="bg-background" collapseOnSelect fixed="top">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="justify-content-end mr-lg-5 ml-lg-5" id="responsive-navbar-nav">
                <p className="text-center mt-4 mb-4">View Section &nbsp;</p>
                    <Nav>
                        <ReactMultiSelectCheckboxes
                         options={options}
                         placeholderButtonLabel=""
                         getDropdownButtonLabel={getDropdownButtonLabel}
                         value={selectedOptions}
                         onChange={onChange}
                         setState={setSelectedOptions}
                        />
                    </Nav>
                    <p className="text-center mt-4 mb-4">&nbsp;Sort By &nbsp;</p>
                    <Nav >
                    <NavDropdown  className="css-1r4vtzz"  title={sortHeader} id="collasible-nav-dropdown">
                      {
                        sortOptions.map(opt=>(
                          <NavDropdown.Item onSelect={handleSortKey} key={opt.value} eventKey={opt.value}>{opt.label}</NavDropdown.Item> 
                        ))
                      }
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    )
}

export default Navigation
