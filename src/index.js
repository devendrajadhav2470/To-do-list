import { buttonhandler } from "./domstuff";
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
// Required for side-effects
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhKn4WJXUt4PGAOuILloHvGz2HJlpT4aA",
  authDomain: "mytodolist-8c338.firebaseapp.com",
  projectId: "mytodolist-8c338",
  storageBucket: "mytodolist-8c338.appspot.com",
  messagingSenderId: "167010813591",
  appId: "1:167010813591:web:d36d54dedd81c348b2cbd2",
  measurementId: "G-T1QFD1G12S",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
import { collection, addDoc } from "firebase/firestore";

try {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815,
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}


const Todolist = (() => {
  let lis = [];
  return { lis };
})();
const Todo = (
  title = "untitled",
  description = "",
  dueDate = "",
  priority = "high",
  status = "not done"
) => {
  return { title, description, dueDate, priority, status };
};
const Project = (
  title = "untitled",
  description = "",
  status = "incomplete"
) => {
  let lis = [];
  function addTodo(todo) {
    lis.push(todo);
  }
  function removeTodo(i) {
    lis.splice(i, i);
  }

  return { title, description, status, lis, addTodo, removeTodo };
};
const control = (() => {
  function addproject(
    title = "untitled",
    description = "",
    status = "incomplete"
  ) {
    const temp = Project(title, description, status);
    Todolist.lis.push(temp);
  }
  function removeproject(i) {
    Todolist.lis.splice(i, i);
  }
  return { addproject, removeproject };
})();
// the whole application is nothing but a list of projects

export { control, Todolist, Todo };
