const form = document.getElementById("my-form");
const userList = document.getElementById("user-list");

form.addEventListener("submit", addAppointmentData);
document.addEventListener("DOMContentLoaded", loadAppointmentData);

async function loadAppointmentData() {
    try {
        const res = await axios.get("https://crudcrud.com/api/3d233eeac5d34d168f56f6d9f1872466/users");
        res.data.forEach((userData) => {
            showOnScreen(userData);
        })
    } catch (err) {
        console.error("failed to load users:", err);
    }
}

async function addAppointmentData(e) {
    try {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const phone = e.target.phone.value;
        const userData = {
            name: name,
            email: email,
            phone: phone
        };
        const res = await axios.post("https://crudcrud.com/api/3d233eeac5d34d168f56f6d9f1872466/users", userData);
        showOnScreen(userData);
        form.reset();
    } catch (err) {
        console.error("failed to save user:", err);
    }
}

function showOnScreen(user) {
    const listItem = document.createElement("li");
    const textNode = document.createTextNode(`${user.name} ${user.email} ${user.phone}`);
    listItem.appendChild(textNode);

    const deleteButton = document.createElement("button");
    const editButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    editButton.innerHTML = "Edit";

    let userId = user._id;
    deleteButton.addEventListener("click", function () {
        deleteAppointmentData(user, userId, listItem);
    });
    editButton.addEventListener("click", function () {
        updateAppointmentData(user, userId, listItem);
    });

    listItem.appendChild(deleteButton);
    listItem.appendChild(editButton);
    userList.appendChild(listItem);
}

async function deleteAppointmentData(user, userId, listItem) {
    try {
        const res = await axios.delete(`https://crudcrud.com/api/3d233eeac5d34d168f56f6d9f1872466/users/${userId}`);
        userList.removeChild(listItem);
    } catch (err) {
        console.error("failed to delete user:", err);
    }
}

async function updateAppointmentData(user, userId, listItem) {
    try {
        document.getElementById("name").value = user.name;
        document.getElementById("email").value = user.email;
        document.getElementById("phone").value = user.phone;

        form.removeEventListener("submit", addAppointmentData);
        form.addEventListener("submit", editAppointmentData);

        async function editAppointmentData(e) {
            try {
                e.preventDefault();
                const updatedName = e.target.name.value;
                const updatedEmail = e.target.email.value;
                const updatedPhone = e.target.phone.value;

                const updatedUserData = {
                    name: updatedName,
                    email: updatedEmail,
                    phone: updatedPhone
                };

                const res = await axios.put(`https://crudcrud.com/api/3d233eeac5d34d168f56f6d9f1872466/users/${userId}`, updatedUserData);
                user.name = updatedName;
                user.email = updatedEmail;
                user.phone = updatedPhone;

                listItem.firstChild.textContent = `${updatedName} ${updatedEmail} ${updatedPhone}`;

                form.reset();
            } catch (err) {
                console.error("failed to edit user:", err);
            }
        }
    } catch (err) {
        console.error("failed to update user:", err);
    }
}
