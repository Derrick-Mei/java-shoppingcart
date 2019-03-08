async function fetchData(url, setHook) {
  const response = await fetch(url);
  const json = await response.json();
  setHook(json);
  return { data: json };
}

export default fetchData;
