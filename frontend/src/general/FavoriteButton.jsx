import react, {useContext, useEffect, useState} from "react"
import {UserContext} from "../contexts/UserContextProvider.jsx";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/Favorite.js";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder.js";
import React from "react";
import NeedTologinModal from "../general/NeedTologinModal"

const FavoriteButton = ({resortData}) => {
    const { user, setUser } = useContext(UserContext);
    const [open, setOpen] = useState(false);


    const checkFavorite = () => {
        const temp = user?.favorite?.find(
            (fav) => fav.resort_id === resortData.name
        );
        return !!temp;
    };
    const isFavorite = checkFavorite();

    useEffect(() => {
        if (user) {
            checkFavorite();
        }
    }, [user]);

    const addToFavorite = () => {
        if(!user){
            setOpen(true)
            return
        }
        axios
            .post("http://localhost:8000/api/favorite/create", {
                resort_id: resortData.name,
                username: user.username,
            })
            .then((res) => {
                console.log(res.data);
                setUser((prev) => {
                    return { ...prev, favorite: [...prev.favorite, res.data[0]] };
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const filterFavorites = (id) => {
        console.log(id);
        const temp = { ...user };
        temp.favorite = temp.favorite.filter((fav) => {
            return fav.id !== id;
        });
        console.log(temp);
        // setIsFavorite(false);
        setUser({ ...temp });
    };
    const check = () => {
        const temp = user?.favorite?.find(
            (fav) => fav.resort_id === resortData.name
        );
        if (temp) {
            return temp;
        }
    };

    const removeFromFavorite = () => {
        const fav = check();
        axios
            .post("http://localhost:8000/api/favorite/delete", {
                id: fav?.id,
            })
            .then((res) => {
                console.log(res.data);
                if (res.data.message == "DELETED") {
                    filterFavorites(fav.id);
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <>

        {isFavorite ? (
                <button
                    style={{ marginLeft: "auto" }}
                    onClick={removeFromFavorite}
                >
                    <FavoriteIcon sx={{ color: "red" }} />
                </button>
            ) : (
                <button
                    style={{ marginLeft: "auto" }}
                    onClick={addToFavorite}
                >
                    <FavoriteBorderIcon />
                </button>
            )}
            {open &&

                <div className="absolute h-screen w-screen top-0 left-0 -z-1 bg-black ">
                        <h1>Hello</h1>
                    <NeedTologinModal
                        text={"Want to add to Favorites? You need to login first"}
                        open={open}
                        handleClose={() => setOpen(false)}
                    />
                </div>
            }

        </>)
}
export default FavoriteButton