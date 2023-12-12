import { users } from "@/app/util/db"
import { NextResponse } from "next/server";


// get specific User Data
export async function GET(_, res) {
    const { id } = await res.params;
    const user = users.filter((user) => user.id === id);
    return NextResponse.json({ user })
}

// login 
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