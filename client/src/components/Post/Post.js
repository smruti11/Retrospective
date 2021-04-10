import React,{useState,useContext} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import EditForm from '../EditForm/EditForm';
import {Archive} from 'react-bootstrap-icons'
import {CategoryContext} from '../../context/categoryContext';
import { likePost,deletePost } from '../../actions/posts';
import {useDispatch} from 'react-redux';
const Post = ({post }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const type = useContext(CategoryContext);
  // console.log(post)
  const updateShow = () =>{
    setShow(!show);
  }
  const addLikes =() =>{
    var id = post._id;
    dispatch(likePost(id))
  }
  const deleteOne =() =>{
    var id = post._id;
    dispatch(deletePost(id))
  }
  return (
    <>
    <Card bg={type} className="text-center align-start" >
      <Card.Body  onClick={updateShow}>
        <Card.Text className="pointer">{post.text} &nbsp;</Card.Text>       
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between">
      <Button variant={type} onClick={addLikes}><small>+{post.likeCount}</small></Button>
      <Button variant={type} onClick={deleteOne}><Archive/></Button>
      </Card.Footer>
    </Card>
    {show && <EditForm post={post} show={show} updateShow={updateShow}/>}
    </>
  );
};

export default Post;
