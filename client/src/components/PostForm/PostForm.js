import React, { useState, useContext,useRef,useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { Row} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createPost } from '../../actions/posts';
import useOutsideClick from '../../hooks/useClickOutside';
import {CategoryContext} from '../../context/categoryContext';


const PostForm = ({setNewPost}) => {
  const type = useContext(CategoryContext)
  const [postData, setPostData] = useState({ text: '',category:type });
  const dispatch = useDispatch();
 // const ref = useRef(); 
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, [])
  const handleSubmit = async () => {
    if(validateForm())
    dispatch(createPost(postData));
    setNewPost(false);
  }; 
  const validateForm = () =>{
    if(!postData.text || postData.text.trim() === '')
      return false;
    return true;
  }
  // useOutsideClick(ref,handleSubmit)
  const handleOnChange = (e) =>{
    setPostData({ ...postData, text: e.target.value })
  }
  return (
    <Card bg={type}  className="text-center align-start" >
    <Card.Body>
      <Form className="h-100">         
            <Form.Control className="h-100" ref={inputRef} onBlur={handleSubmit}
            type="input" as="textarea" value={postData.text} 
            onChange={handleOnChange}  />
      </Form>      
    </Card.Body>
  </Card>
  );
};

export default PostForm;
