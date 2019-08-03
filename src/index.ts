import { UserForm } from "./views/UserForm";
import { User } from "./models/User";

const user = User.buildUser({ name: "Spencer", age: 28 });

const root = document.getElementById("root");
if (!root) {
  throw new Error("Root element not found!");
}

const userForm = new UserForm(root, user);
userForm.render();
