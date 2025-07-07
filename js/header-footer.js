document.addEventListener('DOMContentLoaded', ()=>{
    const header  = document.querySelector('header');
    header.innerHTML =`
            <div class="header-container">
            <!-- Hidden icon for small screens -->
            <div class="info-icon">
                <i class="fas fa-info-circle"></i>
                <div class="hover-info">
                    <p>VOL. CL</p>
                    <p>No. 4</p>
                </div>
            </div>
            <div class="header-top-content">
                <p class="vol">VOL. CL</p>
                <h1 class="header-title">The B Times</h1>
                <p class="no">No. 4</p>

            </div>

            <nav>
                <ul id="nav-list">
                    <li><a href="index.html">News</a></li>
                    <li><a href="events.html">Events</a></li>
                    <li><a href="politics.html">Politics</a></li>
                    <li><a href="articles.html">Articles</a></li>
                    <li><a href="ads.html">Ads</a></li>
                    <li><a href="sports.html">Sport</a></li>
                    <li><a href="technology.html">Technology</a></li>
                    <li><a href="lifestyle.html">Lifestyle</a></li>
                    <li><a href="games.html">Games</a></li>
                    <li><a href="sale-and-rent.html">Sale and Rent</a></li>
                    <li><a href="health-and-science.html">Health and Science</a></li>
                    <li><a href="education-and-culture.html">Education and Culture</a></li>
                </ul>
            </nav>
            <div class="hamburger" id="hamburger">
                <i class="fas fa-bars"></i>
            </div>
        </div>
        <div class="date-and-subscription">
            <p class="to-day"></p>
            <a href="index.html#subscription">
            <button class="subcsription-button">subscription to more content</button>
            </a>
        </div>
    `;

// Hamburger menu
const hamburger = document.getElementById("hamburger");
const navList = document.getElementById("nav-list");

hamburger.addEventListener("click", () => {
  navList.classList.toggle("show");
});

// date
const date = new Date();
const options = {
  weekday: "long",
  month: "short",
  day: "numeric",
  year: "numeric",
};
document.querySelector(".to-day").textContent = date.toLocaleDateString(
  "en-US",
  options
);



const footer = document.querySelector('footer');
footer.innerHTML = `
        <div class="footer-container">
            <div class="footer-logo">
                <img src="images/logo.png" alt="The Batroun Times Logo" height="40">
                <span class="title">The B Times</span>
            </div>
            <div class="footer-links">
                <a href="#">About Us</a>
                <a href="#">Contact</a>
                <a href="#">Advertise</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
            </div>
            <div class="footer-social">
                <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                <a href="#" aria-label="Twitter"><i class="fab fa-x-twitter"></i></a>
                <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            </div>
        </div>
        <div class="footer-copyright">
            &copy; 2024 The B Times. All rights reserved.
        </div>
`;















});