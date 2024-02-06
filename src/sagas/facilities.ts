import { eventChannel } from "redux-saga"
import { PayloadAction } from "@reduxjs/toolkit"
import { call, put, take, cancelled, takeLatest, all } from "redux-saga/effects"
import { firestore } from "../../firebase.config"
import {
  Facility,
  addFacilityStart,
  removeFacility,
  setFacilities,
  upsertFacility,
  deleteFacilityStart,
  syncFacilitiesStart,
} from "../slices/facilities"
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
} from "firebase/firestore"

const addFacilityToFirestore = async (facility: Facility) => {
  await setDoc(doc(firestore, `facilities/${facility.id}`), facility)
}

const deleteFacilityFromFirestore = async (facilityId: string) => {
  await deleteDoc(doc(firestore, `facilities/${facilityId}`))
}

export function* addFacilitySaga(action: PayloadAction<Facility>) {
  try {
    yield call(addFacilityToFirestore, action.payload)
    yield put(upsertFacility(action.payload))
  } catch (error) {
    console.error("Error adding facility:", error)
  }
}

export function* deleteFacilitySaga(
  action: PayloadAction<string>
): Generator<any, void, any> {
  try {
    const facilityId = action.payload
    yield call(deleteFacilityFromFirestore, facilityId)
    yield put(removeFacility(facilityId))
  } catch (error) {
    console.error("Error deleting task:", error)
  }
}

export function* syncFacilitiesSaga() {
  const channel = eventChannel((emitter) => {
    const colRef = collection(firestore, "facilities")
    const unsubscribe = onSnapshot(colRef, async () => {
      const snapshot = await getDocs(collection(firestore, "facilities"))
      const facilities: { [key: string]: Facility } = {}
      snapshot.forEach((doc) =>
        Object.assign(facilities, { [doc.id]: doc.data() as Facility })
      )
      emitter(facilities)
    })

    return unsubscribe
  })

  try {
    while (true) {
      const facilities: { [key: string]: Facility } = yield take(channel)
      yield put(setFacilities(facilities))
    }
  } finally {
    const isCancelled: boolean = yield cancelled()
    if (isCancelled) {
      channel.close()
    }
  }
}

export function* watchAddFacility() {
  yield takeLatest(addFacilityStart.type, addFacilitySaga)
}

function* watchDeleteFacility() {
  yield takeLatest(deleteFacilityStart.type, deleteFacilitySaga)
}

function* watchSyncFacilities() {
  yield takeLatest(syncFacilitiesStart.type, syncFacilitiesSaga)
}

export default function* facilitiesSagas() {
  yield all([watchAddFacility(), watchDeleteFacility(), watchSyncFacilities()])
}
