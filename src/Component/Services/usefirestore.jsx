import * as React from "react";
import { db } from "./firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useCallback } from "react";

const usefirestore = () => {
  // Add a new document with a generated id.
  const addDocument = async (collectionName, data) => {
    console.log("Data to be added:", data);

    if (
      !data.id ||
      !data.title ||
      !data.type ||
      !data.poster_path ||
      !data.release_date ||
      !data.vote_average ||
      !data.overview
    ) {
      throw new Error("Invalid data: All fields must be defined");
    }

    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
  };

  const addToWatchList = async (userID, dataId, data) => {
    const isAlreadyInWatchlist = await checkWatchlist(userID, dataId);
    if (isAlreadyInWatchlist) {
      console.log("Data is already in the watchlist");
      return false;
    }
    console.log("Data to be added:", data);
    if (
      !data.id ||
      !data.title ||
      !data.type ||
      !data.poster_path ||
      !data.release_date ||
      !data.vote_average ||
      !data.overview
    ) {
      throw new Error("Invalid data: All fields must be defined");
    }

    try {
      await setDoc(doc(db, "users", userID, "watchList", dataId), data);
      console.log("Successfully Written in database");
    } catch (error) {
      console.log(error);
    }
  };

  const checkWatchlist = async (userID, dataId) => {
    const docref = doc(
      db,
      "users",
      userID?.toString(),
      "watchList",
      dataId?.toString()
    );
    const docSnap = await getDoc(docref);
    return docSnap.exists();
  };

  const removeWatchList = async (userID, dataId) => {
    try {
      await deleteDoc(
        doc(db, "users", userID.toString(), "watchList", dataId.toString())
      );
    } catch (error) {
      console.log(error);
    }
  };
  const getWatchList = useCallback(async (userID) => {
    const querysnapshot = await getDocs(
      collection(db, "users", userID, "watchList")
    );
    const data = querysnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    return data;
  }, []);

  return {
    addDocument,
    addToWatchList,
    checkWatchlist,
    removeWatchList,
    getWatchList,
  };
};

export { usefirestore };
