

export const resetPressed = ( ) => {

  //todo: reset blocks in og position
};


export interface ActionsMadeProps {
  count: number;
  setCount: (count: number) => void;
  setStartTime: (timeTaken: number) => void;
  setTimeTaken: (timeTaken: number) => void;
  timeTaken: number;
}
