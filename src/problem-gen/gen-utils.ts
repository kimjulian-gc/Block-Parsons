import {
  parseValue,
  stringToTokens,
  Tokenizer,
} from "scamper/src/parser/parser.ts";
import { AST, SyntaxNode } from "scamper/src/ast.ts";
import { newUUID, SectionTitles, throwNull } from "../common/utils.ts";
import type { BlockData } from "../common/providers/block/block-types.ts";
import type { TokenHandler } from "scamper/src/parser/tokenhandler.ts";
import { DefaultTokenHandlingSettings } from "scamper/src/parser/tokenhandler.ts";
import {
  DefaultParseHandlingSettings,
  type ParseHandler,
} from "scamper/src/parser/parsehandler.ts";
import { Value } from "scamper/src/lang";

function turnIntoBlock(
  node: SyntaxNode,
  blockMap: Map<string, BlockData>,
  // caretInversion: boolean = false,
): string {
  const blockId = newUUID();
  // console.log(node);
  if (node.simplename.toLowerCase() !== "s-expression") {
    blockMap.set(blockId, {
      type: "ConstantBlock",
      value: node.simplename,
      parentId: SectionTitles.BlockLibrary,
    });
    return blockId;
  }

  // otherwise it is an s-expression with optional children
  const firstNode = node.children.shift();
  if (!firstNode) {
    throw new Error(
      "Scamper is broken: first node of s-expression doesn't exist?",
    );
  }

  // if it includes a backtick, it should be popped out
  // if it doesn't, it should
  if (firstNode.simplename.includes("backtick")) {
    console.log("! backtick", firstNode, node.children);
  }

  function updateParentOfChild(childId: string) {
    const blockData =
      blockMap.get(childId) ?? throwNull("somehow block data doesn't exist?");
    blockMap.set(childId, {
      ...blockData,
      parentId: blockId,
    });
  }

  // turnIntoBlock(firstNode, blockMap);
  // TODO: support special syntax
  const firstBlockId = turnIntoBlock(firstNode, blockMap);
  updateParentOfChild(firstBlockId);

  // const blockChildren = [{ id: null, locked: false }];
  const blockChildren = [{ id: firstBlockId, locked: false }];
  for (const child of node.children) {
    // turnIntoBlock(child, blockMap);
    // blockChildren.push({ id: null, locked: false });
    const childId = turnIntoBlock(child, blockMap);
    updateParentOfChild(childId);
    blockChildren.push({ id: childId, locked: false });
  }

  blockMap.set(blockId, {
    type: "BlockWithChildren",
    parentId: SectionTitles.BlockLibrary,
    children: blockChildren,
  });

  return blockId;
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
        Value.mkSym("extract-block"),
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
      Value.mkList(
        Value.mkSym("invert-conversion"),
        parseValue(tokens, handlingSettings),
      ),
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
