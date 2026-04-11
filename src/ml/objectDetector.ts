import axios from 'axios';

const BFF_ENDPOINT = import.meta.env.VITE_BFF_ENDPOINT;

export async function detectObjects(blob: Blob): Promise<string> {
  const formData = new FormData();
  formData.append('file', blob, 'image.jpg');

  const response = await axios.post(BFF_ENDPOINT + '/detect', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    responseType: 'blob',
  });

  return URL.createObjectURL(response.data);
}

export async function warmUp(): Promise<void> {
  await axios.get(BFF_ENDPOINT + '/warmup');
}
