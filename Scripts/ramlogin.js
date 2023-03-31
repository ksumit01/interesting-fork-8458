const userAPIurl = `https://63f59a1b3f99f5855dc408c8.mockapi.io/Assets/users`;

const inputs = document.querySelectorAll(".input");

let dataBase;
const inputnodes = document.querySelectorAll(".inputs"),
button = document.querySelector("#otp-btn");

inputnodes.forEach((input, index1) => {
input.addEventListener("keyup", (e) => {
  const currentInput = input,
    nextInput = input.nextElementSibling,
    prevInput = input.previousElementSibling;

  if (currentInput.value.length > 1) {
    currentInput.value = "";
    return;
  }

  if (nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== "") {
    nextInput.removeAttribute("disabled");
    nextInput.focus();
  }

  if (e.key === "Backspace") {
    inputnodes.forEach((input, index2) => {
      if (index1 <= index2 && prevInput) {
        input.setAttribute("disabled", true);
        input.value = "";
        prevInput.focus();
      }
    });
  }

  if (!inputnodes[3].disabled && inputnodes[3].value !== "") {
    button.classList.add("active");
    return;
  }
  button.classList.remove("active");
});
});

window.addEventListener("load", () => inputnodes[0].focus());


fetch(`https://63f59a1b3f99f5855dc408c8.mockapi.io/Assets/users`)
    .then(res=>res.json())
    .then(data=>{
    console.log(data);
    dataBase = data;
    })

function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}


inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});

let loginbtn = document.getElementById("login");
let signupbtn = document.getElementById("signup");
let detailslog = document.getElementById("login-info");
let detailssign = document.getElementById("sigup-info");

loginbtn.addEventListener("click",()=>{
    signupbtn.classList.remove("selected");
    loginbtn.classList.add("selected"); 
    detailssign.classList.add("noshow");
    detailslog.classList.remove("noshow");
    document.getElementById("submit").value = "Login";

})

signupbtn.addEventListener("click",()=>{
    signupbtn.classList.add("selected");
    loginbtn.classList.remove("selected");    
    detailslog.classList.add("noshow");
    detailssign.classList.remove("noshow");
    document.getElementById("submit").value = "Sign Up";
})

let form = document.querySelector("#form");

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    if(document.getElementById("submit").value == "Login")
    login();
    else
    signup();
})

function login(){
    console.log("Inside login button");
    console.log(document.getElementById("username"))
    logincall(document.getElementById("username").value,document.getElementById("password").value);
}

function signup(){
    console.log("Inside signup button");
    register(document.getElementById("first-name").value,document.getElementById("second-name").value,document.getElementById("email").value,document.getElementById("signpass").value);
}


function logincall(user,pass){
    console.log(user,pass);
    fetch(`https://63f59a1b3f99f5855dc408c8.mockapi.io/Assets/users`)
    .then(res=>res.json())
    .then(data=>{
    console.log(data);
    dataBase = data;

    for(let i = 0 ; i<dataBase.length ; i++)
    {
        if(dataBase[i].email == user && dataBase[i].password === pass)
        {
            alert("login Sucessfull");
            localStorage.setItem("login-info",dataBase[i]);
            window.location.href = "./index.html";
        }
    }
})
}
async function register(fname,lname,email,pass){
    let obj = {
        firstname:fname,
        lastname : lname,
        email:email,
        password: pass,
        id: dataBase.length+1
    }

    if(verify(obj.email)){
        alert("Email verified");
    fetch(`https://63f59a1b3f99f5855dc408c8.mockapi.io/Assets/users`,{
        method:"POST",
        headers:{
            "Content-type" : "application/json"
        },
        body :JSON.stringify(obj)
    })
    .then(res=>res.json())
    .then(data=>{
    console.log(data);
    localStorage.setItem("login-info",data);
    window.location.href = "./index.html";
    })
    console.log(obj);
    }
    else
    {
        console.log("Error in login check the info provided");
    }

}

function verify(email){
    const fname = document.getElementById('first-name');
    const lname = document.getElementById('second-name');
    const otp = Math.floor(Math.random() * 9000 + 1000);
    let ebody = `
    <h2>Hi</h2>
    <h3>${fname.value}${lname.value},</h3>
    <h1>YOUR OTP is ${otp}</h1>
    `;

    Email.send({
        SecureToken : "2521c93e-d04f-4e79-b347-e4320a19584f", //add your token here
        To : email, 
        From : "sanjucool1000@gmail.com",
        Subject : "Registration Verification DFabrica",
        Body : ebody
    }).then(message => {
        alert(`${message} , OTP sent to mail :: dont forget to check the Spam :)`);
    });
    let  check = displayOtp(otp);
    if(check)
    {
        alert("Logged In");
        localStorage.setItem("login-info",data);
        window.location.href = "./index.html";
    }
}

function displayOtp(n){
    document.getElementById("otp-main").classList.add("show");
    document.getElementById("otp-main").classList.remove("noshow");
    button.addEventListener("click",()=>{
        let otp = "";
        for(let i = 0  ;i<4 ;i++)
        {
            otp+=inputnodes[i].value;
        }    
        console.log(otp);
        if(n==otp){
        alert("Email verified");
        return true;
        }
        else{
        alert("invalid OTP");
        displayOtp(n);
        }
    })

    let cancel = document.getElementById("cancel");
    cancel.addEventListener("clcik",()=>{
        window.location.href = "./ramLogin.html";
    })
}
