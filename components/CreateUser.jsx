'use client'
import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";


const CreateUser = () => {

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!id || !name || !age || !email) {
            alert("Please fill all input");
            return;
        }

        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, name, age, email })
            });

            if (response.ok) {
                alert("User Successfully Created");
                setId("");
                setName("");
                setAge("");
                setEmail("");
                // document.location.reload()
            } else {
                alert("Something went wrong");
                return
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                <Input label='Enter User ID' type="text" value={id} onChange={(e) => setId(e.target.value)} />
                <Input label='Enter User Name' type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <Input label='Enter User Age' type="text" value={age} onChange={(e) => setAge(e.target.value)} />
                <Input label='Enter User Email' type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

                <Button className="mt-2" type="submit">
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default CreateUser