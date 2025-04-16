import { usePromise } from "./hooks/usePromise";
import { getVizData } from "./utils/getVizData";
import { promise } from "./utils/promise";

export default function App() {
  const data = usePromise(promise);

  const vizData = getVizData(data);

  // show occurrence of each award in bar chart, get sum of occurrences
  // show percent occurrence of each level in pie chart
  // show occurrence of each first gen value in pie chart
  // show occurrence of each service region value in pie chart
  // find avg grad gpa (unique value * occurrence) / (total values)
  // show count of pell recipient field where value is yes
  // find avg age (unique value * occurrence) / (total values)
  // show occurrence of each state in bar chart, find num of distinct states
  // show occurrence of each ky county in bar chart, find num of distinct ky counties
  // show occurrence of each major in bar chart
  // find num of distinct countries

  // organize visualization into recharts datasets as described above
  // handle managing filter state & maintaining both unfiltered viz data & filtered viz data

  console.log(vizData);

  return (
    <main className="container">
      <div className="my-3 p-3 bg-body rounded shadow-sm"></div>
    </main>
  );
}
