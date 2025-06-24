import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Block, type BlockProps } from "../block/Block.tsx";
import { newUUID } from "../common/utils.ts";
import { Draggable } from "../block/dnd/Draggable.tsx";

const blocks: BlockProps[] = [
  { id: newUUID(), name: "small-circle", argumentOptions: { minAmount: 3 } },
  {
    id: newUUID(),
    name: "medium-rectangle",
    argumentOptions: { minAmount: 3 },
  },
  { id: newUUID(), name: "eirheh", argumentOptions: { minAmount: 0 } },
  { id: newUUID(), name: "5", argumentOptions: { minAmount: 0 } },
  { id: newUUID(), name: "square", argumentOptions: { minAmount: 0 } },
];

function formatTime(ms: number) {
  const hours = Math.floor(ms / (3600 * 1000));
  const minutes = Math.floor((ms % (3600 * 1000)) / (60 * 1000));
  const seconds = Math.floor((ms % (60 * 1000)) / 1000);
  const milliseconds = ms % 1000;

  const pad = (n: number, z = 2) => n.toString().padStart(z, "0");

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(milliseconds, 3)}`;
}

export function BlockLibrary() {
  const [timeTaken, setTimeTaken] = useState(0);
  const [count, setCount] = useState(0);
  const [, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    const start = Date.now();
    setStartTime(start);
    const interval = setInterval(() => {
      setTimeTaken(Date.now() - start);
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const checkPressed = () => {
    setCount(count + 1);
  };

  return (
    <Box>
      <Stack
        border={"2px solid black"}
        borderRadius={"0.5em"}
        padding={"1em"}
        width={"fit-content"}
        aria-label="Block Library"
        spacing={2}
      >
        {blocks.map((block) => (
          <Draggable key={block.id} id={block.id}>
            <Block
              {...block}
              aria-label={`Block ${block.name}`}
              presentational={true}
            />
          </Draggable>
        ))}
      </Stack>
      <Stack direction="row" spacing={1}>
        <Button onClick={checkPressed} color={"secondary"}>
          Check
        </Button>
        <Button> Reset </Button>
      </Stack>
      <Typography> Number of attempts: {count} </Typography>
      <Typography> Time Taken: {formatTime(timeTaken)} </Typography>
    </Box>
  );
}
