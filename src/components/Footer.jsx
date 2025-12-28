// src/components/Footer.jsx
"use client"
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="w-full border-t border-[#4ADE8044]"
      style={{
        background: "linear-gradient(135deg, #0A0A0A, #111111 50%, #4ADE8022)",
      }}
    >
      <div className="max-w-screen-xl mx-auto px-6 py-14">
        <div className="grid gap-10 grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
          {/* SOCIAL */}
          <div>
            <h3 className="font-bold mb-3 text-[#4ADE80]">Follow Us</h3>
            <p className="text-sm mb-4 text-[#cccccc]">
              Stay connected with Nextgen EV for updates<br/> on electric mobility innovations.
            </p>

            <div className="flex gap-4">
              {[FaFacebookF, FaInstagram, FaTwitter, FaYoutube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 rounded-md border border-[#4ADE8044] hover:bg-[#4ADE8022] transition"
                >
                  <Icon className="text-xl text-[#4ADE80]" />
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="font-bold mb-3 text-[#4ADE80]">Quick Links</h3>
            <ul className="footer-m space-y-2 text-sm">
              {[
                ["Home", "/"],
                ["About Us", "/about"],
                ["EV Products", "/products"],
                ["Dealership", "/dealership"],
                ["Services & Support", "/services"],
                ["Contact Us", "/contact"],
              ].map(([label, link]) => (
                <li key={label}>
                  <a href={link} className="hover:text-[#4ADE80] transition">
                    {label}
                  </a>
                </li>                       
              ))}
            </ul>
          </div>

          {/* ABOUT */}
          <div>
            <h3 className="font-bold mb-3 text-[#4ADE80]">About Nextgen EV</h3>
            <p className="text-sm mb-2 text-[#cccccc] leading-relaxed">
              Nextgen EV is committed to delivering <br/>high-performance and sustainable<br/>
              electric vehicles designed for modern India.
            </p>
            <p className="text-xs text-[#4ADE80AA]">
              Electrifying the future of transportation.
            </p>
          </div>

          {/* LOCATIONS */}
          <div>
            <h3 className="font-bold mb-3 text-[#4ADE80]">Our Locations</h3>
           <div>
              <p className="foot-m text-xs font-semibold text-[#4ADE80] mb-1">South India Distribution</p>
              <address className="not-italic text-xs text-[#cccccc] leading-relaxed">
                Near Saptha Kanikalamma Temple, <br/>Tirupati Main Road,
                <br />
                Doddipalle, Chittoor - 517001
                <br />
                Andhra Pradesh, India
              </address>
            </div>
            <div className="mb-4">
              <p className="foot-m text-xs font-semibold text-[#4ADE80] mb-1">Manufacturing Unit</p>
              <address className="not-italic text-xs text-[#cccccc] leading-relaxed">
                Plot No. 2, Mohan Nagar, Opp Kurukshetra<br/> Model School
                
                Near Mahindra Tractor Agency,<br/> Kurukshetra - 136118
                <br />
                Haryana, India
              </address>
            </div>

           
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#4ADE8044] text-center">
          <p className="text-xs text-[#86EFAC]">© {year} Nextgen EV. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
