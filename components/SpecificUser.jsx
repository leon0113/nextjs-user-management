'use client'
import { Button, Card, Input, List, ListItem } from "@material-tailwind/react"
import { useState } from "react"

const SpecificUser = () => {

    const [userId, setUserId] = useState('');
    const [userData, setUserData] = useState(null);

    const fetchUserData = async () => {
        const res = await fetch(`/api/users/${userId}`);

        if (res.ok) {
            const response = await res.json();
            setUserData(response.user);
        } else if (!res.ok) {
            alert("Error: User not found");
            setUserId("")
        }
        else {
            setUserData(null);
        }
    }

    return (
        <div>
            <div className="flex">
                <div className="w-72">
                    <Input label="Enter User Id" type="text" value={userId} onChange={e => setUserId(e.target.value)} />
                </div>
                <Button className="ml-4" onClick={fetchUserData}>Fetch User</Button>
            </div>
            {
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
                ) : ''
            }

        </div>
    )
}

export default SpecificUser