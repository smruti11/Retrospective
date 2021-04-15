import React,{useState,useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
import {Dropdown,Form} from 'react-bootstrap';
export const CustomItem = React.forwardRef(

    ({children, onCheck, updateShow},ref)=>{
      const [item,setItem] = useState(children.checked);
      const handleCheck = (e) => {
        updateShow(true);
        setItem(e.currentTarget.checked);
        children.checked= !children.checked;
        onCheck(children);
      }
      useEffect(() => {
          setItem(children.checked);
      }, [children])
      return (<Form className="dropdown-item" >
                <Form.Check onChange={handleCheck}  checked={item || false}  ref={ref}
                label={children.label} />
              </Form>)
      }
  )