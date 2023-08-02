import { addElement } from "./view_helpers";

export default function shipsComponent(parent, ships) {
  // eslint-disable-next-line no-param-reassign
  parent.textContent = "";
  const component = addElement("div", parent, [
    "flex",
    "flex-col",
    "gap-5",
    "justify-around",
  ]);
  addElement("h2", component, ["text-xl"], "Add Ships");

  ships.forEach(ship => {
    const classes = ["flex", "gap-2"];
    if (ship.isHorizontal()) {
      classes.push("flex-row");
    } else {
      classes.push("flex-col");
    }
    const shipWrapper = addElement("div", component, classes, "", {"draggable": true});
    console.log(shipWrapper);
    for (let i = 0; i < ship.getLength(); i += 1) {
      addElement("div", shipWrapper, [
        "h-8",
        "w-8",
        "sm:h-10",
        "sm:w-10",
        "rounded-sm",
        "bg-zinc-400",
      ]); // will change
    }
    console.log(component);
  });
}
