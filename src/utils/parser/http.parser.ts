export function objectToFormData(data: any) {
  if (typeof data != 'object') return null;
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  return formData;
}
