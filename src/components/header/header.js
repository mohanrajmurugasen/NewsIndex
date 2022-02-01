import React, { useEffect, useState } from "react";
import {
  CNavbar,
  CContainer,
  CCollapse,
  CNavItem,
  CNavLink,
  CForm,
  CFormInput,
  CButton,
  CNavbarBrand,
  CNavbarNav,
  CNavbarToggler,
  CImage,
} from "@coreui/react";
import authAxios from "../interceptors/interceptor";
import Logo from "../../assets/img/logo.jpg";
import "../../assets/css/header.css";

export default function Header() {
  const [visible, setVisible] = useState(false);
  const [category, setcategory] = useState([]);
  const fetch = async () => {
    await authAxios
      .get("allCategory")
      .then((res) => {
        setcategory(res.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };
  useEffect(() => {
    fetch();
  }, []);
  return (
    <div className="header">
      <div className="top">
        <CNavbar
          expand="lg"
          colorScheme="light"
          className="bg-light"
          placement="fixed-top"
        >
          <CContainer fluid>
            <CNavbarToggler
              aria-label="Toggle navigation"
              aria-expanded={visible}
              onClick={() => setVisible(!visible)}
            />
            <CNavbarBrand href="#">
              <CImage rounded src={Logo} width={50} height={50} />
              &nbsp; TaipingNews
            </CNavbarBrand>
            <CCollapse className="navbar-collapse" visible={visible}>
              <CNavbarNav className="me-auto mb-2 mb-lg-0 listLinks">
                <CNavItem>
                  <CNavLink
                    href="/"
                    active
                    style={{ textTransform: "capitalize" }}
                  >
                    Popular
                  </CNavLink>
                </CNavItem>
                {category.map((itm) => (
                  <CNavItem>
                    <CNavLink
                      href={`/taiping/${itm.name}`}
                      active
                      style={{ textTransform: "capitalize" }}
                    >
                      {itm.name}
                    </CNavLink>
                  </CNavItem>
                ))}
              </CNavbarNav>
              <CForm className="d-flex">
                <CFormInput
                  type="search"
                  className="me-2"
                  placeholder="Search"
                />
                <CButton type="submit" color="success" variant="outline">
                  Search
                </CButton>
              </CForm>
            </CCollapse>
          </CContainer>
        </CNavbar>
      </div>
    </div>
  );
}
