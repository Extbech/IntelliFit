import { Button, Container, Stack, Typography, Box } from "@mui/material";
import { GoogleLoginButton } from "../components/auth/GoogleLoginButton";
import FacebookIcon from "@mui/icons-material/Facebook"; // Example using Material-UI icons for simplicity
import TwitterIcon from "@mui/icons-material/Twitter";
import OutlookIcon from "@mui/icons-material/Email"; // Use appropriate icon or image

export const Login = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: 2,
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          mb: 4,
        }}
      >
        <Typography variant="h3" gutterBottom>
          IntelliFit
        </Typography>
      </Box>
      <Box
        sx={{
          padding: 3,
          borderRadius: 2,
          backgroundColor: "white",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: 360,
        }}
      >
        <Stack spacing={2} direction="column">
          <GoogleLoginButton />
          <Button
            variant="contained"
            startIcon={<FacebookIcon />}
            sx={{
              backgroundColor: "#3b5998",
              color: "white",
              justifyContent: "flex-start",
            }}
          >
            Sign in with Facebook
          </Button>
          <Button
            variant="contained"
            startIcon={<TwitterIcon />}
            sx={{
              backgroundColor: "#1DA1F2",
              color: "white",
              justifyContent: "flex-start",
            }}
          >
            Sign in with Twitter
          </Button>
          <Button
            variant="contained"
            startIcon={<OutlookIcon />}
            sx={{
              backgroundColor: "#0078D4",
              color: "white",
              justifyContent: "flex-start",
            }}
          >
            Sign in with Outlook
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};
