import { useRouter } from "next/router";
import React, { useEffect } from "react"
import CreatePost from "../../components/CreatePost";
import EditUser from "../../components/EditUser";

const AdminPage = (props) => {
    const router = useRouter();
    useEffect(() => {
        if (!props.user) {
            router.push("/admin/signin");
        }
    }, []);
    return (
        <div>
           <CreatePost user={props.user}/> 
           <EditUser setUser={props.setUser}/>
        </div>
    )
}

export default AdminPage
