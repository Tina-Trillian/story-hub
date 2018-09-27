import React from "react";
import {Link} from "react-router-dom"

const Footer = () => {
  return (
    <footer className="page-footer font-small blue">
      <div className="footer-copyright text-center">
       <Link
       className="link"
       to="/#about">About</Link> | <Link
       className="link"
       to="/">Home</Link>
      </div>
    </footer>
  );
};

export default Footer;
