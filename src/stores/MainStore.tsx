const KEY = "DATA";

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
        if (state.grappleTimes.length > 3) {
          const time = Date.now();
          state.grappleTimes.push(time - state.startTime);
          state.totalTime = time - state.startTime;

          const previousData = localStorage.getItem(KEY);

          if (previousData) {
            const data = JSON.parse(previousData).push({
              diameter: state.diameter,
              background: state.background,
              grappleTimes: state.grappleTimes,
              totalTime: state.totalTime,
              totalClicks: state.totalClicks,
            });
            localStorage.removeItem(KEY);
            localStorage.setItem(KEY, JSON.stringify(data));
          } else {
            const data = [
              {
                diameter: state.diameter,
                background: state.background,
                grappleTimes: state.grappleTimes,
                totalTime: state.totalTime,
                totalClicks: state.totalClicks,
              },
            ];
            localStorage.setItem(KEY, JSON.stringify(data));
          }
        } else state.grappleTimes.push(Date.now() - state.startTime);
      });
    },
  }))
);

export default MainStore;
