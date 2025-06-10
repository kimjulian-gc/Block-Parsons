import { Stack } from "@mui/material";
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
    <Stack
      width={"fit-content"}
      bgcolor={"lightgray"}
      padding={"0.5em"}
      borderRadius={"0.5em"}
      fontFamily={"monospace"}
      spacing={1}
      useFlexGap
    >
      ({name}
      {args.map((_, index) =>
        index === args.length - 1 ? (
          <Stack direction={"row"} alignItems={"center"} key={index}>
            <ArgumentSlot />)
          </Stack>
        ) : (
          <ArgumentSlot key={index} />
        ),
      )}
    </Stack>
  );
}
