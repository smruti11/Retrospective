import React,{useEffect,useState,useContext} from 'react';
import {Container, Row } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { useSelector } from 'react-redux';
import Category from '../Category/Category';
import {CategoryContext} from '../../context/categoryContext';
import { typeWell, typeImprove, typeDone, typeAction } from '../../constants/categoryTypes';
import {NavigationContext} from '../../context/naviagtionContext';
import useShowHideSection from '../../hooks/useShowHideSection';
import useCategorise from '../../hooks/useCategorise';
const Posts = () => {  
  const posts = useSelector((state) => state.posts);
  const navigate = useContext(NavigationContext);
    //populate posts sections
    var [well,improve,done,action] = [[],[],[],[]];
    [well,improve,done,action] = useCategorise(posts);
  //default categories
  const categories={
    well:false,
    improve:false,
    done:false,
    action:false
  }

  const [currentCategory, setCurrentCategory] = useState(categories);
  // var currentCategory =categories;
  // set navigate
  useEffect(() => {
    var types=navigate.section
    const section = types.map(ele=>{return ele.value})
    if(section.includes(typeWell.value))
    categories[typeWell.value] = true;
    if(section.includes(typeImprove.value))
    categories[typeImprove.value] = true;
    if(section.includes(typeAction.value))
    categories[typeAction.value] = true;
    if(section.includes(typeDone.value))
    categories[typeDone.value] = true;
    if(JSON.stringify(currentCategory)!==JSON.stringify(categories)){
      setCurrentCategory({
        ...categories
        })
    }
    //console.log('checking through show/hide',check);
  }, [navigate.section])

  return (
    <Container className="categoryContainer">
      <Row as="h3" className="justify-content-center mb-2">Retrospective</Row>


       {
        (
          <Container className="p-0" fluid="lg">
            <Row>

              {currentCategory.well &&
                <CategoryContext.Provider value={typeWell.value}>
                <Category label={typeWell.label} posts={well}></Category>
                </CategoryContext.Provider>
              }
              {currentCategory.improve &&
                <CategoryContext.Provider value={typeImprove.value}>
                <Category label={typeImprove.label}  posts={improve}></Category>
                </CategoryContext.Provider>
              }
              {currentCategory.done &&
                <CategoryContext.Provider value={typeDone.value}> 
                  <Category label={typeDone.label}  posts={done}></Category>
                </CategoryContext.Provider>
              }
              {currentCategory.action &&
                <CategoryContext.Provider value={typeAction.value}>
                  <Category label={typeAction.label}  posts={action}></Category> 
                </CategoryContext.Provider>
              }
              
                      
            </Row>
          </Container>
          )
        }
    </Container>
  );
};

export default Posts;
  // const [well, setWell] = useState([]);
  // const [improve, setImprove] = useState([]);
  // const [done, setDone] = useState([]);
  // const [action, setAction] = useState([]);
// function filter(value){
//   return posts.filter(post=>{return post.category== value});
// }
// useEffect(()=>{
//   //const well = posts.filter(post=>{return post.category== typeWell.value});
//   // const well = filter(typeWell.value);
//   // setWell(well);
//   // const improve = filter(typeImprove.value); 
//   // setImprove(improve);
//   // const done = filter(typeDone.value);
//   // setDone(done);
//   // const action = filter(typeAction.value);
//   // setAction(action);
// },[posts])

              /* {
                categories.map((category) => ( 
                  <CategoryContext.Provider key={category} value={category}>
                      <Category/>
                  </CategoryContext.Provider>
              ))
              } */