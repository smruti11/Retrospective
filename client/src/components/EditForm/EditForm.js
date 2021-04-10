import React, { useState,useContext,useRef,useEffect} from 'react';
import Modal from 'react-bootstrap/Modal'
import { Button  } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import {useDispatch} from 'react-redux';
import { updatePost } from '../../actions/posts';
import {CategoryContext} from '../../context/categoryContext';

function EditForm({show,updateShow,post}) {
    const [formData, setFormData] = useState(post);
    const type = useContext(CategoryContext);
    const inputRef = useRef();
    const dispatch = useDispatch();
    const handleClose = () => {
        updateShow(false);
        trim();
    }
    function trim(){
        if(formData.text.trim()==='')
            return;
        setFormData({...formData, text:formData.text.trim()})
        var currentId =formData._id;
        dispatch(updatePost(currentId, formData));
    }
    useEffect(() => {
        inputRef.current.focus();
    }, [])
    const handleChange =(e) =>{
        setFormData({ ...formData, text: e.target.value })
    }
    return (
        <>  
        <Modal className={type}  show={show} onHide={handleClose}>
            <Modal.Body >              
                <Form >         
                <Form.Control ref={inputRef} as="textarea" type="input" value={formData.text}
                onChange={handleChange} 
                />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn-edit" onClick={handleClose}>
                 <p className={`btn-${type} h-100`}>Save</p> 
                </Button>
            </Modal.Footer>
        </Modal>
      </>
    )
}

export default EditForm
