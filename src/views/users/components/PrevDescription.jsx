/* eslint-disable react/prop-types */

import './prevDescription.css'

const PrevDescription = ({ descriptions }) => {
  console.log(descriptions)
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '1rem',
      borderRadius: '1rem',
      padding: '10px',
      boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)',
      backgroundColor: 'white',

    }}>
        {descriptions.rows?.map((des, idx) => (
        <div
          key={idx}
          className="descriptionBox"
        > 
          <p><strong>Description:</strong></p>
          <p>
              {des.description}
              </p>
          <p><strong>Prescription:</strong></p>
          <p>
              {des.prescription}</p>
        </div>
      ))}
    </div>
  );
};

export default PrevDescription;
