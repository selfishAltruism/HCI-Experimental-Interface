declare namespace Main {
  //Store
  export interface Store {
    diameter: number;
    background: string;
    startTime: number;
    grappleTimes: number[];
    totalTime: number;
    totalClicks: number;

    reset: () => void;
    setDiameter: (data: number) => void;
    setBackground: (data: string) => void;
    start: () => void;
    click: () => void;
    grapple: () => void;
    finish: () => void;
  }
}
