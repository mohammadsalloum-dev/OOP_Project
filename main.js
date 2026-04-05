const name1 = document.getElementById("name");
const email = document.getElementById("email");
const usersData = document.getElementById("usersData");
const addUser = document.getElementById("addUser");
const showAllUsersBtn = document.getElementById("showAllUsers");
const deleteAllUsers = document.getElementById("deleteAllUsers");
const idInput = document.getElementById("id");
const arrOfUsers = [];

class User {
  constructor(name, email, id) {
    this.name = name;
    this.email = email;
    this.id = id;
  }
}
function showAllUsers() {
  if (arrOfUsers.length == 0) {
    usersData.innerHTML = "No Users";
    document.getElementById("usersData").scrollIntoView({ behavior: "smooth" });
    return;
  }
  document.getElementById("usersData").scrollIntoView({ behavior: "smooth" });
  const usersDataOList = document.createElement("ol");
  document.getElementById("usersData").innerHTML = "";

  arrOfUsers.forEach((user) => {
    const Li = document.createElement("li");
    Li.textContent = `The Name Is: ${user.name} & Email Is:  ${user.email} & Id Is: ${user.id}`;

    const editP = document.createElement("p");
    editP.textContent = "Edit";
    editP.style.cursor = "pointer";
    editP.style.color = "yellow";
    editP.style.backgroundColor = "blue";
    editP.style.fontWeight = "bold";
    editP.addEventListener("click", () => {
      editUser(user.id);
    });

    const deleteP = document.createElement("p");
    deleteP.textContent = "Delete";
    deleteP.style.cursor = "pointer";
    deleteP.style.color = "red";
    deleteP.style.backgroundColor = "yellow";
    deleteP.style.fontWeight = "bold";
    deleteP.addEventListener("click", () => {
      deleteUser(user.id);
    });

    Li.appendChild(editP);
    Li.appendChild(deleteP);
    usersDataOList.appendChild(Li);
  });
  usersData.appendChild(usersDataOList);
}

window.addEventListener("load", () => {
  const storedUsers = localStorage.getItem("users");
  if (storedUsers) {
    JSON.parse(storedUsers).forEach((u) =>
      arrOfUsers.push(new User(u.name, u.email, u.id)),
    );
  }
  showAllUsers();
});
addUser.addEventListener("click", () => {
  const userName = name1.value.trim();
  const userEmail = email.value.trim();
  const userId = idInput.value.trim();
  if (userName == "" || userEmail == "" || userId == "") {
    alert("Empty Fields");
    return;
  }

  const exists = arrOfUsers.some((user) => user.id === userId);

  if (exists) {
    alert("Try Another Id");
    return;
  }
  arrOfUsers.push(new User(userName, userEmail, userId));
  localStorage.setItem("users", JSON.stringify(arrOfUsers));

  alert("User has been added successfully");

  name1.value = "";
  email.value = "";
  idInput.value = "";
});

showAllUsersBtn.addEventListener("click", () => {
  showAllUsers();
});

deleteAllUsers.addEventListener("click", () => {
  localStorage.removeItem("users");
  arrOfUsers.length = 0;
  usersData.innerHTML = "All Users Have Been Deleted";
  document.getElementById("usersData").scrollIntoView({ behavior: "smooth" });
});

let flag = 0;
// ======================================================================
function deleteUser(id) {
  const timeDiv = document.createElement("Div");
  const timePara = document.createElement("p");
  const timeCounter = document.createElement("button");
  const undo = document.createElement("button");

  if (flag !== 1) {
    flag = 1;
    undo.textContent = "undo";
    undo.style.visibility = "hidden";

    usersData.style.position = "relative";
    timeDiv.style.position = "absolute";
    timeDiv.style.display = "flex";
    timeDiv.style.flexDirection = "column";
    timeDiv.style.alignItems = "center";
    timeDiv.style.alignContent = "center";

    timeDiv.appendChild(timePara);
    timeDiv.appendChild(undo);
    usersData.appendChild(timeDiv);
    let timer = 10;

    const interval = setInterval(() => {
      timePara.textContent = `User with id ${id} will be deleted after ${timer}`;
      undo.style.visibility = "visible";

      timer--;
      if (timer < 0) {
        clearInterval(interval);
        const newArr = arrOfUsers.filter((user) => user.id != id);

        arrOfUsers.length = 0;

        arrOfUsers.push(...newArr);

        localStorage.setItem("users", JSON.stringify(arrOfUsers));
        showAllUsers();

        timeDiv.remove();
      }
      undo.onclick = () => {
        clearInterval(interval);
        timeDiv.remove();
        flag = 0;
      };
    }, 1000);
  }
}
// ======================================================================

function editUser(userId) {
  const userIndex = arrOfUsers.findIndex((user) => user.id === userId);
  const editDiv = document.createElement("div");
  editDiv.classList.add("editDiv");
  editDiv.style.display = "flex";
  editDiv.style.flexDirection = "column";
  editDiv.style.width = "100%";
  editDiv.style.justifyContent = " center";
  editDiv.style.alignItems = " center";
  editDiv.style.alignContent = " center";
  editDiv.style.justifyItems = " center";

  editDiv.style.marginLeft = "auto";
  const userLi = usersData.querySelectorAll("li")[userIndex];

  const existingEditDiv = userLi.querySelector(".editDiv");
  if (existingEditDiv) existingEditDiv.remove();

  const nameEdit = document.createElement("input");
  nameEdit.value = arrOfUsers[userIndex].name;
  nameEdit.style.width = "100%";

  const emailEdit = document.createElement("input");
  emailEdit.value = arrOfUsers[userIndex].email;
  emailEdit.style.width = "100%";

  const IDEdit = document.createElement("input");
  IDEdit.value = arrOfUsers[userIndex].id;
  IDEdit.style.width = "100%";

  const updateBtn = document.createElement("button");
  updateBtn.textContent = "Update";

  updateBtn.addEventListener("click", () => {
    const exists = arrOfUsers.some((user) => user.id === IDEdit.value);
    if (exists && arrOfUsers[userIndex].id !== IDEdit.value) {
      alert("Try another Id");
      return;
    }
    arrOfUsers[userIndex].name = nameEdit.value.trim();
    arrOfUsers[userIndex].email = emailEdit.value.trim();
    arrOfUsers[userIndex].id = IDEdit.value.trim();

    localStorage.setItem("users", JSON.stringify(arrOfUsers));

    editDiv.remove();
    showAllUsers();
  });

  editDiv.appendChild(nameEdit);
  editDiv.appendChild(emailEdit);
  editDiv.appendChild(IDEdit);
  editDiv.appendChild(updateBtn);

  userLi.appendChild(editDiv);
}
