import React from 'react';

// style
import './content-item.css';

const ContentItem = ({ name, text }) => {
  return (
    <li className="content-list-item">
      <p>{name}</p>
      <p>{text}</p>
    </li>
  )
}

export default ContentItem;