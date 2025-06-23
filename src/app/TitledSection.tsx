import type { PropsWithChildren } from "react";
import { Box, Stack, Typography } from "@mui/material";

interface TitledSectionProps {
  title: string;
}

export function TitledSection({
  title,
  children,
}: PropsWithChildren<TitledSectionProps>) {
  return (
    <Stack spacing={2}>
      <Typography variant="h6">{title}</Typography>
      <Box border={2} borderRadius={"0.5em"} padding={"10px"}>
        {children}
      </Box>
    </Stack>
  );
}
