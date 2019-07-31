import { User } from "./models/User";

const user = new User({ name: "Spencer", age: 28 });

user.set({ age: 29 });
console.log(user);
user.set({ name: "Mai", age: 24 });
console.log(user);
