export const readText = async (buffer) => {
  const reader = new FileReader();
  const result = await new Promise((resolve, reject) => {
    reader.onload = (loadEvent) => resolve(loadEvent.target.result);
    reader.onerror = (e) => reject(e);
    reader.readAsText(new Blob([buffer]), 'utf-8');
  });

  return result;
};
