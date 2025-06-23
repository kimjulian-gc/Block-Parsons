import { MainContent } from "./MainContent.tsx";
import { BlockProvider } from "./providers/block/BlockProvider.tsx";
import { DndProvider } from "./providers/drag-and-drop/DndProvider.tsx";

export function App() {
  return (
    <BlockProvider>
      <DndProvider>
        <MainContent />
      </DndProvider>
    </BlockProvider>
  );
}
