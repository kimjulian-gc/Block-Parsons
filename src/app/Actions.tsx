import {Stack, Button, Typography} from '@mui/material';


export function checkPressed (count: number, setCount: (count: number) => void) {
  setCount(count + 1);
}

export const resetPressed = ( ) => {

  //todo: reset blocks in og position
};


function formatTime(ms: number) {
  const hours = Math.floor(ms / (3600 * 1000));
  const minutes = Math.floor((ms % (3600 * 1000)) / (60 * 1000));
  const seconds = Math.floor((ms % (60 * 1000)) / 1000);
  //const milliseconds = ms % 1000;

  const pad = (n: number, z = 2) => n.toString().padStart(z, "0");

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}
export interface ActionsMade {
  count: number;
  setCount: (count: number) => void;
  setStartTime: (timeTaken: number) => void;
  setTimeTaken: (timeTaken: number) => void;
  timeTaken: number;
}
export function ActionsMade({
  count,
  setCount,
  setStartTime,
  setTimeTaken,
  timeTaken,
  }: ActionsMade) {
  return (
    <Stack spacing={2} alignItems="center" justifyContent="center">
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button
          onClick={() => {
            checkPressed(count, setCount);
          }}
          color="secondary"
        >
          Check
        </Button>
        <Button
          onClick={() => {
            resetPressed();
          }}
        >
          Reset
        </Button>
      </Stack>
      <Typography>Attempts: {count}</Typography>
      <Typography>Time Taken: {formatTime(timeTaken)}</Typography>
    </Stack>
  );
}