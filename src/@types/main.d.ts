declare namespace Main {
  //Store
  export interface Store {
    diameter: number;
    background: string;
    startTime: number;
    grappleTimes: number[];
    totalTime: number;
    totalClicks: number;

    setClick: (num: number) => void;
    reset: () => void;
    setDiameter: (data: number) => void;
    setBackground: (data: string) => void;
    start: () => void;
    click: () => void;
    grapple: () => void;
    finish: (id: number) => void;
  }
}
