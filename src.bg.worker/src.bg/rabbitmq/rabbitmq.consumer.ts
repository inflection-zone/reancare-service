import { getBackgroundRabbitMQConnection } from './rabbitmq.connection';

export async function consumeMedicationFactToQueue() {
    try {
        const connection = getBackgroundRabbitMQConnection();
        const channel = await connection.createChannel();
        const exchangeName = 'medicationQueue';

        // Assert the exchange
        await channel.assertExchange(exchangeName, 'fanout', { durable: false });

        // Create a queue and bind it to the exchange
        channel.assertQueue(exchangeName, { durable: true });
        // Consume messages from the queue
        channel.consume(exchangeName, async (message) => {

            //console.log(message)

            try {
                const content = message.content.toString();
                //console.log(content)

                const event = JSON.parse(content);


                // Process the event object and store the data
                // await processData(event);

                console.log('Event processed:', event);

                // Acknowledge the message
                channel.ack(message);
            } catch (error) {
                console.error('Error processing event object:', error);
                // Reject the message to prevent it from being requeued indefinitely
                channel.reject(message, false);
            }
        });
    } catch (error) {
        console.error('Error connecting to RabbitMQ:', error);
        throw error;
    }
}