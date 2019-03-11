async function customFetch(url, setHook, config) {
  const response = await fetch(url, config);
  const json = await response.json();
  setHook(json);
  return { data: json };
}

export default customFetch;
