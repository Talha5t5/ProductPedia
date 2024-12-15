import {all} from 'redux-saga/effects';
import {
  watchAllProduct,
  watchCategory,
  watchCompanies,
  watchCountries,
  watchFilterProduct,
  watchProducts,
  watchTempProduct,
} from './SagaWrapper';

export default function* Saga() {
  // Fork sagas to run concurrently
  console.log("requestion saga for api's data");

  yield all([
    watchProducts(),
    watchCompanies(),
    watchCountries(),
    watchTempProduct(),
    watchAllProduct(),
    watchFilterProduct(),
    watchCategory()
  ]);
}
