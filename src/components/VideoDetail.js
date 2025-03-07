import React, { useContext, useRef } from 'react';
import { ApiContext } from "./context/ApiContext";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import DeleteIcon from "@mui/icons-material/Delete";
import ReactPlayer from "react-player";

import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { IoLogoYoutube } from "react-icons/io";

const VideoDetail = () => {
  const player = useRef(null);
  const {
    selectedVideo,
    deleteVideo,
    incrementLike,
    incrementDislike,
  } = useContext(ApiContext);

  if (!selectedVideo)
    return (
      <div className="container">
        <button className="wait">
          <IoLogoYoutube />
        </button>
      </div>
    );

  return (
    <>
      <div className="wrapper">
        <ReactPlayer
          className="player"
          url={selectedVideo.video}
          ref={player}
          width="100%"
          height="100%"
          playing
          controls
          disablePictureInPicture
          config={{
            file: {
              attributes: {
                controlsList: "nodownload",
                disablePictureInPicture: true,
              },
            },
          }}
        />
      </div>

      <Grid container alignItems="center">
        <Grid item xs={10}>
          <Typography
            variant="h6"
            sx={{
              paddingLeft: 2, // theme.spacing(2)
            }}
          >
            {selectedVideo.title}
          </Typography>
        </Grid>

        <Grid item xs={1}>
          <button
            className="like"
            onClick={incrementLike}
            style={{ paddingTop: 24 }} // theme.spacing(3)
          >
            <AiFillLike />
            <Typography>{selectedVideo.like}</Typography>
          </button>
        </Grid>
        <Grid item xs={1}>
          <button
            className="like"
            onClick={incrementDislike}
            style={{ paddingTop: 24 }} // theme.spacing(3)
          >
            <AiFillDislike />
            <Typography>{selectedVideo.dislike}</Typography>
          </button>
        </Grid>
      </Grid>

      <Fab
        color="primary"
        aria-label="delete"
        onClick={deleteVideo}
        sx={{
          margin: 2, // theme.spacing(2)
        }}
      >
        <DeleteIcon />
      </Fab>
    </>
  );
};

export default VideoDetail;

