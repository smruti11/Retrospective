import React,{useContext,useState, useEffect} from 'react';
import { Container, Navbar,Nav,NavDropdown,DropdownButton, Form } from 'react-bootstrap';
import { typeWell, typeImprove, typeDone, typeAction,typeAll } from '../../constants/categoryTypes';
import {NavigationContext} from '../../context/naviagtionContext';
import {CustomItem} from './CustomItem';
function Navigation() {
    const navigate = useContext(NavigationContext);
    //sorting section
    const sortOptions = [{label:"Default",value:""},{label:"Creation Time",value:"createdAt"}]
    const [sortHeader, setSortHeader] = useState('');

    //category display section
    const options =[typeAll, typeWell,typeImprove,typeDone,typeAction];
    //options = options.map(opt=>{ return {...opt,checked:false}})
    const [categories, setCategories] = useState(options)
    const [selectedOptions, setSelectedOptions] = useState(navigate.section);

    //called when sorting parameter changes
    useEffect(() => {
      const param=navigate.sorting;
      var header = sortOptions.filter(opt=>opt.value===param).map(obj=>(obj.label))
      setSortHeader(header);     
    }, [navigate.sorting])
    const handleSortKey = (sortingParameter)=>{
      navigate.setSorting(sortingParameter);
   }

      //called when selection changes
      useEffect(() => {
        handleSection();
      }, [selectedOptions])
    const handleSection = () =>{
        const options = selectedOptions.filter(opt=>{return opt.value !== typeAll.value});
        navigate.setSection(options);
    }
    //initially when the page loads select all sections by default
    useEffect(()=>{
      setSelectedOptions(options);
      var categories = options.map(opt=>{ return {...opt,checked:true}})
      setCategories(categories);
      },[])

    const handleMultiple = (optionClicked) =>{
      optionClicked.checked = !optionClicked.checked;
      console.log(optionClicked)
      var replace =categories;
      var all = categories.find(obj=>(obj.value==typeAll.value));

      //if all needs to be selected
      if(optionClicked.value===typeAll.value && optionClicked.checked ){
            replace=categories.map(cat=>({...cat,checked:true}));
      //if all needs to be removed
      }else if(optionClicked.value===typeAll.value && !optionClicked.checked){
            replace=categories.map(cat=>({...cat,checked:false}));
      // if one option needs to be removed
      }else if(!optionClicked.checked ){
        all.checked=false;
        replace = categories
                  .filter(opt=>(opt.value===typeAll.value? all :opt))
                  .map(opt=>(opt.value===optionClicked.value ? optionClicked:opt))
      }else{
          //if one option is selected
          replace =categories.map(opt=>(opt.value===optionClicked.value ? optionClicked:opt))
          //if one selection triggers all selection
          if(replace.filter(opt=>(opt.checked===true)).length==4){
            all.checked=true;
            replace = categories
                  .filter(opt=>(opt.value===typeAll.value? all :opt))
          }
      }
     // console.log(replace)
      setCategories(replace)
      var selected = replace.filter(option=>(option.checked === true))
     // .filter(opt=>(opt.value!==typeAll.value))
      setSelectedOptions(selected);
     // navigate.setSection(selected);
    }
    return (
        <Container>
            <Navbar className="bg-background" collapseOnSelect fixed="top">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="justify-content-end mr-lg-5 ml-lg-5" 
                id="responsive-navbar-nav">
                <p className="text-center mt-4 mb-4">View Section &nbsp;</p>
                <Nav>
                <DropdownButton
                  menuAlign="right"
                  title={selectedOptions.length>4?'View All':`${selectedOptions.length} Selected`}
                  id="dropdown-menu-align-right"
                >
                  {
                    categories.map((opt,idx)=>
                    <Form as={CustomItem} onCheck={handleMultiple} key={opt.value} eventKey={idx}>{opt}</Form>)
                  }

                </DropdownButton>
                </Nav>
                    <p className="text-center mt-4 mb-4">&nbsp;Sort By &nbsp;</p>
                    <Nav >
                    <NavDropdown  title={sortHeader} id="collasible-nav-dropdown">
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
