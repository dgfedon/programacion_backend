import { HttpClient } from './httpClient';

const main = async () => {
  const { data: test1 } = await HttpClient.get('http://localhost:3001/products');
  console.log({ test1 });

  const { data: test2 } = await HttpClient.get(
    'http://localhost:3001/products/62e08a81884ebb8c276c0e59'
  );
  console.log({ test2 });

  const { data: test3 } = await HttpClient.post('http://localhost:3001/products', {
    product: {
      title: `nuevo product${Math.floor(Math.random() * 100).toString(36)}`,
      price: 150,
      thumbnail: 'url something',
    },
  });
  console.log({ test3 });

  const { data: test4 } = await HttpClient.put(`http://localhost:3001/products/${test3._id}`, {
    product: {
      title: `nuevo product${Math.floor(Math.random() * 100).toString(36)}`,
      price: 150,
      thumbnail: 'url something',
    },
  });
  console.log({ test4 });

  const { data: test5 } = await HttpClient.delete(`http://localhost:3001/products/${test4._id}`);
  console.log({ test5 });
};

main().catch((err) => console.log(err));
