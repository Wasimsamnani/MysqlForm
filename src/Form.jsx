import {useState,useEffect} from 'react';
import Display from './Display';
import axios from 'axios';

const From = (props) => {
  const [values,setvalues] = useState({
    rollno:"",
    name:"",
    address:"",
    course:"",
    mobilenumber:"",
    gender:"",
    email:""
  });
  const [clicked,setclicked] = useState(false);
  const [message,setmessage] = useState("");
   const changehander = (e) => {
    let {name,value} = e.target;
    setvalues({...values,[name]:value});
  }
  const Clickhandeler = () => {
    setclicked(!clicked);
  }
  useEffect(() => {
    setTimeout(()=>setmessage(""),4000);
  },[message])
  const Submithandeler =  () => {
    setclicked(!clicked);
    axios.post('/signup',{
        rollno:values.rollno,
        name:values.name,
        address:values.address,
        course:values.course,
        mobilenumber:values.mobilenumber,
        gender:values.gender,
        email:values.email
    }).then(res=>{
    setmessage(res.data.message)},(err)=>{
      setmessage(err)
    });
  }

  return (
    <>
    <div style={{display: "flex",alignItems: 'center',justifyContent: 'center'}}>
    <h1>Store your details in database</h1>
    </div>
    <div style={{display: "flex",alignItems: 'center',justifyContent: 'center'}}>
    <form >
    ROLL NO
    <input type="number"  name="rollno" value={values.rollno} onChange={changehander} /><br/><br/>
    NAME
    <input type="text" name="name"  value={values.name} onChange={changehander} /><br/><br/>
    ADDRESS
    <input type="text" name="address" value={values.address} onChange={changehander} /><br/><br/>
    COURSES
    <input type="text" name="course" value={values.course} onChange={changehander} /><br/><br/>
    CONTACT NUMBER
    <input type="number" name="mobilenumber" value={values.mobilenumber} onChange={changehander} /><br/><br/>
    GENDER
    <input type="text" name="gender" value={values.gender} onChange={changehander} /><br/><br/>
    EMAIL
    <input type="email" name="email" value={values.email} onChange={changehander} /><br/><br/>
    <input type="button" value={clicked===true?"hide":"show"} onClick={Clickhandeler}/><br/><br/>
    <input type="button" value="submit it" onClick={Submithandeler}/><br/><br/>
    </form>
    </div>
    <h1 align="center">{message}</h1>
    <br/><br/>
    <center>
    {!clicked?null:<Display />}
    </center>
    </>
  )
}

export default From;
