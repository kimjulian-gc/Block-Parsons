import { Box } from "@mui/material";

interface BlockProps {
  name: string;
}

export function Block({ name }: BlockProps) {
  return (
    <Box
      width={"fit-content"}
      bgcolor={"lightgray"}
      padding={"0.5em"}
      borderRadius={"0.5em"}
      fontFamily={"monospace"}
    >
      ({name})
    </Box>
  );
}
