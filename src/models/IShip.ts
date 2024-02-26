export interface IShip {
  position: {
    x: number;
    y: number;
  };
  direction: boolean;
  type: string;
  length: number;
}