import React from 'react';
import { Box, Typography } from '@mui/material';

const WordleRow = ({ guess, result }) => {
  return (
    <Box display="flex" justifyContent="space-between" marginBottom={1}>
      <Typography variant="body1">{guess}</Typography>
      <Typography variant="body1">{result}</Typography>
    </Box>
  );
};

export default WordleRow;
