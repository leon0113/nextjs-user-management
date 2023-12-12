import { users } from "@/app/util/db"
import { NextResponse } from "next/server";
import fs from 'fs';


//! get specific User Data
export async function GET(_, res) {
    const { id } = await res.params;
    const user = users.filter((user) => user.id === id);
    return NextResponse.json({ user })
}

//! login 
export async function POST(req, res) {
    let { name, age, email } = await req.json();
    const { id } = await res.params;

    const { name: userName, email: userEmail, age: userAge } = users.find((user) => user.id === id);

    if (userName === name && userEmail === email && userAge === age) {
        return NextResponse.json({ result: "User successfully logged in" });
    } else if (!name || !email || !age) {
        return NextResponse.json({ result: "please fill all the inputs" })
    } else {
        return NextResponse.json({ result: `The provided credentials did not match our records.` })
    }
}


//! Update User
export async function PUT(req, res) {
    let { name, age, email } = await req.json();
    const { id } = await res.params;

    // find user from db 
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
        return NextResponse.json({ message: "User not found" }, { status: 200 });
    }

    if (name) {
        users[userIndex].name = name;
    }
    if (age) {
        users[userIndex].age = age;
    }
    if (email) {
        users[userIndex].email = email;
    }

    const updatedUsersArray = users;
    // convert updated users array to JSON string
    const updatedData = JSON.stringify(updatedUsersArray, null, 2);

    // write the updated  users array to a JSON string
    fs.writeFileSync('./app/util/db.js', `export const users = ${updatedData}`, 'utf-8');

    return NextResponse.json({ message: "User updated successfully!" }, { status: 200 });
}


//! Delete User
export async function DELETE(req, res) {
    const { id } = await res.params;
    // find user from db 
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
        return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    // remove user from users array
    users.splice(userIndex, 1);
    // update file
    const updatedUsersArray = users;
    // convert updated users array to JSON string
    const updatedData = JSON.stringify(updatedUsersArray, null, 2);

    // write the updated  users array to a JSON string
    fs.writeFileSync('./app/util/db.js', `export const users = ${updatedData}`, 'utf-8');

    return NextResponse.json({ message: "User deleted successfully!" }, { status: 200 });
}