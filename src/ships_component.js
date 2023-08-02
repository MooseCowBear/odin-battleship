import { addElement } from "./view_helpers";

export default function shipsComponent(parent, player1Board) {
  const ships = player1Board.getShips();

  function drag(e) {
    e.dataTransfer.setData("text", e.target.id);
  }

  function flipShip(e) {
    const wrapper = e.target.closest(".wrapper");
    const index = parseInt(wrapper.id.slice(-1), 10);
    const ship = ships[index];
    ship.flipOrientation();

    // need to swap out classes on shipwrapper
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
    ["text-xl", "font-semibold"],
    "Add Your Ships"
  );
  addElement("button", titleWrapper, [], "Random Placement", { id: "random" });

  addElement(
    "p",
    component,
    ["max-w-prose"],
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
        const front = i > 0 ? "bg-zinc-400" : "bg-zinc-500";
        addElement("div", shipWrapper, [
          "h-8",
          "w-8",
          "sm:h-10",
          "sm:w-10",
          "rounded-sm",
          front,
        ]); // will change
      }
    }
    id += 1;
  });
}
