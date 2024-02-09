import amqp from 'amqplib'

async function sendMessageToQueue(message) {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const queueName = 'tasksQueue'; // Specify the name of the queue
    await channel.assertQueue(queueName, { durable: true });

    // Publish the message to the queue
    channel.sendToQueue(queueName, Buffer.from(message), { persistent: true });

    console.log(`Message '${message}' sent to queue`);

    await channel.close();
    await connection.close();
}

sendMessageToQueue('Hello RabbitMQ!');
