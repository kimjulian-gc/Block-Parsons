import { Block } from "../../../block/Block";
import { type PropsWithChildren, useCallback, useState } from "react";
import {
  defaultKeyboardCoordinateGetter,
  DndContext,
  DragOverlay,
  type DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { collisionDetection } from "../../../solution-box/solution-box-utils.ts";

export function DndProvider({ children }: PropsWithChildren) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: defaultKeyboardCoordinateGetter,
    }),
  );

  const handleDragEnd = useCallback(() => {
    // 1. find the original parent block,
    // 2. remove the active block from the original parent, and
    // 3. push to its new parent's child blocks
    // const child =
    //   blocks.get(active.id.toString()) ??
    //   throwNull("child was somehow not found?");
    // const parentSlotDetails = over?.id.toString().split(":") ?? null;
    // const newParent = parentSlotDetails?.[1] ?? over?.id.toString() ?? null;
    // const argumentSlot = parentSlotDetails?.[2] ?? null;
    // const newTopLevel = removedAndPushed(
    //   topLevelBlocks,
    //   child,
    //   newParent,
    //   argumentSlot ? Number(argumentSlot) : null,
    // );
    setActiveId(null);
  }, []);

  const handleDragStart = useCallback(({ active }: DragStartEvent) => {
    setActiveId(active.id.toString());
  }, []);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetection}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {children}
      <DragOverlay>
        {activeId ? <Block id={activeId} presentational={true} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
