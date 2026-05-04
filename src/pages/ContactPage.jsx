import Breadcrumb from '../components/common/Breadcrumb';

const ContactPage = () => {
  return (
    <div>
      <Breadcrumb items={[{ label: 'Contact Us' }]} />
      
      <div className="container-custom py-12">
        <h1 className="text-4xl font-bold text-center mb-12">Get In Touch</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block font-medium mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-primary"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-primary"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Phone</label>
                <input 
                  type="tel" 
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-primary"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Message</label>
                <textarea 
                  rows={5}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-primary"
                  placeholder="How can we help you?"
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Address</h3>
                <p className="text-gray-700">
                  123 Wellness Street, Ayurveda Nagar<br />
                  Delhi - 110001, India
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Phone</h3>
                <p className="text-gray-700">+91 123-456-7890</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-gray-700">info@ssherbal.com</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Business Hours</h3>
                <p className="text-gray-700">
                  Monday - Saturday: 9:00 AM - 6:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
