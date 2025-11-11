import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import './Contact.css';
import bannerImg from '../assets/img-11.jpg';
import Footer from './Footer.jsx';

export default function SignUp() {
  // AOS Animations
  useEffect(() => {
    AOS.init();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if(res.ok) {
        setMessage("Bewm, Signup successful! You can now sign in.");
        setFormData({ name: "", email: "", password: "" });
      } else {
        setMessage(`${data.message}`);
      }
    } catch (err) {
      setMessage("Server error :(");
    }
  };

  return (
    <>
      <section className="banner img-container">
        <img src={bannerImg} alt="banner"/>
        <div className="container container-small">
          <h1 data-aos="zoom-in" data-aos-duration="1000">Sign Up</h1>
        </div>
      </section>

      <section className="contact form-container">
        <div className="container container-small flex gap-40">

          <p className="message">{message}</p>

          <form className="form flex gap-20" onSubmit={handleSubmit} data-aos="fade-up" data-aos-duration="1000">
            <div className="form-group flex full-width">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group flex full-width">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group flex full-width">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button className="button" type="submit">Sign Up</button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}