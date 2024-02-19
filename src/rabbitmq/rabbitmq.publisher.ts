import { getRabbitMQConnection } from '../rabbitmq/rabbitmq.connection';

export async function publishMedicationFactToQueue() {
    try {
        let model = {
            name: 'john doe'
        }

        // Get RabbitMQ connection
        const connection = getRabbitMQConnection();

        // Create a channel
        const channel = await connection.createChannel();

        // Define the queue name
        const queueName = 'medicationQueue';

        // Assert the existence of the queue with durability option set to true
        channel.assertQueue(queueName, { durable: true });

        // Publish the medication fact to the queue
        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(model)), { persistent: true });

        // Log success message
        console.log(`Medication fact sent to queue: ${JSON.stringify(model)}`);

        // Close the channel
        // await channel.close();
    } catch (error) {
        console.error('Error publishing to RabbitMQ:', error);
        throw error;
    }
}