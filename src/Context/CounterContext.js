import { createContext, useState } from "react";



export let CounterContext= createContext(0)

export default function CounterContextProvider(props){
    const [counter,setCounter]= useState(20)
    const [userName,setUserName]= useState("Amr")
    function Increment(){
        setCounter(counter+1)
    }
    function Decerment(){
        setCounter(counter-1)
    }
    return <CounterContext.Provider value={{counter,userName,Increment,Decerment}} >
        {props.children}
    </CounterContext.Provider>
}