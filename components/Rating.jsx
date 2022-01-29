import { Rating, CircularProgress, Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Ratings(props) {
    const router = useRouter();
    const [ratings, setRatings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [myRating, setMyRating] = useState(0);
    const [submitting, setSubmitting] = useState(false);
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
                color="white"
                variant="outlined"
                sx={{
                    fontSize: '1.5rem',
                    margin: '0.5rem',
                    backgroundColor: '#fff',
                    borderRadius: '0.5rem',
                    padding: '0.5rem',
                    fontWeight: 'bold',
                    border: '1px solid #0a1946',
                    color: '#333'
                }
                }
            /> : <CircularProgress />}
            <br/>
            {!loading && <p className="text-3xl mt-6 mb-0 text-white">Your Rating</p>} <br/>
            {!loading && <Rating 
                name="rate"
                value={localStorage.getItem(`${props.id}`) === null ? myRating : localStorage.getItem(`${props.id}`)}
                readOnly={localStorage.getItem(`${props.id}`) !== null}
                precision={0.1}
                onChange={(event, newValue) => {
                    setMyRating(newValue);
                }}
                sx={{
                    fontSize: '1.5rem',
                    margin: '0.5rem',
                    backgroundColor: '#fff',
                    borderRadius: '0.5rem',
                    padding: '0.5rem',
                    fontWeight: 'bold',
                    border: '1px solid #0a1946',
                    color: '#000'
                }}
            />}
            <br/>
            {!loading && <Button
                variant="contained"
                color="primary"
                disabled={myRating === 0 || localStorage.getItem(`${props.id}`) !== null || submitting}
                onClick={() => {
                    setSubmitting(true);
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
                        setSubmitting(false);
                    }).catch((err) => {
                        console.log(err);
                        setSubmitting(false);
                    })
                }}
                sx={{
                    fontSize: '1.5rem',
                    margin: '0.5rem',
                    color: '#fff',
                    background: "linear-gradient(to right,#ed6ea0,#ec8c69,#f7186a, #fbb03b)"
                }}
                
            > {!submitting ? localStorage.getItem(`${props.id}`) === null ? "Submit" : "Already Rated" : 'Submitting'} </Button>}
        </div>
    );
}