import { useRouter } from "next/router";
import { useEffect } from "react"
import CreatePost from "../../components/CreatePost";
const index = (props) => {
    const router = useRouter();
    useEffect(() => {
        if (!props.user) {
            router.push("/admin/signin");
        }
    }, []);
    return (
        <div>
           <CreatePost user={props.user}/> 
        </div>
    )
}

export default index
