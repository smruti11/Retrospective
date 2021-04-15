import React,{useEffect,useState} from 'react'
import {Dropdown,Form, DropdownButton, Container} from 'react-bootstrap'
import { typeWell, typeImprove, typeDone, typeAction,typeAll } from '../../constants/categoryTypes';
import {CustomItem} from './CustomItem';
export const CustomDropdown = React.forwardRef(({update,selectedOptions},ref) =>{
    //show/hide dropdown
    const [show,setShow] = useState(false);
    const updateShow = (val) =>{
       // const show = val? true : false;
        setShow(val);
    }
    var options =[typeAll, typeWell,typeImprove,typeDone,typeAction];
     options = options.map(opt=>{ return {...opt,checked:false}})
     const [categories, setCategories] = useState(options)
    useEffect(() => {
        //if all options are selected
        var arr= []
        if(selectedOptions.length>3){
            arr = options.map(opt=>{ return {...opt,checked:true}})
        }else{
            //if less options are selected
            var selected = selectedOptions.map(obj=>(obj.value));
            arr = options.map(opt=>(selected.includes(opt.value)?{...opt, checked:true}:{...opt,checked:false}))
        }
        setCategories(arr);
     }, [selectedOptions])
     const handleMultiple = (optionClicked) =>{
       // optionClicked.checked = !optionClicked.checked;
        // console.log(optionClicked)
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
        // setCategories(replace)
        var selected = replace.filter(option=>(option.checked === true))
        selected.forEach(obj=>{
            delete obj.checked;
        })
        // console.log(selected);
        update(selected);
      }
    return (
        <Dropdown alignRight={true} show={show}>
        <Dropdown.Toggle onClick={()=>updateShow(!show)} as="button" role="button" 
        className="btn-navigate btn" id="dropdown-basic">
        {selectedOptions.length>4?'View All':`${selectedOptions.length} Selected`}
        </Dropdown.Toggle>

        <Dropdown.Menu >
            {
            categories.map((opt,idx)=>
            <Dropdown.Item  as={CustomItem} updateShow={updateShow} onCheck={handleMultiple} 
            key={opt.value} eventKey={idx}>{opt}</Dropdown.Item>
            )
            }
        </Dropdown.Menu>
        </Dropdown>


        //  <DropdownButton variant="navigate" show={show} 
        // menuAlign="right" onClick={()=>updateShow(!show)}
        // title={selectedOptions.length>4?'View All':`${selectedOptions.length} Selected`}
        // id="dropdown-menu-align-right"
        // >
        // {
        //     categories.map((opt,idx)=>
        //     <Form as={CustomItem} updateShow={updateShow} onCheck={handleMultiple} key={opt.value} eventKey={idx}>{opt}</Form>)
        // }

        // </DropdownButton>
    )
})


