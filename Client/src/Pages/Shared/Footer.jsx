import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import footerImage from "../../assets/footer.jpg";

const Footer = () => {
    return (
        <footer className="bg-cover text-[2vw] lg:text-[1vw] bg-bottom relative py-12 md:py-16 lg:py-20" style={{ backgroundImage: `url(${footerImage})` }}>
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <div className="mx-auto px-[3vw] lg:px-[6vw] relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-[6vw]">
                    {/* Website Name */}
                    <div className="flex flex-col items-center lg:items-start justify-center">
                        <h3 className="text-white text-[4.8vw] lg:text-[3vw] font-bold mb-4">Adventure Avenue</h3>
                        <p className="text-gray-300 text-[3.8vw] lg:text-[2vw]">Explore the world with us!</p>
                    </div>
                    {/* Contact Information */}
                    <div className="flex flex-col items-center justify-center">
                        <h4 className="text-white text-[4.2vw] lg:text-[2.2vw] font-semibold mb-4">Contact Us</h4>
                        <p className="text-gray-300 text-[3.8vw] lg:text-[2vw]">Email:info@adventureavenue.com</p>
                        <p className="text-gray-300 text-[3.8vw] lg:text-[2vw]">Phone: +1234567890</p>
                    </div>
                    {/* Social Media Links */}
                    <div className="flex justify-center items-center gap-4 md:gap-6">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-[5vw] md:text-[3.5vw] lg:text-[2.2vw] p-3 rounded-full text-blue-500 hover:bg-gray-700 hover:text-white transition-transform transform hover:scale-110">
                            <FaFacebookF />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[5vw] md:text-[3.5vw] lg:text-[2.2vw] p-3 rounded-full text-blue-400 hover:bg-gray-700 hover:text-white transition-transform transform hover:scale-110">
                            <FaTwitter />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-[5vw] md:text-[3.5vw] lg:text-[2.2vw] p-3 rounded-full text-pink-500 hover:bg-gray-700 hover:text-white transition-transform transform hover:scale-110">
                            <FaInstagram />
                        </a>
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[5vw] md:text-[3.5vw] lg:text-[2.2vw] p-3 rounded-full text-blue-700 hover:bg-gray-700 hover:text-white transition-transform transform hover:scale-110">
                            <FaLinkedinIn />
                        </a>
                    </div>
                </div>
                {/* Copyright */}
                <div className="mt-8 text-center">
                    <p className="text-gray-300 text-[3.8vw] lg:text-[2vw]">© 2024 Adventure Avenue. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
