import { Box } from "@mui/material";

interface BlockProps {
  name: string;
}

export function Block({ name }: BlockProps) {
  return <Box>{name}</Box>;
}
