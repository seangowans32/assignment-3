// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import { useEffect } from 'react';
// import './Education.css';
// import bannerImg from '../assets/img-8.jpg';
// import Footer from './Footer.jsx';

// export default function Education() {
//   // AOS Animations
//   useEffect(() => {
//     AOS.init();
//   }, []);

//   return(
//     <>
//       <section className="banner img-container">
//         <img src={bannerImg} alt="banner"/>
//         <div className="container">
//           <h1 data-aos="zoom-in" data-aos-duration="1000">Education</h1>
//         </div>
//       </section>

//       <section className="education">
//         <div className="container">
//           <h2 data-aos="zoom-in" data-aos-duration="1000">Education & Professional Qualifications</h2>

//           <div className="timeline flex gap-20">
//             <div className="timeline-item" data-aos="zoom-in" data-aos-duration="1000">
//               <h3>Education: 2025 - Current</h3>

//               <ul>
//                 <li>Advanced Diploma in Software Engineering</li>
//                 <li>Centennial College, Toronto, Canada</li>
//                 <li>Currently in 3rd semester of 6.</li>
//                 <li>Coursework includes: React, Java, C#, Unreal Engine, database systems, and software architecture.</li>
//                 <li>Learning both front-end and back-end development, expanding beyond CMS work into full-stack engineering.</li>
//                 <li>Balancing full-time study with professional web development to strengthen both theoretical and practical skills.</li>
//               </ul>
//             </div>

//             <div className="timeline-item" data-aos="zoom-in" data-aos-duration="1000">
//               <h3>Professional Qualification: 2018 - Current</h3>

//               <ul>
//                 <li>Web Development (Self-Taught & Industry Experience)</li>
//                 <li>Working as a Web Developer at <a href="https://thriveweb.com.au/" target="_blank" rel="noopener">Thrive Digital</a> (Remote - Australia)</li>
//                 <li>Over 50 custom WordPress projects delivered</li>
//                 <li>Specialized in PHP, JavaScript, jQuery, CSS/SCSS, and Git</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </>
//   );
// }





import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import "./Education.css";
import "./Contact.css";
import bannerImg from "../assets/img-8.jpg";
import Footer from "./Footer.jsx";
import { useAuth } from "../auth/AuthContext";

export default function Education() {
  const { user, token } = useAuth();
  const [education, setEducation] = useState([]);
  const [qualification, setQualification] = useState([]);
  const [form, setForm] = useState({ type: "education", title: "" });
  const [message, setMessage] = useState("");

  // Fetch data
  useEffect(() => {
    AOS.init();
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/education");
      const data = await res.json();

      setEducation(data.filter((i) => i.type === "education"));
      setQualification(data.filter((i) => i.type === "qualification"));
    } catch (err) {
      setMessage("⚠️ Error loading education data");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/api/education", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Entry added successfully!");
        setForm({ type: "education", title: "" });
        fetchEducation();
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      setMessage("⚠️ Server error");
    }
  };

  return (
    <>
      <section className="banner img-container">
        <img src={bannerImg} alt="banner" />
        <div className="container">
          <h1 data-aos="zoom-in" data-aos-duration="1000">
            Education
          </h1>
        </div>
      </section>

      {user && user.role === "admin" && (
        <section className="contact form-container">
          <div className="container container-small">
            <h2>Add Education or Qualification</h2>

            <form className="form flex column gap-10" onSubmit={handleSubmit}>
              <div className="form-group flex full-width radio-group">
                <label>Select Section:</label>
                <div className="flex gap-10">
                  <label>
                    <input
                      type="radio"
                      name="type"
                      value="education"
                      checked={form.type === "education"}
                      onChange={handleChange}
                    />{" "}
                    Education
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="type"
                      value="qualification"
                      checked={form.type === "qualification"}
                      onChange={handleChange}
                    />{" "}
                    Qualification
                  </label>
                </div>
              </div>

              <div className="form-group flex full-width">
                <input
                  type="text"
                  name="title"
                  placeholder="Add Description"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <button className="button" type="submit">
                Add Entry
              </button>
            </form>

            {message && <p className="message">{message}</p>}
          </div>
        </section>
      )}

      <section className="education">
        <div className="container">
          <h2 data-aos="zoom-in" data-aos-duration="1000">
            Education & Professional Qualifications
          </h2>

          <div className="timeline flex gap-20">
            <div
              className="timeline-item"
              data-aos="zoom-in"
              data-aos-duration="1000"
            >
              <h3>Education</h3>
              <ul>
                <li>Advanced Diploma in Software Engineering</li>
                <li>Centennial College, Toronto, Canada</li>
                <li>Currently in 3rd semester of 6.</li>
                <li>Coursework includes: React, Java, C#, Unreal Engine, database systems, and software architecture.</li>
                <li>Learning both front-end and back-end development, expanding beyond CMS work into full-stack engineering.</li>
                <li>Balancing full-time study with professional web development to strengthen both theoretical and practical skills.</li>

                {education.length > 0 &&
                  education.map((e) => <li key={e._id}>{e.title}</li>)
                }
              </ul>
            </div>

            <div
              className="timeline-item"
              data-aos="zoom-in"
              data-aos-duration="1000"
            >
              <h3>Professional Qualifications</h3>
              <ul>
                <li>Web Development (Self-Taught & Industry Experience)</li>
                <li>Working as a Web Developer at <a href="https://thriveweb.com.au/" target="_blank" rel="noopener">Thrive Digital</a> (Remote - Australia)</li>
                <li>Over 50 custom WordPress projects delivered</li>
                <li>Specialized in PHP, JavaScript, jQuery, CSS/SCSS, and Git</li>

                {qualification.length > 0 &&
                  qualification.map((q) => <li key={q._id}>{q.title}</li>)
                }
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
