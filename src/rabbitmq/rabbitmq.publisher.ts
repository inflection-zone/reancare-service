import { getRabbitMQConnection } from '../rabbitmq/rabbitmq.connection';
import * as amqp from 'amqplib';

// export async function publishMedicationFactToQueue() {
//     try {
//         let model = {
//             name: 'john doe'
//         }

//         // Get RabbitMQ connection
//         const connection = getRabbitMQConnection();

//         // Create a channel
//         const channel = await connection.createChannel();

//         // Define the queue name
//         const queueName = 'medicationQueue';

//         // Assert the existence of the queue with durability option set to true
//         channel.assertQueue(queueName, { durable: true });

//         // Publish the medication fact to the queue
//         channel.sendToQueue(queueName, Buffer.from(JSON.stringify(model)), { persistent: true });

//         // Log success message
//         console.log(`Medication fact sent to queue: ${JSON.stringify(model)}`);

//         // Close the channel
//         // await channel.close();
//     } catch (error) {
//         console.error('Error publishing to RabbitMQ:', error);
//         throw error;
//     }
// }

// Function to publish message to RabbitMQ queue
export async function publishMedicationFactToQueue(message: any): Promise<void> {
    try {
        const connection = getRabbitMQConnection();

        // Create a channel from the connection
        const channel = await connection.createChannel();
        // Specify the queue name
        const queueName = 'medication_queue'; // Make sure it matches your queue name
        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });
        // Convert the message to a buffer
        const messageBuffer = Buffer.from(JSON.stringify(message));
        // Publish the message to the queue
        await channel.sendToQueue(queueName, messageBuffer, { persistent: true });
        console.log('Message published to RabbitMQ queue');
        // Close the channel
        //await channel.close();
    } catch (error) {
        console.error('Error publishing message to RabbitMQ:', error);
        throw error;
    }
}

