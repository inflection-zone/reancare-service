import amqp from 'amqplib'

async function consumeMessagesFromQueue() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const queueName = 'tasksQueue'; // Specify the name of the queue
    await channel.assertQueue(queueName, { durable: true });

    console.log('Waiting for messages...');

    // Consume messages from the queue
    channel.consume(queueName, (message) => {
        if (message !== null) {
            const content = message.content.toString();
            console.log(`Received message: ${content}`);
            // Process the message as needed
            channel.ack(message);
        }
    });
}

// Start consuming messages
consumeMessagesFromQueue();

