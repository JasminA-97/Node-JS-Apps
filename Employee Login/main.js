//login
const login=()=>{
    if(floatingInput.value&&floatingPassword.value){
        console.log(floatingInput.value,floatingPassword.value)
        setTimeout(()=>console.log(floatingInput.value,floatingPassword.value),7000)
        sessionStorage.setItem("username",floatingInput.value)
        sessionStorage.setItem("password",floatingPassword.value)
        //navigate to dashboard page
        window.location="dashboard.html"
    }else{
        alert('please fill the form completely');
    }
}