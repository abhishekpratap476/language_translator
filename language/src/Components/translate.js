import React, { useState } from 'react';
import "./trace.css";

function Trance() {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const translationData = { text, language, translatedText };

    const response = await fetch("http://localhost:5000/trr", {
      method: "POST",
      body: JSON.stringify(translationData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const result = await response.json();
      console.log(result.error);
      setError(result.error);
      return;
    }
    console.log('Data sent successfully');
  };

  const handleTranslation = async () => {
    if (!text || !language) {
      alert('Please enter text and select a language');
      return;
    }

    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${language}&dt=t&q=${encodeURIComponent(text)}`;
      const response = await fetch(url);
      const data = await response.json();
      const result = data[0].map(obj => obj[0]).join(' ');
      setTranslatedText(result);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to translate. Please try again.');
      alert(error);
    }
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <h1>POLYGLOT</h1>
      <div className="input-group">
        <label htmlFor="text">Text</label>
        <input id="text" type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text to translate" />
      </div>
      <div className="input-group">
        <label htmlFor="language">Language:</label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
                <option value="de">German</option>
                <option value="it">Italian</option>
                <option value="pt">Portuguese</option>
                <option value="hi">Hindi</option>
                <option value="te">Telugu</option>
                <option value="or">Oriya</option>
                <option value="pa">Panjabi</option>
                <option value="ta-IN">Tamil</option>
                <option value="bh">Bihar</option>
                <option value="ta-IN">Tamil</option>
                <option value="ja">Japanese</option>
                <option value="kn">Kannada</option>
          {/* add other options similarly */}
        </select>
      </div>
      <button type="button" className="bt" id="translateBtn" onClick={handleTranslation}>Translate</button>
      <div className="output" id="output">{translatedText}</div>
      <div className="his">
        <a href="/">History</a>
      </div>
    </form>
  );
}

export default Trance;
