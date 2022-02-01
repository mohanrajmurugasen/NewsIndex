import { CCol, CContainer, CImage, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../assets/css/taiping.css";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import authAxios from "../interceptors/interceptor";
import { Divider } from "@material-ui/core";
import baseURL from "../interceptors/baseurl";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function Taiping() {
  const { name } = useParams();
  const [news, setNews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    authAxios
      .get(`getAllNews`)
      .then((res) => {
        setNews(res.data);
      })
      .catch((err) => console.error(err.message));
  }, []);

  return (
    <div className="taiping">
      <CContainer>
        <div>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography color="textPrimary">Home</Typography>
            <Link color="inherit" href="/" onClick={handleClick}>
              {name}
            </Link>
          </Breadcrumbs>
        </div>
        <br />
        <Divider />
        <br />
        <div style={{ cursor: "pointer" }}>
          {news
            .filter((itm) => itm.category === name)
            .map((res) => (
              <div
                key={res.id}
                onClick={() => navigate(`/content/${res.category}/${res.id}`)}
              >
                <CRow>
                  <CCol sm="auto">
                    <CImage
                      rounded
                      className="d-block"
                      src={`${baseURL}${res.image}`}
                      alt="slide 1"
                      thumbnail
                    />
                  </CCol>
                  <CCol>
                    <p className="title">{res.title}</p>
                  </CCol>
                  <br />
                  <Divider className="divide" />
                </CRow>
              </div>
            ))}
        </div>
      </CContainer>
    </div>
  );
}
