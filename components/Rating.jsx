import { Rating, CircularProgress, Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Ratings(props) {
    const router = useRouter();
    const [ratings, setRatings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [myRating, setMyRating] = useState(0);
    useEffect(() => {
        axios.get(`https://linuix-app-api.vercel.app/api/ratings/${props.id}`).then((res) => {
            setRatings(res.data);
            setLoading(false);
        }).catch((err) => {
            setRatings(0)
            setLoading(false);
        })
    }, [router.query.slug]);
    return (
        <div className="text-center">
            {!loading ? <Rating
                name="Average Ratings"
                value={ratings}
                readOnly={true}
                precision={0.1}
                color="primary"
            /> : <CircularProgress />}
            <br/>
            {!loading && <p className="text-3xl mt-6 mb-0">Your Rating</p>} <br/>
            {!loading && <Rating 
                name="rate"
                value={localStorage.getItem(`${props.id}`) === null ? myRating : localStorage.getItem(`${props.id}`)}
                readOnly={localStorage.getItem(`${props.id}`) !== null}
                precision={0.1}
                onChange={(event, newValue) => {
                    setMyRating(newValue);
                }
            }
            />}
            <br/>
            {!loading && <Button
                variant="outlined"
                color="inherit"
                disabled={myRating === 0 || localStorage.getItem(`${props.id}`) !== null}
                onClick={() => {
                    console.log(myRating);
                    axios.post(`https://linuix-app-api.vercel.app/api/ratings/`, {
                        post_id: props.id,
                        ratings: [
                            {
                                details: {
                                    email: "anomouys",
                                    value: myRating
                                }
                            }
                        ]
                    }).then((res) => {
                        localStorage.setItem(`${props.id}`, myRating);
                        router.push(router.asPath)
                    }).catch((err) => {
                        console.log(err);
                    })
                }}
            > {localStorage.getItem(`${props.id}`) === null ? "Submit" : "Already Rated"} </Button>}
        </div>
    );
}