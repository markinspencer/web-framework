import { User } from "./models/User";

const user = new User({ name: "Spencer", age: 28 });

user.on("change", () => {
  console.log("change 1");
});

user.on("change", () => {
  console.log("change 2");
});

user.on("save", () => {
  console.log("save was triggered");
});

user.trigger("change");
user.trigger("save");
user.trigger("doesntExist");
