import { Stack, Button, Typography } from "@mui/material";
import {useState, useEffect} from "react";
import { TitledSection } from "./TitledSection.tsx";
import { BlockLibrary } from "../block-library/BlockLibrary.tsx";
import { SolutionBox } from "../solution-box/SolutionBox.tsx";
import { SectionTitles } from "../common/utils.ts";

function formatTime(ms: number) {
  const hours = Math.floor(ms / (3600 * 1000));
  const minutes = Math.floor((ms % (3600 * 1000)) / (60 * 1000));
  const seconds = Math.floor((ms % (60 * 1000)) / 1000);
  const milliseconds = ms % 1000;

  const pad = (n: number, z = 2) => n.toString().padStart(z, "0");

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export function MainContent() {
  const [timeTaken, setTimeTaken] = useState(0);
  const [count, setCount] = useState(0);
  const [, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    const start = Date.now();
    setStartTime(start);
    const interval = setInterval(() => {
      setTimeTaken(Date.now() - start);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const checkPressed = () => {
    setCount(count + 1);
  };

  return (
    <Stack spacing={2} alignItems="center" justifyContent="center">
      <Stack direction="row" spacing={2} justifyContent="center">
        <TitledSection title={SectionTitles.BlockLibrary}>
          <BlockLibrary />
        </TitledSection>
        <TitledSection title={SectionTitles.SolutionBox}>
          <SolutionBox />
        </TitledSection>
      </Stack>
      <Stack direction="row" spacing={2} justifyContent="Center">
        <Button onClick={checkPressed} color="secondary">Check</Button>
        <Button>Reset</Button>
      </Stack>
        <Typography>Attempts: {count}</Typography>
        <Typography> Time Taken: {formatTime(timeTaken)} </Typography>
      </Stack>

  );
}
