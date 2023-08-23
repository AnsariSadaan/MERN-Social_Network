//Client/.../screen/CreatPost.js
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import M from 'materialize-css';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    if(url){
      fetch("http://localhost:5000/createpost",{
        method:"post",
        headers: {
          "Content-Type":"application/json",
          "Authorization": "Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
          title:title,
          body:body,
          pic:url
      })
  }).then(res=>res.json)
  .then(data=>{ 
    if(data.error){
        // console.log("data:"+data);
        M.toast({html: "Not Posted", classes:"#b71c1c red darken-4"})
      }
      else{
        // console.log("data:"+data);
        M.toast({html:"Posted", classes:"#43a047 green darken-1"})
        navigate("/");
      }
    }).catch(err=>{
      console.log(err)
    })
  }
},[title, body, navigate, url])
  
  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "instabooksite");
    // data.append("cloud_name", "instabookcloudsadaan")

    fetch("https://api.cloudinary.com/v1_1/instabookcloudsadaan/image/upload/", {
      method: "post",
      body: data
    }) // fetch (para1, para2)
      .then(res => res.json()) // we get response from cloudinary 
      .then(data => {
        // console.log(data); //what we get data from cloud
        setUrl(data.url);
      })
      .catch(err => {   // this err is from developer side== basically exception handling
        // console.log(data);
        console.log(err)
      })
  }

  return (
    <div className='card input_field auth-card input-field'
      style={{
        margin: "30px auto",
        maxWidth: "500px",
        padding: "20px",
        textAlign: "center"
      }}
    >
      <input type="text" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder='Body' value={body} onChange={(e) => setBody(e.target.value)} />

      <div className="file-field input-field">
        <div className="btn blue">
          <span>UPLOAD IMAGE</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate input-field" type="text" />
        </div> 
      </div>
      <button className="btn waves-effect waves-light blue darken-1"  onClick={() => postDetails()}>Submit Post</button>
    </div>
  )
}

export default CreatePost





