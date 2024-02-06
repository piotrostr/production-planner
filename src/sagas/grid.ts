import { all, call, cancelled, put, take, takeLatest } from "redux-saga/effects"
import { PayloadAction } from "@reduxjs/toolkit"
import {
  GridType,
  initializeGrid,
  initializeGridStart,
  syncGridStart,
} from "../slices/grid"
import { doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore"
import { firestore } from "../../firebase.config"
import { fetchGridStart, updateGridStart, setGrid } from "../slices/grid"
import { eventChannel } from "redux-saga"

export const fetchGridFromFirestore = async (): Promise<GridType | null> => {
  const snapshot = await getDoc(doc(firestore, "grid", "first-grid"))
  return snapshot.exists() ? (snapshot.data() as GridType) : null
}

export const updateGridInFirestore = async (
  gridData: GridType
): Promise<void> => {
  const gridRef = doc(firestore, "grid", "first-grid")
  const gridSnapshot = await getDoc(gridRef)
  !gridSnapshot.exists()
    ? await setDoc(gridRef, gridData)
    : await updateDoc(gridRef, { ...gridData })
}

function* fetchGridSaga() {
  try {
    const gridData: GridType | null = yield call(fetchGridFromFirestore)
    if (gridData) {
      yield put(setGrid(gridData))
    } else {
      console.error("No grid data found")
    }
  } catch (error) {
    console.error("Error fetching grid data:", error)
  }
}

function* updateGridSaga(action: PayloadAction<GridType>) {
  try {
    yield call(updateGridInFirestore, action.payload)

    // Dispatch success action or handle success scenario
  } catch (error) {
    console.error("Error updating grid data:", error)
    // Dispatch failure action or handle error scenario
  }
}

function* initializeGridSaga(
  action: PayloadAction<{
    columnCount: number
    rowCount: number
  }>
) {
  try {
    const gridData: GridType | null = yield call(fetchGridFromFirestore)

    if (!gridData) {
      yield put(initializeGrid(action.payload))
      yield call(updateGridInFirestore, {
        ...action.payload,
        cells: {},
      })
    } else {
      console.error("Grid data already exists")
    }
  } catch (error) {
    console.error("Error initializing grid data:", error)
  }
}

export function* syncGridSaga() {
  const channel = eventChannel((emitter) => {
    const docRef = doc(firestore, "grid", "first-grid")
    const unsubscribe = onSnapshot(docRef, async () => {
      const snapshot = await getDoc(docRef)
      const gridData: GridType | null = snapshot.exists()
        ? (snapshot.data() as GridType)
        : null
      if (gridData) {
        emitter(gridData)
      }
    })

    return unsubscribe
  })

  try {
    while (true) {
      const gridData: GridType = yield take(channel)
      yield put(setGrid(gridData))
    }
  } finally {
    const isCancelled: boolean = yield cancelled()
    if (isCancelled) {
      channel.close()
    }
  }
}

function* watchFetchGrid() {
  yield takeLatest(fetchGridStart.type, fetchGridSaga)
}

function* watchUpdateGrid() {
  yield takeLatest(updateGridStart.type, updateGridSaga)
}

function* watchInitializeGrid() {
  yield takeLatest(initializeGridStart.type, initializeGridSaga)
}

function* watchSyncGrid() {
  yield takeLatest(syncGridStart.type, syncGridSaga)
}

export default function* gridSagas() {
  yield all([
    watchFetchGrid(),
    watchUpdateGrid(),
    watchInitializeGrid(),
    watchSyncGrid(),
  ])
}
