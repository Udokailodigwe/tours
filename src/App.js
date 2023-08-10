import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./Loading.js";
import Tours from "./Tours.js";

const url = "https://course-api.com/react-tours-project";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    const newToursList = tours.filter((tour) => tour.id !== id);
    setTours(newToursList);
  };

  const fetchTours = async () => {
    setIsLoading(true);
    try {
      const data = await axios.get(url);
      const tours = await data.data;
      setTours(tours);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchTours();
  }, []);

  if (isLoading) {
    return (
      <main>
        <Loading />;
      </main>
    );
  }

  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App;
