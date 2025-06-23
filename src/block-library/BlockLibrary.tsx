import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Block, type BlockProps } from "../block/Block.tsx";
import { newUUID } from "../common/utils.ts";

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

export function BlockLibrary() {
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
    <Stack direction="row" spacing={10}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Library Box
        </Typography>
        <Box
          border={"2px solid black"}
          borderRadius={"0.5em"}
          padding={"1em"}
          width={"fit-content"}
          aria-label="Block Library"
        >
          {blocks.map((block, index) => (
            <Box key={index} mt={index > 0 ? 2 : 0}>
              <Block
                id={block.id}
                name={block.name}
                argumentOptions={block.argumentOptions}
                aria-label={`Block ${block.name}`}
              />
            </Box>
          ))}
        </Box>
        <Stack direction="row" spacing={1}>
          <Button onClick={checkPressed} color={"secondary"}>
            Check
          </Button>
          <Button> Reset </Button>
        </Stack>
        <Typography> Number of attempts: {count} </Typography>
        <Typography> Timer: {Math.floor(timeTaken / 1000)} </Typography>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Solution Box
        </Typography>
        <Box
          border={"2px solid black"}
          borderRadius={"0.5em"}
          padding={"1em"}
          width={100}
          height={100}
          aria-label="Solution Box"
        />
      </Box>
    </Stack>
  );
}
