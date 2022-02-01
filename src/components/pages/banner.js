import React, { useEffect, useState } from "react";
import "../../assets/css/banner.css";
import {
  CCarousel,
  CCarouselItem,
  CImage,
  CCarouselCaption,
} from "@coreui/react";
import authAxios from "../interceptors/interceptor";
import baseURL from "../interceptors/baseurl";
export default function Banner() {
  const [news, setNews] = useState([]);
  useEffect(() => {
    authAxios
      .get("getAllNews")
      .then((res) => {
        setNews(res.data);
      })
      .catch((err) => console.error(err.message));
  }, []);
  return (
    <div className="banner container">
      <div>
        <CCarousel controls indicators dark>
          {news.slice(0, 4).map((itm) => (
            <CCarouselItem key={itm.id}>
              <CImage
                className="d-block"
                src={`${baseURL}${itm.image}`}
                alt="slide 1"
              />
              <CCarouselCaption className="d-none d-md-block">
                <h5>{itm.title}</h5>
                <p>{itm.description}</p>
              </CCarouselCaption>
            </CCarouselItem>
          ))}
        </CCarousel>
      </div>
    </div>
  );
}
