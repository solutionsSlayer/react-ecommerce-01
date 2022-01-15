import { takeEvery, call, put } from 'redux-saga/effects';

import { shopActionTypes } from './shop.types';

import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';

import { collection, getDocs } from 'firebase/firestore';
import { db, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';

function* fetchCollectionsAsync() {
       try {
        const collectionsRef = collection(db, 'collections');
        const collectionsSnapShot = yield getDocs(collectionsRef);
        const collections = yield call(convertCollectionSnapshotToMap, collectionsSnapShot)

        yield put(fetchCollectionsSuccess(collections));
    } catch (err) {
        yield put(fetchCollectionsFailure(err.message));
    }
}

export function* fetchCollectionsStart() {
    yield takeEvery(shopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync)
}