import { getBackgroundRabbitMQConnection } from '../../src.bg/rabbitmq/rabbitmq.connection';
import { AwardsFactsService } from '../../../src/modules/awards.facts/awards.facts.service'

///////////////////////////////////////////////////////////////////////////////////////////


export async function consumeMedicationFactsFromQueue(): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = getBackgroundRabbitMQConnection();

        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'medication_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        console.log('Waiting for messages in RabbitMQ queue...');

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {

                try {

                    // Parse the message
                    const messageContent = JSON.parse(message.content.toString());

                    console.log('Received message from RabbitMQ:', messageContent);

                    // Process the message (handle database operations, etc.)
                    await AwardsFactsService.addOrUpdateMedicationFact(messageContent);

                    // Acknowledge the message to remove it from the queue
                    channel.ack(message);
                } catch (error) {

                    console.error('Error processing message from RabbitMQ:', error);

                    // Reject and requeue the message
                    channel.nack(message);
                }
            }
        });
    } catch (error) {

        console.error('Error consuming messages from RabbitMQ:', error);
        
        throw error;
    }
}