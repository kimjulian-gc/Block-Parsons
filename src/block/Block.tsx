import { Box } from "@mui/material";
import { useState } from "react";
import { ArgumentSlot } from "./ArgumentSlot.tsx";

interface ArgumentOptions {
  minAmount: number;
  expandable?: boolean;
}

interface BlockProps {
  name: string;
  argumentOptions: ArgumentOptions;
}

export function Block({ name, argumentOptions: { minAmount } }: BlockProps) {
  const [args] = useState<null[]>(Array.from({ length: minAmount }));

  return (
    <Box
      width={"fit-content"}
      bgcolor={"lightgray"}
      padding={"0.5em"}
      borderRadius={"0.5em"}
      fontFamily={"monospace"}
    >
      ({name}
      {args.map((_, index) => (
        <ArgumentSlot key={index} />
      ))}
      )
    </Box>
  );
}
