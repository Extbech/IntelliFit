import { Container, Typography } from "@mui/material";

export const CardioAnalytics = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Cardio Analytics
      </Typography>
      <Typography variant="body1">
        This page will display detailed analytics and insights about your cardio
        workouts, including trends, performance metrics, and personalized
        recommendations.
      </Typography>
    </Container>
  );
};
