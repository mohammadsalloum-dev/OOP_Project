* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: rgba(0, 0, 0, 0.806);
}

form {
    padding: 20px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: calc(auto) + 100px;
    height: 500px;
    border-radius: 50px;
    -webkit-border-radius: 50px;
    -moz-border-radius: 50px;
    -ms-border-radius: 50px;
    -o-border-radius: 50px;
}

form input {
    height: 30px;
    width: auto;
    padding: 20px 20px;
    border-radius: 50px;
    -webkit-border-radius: 50px;
    -moz-border-radius: 50px;
    -ms-border-radius: 50px;
    -o-border-radius: 50px;
    border: none;
    font-size: 16px;
}

.btns {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.name,
.email,
.id {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    background-color: #4B8BBE;
    width: auto;
    padding: 20px;
    margin-bottom: 10px;
    border-radius: 50px;
    -webkit-border-radius: 50px;
    -moz-border-radius: 50px;
    -ms-border-radius: 50px;
    -o-border-radius: 50px;
    color: white;
    font-size: 20px;
}

.id {
    margin-top: -10px;
}

.name:hover,
.email:hover,
.id:hover {
    background-color: #5d96c5;
}

.form {
    height: 100vh;
}


form button {
    width: auto;
    height: 50px;
    border-radius: 50px;
    -webkit-border-radius: 50px;
    -moz-border-radius: 50px;
    -ms-border-radius: 50px;
    -o-border-radius: 50px;
    cursor: pointer;
    padding: 10px;
    width: 204px;
    border: none;
    background-color: #5CB85C;
    color: white;
    font-weight: bold;
}


form button:hover {
    color: #5CB85C;
    background-color: rgb(229, 227, 227);
}

#deleteAllUsers {
    background-color: #DC3545;
}

#deleteAllUsers:hover {
    background-color: rgb(229, 227, 227);
    color: #DC3545;
}

h1 {
    color: white;
    margin-top: 30px;
    font-size: 60px;
    text-align: center;
}

#usersData {
    margin-top: 30px;
    color: white;
    font-family: 'Courier New', Courier, monospace;
    text-align: center;
}

h1:nth-child(1) {
    margin-bottom: 20px;
    margin-top: 0;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.users-data {
    height: 100vh;
    padding-top: 20px;
}

.email {
    margin-bottom: 20px;
}

#usersData {
    display: inline-block;
}
