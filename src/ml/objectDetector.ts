import axios from 'axios';
const BFF_ENDPOINT = import.meta.env.VITE_BFF_ENDPOINT;

export async function detectObjects(blob: Blob): Promise<string> {
  const formData = new FormData();
  formData.append('file', blob, 'image.jpg');

  const detections = await axios.post(BFF_ENDPOINT + '/detect', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    responseType: 'blob'
  });

  return URL.createObjectURL(detections.data);
}

export async function warmUp(): Promise<void> {
  try {
    await axios.get(BFF_ENDPOINT + '/warmup');
  } catch(error) {
    if (axios.isCancel(error)) return;
    throw(error);
  }
}
