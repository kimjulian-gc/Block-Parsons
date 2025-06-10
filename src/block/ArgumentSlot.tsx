import { BlockLabels } from "./aria-labels.ts";
import { Box } from "@mui/material";

export function ArgumentSlot() {
  return (
    <Box
      width={"fit-content"}
      bgcolor={"white"}
      padding={"0.5em"}
      borderRadius={"0.5em"}
      aria-label={BlockLabels.ArgumentSlot}
    ></Box>
  );
}
