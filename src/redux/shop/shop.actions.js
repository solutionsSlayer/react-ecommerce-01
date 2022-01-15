import { shopActionTypes } from "./shop.types";

import { db, convertCollectionSnapshotToMap } from "../../firebase/firebase.utils";
import { collection, getDocs } from "firebase/firestore";

export const fetchCollectionsStart = () => ({
    type: shopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = collections => ({
    type: shopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collections
});

export const fetchCollectionsFailure = () => ({
    type: shopActionTypes.FETCH_COLLECTIONS_FAILURE,
});

const fetchCollectionsStartAsync = () => async dispatch => {
    try {
        dispatch(fetchCollectionsStart());
        const collectionsRef = collection(db, 'collections');
        const collectionsSnapShot = await getDocs(collectionsRef);
        const collections = convertCollectionSnapshotToMap(collectionsSnapShot);

        dispatch(fetchCollectionsSuccess(collections))
    } catch (err) {
        dispatch(fetchCollectionsFailure(err.message))
    }
}