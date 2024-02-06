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
  upsertTask,
  setTaskDroppedStart,
} from "../slices/tasks"

const addTaskToFirestore = async (task: Task) => {
  await setDoc(doc(firestore, `tasks/${task.id}`), task)
}

const updateTaskInFirestore = async (
  id: string,
  updateData: { [key: string]: any }
) => {
  await updateDoc(doc(firestore, `tasks/${id}`), updateData)
}

const deleteTaskFromFirestore = async (taskId: string, facilityId: string) => {
  await deleteDoc(doc(firestore, `tasks/${taskId}`))
  await updateDoc(doc(firestore, `facilities/${facilityId}`), {
    tasks: arrayRemove(taskId),
  })
}

export function* addTaskSaga(action: PayloadAction<Task>) {
  try {
    yield call(addTaskToFirestore, action.payload)
    yield put(upsertTask(action.payload))
  } catch (error) {
    console.error("Error adding task:", error)
  }
}

export function* deleteTaskSaga(
  action: PayloadAction<{ taskId: string; facilityId: string }>
): Generator<any, void, any> {
  try {
    const { taskId, facilityId } = action.payload
    yield call(deleteTaskFromFirestore, taskId, facilityId)
    yield put(removeTask(taskId))
    yield put(removeTaskFromFacility({ facilityId, taskId }))
  } catch (error) {
    console.error("Error deleting task:", error)
  }
}

export function* setTaskDroppedSaga(
  action: PayloadAction<{ taskId: string; dropped: boolean }>
): Generator<any, void, any> {
  try {
    const { taskId, dropped } = action.payload
    yield call(updateTaskInFirestore, taskId, { dropped })
    yield put(setTaskDroppedStart(action.payload))
  } catch (error) {
    console.error("Error setting task dropped:", error)
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
  ])
}
