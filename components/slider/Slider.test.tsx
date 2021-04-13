import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Partial, Full, Empty } from "./Slider.stories";

it("renders the partial slider and show rounded percentage", () => {
  render(<Partial {...Partial.args} />);
  screen.getByText("67%");
  expect(screen.getByRole("slider")).toHaveAttribute("max", "30");
  expect(screen.getByRole("slider")).toHaveAttribute("value", "20");
});

it("renders the full slider and show rounded percentage", () => {
  render(<Full {...Full.args} />);
  screen.getByText("100%");
});

it("renders the full slider and show rounded percentage", () => {
  render(<Empty {...Empty.args} />);
  screen.getByText("0%");
});

// it("fires change event with new value", () => {
//   render(
//     <Partial {...Partial.args} onChange={(newValue) => console.log(newValue)} />
//   );
//   fireEvent.change(screen.getByRole("slider"), { target: { value: "30" } });
// });
