import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import './Contact.css';
import bannerImg from '../assets/img-11.jpg';
import Footer from './Footer.jsx';
import API_BASE_URL from "../config.js";

export default function SignIn() {
  // AOS Animations
  useEffect(() => {
    AOS.init();
  }, []);

  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        login(data.user, data.token);

        setMessage(`Welcome back, ${data.user.name}!`);
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
        <div className="container">
          <h1 data-aos="zoom-in" data-aos-duration="1000">Sign In</h1>
        </div>
      </section>

      <section className="contact form-container">
        <div className="container container-small flex gap-40">

          <p className="message">{message}</p>

          <form className="form flex gap-20" onSubmit={handleSubmit}>
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

            <button className="button" type="submit">Sign In</button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}