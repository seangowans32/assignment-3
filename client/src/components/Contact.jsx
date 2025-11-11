// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import { useEffect } from 'react';
// import './Contact.css';
// import bannerImg from '../assets/img-11.jpg';
// import Footer from './Footer.jsx';

// export default function Contact() {
//   // AOS Animations
//   useEffect(() => {
//     AOS.init();
//   }, []);

//   return(
//     <>
//       <section className="banner img-container">
//         <img src={bannerImg} alt="banner"/>
//         <div className="container">
//           <h1 data-aos="zoom-in" data-aos-duration="1000">Contact</h1>
//         </div>
//       </section>

//       <section className="contact">
//         <div className="container flex gap-40">
//           <div className="contact-details flex gap-20">
//             <div className="contact-detail" data-aos="fade-up" data-aos-duration="1000">
//               <h4>Phone:</h4>
//               <a href="tel:+4915222127060">+49 1522 2127060</a>
//             </div>

//             <div className="contact-detail" data-aos="fade-up" data-aos-duration="1000">
//               <h4>Email:</h4>
//               <a href="mailto:seangowans32@gmail.com">seangowans32@gmail.com</a>
//             </div>
//           </div>

//           <form className="form flex gap-20" action="mailto:seangowans32@gmail.com?subject=Contact Form Submission" method="post" encType="text/plain" data-aos="fade-up" data-aos-duration="1000">
//             <div className="form-group flex">
//               <label htmlFor="first-name">First Name</label>
//               <input type="text" id="first-name" name="first-name" required />
//             </div>

//             <div className="form-group flex">
//               <label htmlFor="last-name">Last Name</label>
//               <input type="text" id="last-name" name="last-name" required />
//             </div>

//             <div className="form-group flex">
//               <label htmlFor="phone">Phone</label>
//               <input type="tel" id="phone" pattern="[0-9]*" inputMode="numeric" name="phone" required />
//             </div>

//             <div className="form-group flex">
//               <label htmlFor="email">Email</label>
//               <input type="email" id="email" name="email" required />
//             </div>

//             <div className="form-group flex full-width">
//               <label htmlFor="message">Message</label>
//               <textarea id="message" name="message" required></textarea>
//             </div>

//             <button className="button" type="submit">Send Message</button>
//           </form>
//         </div>
//       </section>

//       <Footer />
//     </>
//   );
// }







import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import './Contact.css';
import bannerImg from '../assets/img-11.jpg';
import Footer from './Footer.jsx';

export default function Contact() {
  // AOS Animations
  useEffect(() => {
    AOS.init();
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("http://localhost:4000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          message: `Phone: ${formData.phone}\n\n${formData.message}`,
        }),
      });

      if (res.ok) {
        setStatus("✅ Message sent successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          message: "",
        });
      } else {
        const data = await res.json();
        setStatus(`❌ ${data.message}`);
      }
    } catch (err) {
      setStatus("⚠️ Server error");
    }
  };

  return (
    <>
      <section className="banner img-container">
        <img src={bannerImg} alt="banner"/>
        <div className="container">
          <h1 data-aos="zoom-in" data-aos-duration="1000">Contact</h1>
        </div>
      </section>

      <section className="contact">
        <div className="container flex gap-40">
          <div className="contact-details flex gap-20">
            <div className="contact-detail" data-aos="fade-up" data-aos-duration="1000">
              <h4>Phone:</h4>
              <a href="tel:+4915222127060">+49 1522 2127060</a>
            </div>

            <div className="contact-detail" data-aos="fade-up" data-aos-duration="1000">
              <h4>Email:</h4>
              <a href="mailto:seangowans32@gmail.com">seangowans32@gmail.com</a>
            </div>
          </div>

          <form
            className="form flex gap-20"
            onSubmit={handleSubmit}
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <div className="form-group flex">
              <label htmlFor="first-name">First Name</label>
              <input
                type="text"
                id="first-name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group flex">
              <label htmlFor="last-name">Last Name</label>
              <input
                type="text"
                id="last-name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group flex">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                pattern="[0-9]*"
                inputMode="numeric"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group flex">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group flex full-width">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button className="button" type="submit">Send Message</button>

            {status && <p className="message">{status}</p>}
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}
