import axios from 'axios';
const BFF_ENDPOINT = import.meta.env.VITE_BFF_ENDPOINT;

export async function detectObjects(imgElement) {
  const response = await fetch(imgElement.src);
  const blob = await response.blob();
  const formData = new FormData();
  formData.append('file', blob, 'image.jpg');

  const detections = await axios.post(BFF_ENDPOINT + '/detect', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    responseType: 'blob'
  });

  const imageUrl = URL.createObjectURL(detections.data);
  const div = document.querySelector('.prediction-container-results');
  div.innerHTML = `<img src="${imageUrl}" alt="Result">`;
}