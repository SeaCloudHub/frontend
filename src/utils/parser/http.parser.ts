// export function objectToFormData(data: any) {
//   if (typeof data != 'object') return null;
//   const formData = new FormData();
//   for (const key in data) {
//     formData.append(key, data[key]);
//   }
//   return formData;
// }
export function objectToFormData(data: any) {
  if (typeof data !== 'object') return null;
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]: [string, any]) => {
    if (Array.isArray(value) && value.every((item: any) => item instanceof File)) {
      value.forEach((file: File) => formData.append(key, file));
    } else {
      formData.append(key, value);
    }
  });
  return formData;
}
