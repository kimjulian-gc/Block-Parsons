import { BlockLabels } from "./aria-labels.ts";
import { Box } from "@mui/material";

export function ArgumentSlot() {
  return (
    <Box
      width={"fit-content"}
      minWidth={"3em"}
      minHeight={"0.25em"}
      bgcolor={"white"}
      padding={"0.5em"}
      borderRadius={"0.5em"}
      marginLeft={"1em"}
      aria-label={BlockLabels.ArgumentSlot}
    ></Box>
  );
}
