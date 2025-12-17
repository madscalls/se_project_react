import "./footer.css";

function Footer() {
  return (
    <footer className="Footer">
      <p className="footer__name">Developed by Madison Callahan</p>
      <p className="footer__year">{new Date().getFullYear()}</p>
    </footer>
  );
}
export default Footer;
