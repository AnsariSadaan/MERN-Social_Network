import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../App.jsx';
import { useParams } from 'react-router-dom';

function Profile() {
  const [userProfile, setProfile] = useState(null);
  const { state, dispatch } = useContext(UserContext);
  const [showfollow, setShowFollow] = useState(state ? !state.following?.includes(userid) : true);
  const { userid } = useParams();
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:5000/user/${userid}`, {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setProfile(result);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [userid]);


  const followUser = () => {
    fetch('http://localhost:5000/follow', {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        followId: userid
      })
    }).then(res => res.json())
      .then(data => {
        dispatch({ type: "UPDATE", payload: { following: data.following, followers: data.followers } })
        localStorage.setItem("user", JSON.stringify(data))
        setProfile((prevState) => {
          let updatedFollowers = prevState.user && Array.isArray(prevState.user.followers)
            ? [...prevState.user.followers, data._id]
            : [data._id];  // if prevState.user.followers is not an array, start a new array

          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: updatedFollowers
            }
          }
        })
        setShowFollow(false)
      })
  }

  const unfollowUser = () => {
    fetch('http://localhost:5000/unfollow', {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        unfollowId: userid
      })
    }).then(res => res.json())
      .then(data => {

        dispatch({ type: "UPDATE", payload: { following: data.following, followers: data.followers } })
        localStorage.setItem("user", JSON.stringify(data))

        setProfile((prevState) => {
          const newFollower = prevState.user.followers.filter(item => item != data._id)
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollower
            }
          }
        })
        setShowFollow(true)

      })
  }

  return (
<>
    {userProfile ? 
        <div style={{ maxWidth: "550px", margin: "0px auto" }}>
          <div style={{ display: "flex", justifyContent: "space-around", margin: "18px -7px", borderBottom: "1px solid grey" }}>
            <div>
              <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                src="../../assets/profile.png" alt="profile" />
            </div>
            <div>
              <h4>{userProfile.user.name}</h4>
              <h5>{userProfile.user.email}</h5>
              <div style={{ display: "flex", justifyContent: "space-between", width: "110%" }}>
                <div style={{ display: "flex", justifyContent: "space-between", width: "110%" }}>
                  <h5>{userProfile && userProfile.posts ? userProfile.posts.length : 0} Posts</h5>
                  <h5>{userProfile && userProfile.followers ? userProfile.followers.length : 0} Followers</h5>
                  <h5>{userProfile && userProfile.following ? userProfile.following.length : 0} Following</h5>
                </div>
              </div>
              <button className="btn waves-effect waves-light blue" type="submit" onClick={() => followUser()}>
                Follow
              </button>
              <button className="btn waves-effect waves-light blue" type="submit" onClick={() => unfollowUser()}>
                Unfollow
              </button>
            </div>

          </div>

          <div className="gallery">
            {/* {userProfile && userProfile.posts ? userProfile.posts.map((item) => {
              return <img className='item' key={item._id} src={item.photo} alt={item.title} />
            }) : null} */}
            {userProfile && userProfile.posts && userProfile.posts.length > 0 ? (
              userProfile.posts.map((item) => {
                return <img className='item' key={item._id} src={item.photo} alt={item.title} />
              })
            ) : (
              <p>No posts available.</p>
            )}
          </div>
        </div>
    : <h2>loading...</h2>}
    
    </>
  );
}

export default Profile 