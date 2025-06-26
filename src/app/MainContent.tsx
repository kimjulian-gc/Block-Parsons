import { Stack } from "@mui/material";
import { TitledSection } from "./TitledSection.tsx";
import { BlockLibrary } from "../block-library/BlockLibrary.tsx";
import { SolutionBox } from "../solution-box/SolutionBox.tsx";
import { SectionTitles } from "../common/utils.ts";

export function MainContent() {
  return (
    <Stack direction={"row"} spacing={2} justifyContent={"center"}>
      <TitledSection title={SectionTitles.BlockLibrary}>
        <BlockLibrary />
      </TitledSection>
      <TitledSection title={SectionTitles.SolutionBox}>
        <SolutionBox />
      </TitledSection>
    </Stack>
  );
}
