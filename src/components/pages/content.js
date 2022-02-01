import { CContainer, CImage } from "@coreui/react";
import { Breadcrumbs, Divider, Link, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../assets/css/content.css";
import baseURL from "../interceptors/baseurl";
import authAxios from "../interceptors/interceptor";
import YoutubePlayer from "react-youtube";
var getYouTubeID = require("get-youtube-id");

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function Content() {
  const { category, id } = useParams();
  const [contect, setcontect] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      authAxios
        .get(`getAllNewsById/${id}`)
        .then((res) => {
          setcontect(res.data);
        })
        .catch((err) => console.error(err.message));
    };
    fetch();
  }, [id]);

  console.log(contect);
  return (
    <div className="content">
      <CContainer>
        <div>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography color="textPrimary">Home</Typography>
            <Link color="inherit" href="/" onClick={handleClick}>
              {category}
            </Link>
          </Breadcrumbs>
        </div>
        <br />
        <Divider />
        <br />
        <div className="news">
          <h1>{contect.title}</h1>
          <h3>{contect.description}</h3>
          <Divider className="divids" />
          <br />
          <div className="container">
            <CImage
              rounded
              className="d-block"
              src={`${baseURL}${contect.image}`}
              alt="slide 1"
              thumbnail
            />
            <div className="caption">In 2022, {contect.title}</div>
            <Divider className="divid" />
          </div>
          <div>
            <h4>{contect.summary}</h4>
          </div>
          {contect.video ? (
            <div className="youtube">
              <YoutubePlayer
                height={"100%"}
                width={"100%"}
                play={false}
                videoId={getYouTubeID(contect.video)}
              />
            </div>
          ) : null}
        </div>
      </CContainer>
    </div>
  );
}
