import axios from 'axios';
import Ip from '../assets/Ip';
import {FETCH_DATA_SUCCESS} from '../redux/constants/Constants';

export const getCount = async () => {
  try {
    const {data} = await axios.get(`${Ip}/product/getCount`);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchData = async (page, pageSize) => {
  try {
    const {data} = await axios.get(`${Ip}/product/getallproducts`, {
      params: {page, pageSize},
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDataByCategory = async dispatch => {
  try {
    const {data} = await axios.get(`${Ip}/product/getProduct`);
  } catch (error) {
    console.log(error);
  }
};

export const fetchDataByCompany = async dispatch => {
  try {
    const {data} = await axios.get(`${Ip}/product/getProduct`);
  } catch (error) {
    console.log(error);
  }
};

export const fetchDataByCountry = async dispatch => {
  try {
    const {data} = await axios.get(`${Ip}/product/getProduct`);
  } catch (error) {
    console.log(error);
  }
};
