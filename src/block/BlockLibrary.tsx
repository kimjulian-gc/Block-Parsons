import { Box, Stack, Typography } from "@mui/material";
// import { useState } from "react";
// import { ArgumentSlot } from "./ArgumentSlot.tsx";
import { Block } from "./Block.tsx";

const blocks = [
  { name: "small-circle", argumentOptions: { minAmount: 3 } },
  { name: "medium-rectangle", argumentOptions: { minAmount: 3 } },
  { name: "eirheh", argumentOptions: { minAmount: 0 } },
  { name: "5", argumentOptions: { minAmount: 0 } },
  { name: "square", argumentOptions: { minAmount: 0 } },
];

export function BlockLibrary() {
  return (
    <Stack direction="row" spacing={10}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Library Box
        </Typography>
        <Box
          border={"2px solid black"}
          borderRadius={"0.5em"}
          padding={"1em"}
          width={"fit-content"}
          aria-label="Block Library"
        >
          {blocks.map((block, index) => (
            <Box key={index} mt={index > 0 ? 2 : 0}>
              <Block
                name={block.name}
                argumentOptions={block.argumentOptions}
                aria-label={`Block ${block.name}`}
              />
            </Box>
          ))}
        </Box>
      </Box>
      <Box>
        <Typography variant="h6" gutterBottom>
          Solution Box
        </Typography>
        <Box
          border={"2px solid black"}
          borderRadius={"0.5em"}
          padding={"1em"}
          width={100}
          height={100}
          aria-label="Solution Box"
        />
      </Box>
    </Stack>
  );
}
