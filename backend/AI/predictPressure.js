const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');
const VitalSign = require("../models/vitalSign");

exports.trainAndPredict = async function (bloodPressure) {
    // get all vital Signs where diagnosis is in one of the three results for training model
    const vitalSigns = await VitalSign.find({ diagnosis: { $in: ["high blood pressure", "normal", "low blood pressure"] } })

    console.log('vital', vitalSigns);
    // define training Data
    const trainingData = tf.tensor2d(vitalSigns.map(item => [
        item.bloodPre,
    ]))

    //tensor of output for training data
    //the values for species will be:
    // high blood pressure :  1,0,0
    // normal :               0,1,0
    // low blood pressure :   0,0,1
    const outputData = tf.tensor2d(vitalSigns.map(item => [
        item.diagnosis === "high blood pressure" ? 1 : 0,
        item.diagnosis === "normal" ? 1 : 0,
        item.diagnosis === "low blood pressure" ? 1 : 0
    ]))

    // convert test vitals signs to test data in tensorflow format
    const testd = [Number(bloodPressure)];

    const testingData = tf.tensor2d([testd]);


    // build neural network using a sequential model
    const model = tf.sequential()
    //add the first layer
    model.add(tf.layers.dense({
        inputShape: [1], // four input neurons
        activation: "sigmoid",
        units: 2, //dimension of output space (first hidden layer)
    }))
    //add the hidden layer
    model.add(tf.layers.dense({
        inputShape: [2], //dimension of hidden layer
        activation: "sigmoid",
        units: 3, //dimension of final output 
    }))
    //add output layer
    model.add(tf.layers.dense({
        activation: "sigmoid",
        units: 3, //dimension of final output (setosa, virginica, versicolor)
    }))
    //compile the model with an MSE loss function and Adam algorithm
    model.compile({
        loss: "meanSquaredError",
        optimizer: tf.train.adam(0.02),// learning rate
    })
    console.log(model.summary())
    //
    //Train the model and predict the results for testing data
    //
    // train/fit the model for the fixed number of epochs
    async function run() {
        const startTime = Date.now()
        //train the model
        await model.fit(trainingData, outputData,
            {
                epochs: 100,
                callbacks: { //list of callbacks to be called during training
                    onEpochEnd: async (epoch, log) => {
                        lossValue = log.loss;
                        elapsedTime = Date.now() - startTime;
                    }
                }
            }

        )

        const results = model.predict(testingData);
        let dataToSent = await results.array()
        console.log(dataToSent);
        return { row: dataToSent[0] }
    }
    return await run()
};
