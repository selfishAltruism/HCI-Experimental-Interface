import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const MainStore = create<Main.Store>()(
  immer((set) => ({
    diameter: 30,
    background: "white",

    startTime: 0,
    grappleTimes: [],
    totalTime: 0,

    totalClicks: 0,

    reset: () => {
      set(() => ({
        diameter: 30,
        background: "white",

        startTime: [],
        grappleTimes: [],

        totalClicks: 0,
      }));
    },

    setDiameter: (data: number) => {
      set(() => ({
        diameter: data,
      }));
    },

    setBackground: (data: string) => {
      set(() => ({
        background: data,
      }));
    },

    start: () => {
      set(() => ({
        startTime: Date.now(),
      }));
    },

    click: () => {
      set((state) => {
        state.totalClicks++;
      });
    },

    grapple: () => {
      set((state) => {
        state.grappleTimes.push(Date.now() - state.startTime);
      });
    },

    finish: (id) => {
      set((state) => {
        const key = "GAME-" + id;
        state.totalTime = state.grappleTimes[4];

        localStorage.setItem(
          key,
          JSON.stringify({
            diameter: state.diameter,
            background: state.background,
            grappleTimes: state.grappleTimes,
            totalTime: state.totalTime,
            totalClicks: state.totalClicks,
          })
        );
      });
    },
  }))
);

export default MainStore;
