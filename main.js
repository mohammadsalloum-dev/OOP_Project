// ======================================================================

const name1 = document.getElementById("name");
const email = document.getElementById("email");
const usersData = document.getElementById("usersData");
const addUser = document.getElementById("addUser");
const showAllUsersBtn = document.getElementById("showAllUsers");
const deleteAllUsers = document.getElementById("deleteAllUsers");
const idInput = document.getElementById("id");
const arrOfUsers = [];
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
// ======================================================================

class User {
  constructor(name, email, id) {
    this.name = name;
    this.email = email;
    this.id = id;
    this.count = 0;
    this.count = arrOfUsers.length + 1;
  }
}
// ======================================================================

function showAllUsers() {
  const Ol = document.createElement("ol");
  if (arrOfUsers.length == 0) {
    usersData.innerHTML = "No Users";
    document.getElementById("usersData").scrollIntoView({ behavior: "smooth" });
    return;
  }
  document.getElementById("usersData").scrollIntoView({ behavior: "smooth" });
  document.getElementById("usersData").innerHTML = "";

  arrOfUsers.forEach((user) => {
    const Li = document.createElement("li");
    Li.id = `LiCom-${user.count}`;
    Li.className = "view";
    const userSpan = document.createElement("span");
    userSpan.className = "userText";
    userSpan.textContent = `${user.count}- The Name Is: ${user.name} & Email Is:  ${user.email} & Id Is: ${user.id}`;
    Li.appendChild(userSpan);

    const editP = document.createElement("Button");
    editP.textContent = "Edit";
    editP.style.cursor = "pointer";
    editP.style.fontWeight = "bold";
    editP.className = "editButton";
    editP.id = "editBtnId";
    editP.addEventListener("click", () => {
      editUser(user.id);
    });

    const deleteP = document.createElement("Button");
    deleteP.textContent = "Delete";
    deleteP.style.cursor = "pointer";
    deleteP.style.fontWeight = "bold";
    deleteP.className = "deleteButton";
    deleteP.id = "deleteBtnId";
    deleteP.addEventListener("click", () => {
      deleteUser(user.id, user.count);
    });

    Li.style.display = "flex";
    Li.style.flexDirection = "column";
    Li.style.justifyContent = "space-between";
    Li.appendChild(editP);
    Li.appendChild(deleteP);
    Li.style.paddingTop = "20px";
    Ol.appendChild(Li);
    usersData.style.paddingLeft = "20px";
    usersData.style.paddingRight = "20px";
  });
  usersData.appendChild(Ol);
}
// ======================================================================

window.addEventListener("load", () => {
  const storedUsers = localStorage.getItem("users");
  if (storedUsers) {
    JSON.parse(storedUsers).forEach((u) =>
      arrOfUsers.push(new User(u.name, u.email, u.id)),
    );
  }
  showAllUsers();
});
// ======================================================================

addUser.addEventListener("click", () => {
  name1.style.backgroundColor = "white";
  email.style.backgroundColor = "white";
  idInput.style.backgroundColor = "white";

  const userName = name1.value.trim();
  const userEmail = email.value.trim();
  const userId = idInput.value.trim();
  if (userName == "" || userEmail == "" || userId == "") {
    if (userName == "") {
      name1.style.backgroundColor = "red";
      alert("Empty Field: 'Add a name'");
    }
    if (userEmail == "") {
      email.style.backgroundColor = "red";
      alert("Empty Field: 'Add an email'");
    }
    if (userId == "") {
      idInput.style.backgroundColor = "red";
      alert("Empty Field: 'Add an id'");
    }
    return;
  }

  function isValidEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }

  if (isValidEmail(email.value)) {
  } else {
    alert("Invalid Email\n Example: text@text.com");
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
  showAllUsers();
});
// ======================================================================

showAllUsersBtn.addEventListener("click", () => {
  showAllUsers();
});
// ======================================================================

deleteAllUsers.addEventListener("click", () => {
  localStorage.removeItem("users");
  arrOfUsers.length = 0;
  usersData.innerHTML = "All Users Have Been Deleted";
  document.getElementById("usersData").scrollIntoView({ behavior: "smooth" });
});
// ======================================================================

let flag = 0;
// ======================================================================

