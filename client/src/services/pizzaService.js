import {fetchData} from './fetchData';

const getAllPizzas = async () => {
  return fetchData('api/v1/menu');
};

const getDailyPizza = async () => {
  return fetchData('api/v1/menu/daily');
};

export {getAllPizzas, getDailyPizza};
