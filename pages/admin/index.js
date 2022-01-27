import { useRouter } from "next/router";
import React, { useEffect } from "react"
import CreatePost from "../../components/CreatePost";
import EditUser from "../../components/EditUser";

const AdminPage = (props) => {
    const router = useRouter();
    useEffect(() => {
        try {
            if (!props.user) {
                router.push("/admin/signin");
            }
        }
        catch (err) {
            console.log(err);
        }
    }, []);
    return (
        <div>
            <CreatePost user={props.user} />
            {props.user && <EditUser setUser={props.setUser} id={props.user._id} />}
        </div>
    )
}

export default AdminPage
