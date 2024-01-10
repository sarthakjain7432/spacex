import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
const Navbar = () => {
     const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  return (
    <div>
        <div style={{display:"flex"}}>
            <img style={{width:"300px",height:"100px"}} src="./sp333s8d6-spacex-logo-spacex-logo-image-credit-spacex-spaceflight-insider.png" alt="" />
            {
                isAuthenticated  && <p style={{marginLeft:"700px"}}>{user.name}</p>
            }
            {
                isAuthenticated ? 
                (<button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} style={{marginLeft:"50px",height:"40px",marginTop:"10px",backgroundColor:"#3a86ff",border:'none',borderRadius:"5px"}}>Log Out</button>)
                : (<button onClick={() => loginWithRedirect()} style={{marginLeft:"900px",height:"40px",marginTop:"30px",backgroundColor:"#3a86ff",border:'none',borderRadius:"5px"}}>Log In</button>)
            }
            
        </div>
    </div>
  )
}

export default Navbar