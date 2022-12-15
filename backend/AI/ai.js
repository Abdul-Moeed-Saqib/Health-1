
const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');


// instead getting from data.json file we fetch from our database
const vitalSigns = require('../../vitalSigns.json');

var lossValue;
//
exports.trainAndPredict = function (req, res) {

    // we get test data from user input
    const { vitalsSigns: vitalData, epochs, learningRate } = req.body

    // define training Data
    const trainingData = tf.tensor2d(vitalSigns.map(item => [
        item.bodyTem, item.heartRate, item.Pre,
        item.respiratoryRate
    ]))

    //tensor of output for training data
    //the values for species will be:
    // good ?:       1,0,0
    // stay home ?:    0,1,0
    // see a doctor ?:   0,0,1
    const outputData = tf.tensor2d(vitalSigns.map(item => [
        item.diagnostic_result === "good" ? 1 : 0,
        item.diagnostic_result === "stay home" ? 1 : 0,
        item.diagnostic_result === "see a doctor" ? 1 : 0
    ]))

    // convert test vitals signs to test data in tensorflow format
    const testd = [Number(irisData.sepalLength), Number(irisData.sepalWidth), Number(irisData.petalLength), Number(irisData.petalWidth)];

    const testingData = tf.tensor2d([testd]);


    // build neural network using a sequential model
    const model = tf.sequential()
    //add the first layer
    model.add(tf.layers.dense({
        inputShape: [4], // four input neurons
        activation: "sigmoid",
        units: 5, //dimension of output space (first hidden layer)
    }))
    //add the hidden layer
    model.add(tf.layers.dense({
        inputShape: [5], //dimension of hidden layer
        activation: "sigmoid",
        units: 3, //dimension of final output (setosa, virginica, versicolor)
    }))
    //add output layer
    model.add(tf.layers.dense({
        activation: "sigmoid",
        units: 3, //dimension of final output (setosa, virginica, versicolor)
    }))
    //compile the model with an MSE loss function and Adam algorithm
    model.compile({
        loss: "meanSquaredError",
        optimizer: tf.train.adam(learningRate),
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
                epochs: epochs,
                callbacks: { //list of callbacks to be called during training
                    onEpochEnd: async (epoch, log) => {
                        lossValue = log.loss;
                        // console.log(`Epoch ${epoch}: lossValue = ${log.loss}`);
                        elapsedTime = Date.now() - startTime;
                        // console.log('elapsed time: ' + elapsedTime)
                    }
                }
            }

        )

        const results = model.predict(testingData);

        results.array().then(array => {
            console.log(array[0][0])
            var resultForData1 = array[0];
            var resultForData2 = array[1];
            var resultForData3 = array[2];
            var dataToSent = { row1: resultForData1, row2: resultForData2, row3: resultForData3 }
            console.log(resultForData1)
            res.status(200).send(dataToSent);

        })
    }
    run()
};
