export interface Slot{
  id:string;
  locked:boolean;
}

export type ConstantBlock={
  type:"constant";
  value:string;
}

export type BlockWithChildren = {
  type:"containsEntries"
  children: (Slot | null)[];
  expandable?: boolean;
}

export type BlockData = ConstantBlock | BlockWithChildren;
