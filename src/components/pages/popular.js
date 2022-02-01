import React, { useEffect, useState } from "react";
import authAxios from "../interceptors/interceptor";
import "../../assets/css/popular.css";
import Banner from "./banner";
import {
  CCarousel,
  CCarouselItem,
  CImage,
  CCarouselCaption,
  CRow,
  CCol,
} from "@coreui/react";
import baseURL from "../interceptors/baseurl";
import { useNavigate } from "react-router-dom";
import { Divider } from "@material-ui/core";

export default function Popular() {
  const [news, setNews] = useState([]);
  const [category, setcategory] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    authAxios.get("getAllNews").then((res) => {
      setNews(res.data);
    });
  }, []);

  useEffect(() => {
    authAxios.get("allCategory").then((res) => {
      setcategory(res.data);
    });
  }, []);

  return (
    <div className="popular">
      <div>
        <Banner />
      </div>
      <div className="container">
        {category.map((itm) => (
          <div key={itm.id}>
            <h4>{itm.name}</h4>
            {news
              .filter((name) => name.category === itm.name && name.publish)
              .slice(0, 1)
              .map((itms) => (
                <div key={itms.id}>
                  <div className="heads container">
                    <div>
                      <CCarousel controls indicators dark>
                        <CCarouselItem>
                          <CImage
                            className="d-block"
                            src={`${baseURL}${itms.image}`}
                            alt="slide 1"
                          />
                          <CCarouselCaption className="d-none d-md-block">
                            <h5>{itms.title}</h5>
                            <p>{itms.description}</p>
                          </CCarouselCaption>
                        </CCarouselItem>
                      </CCarousel>
                    </div>
                  </div>
                </div>
              ))}
            <div className="container">
              {news
                .filter((resol) => resol.category === itm.name && resol.publish)
                .slice(0, 4)
                .map((res) => (
                  <div
                    key={res.id}
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      navigate(`content/${res.category}/${res.id}`)
                    }
                    className="container subton"
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
          </div>
        ))}
      </div>
    </div>
  );
}
