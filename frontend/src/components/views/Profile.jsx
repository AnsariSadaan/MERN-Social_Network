// eslint-disable-next-line no-unused-vars
import React from 'react'

const Profile = () => {
    return (
        <>
            <div style={{ maxWidth: "550px", margin: "0px auto" }}>
                <div style={{ display: "flex", justifyContent: "space-around", margin: "18px -7px", borderBottom: "1px solid grey" }}>
                    <div>
                        <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                            src="/src/assets/avatar.svg" alt="Profile Pic" />
                    </div>
                    <div>
                        <h4>Sadaan Ansari</h4>
                        <div style={{ display: "flex", justifyContent: "space-between", width: "110%" }}>
                            <h5>10 Posts</h5>
                            <h5>300 Followers</h5>
                            <h5>200 Following</h5>
                        </div>
                    </div>
                </div>
                <div className="gallery">
                    <img className='item' src='https://source.unsplash.com/random?1' alt='gallerypic' />
                    <img className='item' src='https://source.unsplash.com/random?2' alt='gallerypic' />
                    <img className='item' src='https://source.unsplash.com/random?3' alt='gallerypic' />
                    <img className='item' src='https://source.unsplash.com/random?4' alt='gallerypic' />
                    <img className='item' src='https://source.unsplash.com/random?5' alt='gallerypic' />
                    <img className='item' src='https://source.unsplash.com/random?6' alt='gallerypic' />
                    <img className='item' src='https://source.unsplash.com/random?7' alt='gallerypic' />
                    <img className='item' src='https://source.unsplash.com/random?8' alt='gallerypic' />
                    <img className='item' src='https://source.unsplash.com/random?9' alt='gallerypic' />
                </div>
            </div>
        </>
    )
}

export default Profile