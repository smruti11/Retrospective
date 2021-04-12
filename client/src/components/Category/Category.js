import React,{useState,useContext, useEffect} from 'react';
import { Row, Col,Container,Button  } from 'react-bootstrap';
import { PlusCircle } from 'react-bootstrap-icons';
import Post from '../Post/Post';
import PostForm from '../PostForm/PostForm';
import {NavigationContext} from '../../context/naviagtionContext';
function Category({label,posts}) {
    const [newPost, setNewPost] = useState(false);
    const navigate = useContext(NavigationContext);
    const [allPosts, setAllPosts] = useState(posts);
    useEffect(() => {
        setAllPosts(posts);
    }, [posts])
    useEffect(() => {
        var arr = Object.assign([],posts);
        if(navigate.sorting!=="")
        arr.sort(compare);
        if(JSON.stringify(arr)!==(JSON.stringify(posts)))
        setAllPosts(arr);
    }, [navigate.sorting])
    //ascending order
    function compare( a, b ) {
        if ( a[navigate.sorting] < b[navigate.sorting] ){
          return -1;
        }
        if ( a[navigate.sorting] > b[navigate.sorting] ){
          return 1;
        }
        return 0;
      } 
    const updateNewPost = () =>{
        setNewPost(!newPost)
    }
    return (
        <Col xs={12} md={6} className="flex-grow-1" >
            <Container fluid="lg" className="mb-1 minHeight">
                <Row className="justify-content-center">
                    <h5>{label}</h5>
                    <sup>
                        <Button onClick={updateNewPost} className="circle" variant="success">
                            <PlusCircle className="d-block pointer"></PlusCircle>
                        </Button>
                    </sup>
                </Row>
                <Row className="mt-2 ">
                {                   
                    allPosts.map((post) => ( 
                    <Col key={post._id} xs={12} md={4} className="mb-2">       
                        <Post post={post}/>
                    </Col>))       
                }
                </Row >

                {newPost &&
                    <Row className="mb-2">
                        <Col xs={12} md={4} className="mb-2">   
                            <PostForm setNewPost={updateNewPost}/>
                        </Col>
                    </Row>
                }
            </Container>
      </Col>
    )
}

export default Category
