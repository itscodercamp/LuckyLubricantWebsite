import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import {
    Droplets,
    QrCode,
    Gift,
    MapPin,
    Phone,
    Mail,
    Globe,
    Award,
    ChevronRight,
    Menu,
    X,
    ShieldCheck,
    Download,
    Zap,
    CreditCard
} from 'lucide-react';
import './App.css';

const BASE_URL = 'https://apis.luckylunricants.in/api';
const REWARD_APP_URL = 'https://reward.luckylunricants.in/';

const IndiaMap = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), { stiffness: 100, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), { stiffness: 100, damping: 30 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            className="india-map-container"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: 1000,
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d'
            }}
        >
            <svg viewBox="0 0 450 550" className="india-svg">
                <defs>
                    <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--primary-purple)" />
                        <stop offset="100%" stopColor="var(--accent-purple)" />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                <path
                    d="M174,10 L168,25 L158,27 L152,39 L144,41 L136,49 L126,47 L118,59 L106,63 L106,75 L92,87 L90,101 L74,111 L72,125 L82,135 L100,141 L106,155 L118,159 L126,177 L152,183 L158,221 L176,237 L174,257 L184,273 L204,275 L218,267 L234,259 L248,267 L268,271 L264,299 L256,311 L216,359 L206,401 L180,447 L182,509 L198,523 L212,531 L226,523 L238,509 L240,479 L264,467 L274,397 L296,377 L304,329 L338,309 L358,295 L372,285 L378,265 L374,245 L366,225 L352,205 L334,191 L318,191 L306,201 L288,205 L272,199 L262,185 L262,165 L272,121 L278,101 L310,99 L332,117 L348,121 L364,113 L372,93 L364,73 L344,57 L322,51 L296,51 L280,57 L264,65 L244,51 L218,51 L208,25 L196,27 L204,9 L194,-1 L174,-1 L174,10 Z"
                    fill="rgba(126, 87, 194, 0.2)"
                    transform="translate(8, 8)"
                />
                <motion.path
                    d="M174,10 L168,25 L158,27 L152,39 L144,41 L136,49 L126,47 L118,59 L106,63 L106,75 L92,87 L90,101 L74,111 L72,125 L82,135 L100,141 L106,155 L118,159 L126,177 L152,183 L158,221 L176,237 L174,257 L184,273 L204,275 L218,267 L234,259 L248,267 L268,271 L264,299 L256,311 L216,359 L206,401 L180,447 L182,509 L198,523 L212,531 L226,523 L238,509 L240,479 L264,467 L274,397 L296,377 L304,329 L338,309 L358,295 L372,285 L378,265 L374,245 L366,225 L352,205 L334,191 L318,191 L306,201 L288,205 L272,199 L262,185 L262,165 L272,121 L278,101 L310,99 L332,117 L348,121 L364,113 L372,93 L364,73 L344,57 L322,51 L296,51 L280,57 L264,65 L244,51 L218,51 L208,25 L196,27 L204,9 L194,-1 L174,-1 L174,10 Z"
                    fill="url(#mapGradient)"
                    filter="url(#glow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />
                <circle cx="210" cy="270" r="5" fill="var(--accent-gold)">
                    <animate attributeName="r" from="3" to="8" dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="1" to="0" dur="1.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="210" cy="270" r="3" fill="var(--accent-gold)" />
            </svg>
        </motion.div>
    );
};

