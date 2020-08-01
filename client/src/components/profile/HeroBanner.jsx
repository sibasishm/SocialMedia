import React from 'react';

export default ({ coverImg = '', color = 'teal' }) => (
  <div
    className="profile-banner"
    style={{
      backgroundImage: `url(${coverImg})`,
      backgroundColor: color
    }}
  ></div>
);
