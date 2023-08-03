import { addElement } from "./view_helpers";
import { shipColors, shipColorsStart } from "./ship_colors";

export default function shipsComponent(parent, player1Board) {
  const colors = shipColors();
  const startColors = shipColorsStart();
  const ships = player1Board.getShips();

  function drag(e) {
    e.dataTransfer.setData("text", e.target.id);
  }

  function flipShip(e) {
    const wrapper = e.target.closest(".wrapper");
    const index = parseInt(wrapper.id.slice(-1), 10);
    const ship = ships[index];
    ship.flipOrientation();

    // for redrawing the ship
    if (ship.isHorizontal()) {
      wrapper.classList.remove("flex-col");
    } else {
      wrapper.classList.add("flex-col");
    }
  }

  // eslint-disable-next-line no-param-reassign
  parent.textContent = "";
  const component = addElement("div", parent, [
    "flex",
    "flex-col",
    "gap-5",
    "justify-around",
  ]);
  const titleWrapper = addElement("div", component, ["flex", "gap-5"]);
  addElement(
    "h2",
    titleWrapper,
    ["text-xl", "font-semibold", "flex", "items-center", "gap-5"],
    "Add Your Ships"
  );
  addElement(
    "button",
    titleWrapper,
    [
      "border-2",
      "border-gray-800",
      "p-2",
      "rounded",
      "hover:border-gray-100",
      "hover:bg-gray-800",
      "hover:text-gray-100",
    ],
    "Random Placement",
    { id: "random" }
  );

  addElement(
    "p",
    component,
    ["max-w-[45ch]"],
    "Doubleclick to change ship orientation. Drag and drop ships to desired locations. Or choose a random placement."
  );

  let id = 0;

  ships.forEach((ship) => {
    if (ship.getPosition() === null) {
      const classes = ["flex", "gap-1", "wrapper"];
      if (!ship.isHorizontal()) {
        classes.push("flex-col");
      }
      const shipWrapper = addElement("div", component, classes, "", {
        draggable: true,
        id: `ship-${id}`,
      });
      shipWrapper.addEventListener("dragstart", drag);
      shipWrapper.addEventListener("dblclick", flipShip);

      for (let i = 0; i < ship.getLength(); i += 1) {
        const color =
          i > 0
            ? colors[`${ship.getLength()}`]
            : startColors[`${ship.getLength()}`];

        addElement("div", shipWrapper, [
          "h-6",
          "w-6",
          "sm:h-10",
          "sm:w-10",
          "rounded-sm",
          color,
        ]);
      }
    }
    id += 1;
  });
}
