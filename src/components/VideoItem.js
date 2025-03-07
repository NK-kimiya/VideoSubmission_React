import React, { useContext } from "react";
import { ApiContext } from "./context/ApiContext";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";

const VideoItem = ({ video }) => {
  const { setSelectedVideo } = useContext(ApiContext);

  return (
    <Card
      onClick={() => setSelectedVideo(video)}
      sx={{
        position: "relative",
        display: "flex",
        marginBottom: 2, // theme.spacing(1) = 8px → 2 * 8 = 16px
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          alt="thumbnail"
          height="200"
          image={video.thum}
        />
        <CardContent
          sx={{
            padding: 1, // theme.spacing(1)
          }}
        >
          <Typography variant="h6">{video.title}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default VideoItem;
