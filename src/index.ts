import { User } from "./models/User";

const user = new User({ name: "newrecord", age: 0 });

user.events.on("change", () => {
  console.log("change made!");
});

user.events.trigger("change");
