import { users } from "@/app/util/db"
import { NextResponse } from "next/server";
import fs from 'fs';

// All Users Data
export function GET() {
    const data = users;
    return NextResponse.json({ data }, { status: 200 })
}

// Create User
export async function POST(req, res) {
    let { id, name, age, email } = await req.json();

    if (!id || !name || !age || !email) {
        return NextResponse.json({ result: "Please provide all info" }, { status: 400 });
    } else if (users.find((user) => user.id === id)) {
        return NextResponse.json({ result: "user allReady exists" }, { status: 400 });
    } else {
        // add new user
        users.push({ id, name, age, email });

        const updatedUsersArray = users;
        // convert updated users array to JSON string
        const updatedData = JSON.stringify(updatedUsersArray, null, 2);

        // write the updated  users array to a JSON string
        fs.writeFileSync('./app/util/db.js', `export const users = ${updatedData}`, 'utf-8');

        return NextResponse.json({ message: "User created successfully!" }, { status: 200 });

    }

}



