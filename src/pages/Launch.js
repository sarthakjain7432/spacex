import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom';
import ReactPlayer from "react-player/youtube";


const Launch = () => {
    const { id } = useParams();
    const [launchInfo, setLaunchInfo] = useState("");
    const [videoLink, setVideoLink] = useState('');
    const [missionName, setMissionName] = useState('');
    const [launchDate, setLaunchDate] = useState('');
    useEffect(() => {
        fetchLaunch();
    }, [id]);


const fetchLaunch = () => {
  let url = `https://api.spacexdata.com/v3/launches/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
    //   console.log('Fetched launch data:', data);
      const launchDateTime = new Date(data.launch_date_utc);
      const formattedLaunchDateTime = launchDateTime.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZoneName: "short",
      });
      const launchSiteName = data.launch_site?.site_name_long || 'Unknown Site';
      const info = `On ${formattedLaunchDateTime}, SpaceX launched the ${data.mission_name} mission from ${launchSiteName}.`;
      setLaunchInfo(info);
      setVideoLink(data.links?.video_link || '');
      setMissionName(data.mission_name || '');
      setLaunchDate(formattedLaunchDateTime);
    })
    .catch((error) => {
      console.error('Error fetching launch:', error);
    });
};

  return (
    <>
    <div style={{marginTop:"40px", marginLeft:"40px"}}>
      {videoLink && (
        <div >
          <ReactPlayer
            url={videoLink}
            controls
            width="400px"
            height="300px"
            style={{ backgroundColor: "#000000" }}
          /> 
        </div>
      )}
      <div>
        <h3>{launchDate}</h3>
        <h1>{missionName}</h1>
        <p style={{fontSize:"20px"}}>{launchInfo}</p>
      </div>
    </div>
    </>
  )
}

export default Launch