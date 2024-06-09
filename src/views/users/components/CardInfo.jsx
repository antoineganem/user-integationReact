/* eslint-disable react/prop-types */
import userImage from '../../../assets/userImage.svg';

const CardInfo = ({user}) => {
  return (
    <div
        style={{
            width: "250px", 
            height:"450px", 
            backgroundColor: "white",
            boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
            borderRadius: "3rem",

            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            flexDirection:'column',
            flexWrap:'Wrap',
            boxSizing: "border-box", // Ensure padding doesn't increase the size
            padding: '3px',
            
            // Responsive styles
            overflow: "hidden", // Hide overflowed content
            wordWrap: "break-word", // Break long words and wrap text onto the next line
            textOverflow: "ellipsis", // Display ellipsis (...) when text overflows
            // text styles 
            fontFamily: "'Georgia',serif", // Example font family
            fontSize: '16px', // Example font size
            color: '#333', // Example text color
            lineHeight: '1.5', // Example line height for better readability
        }}  
    >
        <img src={userImage} width={80} alt="avatar" />
        <p>Nombre: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Direction: {user.direction}</p>
        <p>Age: {user.age}</p>
        <p>Tag: {user.tag}</p>
        <p>Sex: {user.sex}</p>
    </div>
  )
}

export default CardInfo