import { Stack } from "@mui/material";
import { TitledSection } from "./TitledSection.tsx";
import { BlockLibrary } from "../block-library/BlockLibrary.tsx";
import { SolutionBox } from "../solution-box/SolutionBox.tsx";

export function MainContent() {
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
