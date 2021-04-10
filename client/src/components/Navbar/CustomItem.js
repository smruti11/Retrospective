import React from 'react';
import {Dropdown,Form} from 'react-bootstrap';
export const CustomItem = React.forwardRef(
    ({children, onCheck},ref)=>{
      const handleCheck = () => {
        onCheck(children)
      }
      return (<Dropdown.Item className={`dropdown-item ${children.checked && 'active'}`} onClick={handleCheck}>
          <Form.Check className="pointer" type="checkbox" readOnly={true} checked={children.checked}  ref={ref}
           label={children.label} />
        </Dropdown.Item>)
      }
  )