import { Stack} from "@mui/material";
import {useState, useEffect} from "react";
import { TitledSection } from "./TitledSection.tsx";
import { BlockLibrary } from "../block-library/BlockLibrary.tsx";
import { SolutionBox } from "../solution-box/SolutionBox.tsx";
import { SectionTitles } from "../common/utils.ts";
import {ActionsMade} from "./Actions.tsx";



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
      <ActionsMade
        count={count}
        setCount={setCount}
        setStartTime={setStartTime}
        setTimeTaken={setTimeTaken}
        timeTaken={timeTaken}
      />
    </Stack>
  );
}