function deleteUser(id, count) {
  const timeDiv = document.createElement("Div");
  const timePara = document.createElement("p"); //
  const undo = document.createElement("button"); //
  const LiCom = document.getElementById(`LiCom-${count}`);
  const deleteBtnId = document.getElementById("deleteBtnId");
  timeDiv.id = `timeDivForUser-${count}`;
  timeDiv.className = "deleteDiv";
  timePara.className = "timePara";
  undo.className = "undoBtn";

  if (flag == 0) {
    flag = 1;
    undo.textContent = "undo";
    undo.style.visibility = "hidden";

    timeDiv.style.display = "flex";
    timeDiv.style.flexDirection = "column";
    timeDiv.style.alignItems = "center";
    timeDiv.style.alignContent = "center";

    timeDiv.appendChild(timePara);
    timeDiv.appendChild(undo);

    LiCom.appendChild(timeDiv);

    let timer = 5;

    const interval = setInterval(() => {
      deleteBtnId.style.visibility = "hidden";
      const timeDivforUser = document.getElementById(`timeDivForUser-${count}`);
      timePara.textContent = `User with id ${id} will be deleted after ${timer}`;
      undo.style.visibility = "visible";

      timer--;
      if (timer < 0) {
        clearInterval(interval);
        const newArr = arrOfUsers.filter((user) => user.id != id);
        arrOfUsers.length = 0;

        arrOfUsers.push(...newArr);

        localStorage.setItem("users", JSON.stringify(arrOfUsers));

        timeDiv.remove();
        LiCom.remove();
      }
      undo.onclick = () => {
        clearInterval(interval);
        timeDivforUser.remove();
        flag = 0;
        deleteBtnId.style.visibility = "visible";
      };
    }, 1000);
  }
  flag = 0;
}
// ======================================================================

function editUser(userId) {
  const userIndex = arrOfUsers.findIndex((user) => user.id === userId);
  const editDiv = document.createElement("div");
  editDiv.classList.add("editDiv");
  editDiv.style.display = "flex";
  editDiv.style.flexDirection = "column";
  editDiv.style.width = "100%";
  editDiv.style.justifyContent = "center";
  editDiv.style.alignItems = "center";
  editDiv.style.alignContent = "center";
  editDiv.style.justifyItems = "center";
  editDiv.style.marginLeft = "auto";

  const userLi = usersData.querySelectorAll("li")[userIndex];

  const existingEditDiv = userLi.querySelector(".editDiv");
  if (existingEditDiv) existingEditDiv.remove();

  const nameEdit = document.createElement("input");
  nameEdit.value = arrOfUsers[userIndex].name;
  nameEdit.style.width = "100%";
  nameEdit.className = "nameEdit";

  const emailEdit = document.createElement("input");
  emailEdit.value = arrOfUsers[userIndex].email;
  emailEdit.style.width = "100%";
  emailEdit.className = "emailEdit";

  const IDEdit = document.createElement("input");
  IDEdit.value = arrOfUsers[userIndex].id;
  IDEdit.style.width = "100%";
  IDEdit.className = "IDEdit";

  const updateBtn = document.createElement("button");
  updateBtn.textContent = "Update";
  updateBtn.className = "updateButton";

  updateBtn.addEventListener("click", () => {
    const exists = arrOfUsers.some((user) => user.id === IDEdit.value);
    if (exists && arrOfUsers[userIndex].id !== IDEdit.value) {
      alert("Try another Id");
      return;
    }

    function isValidEmail(email) {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return pattern.test(email);
    }

    if (!isValidEmail(emailEdit.value)) {
      alert("Invalid Email\n Example: text@text.com");
      return;
    }

    arrOfUsers[userIndex].name = nameEdit.value.trim();
    arrOfUsers[userIndex].email = emailEdit.value.trim();
    arrOfUsers[userIndex].id = IDEdit.value.trim();

    localStorage.setItem("users", JSON.stringify(arrOfUsers));

    const li = usersData.querySelectorAll("li")[userIndex];
    const span = li.querySelector(".userText");
    if (span) {
      span.textContent = `${arrOfUsers[userIndex].count}- The Name Is: ${arrOfUsers[userIndex].name} & Email Is: ${arrOfUsers[userIndex].email} & Id Is: ${arrOfUsers[userIndex].id}`;
    }

    editDiv.remove();
  });

  editDiv.appendChild(nameEdit);
  editDiv.appendChild(emailEdit);
  editDiv.appendChild(IDEdit);
  editDiv.appendChild(updateBtn);

  userLi.appendChild(editDiv);
}
// ======================================================================
searchInput.addEventListener("input", search);
// ======================================================================

function search() {
  const value = searchInput.value.trim().toLowerCase();

  arrOfUsers.forEach((user) => {
    const li = document.getElementById(`LiCom-${user.count}`);
    const nameMatch = user.name.toLowerCase().includes(value);

    if (nameMatch) {
      li.style.display = "flex";
    } else {
      li.style.display = "none";
    }
  });
}

// id should be 6 digits
