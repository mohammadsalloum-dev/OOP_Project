const name1 = document.getElementById("name");
const email = document.getElementById("email");
const usersData = document.getElementById("usersData");
const addUser = document.getElementById("addUser");
const showAllUsers = document.getElementById("showAllUsers");
const arrOfUsers = [];
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}

addUser.addEventListener("click", () => {
  const userName = name1.value.trim();
  const userEmail = email.value.trim();
  if (userName == "" || userEmail == "") {
    alert("Empty Fields");
    return;
  }
  arrOfUsers.push(new User(userName, userEmail));
  alert("User has been added successfully");
  name1.value = "";
  email.value = "";
});

showAllUsers.addEventListener("click", () => {
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
