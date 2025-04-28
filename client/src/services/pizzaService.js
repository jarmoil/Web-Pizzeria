import {fetchData} from './fetchData';

const getAllPizzas = async () => {
  return fetchData('api/v1/menu');
};

export {getAllPizzas};
