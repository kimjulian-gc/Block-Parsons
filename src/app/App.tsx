import {
  collisionDetection,
  findChild,
  removedAndPushed,
} from "../solution-box/solution-box-utils.ts";
import {
  defaultKeyboardCoordinateGetter,
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useCallback, useState } from "react";
import { Block, type BlockProps } from "../block/Block.tsx";
import { newUUID, throwNull } from "../common/utils.ts";
import { MainContent } from "./MainContent.tsx";

const startingBlocks: BlockProps[] = [
  {
    id: newUUID(),
    name: "define",
    argumentOptions: { minAmount: 2 },
    childBlocks: [
      { id: newUUID(), name: "small-grey" },
      {
        id: newUUID(),
        name: "solid-circle",
        argumentOptions: { minAmount: 2 },
        childBlocks: [
          { id: newUUID(), name: "20" },
          { id: newUUID(), name: '"red"' },
        ],
      },
    ],
  },
];

export function App() {
  const [topLevelBlocks, setTopLevelBlocks] =
    useState<BlockProps[]>(startingBlocks);

  const [activeProps, setActiveProps] = useState<BlockProps | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: defaultKeyboardCoordinateGetter,
    }),
  );

  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      // 1. find the original parent block,
      // 2. remove the active block from the original parent, and
      // 3. push to its new parent's child blocks
      // TODO: terrible DFS-based implementation,
      //  ideally we'd use a hash map over the uuids
      const child =
        findChild(topLevelBlocks, active.id.toString()) ??
        throwNull("child was somehow not found?");
      const parentSlotDetails = over?.id.toString().split(":") ?? null;
      const newParent = parentSlotDetails?.[1] ?? over?.id.toString() ?? null;
      const argumentSlot = parentSlotDetails?.[2] ?? null;
      // console.log(structuredClone(parentSlotDetails), newParent, argumentSlot);
      const newTopLevel = removedAndPushed(
        topLevelBlocks,
        child,
        newParent,
        argumentSlot ? Number(argumentSlot) : null,
      );
      setTopLevelBlocks(newTopLevel);
      setActiveProps(null);
    },
    [topLevelBlocks],
  );

  const handleDragStart = useCallback(
    ({ active }: DragStartEvent) => {
      setActiveProps(findChild(topLevelBlocks, active.id.toString()));
    },
    [topLevelBlocks],
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetection}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <MainContent
        topLevelBlocks={topLevelBlocks}
        activeBlockId={activeProps?.id}
      />
      <DragOverlay>
        {activeProps ? <Block {...activeProps} presentational={true} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
