import { Stack } from "@mui/material";
import { BlockLibrary } from "../block-library/BlockLibrary.tsx";
import { TitledSection } from "./TitledSection.tsx";
import { SolutionBox } from "../solution-box/SolutionBox.tsx";

export function App() {
  return (
    <Stack direction={"row"} spacing={2}>
      <TitledSection title={"Block Library"}>
        <BlockLibrary />
      </TitledSection>
      <TitledSection title={"Solution Box"}>
        <SolutionBox />
      </TitledSection>
    </Stack>
  );
}
