import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import user from '../../assets/user.svg';
import PrevDescription from './components/PrevDescription';
import CardInfo from './components/CardInfo';

const Users = () => {
  const { id } = useParams();

  const [form, setForm] = useState({
    description: '',
    prescription: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [descriptions, setDescriptions] = useState({});
  const [user, setUser] = useState({});

  const fetchDescription = async () => {
    const response = await fetch('http://localhost:3000/description/' + id);
    const data = await response.json();
    setDescriptions(data);
    return data;
  };


  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newForm = {
      ...form,
      [name]: value,
    };
    setForm(newForm);
  };

  const fetchUserById = async () => {
    const response = await fetch('http://localhost:3000/users/' + id);
    const data = await response.json();
    //console.log(data);
    setUser(data);
    return data;
  };

  //prescription to send and save in the description table
  const handlePostDescription = async (prescription) => {
    const description = {
      description: form.description,
      prescription: prescription,
    }
    try {
      const response = await fetch('http://localhost:3000/description/' + id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(description),
      });
      const data = await response.json();
      console.log(data);
      return data;

    } catch (error) {
      console.log(error);
    }
  };

  //fetch data form the gemini api. Async function that works with an await that returns a promise.
  //The promise will be resolved or rejected depending on the fetch data.
  const handleGenerateHelp = async () => {
    const prompt = {
      prompt: form.description,
    };

    try {
      const response = await fetch('http://localhost:3000/chat/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prompt),
      });
      const data = await response.json();
      setForm({ ...form, prescription: data.response });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  //When the button is clicked it will ask gemini and save the response in the description table. 
  const handleButtonClick = async () => {
    setIsLoading(true);
    try {
      const data = await handleGenerateHelp();  // Await the response from handleGenerateHelp
      await handlePostDescription(data.response);  // Pass the generated prescription to handlePostDescription
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserById();
    fetchDescription();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' ,
      alignItems:'center'
    }}>
       {/* Card and form container*/}
      <div style={{display:'flex',justifyContent:'space-evenly', width:'50%'}}>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'1rem'}}>
            <CardInfo user={user} />
          <div>
            <p>Descripcion</p>
            <textarea
              label="Descripcion"
              value={form.description}
              name="description"
              onChange={handleInputChange}

              style={{
                width:'300px',
                height:'100px',

                borderRadius:'0.5rem'
              }}
            />
            <p>Preescricion</p>
            <textarea
              label="Prescription"
              value={form.prescription}
              name="prescription"
              onChange={handleInputChange}

              style={{
                width:'300px',
                height:'100px',

                borderRadius:'0.5rem'
                }}
            />
            <div>
              <button
                style={{
                  height: '50px',
                  width: '180px',
                  backgroundColor: '#399C7E',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  borderRadius: '5px',
                }}
                disabled={isLoading}
                onClick={handleButtonClick}
              > 
                <p>{isLoading ? 'Cargando' : 'Generar Ejercicio'}</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3>Previous Diet</h3>
          <PrevDescription descriptions={descriptions} />
      </div>
    </div>
  );
};

export default Users;
