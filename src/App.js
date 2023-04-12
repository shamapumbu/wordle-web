import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import WordleRow from './components/WordleRow';
import { wordList } from './wordList';

function App() {
  const [secretWord, setSecretWord] = useState('');
  const maxAttempts = 6;

  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [history, setHistory] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    setSecretWord(randomWord);
  }, []);

  const evaluateGuess = (guess) => {
    let result = '';
    for (let i = 0; i < secretWord.length; i++) {
      if (secretWord[i] === guess[i]) {
        result += '✅';
      } else if (secretWord.includes(guess[i])) {
        result += '🟡';
      } else {
        result += '❌';
      }
    }
    return result;
  };

  const handleGuess = () => {
    if (guess.length !== secretWord.length || gameOver) {
      return;
    }

    const result = evaluateGuess(guess);
    setHistory([...history, { guess, result }]);
    setAttempts(attempts + 1);

    if (result === '✅✅✅✅✅' || attempts + 1 === maxAttempts) {
      setGameOver(true);
    }

    setGuess('');
  };

  const renderHistory = () => {
    return history.map((entry, index) => (
      <WordleRow key={index} guess={entry.guess} result={entry.result} />
    ));
  };

  return (
    <Box sx={{ padding: 2 }}>
      <TextField
                label="Your guess"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                inputProps={{ maxLength: 5 }}
                fullWidth
                margin="normal"
              />
              <Button
                variant="contained"
                onClick={handleGuess}
                style={{ marginBottom: 16 }}
              >
                Submit Guess
              </Button>
              <Box>{renderHistory()}</Box>
              {gameOver && (
                <Box>
                  {attempts < maxAttempts ? (
                    <Typography>
                      Congratulations! You guessed the word correctly!
                    </Typography>
                  ) : (
                    <Typography>
                      Sorry! You reached the maximum attempts. The word was "{secretWord}".
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
          );
        }
        
        export default App;
        
