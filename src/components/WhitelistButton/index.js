import React, { useState } from 'react';

const WhitelistButton = ({ walletAddress }) => {
  const [email, setEmail] = useState('');

  const joinWhitelist = async () => {
    if (!email.trim() || !walletAddress.trim()) {
      alert('Both email and wallet address are required.');
      return;
    }

    const response = await fetch('/api/joinWhitelist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ walletId: walletAddress, email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert(`Error: ${errorData.message}`);
      return;
    }

    alert('Successfully joined the whitelist!');
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <button onClick={joinWhitelist}>Join Whitelist</button>
    </div>
  );
};

export default WhitelistButton;