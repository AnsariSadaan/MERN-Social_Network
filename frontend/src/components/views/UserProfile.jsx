import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../App.jsx';
import { useParams } from 'react-router-dom';

function Profile() {
  const [mypics, setmyPics] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const { userid } = useParams();
  console.log(userid);
  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
    }).then((res) => res.json())
      .then((result) => {
        console.log(result);
        // setmyPics(result.mypost);
      })
  }, [])
  return (
    <div style={{ maxWidth: "550px", margin: "0px auto" }}>
      <div style={{ display: "flex", justifyContent: "space-around", margin: "18px -7px", borderBottom: "1px solid grey" }}>
        <div>
          <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
            src="https://scontent.fbom3-1.fna.fbcdn.net/v/t39.30808-6/307107278_2022219544652809_135123322477827579_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=GzVryItoE7wAX8lhOMn&_nc_ht=scontent.fbom3-1.fna&oh=00_AfCwYyh2C3Y7hQ5uxFrEF0ATu7wPdwkEn5be3_HDSQ6C3g&oe=637069DD" alt="Profile Pic" />
        </div>
        <div>
          <h4>{state.name}</h4>
          <div style={{ display: "flex", justifyContent: "space-between", width: "110%" }}>
            <h5>10 Posts</h5>
            <h5>300 Followers</h5>
            <h5>200 Following</h5>
          </div>
        </div>

      </div>

      <div className="gallery">
        {mypics.map((item) => {
          return <img className='item' key={item} src={item.photo} alt={item.title} />
        })}
      </div>
    </div>
  );
}

export default Profile 