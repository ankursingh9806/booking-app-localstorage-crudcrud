const form = document.getElementById("my-form");
const userList = document.getElementById("user-list");

form.addEventListener("submit", addAppointmentData);

function loadAppointmentData() {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const data = localStorage.getItem(key);
        const userData = JSON.parse(data);
        showOnScreen(userData);
    }
}
loadAppointmentData();

function addAppointmentData(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const userData = {
        name: name,
        email: email,
        phone: phone
    };
    const data = JSON.stringify(userData)
    localStorage.setItem(email, data);
    showOnScreen(userData);
    form.reset();
}

function showOnScreen(user) {
    const listItem = document.createElement("li");
    const textNode = document.createTextNode(`${user.name} ${user.phone} ${user.email}`);
    listItem.appendChild(textNode);

    const deleteButton = document.createElement("button");
    const editButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    editButton.innerHTML = "Edit";

    deleteButton.addEventListener("click", function () {
        deleteAppointmentData(user, listItem);
    });
    editButton.addEventListener("click", function () {
        updateAppointmentData(user, listItem);
    });

    listItem.appendChild(deleteButton);
    listItem.appendChild(editButton);
    userList.appendChild(listItem);
}

function deleteAppointmentData(user, listItem) {
    localStorage.removeItem(user.email);
    userList.removeChild(listItem);
}

function updateAppointmentData(user, listItem) {
    document.getElementById("name").value = user.name;
    document.getElementById("email").value = user.email;
    document.getElementById("phone").value = user.phone;
    localStorage.removeItem(user.email);
    userList.removeChild(listItem);
}