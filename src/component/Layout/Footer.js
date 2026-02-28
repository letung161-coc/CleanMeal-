import './Footer.css';
function Footer() {
    return(
        <footer class="footer">
  <div class="footer-container">
    <div class="footer-col">
      <h3>About us</h3>
      <p>
        We are passionate about serving fresh, delicious fast food made
        with quality ingredients and bold flavors.
      </p>
      <div class="social">
        <span>f</span>
        <span>📷</span>
        <span>✕</span>
        <span>Z</span>
      </div>
    </div>

    <div class="footer-col">
      <h3>Function</h3>
      <ul>
        <li>Danh sách yêu thích</li>
        <li>Tìm kiếm</li>
        <li>Lịch ăn</li>
        <li>Tôi là ai?</li>
      </ul>
    </div>

    <div class="footer-col">
      <h3>Liên hệ với chúng tôi</h3>
      <ul class="contact">
        <li>📍 Duy Tân University</li>
        <li>📞 0123456789</li>
        <li>✉️ toilai123@gmail.com</li>
      </ul>
    </div>
  </div>
</footer>
    );
}
export default Footer;