import { Stack } from "@mui/material";
import { Block } from "../block/Block.tsx";
import { Draggable } from "../common/dnd-wrappers/Draggable.tsx";
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
        {/*<Button onClick={checkPressed} color={"secondary"}>*/}
        {/*  Check*/}
        {/*</Button>*/}
        {/*<Button> Reset </Button>*/}
      </Stack>
      {/*<Typography> Number of attempts: {count} </Typography>*/}
      {/*<Typography> Timer: {Math.floor(timeTaken / 1000)} </Typography>*/}
    </Stack>
  );
}
