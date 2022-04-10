import { Provider } from "react-redux";
// import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { startLevel, openCell } from "./Game/shared/action";
import App from "./App";
import GameOver from "./Game/GameOver";

const mockStore = configureStore([]);

describe("Minesweeper Application Component", () => {
  let store: any;
  let component: any;

  beforeEach(() => {
    store = mockStore({
      map: [],
      gameStarted: true,
      currentLevel: "0",
      gameOver: 0,
      message: "",
    });
    store.dispatch = jest.fn();

    component = renderer.create(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  it("should render with given state from Redux store", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });

  // Testing Menu component
  it("should dispatch startlevel action when click on beginner menu item", () => {
    renderer.act(() => {
      component.root.findAllByType("button")[0].props.onClick();
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(startLevel("1"));
  });

  it("should dispatch startlevel action when click on intermediate menu item", () => {
    renderer.act(() => {
      component.root.findAllByType("button")[1].props.onClick();
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(startLevel("2"));
  });

  it("should dispatch startlevel action when click on advanced menu item", () => {
    renderer.act(() => {
      component.root.findAllByType("button")[2].props.onClick();
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(startLevel("3"));
  });

  it("should dispatch startlevel action when click on expert menu item", () => {
    renderer.act(() => {
      component.root.findAllByType("button")[3].props.onClick();
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(startLevel("4"));
  });
});
// test("renders learn react link", () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
