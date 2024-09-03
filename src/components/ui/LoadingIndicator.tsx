import { Box, CircularProgress } from "@mui/material";

const LoadingIndicator = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height='100vh'
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingIndicator;
