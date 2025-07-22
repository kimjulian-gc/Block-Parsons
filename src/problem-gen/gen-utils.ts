import {
  parseValue,
  stringToTokens,
  Tokenizer,
} from "scamper/src/parser/parser.ts";
import { AST, SyntaxNode } from "scamper/src/ast.ts";
import { newUUID, SectionTitles, throwNull } from "../common/utils.ts";
import type { BlockData, Slot } from "../common/providers/block/block-types.ts";
import type { TokenHandler } from "scamper/src/parser/tokenhandler.ts";
import { DefaultTokenHandlingSettings } from "scamper/src/parser/tokenhandler.ts";
import {
  DefaultParseHandlingSettings,
  type ParseHandler,
} from "scamper/src/parser/parsehandler.ts";
import { Value } from "scamper/src/lang";

const BacktickTag = "extract-block";
const CaretTag = "invert-conversion";

function turnIntoBlock(
  node: SyntaxNode,
  blockMap: Map<string, BlockData>,
  caretInversion: boolean = false,
): Slot {
  const blockId = newUUID();
  // console.log(node);
  if (node.simplename.toLowerCase() !== "s-expression") {
    blockMap.set(blockId, {
      type: "ConstantBlock",
      value: node.simplename,
      parentId: SectionTitles.BlockLibrary,
    });
    return { id: blockId, locked: caretInversion };
  }

  // otherwise it is an s-expression with optional children
  const firstNode = node.children.shift();
  if (!firstNode) {
    throw new Error(
      "Scamper is broken: first node of s-expression doesn't exist?",
    );
  }

  // console.log(
  //   "simplename:",
  //   firstNode.simplename,
  //   firstNode.simplename === `"${CaretTag}"`,
  //   firstNode.simplename === BacktickTag,
  // );
  // if first node is a caret, it should be inverted
  if (firstNode.simplename === `"${CaretTag}"`) {
    console.log("! caret", firstNode, node.children);
    return turnIntoBlock(node.children[0], blockMap, true);
  }
  // if it includes a backtick, it should be popped out
  if (firstNode.simplename === `"${BacktickTag}"`) {
    console.log("! backtick", firstNode, node.children);
    return turnIntoBlock(node.children[0], blockMap, caretInversion);
  }

  function updateParentOfChild(childId: Slot["id"]) {
    if (!childId) {
      throw new Error("can't update parent of null childId");
    }
    const blockData =
      blockMap.get(childId) ?? throwNull("somehow block data doesn't exist?");
    blockMap.set(childId, {
      ...blockData,
      parentId: blockId,
    });
  }

  // turnIntoBlock(firstNode, blockMap);
  // TODO: support special syntax
  const firstBlockSlot = turnIntoBlock(firstNode, blockMap, caretInversion);
  updateParentOfChild(firstBlockSlot.id);

  // const blockChildren = [{ id: null, locked: false }];
  const blockChildren = [firstBlockSlot];
  for (const child of node.children) {
    // turnIntoBlock(child, blockMap);
    // blockChildren.push({ id: null, locked: false });
    const childSlot = turnIntoBlock(child, blockMap, caretInversion);
    updateParentOfChild(childSlot.id);
    blockChildren.push(childSlot);
  }

  blockMap.set(blockId, {
    type: "BlockWithChildren",
    parentId: SectionTitles.BlockLibrary,
    children: blockChildren,
  });

  return { id: blockId, locked: caretInversion };
}

const BacktickHandler: TokenHandler = {
  shouldHandle: (ch) => ch === "`",
  handle: (tokenizer) => {
    tokenizer.beginTracking();
    tokenizer.advance();
    return tokenizer.emitToken();
  },
};

const BacktickParseHandler: ParseHandler = {
  shouldHandle: (beg) => beg.text === "`",
  handle: (beg, tokens, handlingSettings) => {
    console.log("! encountered backtick during parsing");
    return Value.mkSyntax(
      beg.range,
      Value.mkList(
        Value.mkSym(BacktickTag),
        parseValue(tokens, handlingSettings),
      ),
    );
  },
};

const CaretHandler: TokenHandler = {
  shouldHandle: (ch) => ch === "^",
  handle: (tokenizer) => {
    tokenizer.beginTracking();
    tokenizer.advance();
    return tokenizer.emitToken();
  },
};

const CaretParseHandler: ParseHandler = {
  shouldHandle: (beg) => beg.text === "^",
  handle: (beg, tokens, handlingSettings) => {
    console.log("! encountered caret during parsing");
    return Value.mkSyntax(
      beg.range,
      Value.mkList(Value.mkSym(CaretTag), parseValue(tokens, handlingSettings)),
    );
  },
};

function parseTemplateSolution(src: string) {
  const tokenizer = new Tokenizer(src, {
    customHandlers: [
      ...DefaultTokenHandlingSettings.customHandlers,
      BacktickHandler,
      CaretHandler,
    ],
    defaultHandler: DefaultTokenHandlingSettings.defaultHandler,
  });
  const tokens = stringToTokens(src, tokenizer);
  // console.log([...tokens]);

  const values = [];
  while (tokens.length > 0) {
    values.push(
      parseValue(tokens, {
        customHandlers: [
          ...DefaultParseHandlingSettings.customHandlers,
          BacktickParseHandler,
          CaretParseHandler,
        ],
        defaultHandler: DefaultParseHandlingSettings.defaultHandler,
      }),
    );
  }

  return new AST(values);
}

export function generateFromScamper(src: string) {
  const { nodes: queue } = parseTemplateSolution(src);

  // console.log(queue);
  const blockMap = new Map<string, BlockData>();

  for (const node of queue) {
    turnIntoBlock(node, blockMap);
  }

  return blockMap;
}
