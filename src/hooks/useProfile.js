import { useEffect, useState } from "react";

const useProfile = email =>{
    const [profile, setProfie] = useState([])
    useEffect(() => {
        const url = `http://localhost:5000/profile?email=${email}`;
        fetch(url, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                setProfie(data[0]);
            })
    }, [email])
    return profile;
}
export default useProfile;