import { eventChannel } from "redux-saga"
import { PayloadAction } from "@reduxjs/toolkit"
import { call, put, take, cancelled, takeLatest, all } from "redux-saga/effects"
import { firestore } from "../../firebase.config"
import { Facility, removeFacility, setFacilities } from "../slices/facilities"
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
} from "firebase/firestore"
import { deleteFacilityStart, syncFacilitiyStart } from "../slices/facilities"

const deleteFacilityFromFirestore = async (facilityId: string) => {
  await deleteDoc(doc(firestore, `facilities/${facilityId}`))
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
      const facilities = [] as Facility[]
      snapshot.forEach((doc) =>
        facilities.push({ id: doc.id, ...doc.data() } as Facility)
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

function* watchDeleteFacilitySaga() {
  yield takeLatest(deleteFacilityStart.type, deleteFacilitySaga)
}

function* watchSyncFacilitiesSaga() {
  yield takeLatest(syncFacilitiyStart.type, syncFacilitiesSaga)
}

export default function* facilitiesSaga() {
  yield all([watchDeleteFacilitySaga(), watchSyncFacilitiesSaga()])
}
