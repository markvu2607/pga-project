import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import createRootReducer from "./reducer";
import { persistReducer, persistStore } from "redux-persist";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import rootSaga from "./sagas";
import storage from "redux-persist/lib/storage/session";

export const history = createBrowserHistory();

const composeEnhancers =
  (typeof window !== "undefined" &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const persistConfig = {
  key: "root",
  storage,
};

export default function configureStore(preloadedState: any) {
  const sagaMiddleware = createSagaMiddleware();

  const persistedReducer = persistReducer(
    persistConfig,
    createRootReducer(history)
  );

  const store = createStore(
    persistedReducer,
    preloadedState,
    composeEnhancers(
      applyMiddleware(routerMiddleware(history), thunk, sagaMiddleware)
    )
  );

  const persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);

  return { store, persistor };
}
