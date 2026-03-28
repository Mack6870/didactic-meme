import { useState, useEffect } from 'react';
import { apiClient } from '../services/apiClient';

function Home() {
  const [items, setItems] = useState([]);
  const [health, setHealth] = useState(null);

  useEffect(() => {
    apiClient.get('/examples').then(setItems).catch(console.error);
    apiClient.get('/health', true).then(setHealth).catch(console.error);
  }, []);

  return (
    <>
      <h1>Didactic Meme</h1>

      <section>
        <h2>API Health</h2>
        {health ? (
          <p>Status: {health.status} &mdash; {health.timestamp}</p>
        ) : (
          <p>Checking&hellip;</p>
        )}
      </section>

      <section>
        <h2>Example Items</h2>
        {items.length === 0 ? (
          <p>No items loaded yet.</p>
        ) : (
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <strong>{item.name}</strong> &mdash; {item.description}
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

export default Home;
