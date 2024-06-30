import { Button } from '@mui/material';
import { useGoogleLogin } from '@react-oauth/google';
import { Google } from '@mui/icons-material';

export const GoogleLoginButton = () => {
  const clientID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  
  const login = useGoogleLogin({
    onSuccess: tokenResponse => console.log(tokenResponse),
  });

  if (clientID) {
    return (
      <Button 
      onClick={() => login()} 
      variant='contained'
      startIcon={<Google />}
      sx={{ backgroundColor: '#0078D4', color: 'white', justifyContent: 'flex-start'}}
      >
        Sign in with Google
      </Button>
    );
  }
};
