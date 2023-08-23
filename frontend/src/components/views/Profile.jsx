import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../App.jsx';

function Profile() {
  const [mypics, setmyPics] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  // console.log(dispatch)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/mypost', {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt")
          },
        });

        const result = await response.json();
        // console.log(result);
        setmyPics(result.mypost);
      } catch (error) {
        console.error("Failed to fetch and process the data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ maxWidth: "550px", margin: "0px auto" }}>
      <div style={{ display: "flex", justifyContent: "space-around", margin: "18px -7px", borderBottom: "1px solid grey" }}>
        <div>
          <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
            src="" alt="" />
        </div>
        <div>
          <h4>{state?state.name:"loading"}</h4>
          <div style={{ display: "flex", justifyContent: "space-between", width: "110%" }}>
            <h5>2 Posts</h5>
            <h5>300 Followers</h5>
            <h5>200 Following</h5>
          </div>
        </div>

      </div>

      <div className="gallery">
        {mypics.map((item) => {
          return <img key={item._id} className='item' src={item.photo} alt={item.title} />
        })}
      </div>
    </div>
  );
}

export default Profile 