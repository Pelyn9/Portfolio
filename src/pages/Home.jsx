import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import profileImage from "../image/peejayasdad.png";

export default function Home() {
  const [, setClickCount] = useState(0); // only setter needed
  const navigate = useNavigate();

  const handleNameClick = () => {
    setClickCount((prev) => {
      const newCount = prev + 1;

      if (newCount === 9) {
        navigate("/admin");
      }

      return newCount;
    });
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>
            Hi, I’m{" "}
            <span
              className="name-highlight"
              onClick={handleNameClick}
              title="Click 9 times to access admin"
              style={{ cursor: "pointer" }}
            >
              Peejay Marco A. Apale
            </span>
          </h1>

          <p>BSIT Student · Web Developer · UI/UX Designer</p>
        </div>

        <div className="hero-image">
          <img
            src={profileImage}
            alt="Peejay Apale"
            className="profile-image"
          />
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about">
        <h2>About Me</h2>
        <p>
          I am a fourth-year student pursuing a Bachelor of Science in
          Information Technology, passionate about technology, design,
          and innovation. I have experience in web development, UI/UX
          design, programming, and digital media projects. I enjoy
          creating user-friendly solutions, exploring creative designs, and
          applying problem-solving skills to build functional and visually
          appealing applications. I am eager to answer my curiosity, gain
          more knowledge and skills, and contribute to meaningful
          projects while continuously expanding my technical expertise.
        </p>
      </section>

      {/* SKILLS SECTION */}
      <section className="skills">
        <h2>Skills</h2>
        <div className="skills-grid">
          <div className="skill-item visual-design">Visual Design</div>
          <div className="skill-item digital-art">Digital Art</div>
          <div className="skill-item web-design">Web Design</div>
          <div className="skill-item graphic-design">Graphic Design</div>
          <div className="skill-item programming">Programming</div>
          <div className="skill-item video-editing">Video Editing</div>
          <div className="skill-item ui-ux-design">UI/UX Design</div>
          <div className="skill-item web-development">Web Development</div>
          <div className="skill-item product-design">Product Design</div>
        </div>
      </section>

      {/* SOFT SKILLS SECTION */}
      <section className="soft-skills">
        <h2>Soft Skills</h2>
        <ul className="soft-skills-list">
          <li>Willing to Learn & Adaptable</li>
          <li>Good Communication Skills</li>
          <li>Time Management</li>
          <li>Problem-Solving</li>
        </ul>
      </section>

      {/* PROJECTS SECTION */}
      <section className="projects">
        <h2>Projects</h2>
        <div className="project-grid">
          <div className="project-card">
            <h3>AquaCheck</h3>
            <p>Web-based dashboard for real-time IoT sensor monitoring. Used Supabase for data storage and live data tracking.</p>
            <a href="https://aquachecklive.vercel.app" target="_blank" rel="noopener noreferrer">
              View Project →
            </a>
          </div>

          <div className="project-card">
            <h3>Mental Health Matters</h3>
            <p>Mental health awareness website with chatbot integration. Built using HTML, CSS, and JavaScript.</p>
            <a href="#" className="btn-disabled">Coming Soon</a>
          </div>

          <div className="project-card">
            <h3>Ukay-Ukay Web App</h3>
            <p>Responsive thrift store web app focused on UI/UX design.</p>
            <a href="https://ukay-ukay.vercel.app" target="_blank" rel="noopener noreferrer">
              View Project →
            </a>
          </div>

          <div className="project-card">
            <h3>WellnessMate</h3>
            <p>Wellness tracking app built with React Native and Expo.</p>
            <a href="https://snack.expo.dev/@pelyn7921/wellnessmate" target="_blank" rel="noopener noreferrer">
              View Live →
            </a>
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section className="experience">
        <h2>Experience & Education</h2>
        <div className="timeline">
          <div className="timeline-item">
            <h3>Holy Cross of Davao College</h3>
            <p className="timeline-date">2022 - Present</p>
            <p>Bachelor of Science in Information Technology (Tertiary)</p>
          </div>
          <div className="timeline-item">
            <h3>Philippine Women's College of Davao</h3>
            <p className="timeline-date">2020 - 2022</p>
            <p>Upper Secondary (TVL/ANIMATION)</p>
          </div>
          <div className="timeline-item">
            <h3>Talomo National High School</h3>
            <p className="timeline-date">2017 - 2020</p>
            <p>Secondary Education</p>
          </div>
          <div className="timeline-item">
            <h3>Talomo Central Elementary School</h3>
            <p className="timeline-date">2010 - 2013</p>
            <p>Elementary Education</p>
          </div>
          <div className="timeline-item">
            <h3>Web Developer Intern</h3>
            <p className="timeline-date">2023 - 2024</p>
            <p>Developed responsive web applications using React and Supabase.</p>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="contact">
        <h2>Contact Me</h2>
        <p>Let's connect! Feel free to reach out for collaborations or opportunities.</p>
        <div className="contact-info">
          <p><strong>Email:</strong> peejaymarco@gmail.com</p>
          <p><strong>Phone:</strong> 09298037282</p>
          <p><strong>Address:</strong> Blk14 lot6 Phase3 Makar Rosalina 3 village, Baliok, Davao City, Davao Del Sur, Mindanao, 8000</p>
        </div>
        <div className="social-links">
          <a href="https://www.linkedin.com/in/peejay-marco-apale-a35522321/" target="_blank">LinkedIn</a>
          <a href="https://github.com/Pelyn9" target="_blank">GitHub</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Peejay Apale</p>
      </footer>
    </div>
  );
}
