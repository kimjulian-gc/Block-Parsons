import { Button, Stack, Typography } from "@mui/material";
import { Block } from "../block/Block.tsx";
import { Draggable } from "../common/dnd-wrappers/Draggable.tsx";
import { useBlockContext } from "../common/providers/block/BlockContext.ts";
import { SectionTitles } from "../common/utils.ts";
import { useEffect, useState } from "react";

function formatTime(ms: number) {
  const hours = Math.floor(ms / (3600 * 1000));
  const minutes = Math.floor((ms % (3600 * 1000)) / (60 * 1000));
  const seconds = Math.floor((ms % (60 * 1000)) / 1000);

  const pad = (n: number, z = 2) => n.toString().padStart(z, "0");

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export function BlockLibrary() {
  const { blocks } = useBlockContext();
  const libraryBlocks = blocks.filter(
    (block) => block.parentId === SectionTitles.BlockLibrary,
  );

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

  return (
    <Stack>
      <Stack
        borderRadius={"0.5em"}
        padding={"0.5em"}
        boxSizing={"border-box"}
        width={"fit-content"}
        minHeight={"2em"}
        minWidth={"100%"}
        aria-label="Block Library"
        spacing={1}
        justifyContent={"space-evenly"}
      >
        {libraryBlocks.keySeq().map((id) => (
          <Draggable key={id} id={id}>
            <Block id={id} presentational={true} />
          </Draggable>
        ))}
      </Stack>
      <Stack direction="row" spacing={1}>
      </Stack>
      {/*<Typography> Number of attempts: {count} </Typography>*/}
    </Stack>
  );
}
