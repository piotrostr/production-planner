import { eventChannel } from "redux-saga"
import { PayloadAction } from "@reduxjs/toolkit"
import { call, put, take, cancelled, takeLatest, all } from "redux-saga/effects"
import { firestore } from "../../firebase.config"
import { removeTaskFromFacility } from "../slices/facilities"
import {
  arrayRemove,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore"

import {
  setTasks,
  Task,
  removeTask,
  deleteTaskStart,
  syncTasksStart,
  addTaskStart,
  setTaskDroppedStart,
  setTaskDropped,
  updateTaskStart,
} from "../slices/tasks"
import { setToastOpen } from "../slices/toast"
import { removeCells, setCellsOccupied } from "../slices/grid"

const addTaskToFirestore = async (task: Task) => {
  await setDoc(doc(firestore, `tasks/${task.id}`), task)
}

const updateTaskInFirestore = async (
  id: string,
  updateData: { [key: string]: any }
) => {
  await updateDoc(doc(firestore, `tasks/${id}`), updateData)
}

const deleteTaskFromFirestore = async (taskId: string, facilityId?: string) => {
  await deleteDoc(doc(firestore, `tasks/${taskId}`))
  if (facilityId) {
    await updateDoc(doc(firestore, `facilities/${facilityId}`), {
      tasks: arrayRemove(taskId),
    })
  }
}

export function* addTaskSaga(action: PayloadAction<Task>) {
  try {
    yield call(addTaskToFirestore, action.payload)
    yield put(setToastOpen({ message: "Dodano zadanie", severity: "success" }))
  } catch (error) {
    yield put(setToastOpen({ message: "Wystąpił błądś", severity: "error" }))
  }
}

export function* deleteTaskSaga(
  action: PayloadAction<{
    taskId: string
    facilityId?: string
    colId?: string
    cellSpan?: string
  }>
): Generator<any, void, any> {
  try {
    const { taskId, facilityId, colId, cellSpan } = action.payload
    if (facilityId && colId && cellSpan) {
      yield put(
        removeCells({ rowId: facilityId, colId, cellSpan: Number(cellSpan) })
      )
      yield put(removeTaskFromFacility({ facilityId, taskId }))
    }
    yield call(deleteTaskFromFirestore, taskId, facilityId)
    yield put(removeTask(taskId))
    yield put(
      setToastOpen({ message: "Usunięto zadanie", severity: "success" })
    )
  } catch (error) {
    yield put(setToastOpen({ message: "Wystąpił błąd", severity: "error" }))
  }
}

export function* setTaskDroppedSaga(
  action: PayloadAction<{
    taskId: string
    dropped: boolean
    rowId: string
    colId: string
    cellSpan: string
  }>
): Generator<any, void, any> {
  try {
    const { taskId, dropped, rowId, colId, cellSpan } = action.payload
    if (dropped) {
      yield put(
        setCellsOccupied({ rowId, colId, taskId, cellSpan: Number(cellSpan) })
      )
    } else {
      yield put(removeCells({ rowId, colId, cellSpan: Number(cellSpan) }))
    }
    yield put(setTaskDropped({ id: taskId, dropped }))
    yield call(updateTaskInFirestore, taskId, { dropped })
    // no need to set the toast here as the toast is displayed on successful grid update
  } catch (error) {
    yield put(setToastOpen({ message: "Wystąpił błąd", severity: "error" }))
  }
}

export function* updateTaskSaga(
  action: PayloadAction<{ id: string; data: any }>
): Generator<any, void, any> {
  try {
    const { id, data } = action.payload
    yield call(updateTaskInFirestore, id, data)
    yield put(
      setToastOpen({ message: "Zaktualizowano zadanie", severity: "success" })
    )
  } catch (error) {
    yield put(setToastOpen({ message: "Wystąpił błąd", severity: "success" }))
  }
}

export function* syncTasksSaga() {
  const channel = eventChannel((emitter) => {
    const colRef = collection(firestore, "tasks")
    const unsubscribe = onSnapshot(colRef, async () => {
      const snapshot = await getDocs(collection(firestore, "tasks"))
      const tasks = {} as { [key: string]: Task }
      snapshot.forEach(
        (doc) => (tasks[doc.id] = { id: doc.id, ...doc.data() } as Task)
      )
      emitter(tasks)
    })

    return unsubscribe
  })

  try {
    while (true) {
      const tasks: { [key: string]: Task } = yield take(channel)
      yield put(setTasks(tasks))
    }
  } finally {
    const isCancelled: boolean = yield cancelled()
    if (isCancelled) {
      channel.close()
    }
  }
}

function* watchAddTask() {
  yield takeLatest(addTaskStart.type, addTaskSaga)
}

function* watchDeleteTask() {
  yield takeLatest(deleteTaskStart.type, deleteTaskSaga)
}

function* watchUpdateTask() {
  yield takeLatest(updateTaskStart.type, updateTaskSaga)
}

function* watchSetTaskDropped() {
  yield takeLatest(setTaskDroppedStart.type, setTaskDroppedSaga)
}

function* watchSyncTasks() {
  yield takeLatest(syncTasksStart.type, syncTasksSaga)
}

export default function* taskSagas() {
  yield all([
    watchAddTask(),
    watchDeleteTask(),
    watchSyncTasks(),
    watchSetTaskDropped(),
    watchUpdateTask(),
  ])
}
