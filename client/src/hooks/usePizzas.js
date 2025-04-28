import {useState, useEffect} from 'react';
import {getAllPizzas} from '../services/pizzaService';

const usePizzas = () => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const data = await getAllPizzas();
        setPizzas(data);
      } catch (err) {
        console.log(err);
        setError('Failed to fetch pizzas');
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  return {pizzas, loading, error};
};

export default usePizzas;
