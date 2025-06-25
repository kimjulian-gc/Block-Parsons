import { Box, Button, Stack } from "@mui/material";
import { Block } from "../block/Block.tsx";
import { Draggable } from "../block/dnd/Draggable.tsx";
import { useBlockContext } from "../common/providers/block/BlockContext.ts";
import { SectionTitles } from "../common/utils.ts";

export function BlockLibrary() {
  const { blocks } = useBlockContext();
  const libraryBlocks = blocks.filter(
    (block) => block.parentId === SectionTitles.BlockLibrary,
  );

  // TODO: add back later
  // const [timeTaken, setTimeTaken] = useState(0);
  // const [count, setCount] = useState(0);
  // const [, setStartTime] = useState<number | null>(null);
  //
  // useEffect(() => {
  //   const start = Date.now();
  //   setStartTime(start);
  //   const interval = setInterval(() => {
  //     setTimeTaken(Date.now() - start);
  //   }, 1000);
  //
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);
  //
  // const checkPressed = () => {
  //   setCount(count + 1);
  // };

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
        {libraryBlocks.keySeq().map((id) => (
          <Draggable key={id} id={id}>
            <Block id={id} presentational={true} />
          </Draggable>
        ))}
      </Stack>
      <Stack direction="row" spacing={1}>
        {/*<Button onClick={checkPressed} color={"secondary"}>*/}
        {/*  Check*/}
        {/*</Button>*/}
        <Button> Reset </Button>
      </Stack>
      {/*<Typography> Number of attempts: {count} </Typography>*/}
      {/*<Typography> Timer: {Math.floor(timeTaken / 1000)} </Typography>*/}
    </Box>
  );
}
