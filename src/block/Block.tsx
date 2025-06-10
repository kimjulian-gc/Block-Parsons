import { Box } from "@mui/material";

interface ArgumentOptions {
  amount: number;
  expandable?: boolean;
}

interface BlockProps {
  name: string;
  arguments: ArgumentOptions;
}

export function Block({ name, arguments: { amount } }: BlockProps) {
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
