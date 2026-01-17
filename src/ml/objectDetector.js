import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

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