const App = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [formStatus, setFormStatus] = useState({ type: '', message: '' });

    const oilImages = [
        '/products/oil2.jpg',
        '/products/oil3.jpg',
        '/products/oil4.jpg',
        '/products/oil5.jpg'
    ];

    useEffect(() => {
        fetchProducts();
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % oilImages.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${BASE_URL}/products/list`);
            const data = await response.json();
            setProducts(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([]);
        } finally {
            setLoadingProducts(false);
        }
    };

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const phone = formData.get('phone');
        const email = formData.get('email');
        const userMessage = formData.get('message');

        // Payload as per documentation: { "user_id": 1, "subject": "...", "message": "..." }
        const payload = {
            user_id: 1,
            subject: formData.get('subject'),
            message: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nMessage: ${userMessage}`
        };

        try {
            setFormStatus({ type: 'loading', message: 'Sending message...' });
            const response = await fetch(`${BASE_URL}/content/support/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json().catch(() => ({}));

            if (response.ok) {
                setFormStatus({ type: 'success', message: 'Message sent successfully! We will contact you soon.' });
                e.target.reset();
                setTimeout(() => setFormStatus({ type: '', message: '' }), 6000);
            } else {
                throw new Error(result.message || 'Failed to send message');
            }
        } catch (error) {
            setFormStatus({ type: 'error', message: error.message || 'Failed to send message. Please try again.' });
            setTimeout(() => setFormStatus({ type: '', message: '' }), 6000);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="app">
            <Helmet>
                <title>Lucky Lubricant | Best Industrial & Automotive Lubricants in India</title>
                <meta name="description" content="Lucky Lubricants - Leading manufacturer of high-performance engine oils, industrial lubricants, and grease. Powering India's engines from Nagpur since 2020." />
                <meta name="keywords" content="Lucky Lubricants, industrial lubricants, automotive oil, engine oil Nagpur, best lubricant manufacturer India, constant 4t gold, turbo power diesel oil" />
                <meta property="og:title" content="Lucky Lubricant | Premium Industrial Lubricants" />
                <meta property="og:description" content="Powering India's Engines with high-quality lubricants. Scan QR codes for rewards!" />
                <meta property="og:image" content="/favicon.png" />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <link rel="canonical" href="https://luckylubricant.com" />
            </Helmet>
            {/* Navbar */}
            <nav className={`nav ${isScrolled ? 'scrolled' : ''}`}>
                <div className="container nav-content">
                    <motion.div
                        className="logo"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <Droplets className="text-purple-500" />
                        LUCKY<span>LUBRICANTS</span>
                    </motion.div>

                    <div className="nav-links">
                        {['Home', 'Products', 'Rewards', 'About', 'Contact'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>
                        ))}
                    </div>

                    <button className="menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="mobile-overlay"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        {['Home', 'Products', 'Rewards', 'About', 'Contact'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)}>{item}</a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero Section */}
            <section id="home" className="hero">
                <div className="container hero-grid">
                    <div className="hero-content">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="gradient-text">Powering India's Engines Since 2020</h1>
                            <p>Premium Manufacturer & Supplier of high-performance lubricants. Delivering quality across India from the heart of Nagpur.</p>
                            <div className="hero-btns">
                                <a href="#products" className="btn-primary">Explore Products</a>
                                <a href={REWARD_APP_URL} target="_blank" rel="noopener noreferrer" className="btn-reward-pulse">
                                    <Download size={20} /> Get Reward App
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        className="hero-image-container"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        <div className="hero-3d-card glass-card">
                            <div className="floating-badge green">
                                <ShieldCheck size={20} /> Professional Grade
                            </div>
                            <div className="floating-badge gold">
                                <Award size={20} /> Top Rated Rewards
                            </div>

                            <div className="card-image-wrapper">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={currentImage}
                                        src={oilImages[currentImage]}
                                        alt="Lucky Lubricant Product"
                                        className="hero-rotating-image"
                                        initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
                                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                                        exit={{ opacity: 0, scale: 1.1, rotateY: -20 }}
                                        transition={{ duration: 0.8 }}
                                    />
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </div>
                <div className="hero-bg"></div>
            </section>

            {/* Rewards Section - The Star Feature */}
            <section id="rewards" className="rewards-section">
                <div className="container">
                    <div className="section-title">
                        <motion.h2 {...fadeIn}>Experience the <span className="gradient-text">Lucky Rewards</span> Hub</motion.h2>
                        <p>Scan, Earn, and Redeem. It's that simple.</p>
                    </div>

                    <div className="rewards-grid">
                        <motion.div
                            className="rewards-steps"
                            variants={staggerContainer}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                        >
                            {[
                                { icon: <QrCode />, title: 'Scan QR Code', desc: 'Find the unique QR on any Lucky Lubricant product.' },
                                { icon: <Zap />, title: 'Earn Points', desc: 'Each product adds instant points to your vault.' },
                                { icon: <CreditCard />, title: 'Cash Rewards', desc: 'Redeem points for instant cash or bank transfers.' },
                                { icon: <Gift />, title: 'Exclusive Goodies', desc: 'Get tools, electronics, and premium merchandise.' }
                            ].map((step, index) => (
                                <motion.div key={index} className="reward-step glass-card" variants={fadeIn}>
                                    <div className="step-icon">{step.icon}</div>
                                    <div>
                                        <h4>{step.title}</h4>
                                        <p>{step.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div
                            className="rewards-visual"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <a href={REWARD_APP_URL} target="_blank" rel="noopener noreferrer" className="app-screenshot-link">
                                <div className="app-screenshot-container">
                                    <img src="/app-screenshot.png" alt="Lucky Lubricant App" />
                                    <div className="screenshot-overlay">
                                        <Download size={48} />
                                        <span>Download Now</span>
                                    </div>
                                </div>
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Products Catalog */}
            <section id="products">
                <div className="container">
                    <div className="section-title">
                        <h2>Our <span className="gradient-text">Product Lineup</span></h2>
                        <p>Every drop engineered for maximum efficiency.</p>
                    </div>

                    <motion.div
                        className="product-grid"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        {loadingProducts ? (
                            <div className="loading-spinner">Fetching Products...</div>
                        ) : (
                            products.map((prod, index) => (
                                <motion.div key={prod.id} className="product-card glass-card" variants={fadeIn}>
                                    <div className="product-image">
                                        {prod.image_url ? (
                                            <img src={prod.image_url} alt={prod.name} className="api-product-img" />
                                        ) : (
                                            <Droplets size={48} color={index % 2 === 0 ? '#7e57c2' : '#00c853'} />
                                        )}
                                    </div>
                                    <h3>{prod.name}</h3>
                                    <p>{prod.category}</p>
                                    <div className="prod-spec">₹{prod.price}</div>
                                    <a href="#contact" className="btn-outline" style={{ marginTop: '1rem', display: 'inline-block' }}>Inquiry</a>
                                </motion.div>
                            ))
                        )}

                        {/* Fallback items if API returns empty */}
                        {!loadingProducts && products.length === 0 && (
                            [
                                { name: 'Constant 4T Gold', type: 'Engine Oil', spec: '20W40 API SL' },
                                { name: 'Turbo Power', type: 'Diesel Engine Oil', spec: '15W40 CI4+' }
                            ].map((prod, index) => (
                                <motion.div key={index} className="product-card glass-card" variants={fadeIn}>
                                    <div className="product-image">
                                        <Droplets size={48} color={index % 2 === 0 ? '#7e57c2' : '#00c853'} />
                                    </div>
                                    <h3>{prod.name}</h3>
                                    <p>{prod.type}</p>
                                    <div className="prod-spec">{prod.spec}</div>
                                    <button className="btn-outline" style={{ marginTop: '1rem' }}>Details</button>
                                </motion.div>
                            ))
                        )}
                    </motion.div>

                    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                        <button className="btn-primary">View Full Catalog</button>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="about-section">
                <div className="container">
                    <div className="about-grid">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="gradient-text">Our Story</h2>
                            <p>Established in 2020, Lucky Lubricant has quickly become a trusted name in the manufacturing of high-quality industrial and automotive lubricants. Based in Nagpur, Maharashtra, we pride ourselves on delivering superior performance products that protect your machinery and power your journeys.</p>
                            <div className="stats-grid">
                                <div className="stat-card">
                                    <h3>4+</h3>
                                    <p>Years Excellence</p>
                                    <a href={REWARD_APP_URL} target="_blank" rel="noopener noreferrer" className="stat-download">
                                        <Download size={14} /> App
                                    </a>
                                </div>
                                <div className="stat-card">
                                    <h3>100+</h3>
                                    <p>Product Variants</p>
                                </div>
                                <div className="stat-card">
                                    <h3>All India</h3>
                                    <p>Supply Chain</p>
                                </div>
                            </div>
                        </motion.div>
                        <div className="about-image glass-card">
                            <IndiaMap />
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact">
                <div className="container">
                    <div className="section-title">
                        <h2>Get in <span className="gradient-text">Touch</span></h2>
                        <p>Ready for a bulk order or have questions? Let's talk.</p>
                    </div>

                    <div className="contact-grid">
                        <div className="contact-info">
                            <div className="contact-item">
                                <MapPin />
                                <div>
                                    <h4>Head Office</h4>
                                    <p>Industrial Area, Nagpur, Maharashtra</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <MapPin />
                                <div>
                                    <h4>Branch Office</h4>
                                    <p>Nanded, Maharashtra</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <Phone />
                                <div>
                                    <h4>Call Us</h4>
                                    <p>+91 91720 00000 / +91 73852 99597</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <Mail />
                                <div>
                                    <h4>Email</h4>
                                    <p>contact@luckylubricant.com</p>
                                </div>
                            </div>
                        </div>

                        <form className="contact-form glass-card" onSubmit={handleContactSubmit}>
                            <input name="name" type="text" placeholder="Full Name" required />
                            <input name="email" type="email" placeholder="Email Address" required />
                            <input name="phone" type="text" placeholder="Phone Number" required />
                            <select name="subject" required>
                                <option value="">Select Subject</option>
                                <option value="Order Issue">Order Issue</option>
                                <option value="Reward Points">Reward Points</option>
                                <option value="Bulk Order">Bulk Order</option>
                                <option value="Distributorship">Distributorship</option>
                                <option value="Others">Others</option>
                            </select>
                            <textarea name="message" placeholder="Your Message" required></textarea>
                            {formStatus.message && (
                                <div className={`form-feedback ${formStatus.type}`}>
                                    {formStatus.message}
                                </div>
                            )}
                            <button type="submit" className="btn-primary" disabled={formStatus.type === 'loading'} style={{ width: '100%' }}>
                                {formStatus.type === 'loading' ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="logo">
                            <Droplets />
                            LUCKY<span>LUBRICANTS</span>
                        </div>
                        <p>© 2026 Lucky Lubricant. All rights reserved.</p>
                        <div className="social-links footer-app-link">
                            <a href={REWARD_APP_URL} target="_blank" rel="noopener noreferrer" className="btn-reward-pulse sm">
                                <Download size={16} /> Download Reward App
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;
