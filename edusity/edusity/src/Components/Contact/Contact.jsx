import React from 'react'
import './Contact.css'
import msg_icon from '../../assets/download (2).jpeg'
import mail_icon from '../../assets/images (2).png'
import phone_icon from '../../assets/download (1).png'
import location_icon from '../../assets/download (2).png'

const Contact = () => {
    
    const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "22ff2e76-a027-4754-9591-20ef6f35f416");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };




  return (
    <div className='contact'>
        <div className="contact-col">
            <h3>Send us a message <img src={msg_icon} alt="" /></h3>
            <p>Feel free to reach out through contact form or find our contact
                information below. Your feedback , questions, and suggestions are important
                to us as we strive to provide exceptional services to our university
                community. </p>
                <ul>
                    <li><img src={mail_icon} alt="" />Contact@GreatStack.dev</li>
                    <li><img src={phone_icon} alt="" />+1 123-456-789</li>
                    <li><img src={location_icon} alt="" />77 Messachusetts Ave, Cambridge<br/> MA 02139, United
                    States</li>
                </ul>
        </div>
        <div className="contact-col"></div>
        <form onSubmit={onSubmit}> 
            <label>Your name</label>
            <input type="text" name='name' placeholder='Enter your name' required/>
            <label>Phone Number</label>
            <input type="tel" name='phone' placeholder='Enter your mobile number' required/>
            <label>Write your message here</label>
            <textarea name="message" rows="6" placeholder='Enter your message' required></textarea>
            <button type='submit' className='btn dark-btn'>Submit now</button>
        </form>
        <span>{result}</span>
    </div>
  )
}

export default Contact