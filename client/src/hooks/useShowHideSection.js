import {useEffect,useReducer, useState} from 'react';
import {typeWell, typeImprove, typeDone, typeAction, typeAll } from '../constants/categoryTypes';

function useShowHideSection(list) {
    //const [currentSections, setCurrentSections] = useState([])
    const initialState={
        well:false,
        improve:false,
        done:false,
        action:false
    }
    const [state,setState] = useState(initialState);
    useEffect(() => {
        const section = list.map(ele=>{return ele.value})
        if(section.includes(typeWell.value)){
            //setState((prev)=>{return {...prev,well:true}});
            initialState.well=true;
        }

        if(section.includes(typeImprove.value)){
            //setState((prev)=>{return {...prev,improve:true}});
            initialState.improve = true;
        }

        if(section.includes(typeAction.value)){
           // setState((prev)=>{return {...prev,action:true}});
           initialState.action = true;
        }

        if(section.includes(typeDone.value)){
            //setState((prev)=>{return {...prev,done:true}});
            initialState.done = true;
        }
        setState(initialState);
    }, [list])
    return [state];
}

export default useShowHideSection
