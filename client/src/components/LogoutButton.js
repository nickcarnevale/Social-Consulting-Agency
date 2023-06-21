import { useSignOut } from 'react-auth-kit'; 
import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
    const signOut = useSignOut();
    const navigate = useNavigate();
    
    const handleSignOut = () => {
      signOut(); 
      navigate("/");
    };
    
    return (
      <button onClick={handleSignOut}>Log Out</button>
    );
  }