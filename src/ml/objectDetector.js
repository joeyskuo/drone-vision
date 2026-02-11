import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import axios from 'axios';
const BFF_ENDPOINT = import.meta.env.VITE_BFF_ENDPOINT;

let model = null;

// Load model once
async function loadModel() {
    if (!model) {
        // Wait for TensorFlow to be ready
        await tf.ready();
        model = await cocoSsd.load();
    }
    return model;
}

export async function detectRoundObjects(imgElement) {
  const model = await loadModel();
  const predictions = await model.detect(imgElement);
  console.log(predictions);

  return {
    probabilities: predictions.map(obj => ({
      object: obj.class,
      confidence: (obj.score * 100).toFixed(1) + '%',
      score: obj.score
    }))
  };
}

export async function detectObjects(imgElement) {
  const response = await fetch(imgElement.src);
  const blob = await response.blob();
  const formData = new FormData();
  formData.append('file', blob, 'image.jpg');

  const detections = await axios.post(BFF_ENDPOINT, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    responseType: 'blob'
  });

  const imageUrl = URL.createObjectURL(detections.data);
  const div = document.querySelector('.prediction-container-results');
  div.innerHTML = `<img src="${imageUrl}" alt="Result">`;
}