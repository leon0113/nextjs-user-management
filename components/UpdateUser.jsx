'use client'
import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";

const UpdateUser = () => {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [userData, setUserData] = useState([]);

    //! handle find user
    const findUser = async () => {
        const res = await fetch(`/api/users/${id}`);

        if (res.ok) {
            const response = await res.json();
            setUserData(response.user);
            if (response?.user?.length > 0) {
                setName(response?.user[0]?.name)
                setAge(response?.user[0]?.age)
                setEmail(response?.user[0]?.email)
            }
        } else if (!res.ok) {
            alert("User doesn't exists");
            setId("");
        }
        else {
            setUserData(null);
        }
    }

    //! handle update user
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!id) {
            alert("Id required");
            return;
        }

        try {
            const response = await fetch('/api/users', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, name, age, email })
            });

            if (response.ok) {
                alert("User Successfully Updated");
                setId("");
                setUserData([]);
            } else {
                alert("Something went wrong");
                return;
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <form className="flex flex-col gap-3">
                <Input label='Enter User ID' type="text" value={id} onChange={(e) => setId(e.target.value)} />
                {userData?.length > 0 ? <>
                    <Input label='Enter User Name' type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <Input label='Enter User Age' type="text" value={age} onChange={(e) => setAge(e.target.value)} />
                    <Input label='Enter User Email' type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </> : ""}

                <Button className="mt-2" onClick={userData?.length > 0 ? handleSubmit : findUser} >
                    {userData?.length > 0 ? "Update User" : "Find User"}
                </Button>
            </form>
        </div>
    )
}

export default UpdateUser