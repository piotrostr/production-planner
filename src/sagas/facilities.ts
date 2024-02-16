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
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore"
import { setToastOpen } from "../slices/toast"
import { setTaskDropped } from "../slices/tasks"
import { removeFacilityFromGrid } from "../slices/grid"
import { updateTaskInFirestore } from "./tasks"

export const addFacilityToFirestore = async (facility: Facility) => {
  await setDoc(doc(firestore, `facilities/${facility.id}`), facility)
}

export const deleteFacilityFromFirestore = async (facilityId: string) => {
  await deleteDoc(doc(firestore, `facilities/${facilityId}`))
}

export const assignTaskToFacilityInFirestore = async (
  facilityId: string,
  taskId: string
) => {
  await updateDoc(doc(firestore, `facilities/${facilityId}`), {
    tasks: arrayUnion(taskId),
  })
}

export const removeTaskFromFacilityInFirestore = async (
  facilityId: string,
  taskId: string
) => {
  await updateDoc(doc(firestore, `facilities/${facilityId}`), {
    tasks: arrayRemove(taskId),
  })
}

export function* addFacilitySaga(action: PayloadAction<Facility>) {
  try {
    yield call(addFacilityToFirestore, action.payload)
    yield put(upsertFacility(action.payload))
    yield put(
      setToastOpen({
        message: "Facility added successfully",
        severity: "success",
      })
    )
  } catch (error) {
    yield put(
      setToastOpen({
        message: "Error adding facility",
        severity: "error",
      })
    )
  }
}

export function* deleteFacilitySaga(
  action: PayloadAction<Facility>
): Generator<any, void, any> {
  try {
    const facilityId = action.payload.id
    const tasks = action.payload.tasks
    yield put(removeFacilityFromGrid({ facilityId }))
    for (const taskId of tasks) {
      yield put(
        setTaskDropped({
          id: taskId,
          dropped: false,
        })
      )
      yield call(updateTaskInFirestore, taskId, { dropped: false })
    }
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
