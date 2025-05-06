import {useState, useEffect, useCallback} from 'react';
import {getAllPizzas, getDailyPizza} from '../services/pizzaService';

/**
 * Custom hook for fetching pizza data.
 * Provides functionality to fetch all pizzas or the daily pizza, along with loading and error states.
 *
 * @param {Object} [options={}] - Options for fetching pizzas.
 * @param {boolean} [options.daily=false] - If `true`, fetches only the daily pizza. Otherwise, fetches all pizzas.
 * @returns {Object} An object containing:
 * - `pizzas` {Object[]}: The list of pizzas or the daily pizza.
 * - `loading` {boolean}: Indicates whether the data is being loaded.
 * - `error` {string|null}: Error message if fetching pizzas fails.
 * - `fetchPizzas` {Function}: Function to manually fetch pizzas.
 */
const usePizzas = ({daily = false} = {}) => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetches pizza data from the server.
   * Fetches either all pizzas or the daily pizza based on the `daily` option.
   *
   * @async
   * @returns {Promise<void>}
   */
  const fetchPizzas = useCallback(async () => {
    setLoading(true);
    try {
      const data = daily ? await getDailyPizza() : await getAllPizzas();
      setPizzas(daily ? [data] : data);
      setError(null);
    } catch {
      setError(`Failed to fetch ${daily ? 'daily pizza' : 'pizzas'}`);
    } finally {
      setLoading(false);
    }
  }, [daily]);

  useEffect(() => {
    fetchPizzas();
  }, [fetchPizzas]);

  return {pizzas, loading, error, fetchPizzas};
};

export default usePizzas;
