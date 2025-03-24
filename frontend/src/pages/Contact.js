import React, { useState } from 'react';
import '../styles/Contact.css'; // Import the CSS file for styling

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && email && message) {
            console.log({ name, email, message });
            setSuccess(true);
            setError('');
            // Reset form fields
            setName('');
            setEmail('');
            setMessage('');
        } else {
            setError('Please fill in all fields.');
            setSuccess(false);
        }
    };

    return (
        <div className="contact-container">
            <h1>Get in Touch with CADSmartHub</h1>
            <p>
                Have questions or need assistance? Our team is here to help! Whether you're a developer looking to integrate our CAD APIs or a user seeking support, we’re just a message away.
            </p>
            <div className="contact-info">
                <h2>Contact Information</h2>
                <p><strong>Email:</strong> <a href="mailto:support@cadsmarthub.com">support@cadsmarthub.com</a></p>
                <p><strong>Phone:</strong> <a href="tel:91 020 67933311">+91 020 6793331111</a></p>
                <p><strong>Address:</strong> Dassault Systemes,Phase 1, Hinjawadi Rajiv Gandhi Infotech Park, Hinjawadi, Pune - 411057 </p>
            </div>
            <h2>Contact Form</h2>
            {success && <p className="success-message">Your message has been sent successfully!</p>}
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit">Send Message</button>
            </form>
            <div className="additional-info">
                <h2>Why Contact Us?</h2>
                <p>
                    At CADSmartHub, we are dedicated to providing the best support for our users and developers. Whether you need help with API integration, or want an API to provide tailormaid customization, or have questions about our services, or want to provide feedback, we value your input and are here to assist you.
                </p>
                <p>
                    Join our community and stay updated on the latest features and enhancements. We look forward to hearing from you!
                </p>
            </div>
        </div>
    );
};

export default Contact;
