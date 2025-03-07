import React, { useContext } from "react";
import { ApiContext } from "./context/ApiContext";
import Grid from "@mui/material/Grid";
import VideoItem from "./VideoItem";

const VideoList = () => {
  const { videos } = useContext(ApiContext);
  const listOfVideos = videos.map((video) => (
    <VideoItem key={video.id} video={video} />
  ));

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <div className="video-list">{listOfVideos}</div>
      </Grid>
    </Grid>
  );
};

export default VideoList;

