import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = () => {
  const [patientId, setPatientId] = useState('');
  const [therapistId, setTherapistId] = useState('');
  const [sessionDate, setSessionDate] = useState('');
  const [checklist, setChecklist] = useState({
    initiatesCommunication: false,
    usesAppropriateLanguage: false,
    engagesInConversation: false,
    respondsToSocialCues: false,
    expressesNeedsAndWants: false,
    demonstratesUnderstanding: false,
    varietyOfCommunicationMethods: false,
    consistencyAcrossSettings: false,
  });
  const [comments, setComments] = useState('');

  const handleChange = (e) => {
    setChecklist({
      ...checklist,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if all criteria are met
    const allCriteriaMet = Object.values(checklist).every(value => value);

    const feedback = {
      patientId,
      therapistId,
      sessionDate,
      checklist,
      allCriteriaMet,
      comments
    };

    try {
      const res = await axios.post('http://localhost:5000/api/feedback', feedback);
      alert(res.data.msg);
    } catch (err) {
      alert('Error submitting feedback');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Session Feedback Form</h2>

      <div>
        <label>Patient ID:</label>
        <input
          type="text"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Therapist ID:</label>
        <input
          type="text"
          value={therapistId}
          onChange={(e) => setTherapistId(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Session Date:</label>
        <input
          type="date"
          value={sessionDate}
          onChange={(e) => setSessionDate(e.target.value)}
          required
        />
      </div>

      <div>
        <h3>Checklist for Spontaneous Communication</h3>
        {Object.keys(checklist).map(key => (
          <div key={key}>
            <input
              type="checkbox"
              name={key}
              checked={checklist[key]}
              onChange={handleChange}
            />
            <label htmlFor={key}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
          </div>
        ))}
      </div>

      <div>
        <label>Additional Comments:</label>
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
      </div>

      <button type="submit">Submit Feedback</button>
    </form>
  );
};

export default FeedbackForm;
