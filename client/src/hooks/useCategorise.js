import {useEffect,useReducer,useState} from 'react';
import { typeWell, typeImprove, typeDone, typeAction } from '../constants/categoryTypes';

function useCategorise(posts) {
    const [well, setWell] = useState([]);
    const [improve, setImprove] = useState([]);
    const [done, setDone] = useState([]);
    const [action, setAction] = useState([]);
    // function filter(value){
    //     return posts.filter(post=>{return post.category=== value});
    // }
    // useEffect(() => {
    //     const well = filter(typeWell.value);
    //     setWell(well);
    //     const improve = filter(typeImprove.value); 
    //     setImprove(improve);
    //     const done = filter(typeDone.value);
    //     setDone(done);
    //     const action = filter(typeAction.value);
    //     setAction(action);
    // }, [posts])

    const filterReducer = (temp,post) =>{
        if(post.category===typeWell.value){
            temp[typeWell.value].push(post);
        }else if(post.category === typeImprove.value){
            temp[typeImprove.value].push(post);
        }else if(post.category ===  typeDone.value){
            temp[typeDone.value].push(post);
        }else{
            temp[typeAction.value].push(post);
        }
        return temp;
    }
    useEffect(()=>{
        const initialState ={
            well:[],improve:[],done:[],action:[]
        }
        var ans = posts.reduce(filterReducer,initialState);
        // console.log('after reduce')
        // console.log(ans);
        setWell(ans.well);
        setImprove(ans.improve);
        setDone(ans.done);
        setAction(ans.action);
    },[posts])
    return [well,improve,done,action];

    // const reducer = (state,action)=>{
    //     switch(action.type){
    //         case typeWell.value:
    //             return posts.filter(post=>{return post.category === typeWell.value});
    //         case typeImprove.value:
    //             return posts.filter(post=>{return post.category === typeImprove.value}); 
    //         case typeDone.value:
    //             return posts.filter(post=>{return post.category === typeDone.value});
    //         case typeAction.value: 
    //             return posts.filter(post=>{return post.category === typeAction.value});
    //         default:
    //             return state;
    //     }
    // }
    // const [currentState,dispatch] = useReducer(reducer,[]);
    // useEffect(() => {
    //     dispatch({type:category})
    // }, [category])

}

export default useCategorise
