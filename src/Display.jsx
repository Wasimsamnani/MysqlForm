import axios from 'axios';
import {useState,useEffect} from 'react';
const Display = (props) => {
  const  [data,setdata] = useState();
  const [message,setmessage] = useState("")
  const [Deleteclicked,setDeleteclicked] = useState(false);
  const [Updateclicked,setUpdateclicked] = useState(false);
  const Deletehandeler = (rollno) => {
    axios.post('/delete',{
      rollno:rollno
    }).then(res=>setmessage(res.data.message));
  }
  useEffect(() => {
    setTimeout(()=>setmessage(""),4000);
    axios.get('/details').then(response => {
      setdata(response.data.result);
    })
  },[message])
  const Deletetoggle = () => {
    setDeleteclicked(!Deleteclicked);
  }
  const Updatetoggle = () => {
    setUpdateclicked(!Updateclicked)
  }
  const Updatehandeler = (data) => {
    let rollno = prompt("enter your rollno to update");
    let name = prompt("enter your name to update");
    let address = prompt("enter your address to update");
    let course = prompt("enter your course to update");
    let mobilenumber = prompt("enter phone number to update");
    let gender = prompt("enter gender to update");
    let email = prompt("enter email to update");
    axios.post('update',{id:data,rollno:rollno,name:name,address:address,course:course,mobilenumber:mobilenumber,gender:gender,email:email}).then(res=>setmessage(res.data.message))
  }
  return (
    <>
    <h1>{message}</h1>
  <input type="button" value={!Deleteclicked?"Delete fields":"Hide Delete"} onClick={Deletetoggle}/><br/><br/>
<input type="button" value={!Updateclicked?"Update fields":"Hide update"} onClick={Updatetoggle}/><br/><br/>
    <table border="1">
	  <tbody><tr>
		<th>ROLLNO</th>
		<th>NAME</th>
		<th>ADDRESS</th>
		<th>COURSE</th>
		<th>CONTACT</th>
		<th>GENDER</th>
		<th>EMAIL</th>
	  </tr>
    {data?data.map((data,ind) => {
      return <>
    <tr key={ind}>
    <td>{data.rollno}</td>
		<td>{data.name}</td>
		<td>{data.address}</td>
		<td>{data.course}</td>
		<td>{data.mobilenumber}</td>
		<td>{data.gender}</td>
		<td>{data.email}</td>
  {Deleteclicked?<td><button onClick={Deletehandeler.bind(this,data.rollno)}>Delete</button></td>:null}
  {Updateclicked?<td><button onClick={Updatehandeler.bind(this,data.rollno)}>Update</button></td>:null}
		</tr>
  </>
  }):null}
    </tbody>
		</table>
  </>

  )
}

export default Display
