import React, { useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Dashboard = ({ launches, allLaunches, setLaunches, setAllLaunches}) => {
  const[type, setType] = useState("All Launches")

  useEffect(() => {
    fetchLaunches();
  }, []);

  const fetchLaunches = () => {   
     let url = 'https://api.spacexdata.com/v3/launches';
      fetch(url)
      .then((response)=>response.json())
      .then((data) => {
        setLaunches(data);
        setAllLaunches(data); 
      })  
  };

   const showAllLaunches = () => {
    setLaunches(allLaunches); 
    setType("All Launches")
  };

  const upcomingLaunches=()=>{
    const upcLaunches = allLaunches.filter((item)=> item.upcoming === true);
    setLaunches([...upcLaunches]);
    setType("Upcoming Launches")
  }

  const pastLaunches=()=>{
    const pLaunches = allLaunches.filter((item)=> item.upcoming === false);
    setLaunches([...pLaunches]);
    setType("Past Launches")
  }

  const launchesByDate = (selectedDate) => {
  const newLaunches = allLaunches.filter((launch) => {
    const launchDate = new Date(launch.launch_date_utc);
    const formattedSelectedDate = new Date(selectedDate);
    return (
      launchDate.toDateString() === formattedSelectedDate.toDateString()
    );
  });
  setLaunches(newLaunches);
};

  return (
    <div>
      <h1 style={{textAlign:"center"}}>Launch Dashboard</h1> 
      <div style={{textAlign:"center"}}>
        <button onClick={()=>showAllLaunches()} style={{height:"35px",marginRight:"15px",backgroundColor:"#3a86ff",border:'none',borderRadius:"5px",fontWeight:'bold',fontSize:'15px'}}>ALL Launches</button>
        <button onClick={()=>upcomingLaunches()} style={{height:"35px",marginRight:"15px",backgroundColor:"#3a86ff",border:'none',borderRadius:"5px",fontWeight:'bold',fontSize:'15px'}}>Upcoming Launches</button>
        <button onClick={()=>pastLaunches()} style={{height:"35px",backgroundColor:"#3a86ff",border:'none',borderRadius:"5px",fontWeight:'bold',fontSize:'15px'}}>Past Launches</button>
      </div>
      <div style={{textAlign:'center',marginTop:'20px'}}>
        <label htmlFor="launchDate">Launch Date:</label>
        <input
          type="date"
          id="launchDate"
          onChange={(e) => launchesByDate(e.target.value)}
        />
      </div>
      <h1 style={{textAlign:"center"}}>{type}</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginLeft: '50px', marginTop: '60px' }}>
      {
        launches ? 
          (launches.map((launch) => (
          <div key={launch.idx} style={{ marginBottom: '60px', marginRight: '50px',width:"250px"}}>
            <img src={launch.links.mission_patch_small} alt={launch.mission_name} style={{ height: '220px' }} />
            <p style={{ fontSize: '20px' }}>Launch Date: {new Date(launch.launch_date_utc).toLocaleDateString()}</p>
            <p style={{ fontSize: '30px', fontWeight: 'bold' }}>{launch.mission_name}</p>
            <Link to={`/Launch/${launch.flight_number}`}>
              <button style={{backgroundColor:"#3a86ff",border:'none',borderRadius:"5px",height:"30px",fontSize:"15px",fontWeight:'bold'}}>Learn more</button>
            </Link>
          </div>
        ))) : ""
      }
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  launches: state.launches,
  allLaunches: state.allLaunches,
});

const mapDispatchToProps = (dispatch) => ({
  setLaunches: (launches) => dispatch({ type: 'SET_LAUNCHES', payload: launches }),
  setAllLaunches: (allLaunches) => dispatch({ type: 'SET_ALL_LAUNCHES', payload: allLaunches }),
  
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);



