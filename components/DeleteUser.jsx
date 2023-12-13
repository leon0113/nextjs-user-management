'use client'
import { Button, Input } from "@material-tailwind/react"
import { useState } from "react"

const DeleteUser = () => {

    const [userId, setUserId] = useState('');


    const handleDelete = async (e) => {
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
                alert("User Successfully Deleted");
                setId("");
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
            <div className="flex">
                <div className="w-72">
                    <Input label="Enter User Id" type="text" value={userId} onChange={e => setUserId(e.target.value)} />
                </div>
                <Button className="ml-4" onClick={handleDelete}>Fetch User</Button>
            </div>
            {/* {
                userData ? (
                    userData.map((data) => (
                        <>
                            <Card className="w-96 mt-5">
                                <List>
                                    <ListItem>Id: {data.id}</ListItem>
                                    <ListItem>Name: {data.name}</ListItem>
                                    <ListItem>Age: {data.age}</ListItem>
                                    <ListItem>Email: {data.email}</ListItem>
                                </List>
                            </Card>
                        </>
                    ))
                ) : (
                    <p className="mt-2">Search For User</p>
                )
            } */}

        </div>
    )
}

export default DeleteUser