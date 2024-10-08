import { Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StartScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate(`/screener/question-1`);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 64px)",
        textAlign: "center",
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Blueprint Diagnostic Screener (BDS)
        </Typography>
        <Typography variant="body1"color="textSecondary">
          Assess and monitor cross-cutting symptoms efficiently over the past two weeks.
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleStart}
        sx={{ mt: 4 , textTransform:'none'}}
      >
        Begin Assessment
      </Button>
    </Container>
  );
};

export default StartScreen;
