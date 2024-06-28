import React, { useEffect, useState } from 'react';
import './Faqs.css'; // Import the CSS file
import axios from 'axios';

const faqsApi = 'http://127.0.0.1:8000/school/faqs'
function Faqs() {
  const [selected, setSelected] = useState(null);
  const [faqs, setFaqs] = useState([])

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  const fetchFaqs = async()=>{
   try{
    const response = await axios(faqsApi)
    const data = response.data
    setFaqs(data)
   }catch(err){
    console.log('there is an err', err)
   }
  }

  useEffect(()=>{
    fetchFaqs()
  },[])
  // const faqs = [
  //   {
  //     question: 'What is your return policy?',
  //     answer: 'Our return policy allows you to return products within 30 days of purchase.'
  //   },
  //   {
  //     question: 'How do I track my order?',
  //     answer: 'You can track your order using the tracking link sent to your email after the order is shipped.'
  //   },
  //   {
  //     question: 'Do you offer international shipping?',
  //     answer: 'Yes, we offer international shipping to over 100 countries worldwide.'
  //   },
    // Add more FAQs as needed
  //];

  return (
    <div className="faqs-container">
      <h1 className="faqs-title">Frequently Asked Questions</h1>
      <div className="faqs-list">
        {faqs.map((faq, i) => (
          <div className="faq-item" key={i}>
            <div className="faq-question" onClick={() => toggle(i)}>
              {faq.question}
              <span className="faq-icon">{selected === i ? '-' : '+'}</span>
            </div>
            <div className={`faq-answer ${selected === i ? 'show' : ''}`}>
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Faqs;
