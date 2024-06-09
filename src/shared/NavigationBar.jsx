import {useNavigate} from "react-router-dom";

const NavigationBar = ({children, onFilterChange}) => {

    const navigate = useNavigate();
    
    const handleInputChange = (event) => {
        onFilterChange(event.target.value)
    }

    const handlenavigate = (route) => {
        navigate(route);
    }

    return (
        <div
            style={{
                width:'100%',
                height:'40px',
            }}>
            <div style={{}}>
                <p>Dashboard</p>
                <div onClick= {() => handlenavigate("/register")}>
                    <p>Registro</p>
                    </div>
                <input 
                    style={{
                        border:"2px black solid",
                        width:"180px",
                        height:"25px",
                        borderRadius:"15px"
                    }}
                    type="text"
                    placeholder="FILTRAR POR NOMBRE"
                    onChange={handleInputChange}
                    />
            </div>
            {children}
        </div>
    )
}

export default NavigationBar