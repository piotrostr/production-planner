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
  updateDoc,
} from "firebase/firestore"

import {
  setTasks,
  Task,
  removeTask,
  deleteTaskStart,
  syncTasksStart,
} from "../slices/tasks"

const deleteTaskFromFirestore = async (taskId: string, facilityId: string) => {
  await deleteDoc(doc(firestore, `tasks/${taskId}`))
  await updateDoc(doc(firestore, `facilities/${facilityId}`), {
    tasks: arrayRemove(taskId),
  })
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

export function* syncTasksSaga() {
  const channel = eventChannel((emitter) => {
    const colRef = collection(firestore, "tasks")
    const unsubscribe = onSnapshot(colRef, async () => {
      const snapshot = await getDocs(collection(firestore, "tasks"))
      const tasks = [] as Task[]
      snapshot.forEach((doc) =>
        tasks.push({ id: doc.id, ...doc.data() } as Task)
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

function* watchDeleteTaskSaga() {
  yield takeLatest(deleteTaskStart.type, deleteTaskSaga)
}

function* watchSyncTasksSaga() {
  yield takeLatest(syncTasksStart.type, syncTasksSaga)
}

export default function* gridSagas() {
  yield all([watchDeleteTaskSaga(), watchSyncTasksSaga()])
}
