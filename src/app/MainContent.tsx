import { Stack } from "@mui/material";
import { TitledSection } from "./TitledSection.tsx";
import { BlockLibrary } from "../block-library/BlockLibrary.tsx";
import { SolutionBox } from "../solution-box/SolutionBox.tsx";

export const SectionTitles = {
  BlockLibrary: "Block Library",
  SolutionBox: "Solution Box",
};

export function MainContent() {
  return (
    <Stack direction={"row"} spacing={2}>
      <TitledSection title={SectionTitles.BlockLibrary}>
        <BlockLibrary />
      </TitledSection>
      <TitledSection title={SectionTitles.SolutionBox}>
        <SolutionBox />
      </TitledSection>
    </Stack>
  );
}
