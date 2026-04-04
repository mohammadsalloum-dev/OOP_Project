const name1 = document.getElementById("name");
const email = document.getElementById("email");
const usersData = document.getElementById("usersData");
const addUser = document.getElementById("addUser");
const showAllUsers = document.getElementById("showAllUsers");
const deleteAllUsers = document.getElementById("deleteAllUsers");
const arrOfUsers = [];
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}
window.addEventListener("load", () => {
  const storedUsers = localStorage.getItem("users");
  if (storedUsers) {
    JSON.parse(storedUsers).forEach((u) =>
      arrOfUsers.push(new User(u.name, u.email)),
    );
  }
  if (arrOfUsers.length == 0) {
    usersData.innerHTML = "No Users";
    return;
  }
  const usersDataOList = document.createElement("ol");
  document.getElementById("usersData").innerHTML = "";

  arrOfUsers.forEach((user) => {
    usersDataOList.innerHTML =
      usersDataOList.innerHTML +
      `<li>The Name Is: ${user.name} & Email Is:  ${user.email}</li>`;
  });
  usersData.appendChild(usersDataOList);
});
addUser.addEventListener("click", () => {
  const userName = name1.value.trim();
  const userEmail = email.value.trim();
  if (userName == "" || userEmail == "") {
    alert("Empty Fields");
    return;
  }

  arrOfUsers.push(new User(userName, userEmail));
  localStorage.setItem("users", JSON.stringify(arrOfUsers));

  alert("User has been added successfully");
  name1.value = "";
  email.value = "";
});

showAllUsers.addEventListener("click", () => {
  if (arrOfUsers.length == 0) {
    usersData.innerHTML = "No Users";
    document.getElementById("usersData").scrollIntoView({ behavior: "smooth" });
    return;
  }
  document.getElementById("usersData").scrollIntoView({ behavior: "smooth" });
  const usersDataOList = document.createElement("ol");
  document.getElementById("usersData").innerHTML = "";

  arrOfUsers.forEach((user) => {
    usersDataOList.innerHTML =
      usersDataOList.innerHTML +
      `<li>The Name Is: ${user.name} & Email Is:  ${user.email}</li>`;
  });
  usersData.appendChild(usersDataOList);
});

deleteAllUsers.addEventListener("click", () => {
  localStorage.removeItem("users");
  arrOfUsers.length = 0;
  usersData.innerHTML = "All Users Have Been Deleted";
  document.getElementById("usersData").scrollIntoView({ behavior: "smooth" });
});
