import "@testing-library/jest-dom";

beforeAll(() => {
  globalThis.primary = "#343A40";
  globalThis.secondary = "#DEE2E6";
  globalThis.resizeScreen = (width: number) => { 
    (window as any).innerWidth = width;
    window.dispatchEvent(new Event("resize"));
  };
});

declare global {
  var primary: string;
  var secondary: string;
  var resizeScreen: (width: number) => void;
};
