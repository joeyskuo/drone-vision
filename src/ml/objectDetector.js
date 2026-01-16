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
  
  // Round object classes from COCO dataset
  const roundClasses = [
    'sports ball',
    'orange',
    'apple',
    'clock',
    'frisbee',
    'donut',
    'pizza',
    'ball'
  ];
  
  // Filter for round objects
  const roundObjects = predictions.filter(pred => 
    roundClasses.includes(pred.class)
  );
  
  // Return results
  if (roundObjects.length === 0) {
    return {
      hasRoundObject: false,
      probabilities: []
    };
  }
  
  return {
    hasRoundObject: true,
    probabilities: roundObjects.map(obj => ({
      object: obj.class,
      confidence: (obj.score * 100).toFixed(1) + '%',
      score: obj.score
    }))
  };
}