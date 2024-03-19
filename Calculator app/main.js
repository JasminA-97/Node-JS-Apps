//display content in calcScreen
const displayContent=(content)=>{
    calcScreen.value += content
}

const clearAll=()=>{
    calcScreen.value=""
    calcScreen.placeholder="0"
}

const showResult = () =>{
    try{
        console.log('Try block');
        calcScreen.value = eval(calcScreen.value)
    }
    catch(err){
        console.log('catch block');
        console.log(err);
        calcScreen.value=""
        calcScreen.placeholder="Invalid expression!!!"
    }
    finally{
        console.log('Finally block:task completed');
    }
}

//remove last
const removeLast=()=>{
    calcScreen.value=calcScreen.value.slice(0,-1)
}