import { getBackgroundRabbitMQConnection } from '../../src.bg/rabbitmq/rabbitmq.connection';
import { AwardsFactsService } from '../../src.bg/modules/awards.facts/awards.facts.service'
import { EHRAnalyticsHandler } from '../modules/ehr.analytics/ehr.analytics.handler';
import { BloodGlucoseService } from '../../../src/services/clinical/biometrics/blood.glucose.service';
import { EHRVitalService } from '../modules/ehr.analytics/ehr.vital.service';
import { BodyHeightService } from '../../../src/services/clinical/biometrics/body.height.service';
import { BloodOxygenSaturationService } from '../../../src/services/clinical/biometrics/blood.oxygen.saturation.service';
import { BloodPressureService } from '../../../src/services/clinical/biometrics/blood.pressure.service';
import { AssessmentService } from '../../../src/services/clinical/assessment/assessment.service';
import { DailyAssessmentService } from '../../../src/services/clinical/daily.assessment/daily.assessment.service';
import { EHRLabService } from '../modules/ehr.analytics/ehr.lab.service';
import { LabRecordService } from '../../../src/services/clinical/lab.record/lab.record.service';
import { ILabRecordRepo } from "../../../src/database/repository.interfaces/clinical/lab.record/lab.record.interface";

///////////////////////////////////////////////////////////////////////////////////////////


// awards facts
export async function consumeMarkListAsTakenMedicationFactsFromQueue(): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = getBackgroundRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'mark_list_as_taken_medication_queue'; // Make sure it matches your queue name

        await channel.assertQueue(queueName, { durable: true });         // Assert the queue to make sure it exists, otherwise create it

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    // Parse the message
                    const messageContent = JSON.parse(message.content.toString());

                    // Convert RecordDate back to a Date object
                    if (typeof messageContent.RecordDate === 'number') {
                        messageContent.RecordDate = new Date(messageContent.RecordDate);
                    }
                    // Process the message
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

export async function consumeMarkListAsMissedMedicationFactsFromQueue(): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = getBackgroundRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'mark_list_as_missed_medication_queue'; // Make sure it matches your queue name

        await channel.assertQueue(queueName, { durable: true });         // Assert the queue to make sure it exists, otherwise create it

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    // Parse the message
                    const messageContent = JSON.parse(message.content.toString());

                    // Convert RecordDate back to a Date object
                    if (typeof messageContent.RecordDate === 'number') {
                        messageContent.RecordDate = new Date(messageContent.RecordDate);
                    }
                    // Process the message
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

export async function consumeMarkAsTakenMedicationFactsFromQueue(): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = getBackgroundRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'mark_as_taken_medication_queue'; // Make sure it matches your queue name

        await channel.assertQueue(queueName, { durable: true });         // Assert the queue to make sure it exists, otherwise create it

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    // Parse the message
                    const messageContent = JSON.parse(message.content.toString());

                    // Convert RecordDate back to a Date object
                    if (typeof messageContent.RecordDate === 'number') {
                        messageContent.RecordDate = new Date(messageContent.RecordDate);
                    }
                    // Process the message
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

export async function consumeMarkAsMissedMedicationFactsFromQueue(): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = getBackgroundRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'mark_as_missed_medication_queue'; // Make sure it matches your queue name

        await channel.assertQueue(queueName, { durable: true });         // Assert the queue to make sure it exists, otherwise create it

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    // Parse the message
                    const messageContent = JSON.parse(message.content.toString());

                    // Convert RecordDate back to a Date object
                    if (typeof messageContent.RecordDate === 'number') {
                        messageContent.RecordDate = new Date(messageContent.RecordDate);
                    }
                    // Process the message
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

export async function consumeAddUpdatePatientFromQueue(): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = getBackgroundRabbitMQConnection();

        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'add_patient_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        //console.log('Waiting for messages in RabbitMQ queue...');

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {

                try {

                    // Parse the message
                    const messageContent = JSON.parse(message.content.toString());

                    // Convert RecordDate back to a Date object
                    if (typeof messageContent.RecordDate === 'number') {
                        messageContent.RecordDate = new Date(messageContent.RecordDate);
                    }

                    console.log('Received message from RabbitMQ:', messageContent);

                    // Process the message
                    await EHRAnalyticsHandler.addOrUpdatePatient(messageContent.patientUserId, messageContent.details, messageContent.appName,);

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

export async function consumeDeletePatientFromQueue(): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = getBackgroundRabbitMQConnection();

        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'add_patient_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        //console.log('Waiting for messages in RabbitMQ queue...');

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {

                try {

                    // Parse the message
                    const messageContent = JSON.parse(message.content.toString());

                    // Convert RecordDate back to a Date object
                    if (typeof messageContent.RecordDate === 'number') {
                        messageContent.RecordDate = new Date(messageContent.RecordDate);
                    }

                    console.log('Received message from RabbitMQ:', messageContent);

                    // Process the message
                    this._ehrAnalyticsHandler.deleteStaticEHRRecord(messageContent);
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

export async function consumeAddBloodGlucoseFromQueue(): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = getBackgroundRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'add_body_glucose_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    // Parse the message
                    const messageContent = JSON.parse(message.content.toString());

                    // Convert RecordDate back to a Date object
                    if (typeof messageContent.RecordDate === 'number') {
                        messageContent.RecordDate = new Date(messageContent.RecordDate);
                    }
                    //console.log('Received message from RabbitMQ:', messageContent);

                    // Process the message
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

export async function consumeUpdateBloodGlucoseFromQueue(): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = getBackgroundRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'update_body_glucose_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    // Parse the message
                    const messageContent = JSON.parse(message.content.toString());

                    // Convert RecordDate back to a Date object
                    if (typeof messageContent.RecordDate === 'number') {
                        messageContent.RecordDate = new Date(messageContent.RecordDate);
                    }
                    //console.log('Received message from RabbitMQ:', messageContent);

                    // Process the message
                    await AwardsFactsService.addOrUpdateVitalFact(messageContent);

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

export async function consumeAddBloodOxygenSaturationFromQueue(): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = getBackgroundRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'add_blood_oxygen_saturation_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    // Parse the message
                    const messageContent = JSON.parse(message.content.toString());

                    // Convert RecordDate back to a Date object
                    if (typeof messageContent.RecordDate === 'number') {
                        messageContent.RecordDate = new Date(messageContent.RecordDate);
                    }
                    //console.log('Received message from RabbitMQ:', messageContent);

                    // Process the message
                    await AwardsFactsService.addOrUpdateVitalFact(messageContent);

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

export async function consumeUpdateBloodOxygenSaturationFromQueue(): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = getBackgroundRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'update_blood_oxygen_saturation_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    // Parse the message
                    const messageContent = JSON.parse(message.content.toString());

                    // Convert RecordDate back to a Date object
                    if (typeof messageContent.RecordDate === 'number') {
                        messageContent.RecordDate = new Date(messageContent.RecordDate);
                    }
                    //console.log('Received message from RabbitMQ:', messageContent);

                    // Process the message
                    await AwardsFactsService.addOrUpdateVitalFact(messageContent);

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

export async function consumeAddBloodPressureFromQueue(): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = getBackgroundRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'add_blood_pressure_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    // Parse the message
                    const messageContent = JSON.parse(message.content.toString());

                    // Convert RecordDate back to a Date object
                    if (typeof messageContent.RecordDate === 'number') {
                        messageContent.RecordDate = new Date(messageContent.RecordDate);
                    }
                    //console.log('Received message from RabbitMQ:', messageContent);

                    // Process the message
                    await AwardsFactsService.addOrUpdateVitalFact(messageContent);

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

export async function consumeUpdateBloodPressureFromQueue(): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = getBackgroundRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'update_blood_pressure_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    // Parse the message
                    const messageContent = JSON.parse(message.content.toString());

                    // Convert RecordDate back to a Date object
                    if (typeof messageContent.RecordDate === 'number') {
                        messageContent.RecordDate = new Date(messageContent.RecordDate);
                    }
                    //console.log('Received message from RabbitMQ:', messageContent);

                    // Process the message
                    await AwardsFactsService.addOrUpdateVitalFact(messageContent);

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

export async function consumeAddBodyTemperatureFromQueue(): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = getBackgroundRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'add_body_temperature_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    // Parse the message
                    const messageContent = JSON.parse(message.content.toString());

                    // Convert RecordDate back to a Date object
                    if (typeof messageContent.RecordDate === 'number') {
                        messageContent.RecordDate = new Date(messageContent.RecordDate);
                    }
                    //console.log('Received message from RabbitMQ:', messageContent);

                    // Process the message
                    await AwardsFactsService.addOrUpdateVitalFact(messageContent);

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

export async function consumeUpdateBodyTemperatureFromQueue(): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = getBackgroundRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'update_body_temperature_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    // Parse the message
                    const messageContent = JSON.parse(message.content.toString());

                    // Convert RecordDate back to a Date object
                    if (typeof messageContent.RecordDate === 'number') {
                        messageContent.RecordDate = new Date(messageContent.RecordDate);
                    }
                    //console.log('Received message from RabbitMQ:', messageContent);

                    // Process the message
                    await AwardsFactsService.addOrUpdateVitalFact(messageContent);

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

export async function consumeAddBodyWeightFromQueue(): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = getBackgroundRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'add_body_weight_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    // Parse the message
                    const messageContent = JSON.parse(message.content.toString());

                    // Convert RecordDate back to a Date object
                    if (typeof messageContent.RecordDate === 'number') {
                        messageContent.RecordDate = new Date(messageContent.RecordDate);
                    }
                    //console.log('Received message from RabbitMQ:', messageContent);

                    // Process the message
                    await AwardsFactsService.addOrUpdateVitalFact(messageContent);

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

export async function consumeUpdateBodyWeightFromQueue(): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = getBackgroundRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'update_body_weight_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    // Parse the message
                    const messageContent = JSON.parse(message.content.toString());

                    // Convert RecordDate back to a Date object
                    if (typeof messageContent.RecordDate === 'number') {
                        messageContent.RecordDate = new Date(messageContent.RecordDate);
                    }
                    //console.log('Received message from RabbitMQ:', messageContent);

                    // Process the message
                    await AwardsFactsService.addOrUpdateVitalFact(messageContent);

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

export async function consumeAddPulseFromQueue(): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = getBackgroundRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'add_pulse_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    // Parse the message
                    const messageContent = JSON.parse(message.content.toString());

                    // Convert RecordDate back to a Date object
                    if (typeof messageContent.RecordDate === 'number') {
                        messageContent.RecordDate = new Date(messageContent.RecordDate);
                    }
                    //console.log('Received message from RabbitMQ:', messageContent);

                    // Process the message
                    await AwardsFactsService.addOrUpdateVitalFact(messageContent);

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

export async function consumeUpdatePulseFromQueue(): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = getBackgroundRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'update_pulse_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    // Parse the message
                    const messageContent = JSON.parse(message.content.toString());

                    // Convert RecordDate back to a Date object
                    if (typeof messageContent.RecordDate === 'number') {
                        messageContent.RecordDate = new Date(messageContent.RecordDate);
                    }
                    //console.log('Received message from RabbitMQ:', messageContent);

                    // Process the message
                    await AwardsFactsService.addOrUpdateVitalFact(messageContent);

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

export async function consumeAddSleepFromQueue(): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = getBackgroundRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'add_sleep_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    // Parse the message
                    const messageContent = JSON.parse(message.content.toString());

                    // Convert RecordDate back to a Date object
                    if (typeof messageContent.RecordDate === 'number') {
                        messageContent.RecordDate = new Date(messageContent.RecordDate);
                    }
                    //console.log('Received message from RabbitMQ:', messageContent);

                    // Process the message
                    await AwardsFactsService.addOrUpdateMentalHealthResponseFact(messageContent);

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

export async function consumeAddMedicationFromQueue(): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = getBackgroundRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'add_medication_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    // Parse the message
                    const messageContent = JSON.parse(message.content.toString());

                    // Convert RecordDate back to a Date object
                    if (typeof messageContent.RecordDate === 'number') {
                        messageContent.RecordDate = new Date(messageContent.RecordDate);
                    }
                    //console.log('Received message from RabbitMQ:', messageContent);

                    // Process the message
                    await AwardsFactsService.addOrUpdateMentalHealthResponseFact(messageContent);

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

export async function consumeAddPhysicalActivityFromQueue(): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = getBackgroundRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'add_physical_activity_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    // Parse the message
                    const messageContent = JSON.parse(message.content.toString());

                    // Convert RecordDate back to a Date object
                    if (typeof messageContent.RecordDate === 'number') {
                        messageContent.RecordDate = new Date(messageContent.RecordDate);
                    }
                    //console.log('Received message from RabbitMQ:', messageContent);

                    // Process the message
                    await AwardsFactsService.addOrUpdatePhysicalActivityResponseFact(messageContent);

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

export async function consumeUpdatePhysicalActivityFromQueue(): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = getBackgroundRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'update_physical_activity_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    // Parse the message
                    const messageContent = JSON.parse(message.content.toString());

                    // Convert RecordDate back to a Date object
                    if (typeof messageContent.RecordDate === 'number') {
                        messageContent.RecordDate = new Date(messageContent.RecordDate);
                    }
                    //console.log('Received message from RabbitMQ:', messageContent);

                    // Process the message
                    await AwardsFactsService.addOrUpdatePhysicalActivityResponseFact(messageContent);

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

export async function consumeAddFoodConsumptionFromQueue(): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = getBackgroundRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'add_food_consumption_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    // Parse the message
                    const messageContent = JSON.parse(message.content.toString());

                    // Convert RecordDate back to a Date object
                    if (typeof messageContent.RecordDate === 'number') {
                        messageContent.RecordDate = new Date(messageContent.RecordDate);
                    }
                    //console.log('Received message from RabbitMQ:', messageContent);

                    // Process the message
                    await AwardsFactsService.addOrUpdateNutritionResponseFact(messageContent);

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

export async function consumeUpdateFoodConsumptionFromQueue(): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = getBackgroundRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'update_food_consumption_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    // Parse the message
                    const messageContent = JSON.parse(message.content.toString());

                    // Convert RecordDate back to a Date object
                    if (typeof messageContent.RecordDate === 'number') {
                        messageContent.RecordDate = new Date(messageContent.RecordDate);
                    }
                    //console.log('Received message from RabbitMQ:', messageContent);

                    // Process the message
                    await AwardsFactsService.addOrUpdateNutritionResponseFact(messageContent);

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

//EHR
export async function consumeAddBloodGlucoseEHRFromQueue(bloodGlucoseService: BloodGlucoseService
    ): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = getBackgroundRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'add_blood_glucose_ehr_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    // Parse the message
                    const messageContent = JSON.parse(message.content.toString());

                    //console.log('Received message from RabbitMQ:', messageContent);

                    // Process the message
                    // const bloodGlucoseService = new BloodGlucoseService()
                    await bloodGlucoseService.addEHRRecord(
                        messageContent.PatientUserId,
                        messageContent.BloodGlucoseId,
                        messageContent.Provider,
                        messageContent.Model,
                        messageContent.AppName
                    );

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

export async function consumeUpdateBloodGlucoseEHRFromQueue(bloodGlucoseService: BloodGlucoseService): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = getBackgroundRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'update_blood_glucose_ehr_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    // Parse the message
                    const messageContent = JSON.parse(message.content.toString());

                    //console.log('Received message from RabbitMQ:', messageContent);

                    // Process the message
                    await bloodGlucoseService.addEHRRecord(
                        messageContent.PatientUserId,
                        messageContent.Id,
                        messageContent.Provider,
                        messageContent.Model,
                        messageContent.AppName
                    );

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

export async function consumeDeleteBloodGlucoseEHRFromQueue(): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = getBackgroundRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'delete_blood_glucose_ehr_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    // Parse the message
                    const messageContent = JSON.parse(message.content.toString());

                    //console.log('Received message from RabbitMQ:', messageContent);

                    const ehrVitalService = new EHRVitalService();
                    ehrVitalService.deleteVitalEHRRecord(messageContent);

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

export async function consumeAddOxygenSaturationEHRFromQueue(bloodOxygenSaturationService:BloodOxygenSaturationService): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = getBackgroundRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'add_oxygen_saturation_ehr_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    // Parse the message
                    const messageContent = JSON.parse(message.content.toString());

                    //console.log('Received message from RabbitMQ:', messageContent);

                    // Process the message
                    bloodOxygenSaturationService.addEHRRecord(
                        messageContent.PatientUserId,
                        messageContent.Id,
                        messageContent.Provider,
                        messageContent.Model,
                        messageContent.AppName
                    );

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

export async function consumeUpdateOxygenSaturationEHRFromQueue(bloodOxygenSaturationService:BloodOxygenSaturationService): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = getBackgroundRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'update_oxygen_saturation_ehr_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    // Parse the message
                    const messageContent = JSON.parse(message.content.toString());

                    //console.log('Received message from RabbitMQ:', messageContent);

                    // Process the message
                    await bloodOxygenSaturationService.addEHRRecord(
                        messageContent.PatientUserId,
                        messageContent.Id,
                        messageContent.Provider,
                        messageContent.Model,
                        messageContent.AppName
                    );

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

export async function consumeDeleteBloodOxygenSaturationEHRFromQueue(): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = getBackgroundRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'delete_blood_oxygen_saturation_ehr_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    // Parse the message
                    const messageContent = JSON.parse(message.content.toString());

                    //console.log('Received message from RabbitMQ:', messageContent);

                    const ehrVitalService = new EHRVitalService();
                    ehrVitalService.deleteVitalEHRRecord(messageContent);

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

export async function consumeAddBloodPressureEHRFromQueue(bloodPressureService:BloodPressureService): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = getBackgroundRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'add_blood_pressure_ehr_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    // Parse the message
                    const messageContent = JSON.parse(message.content.toString());

                    //console.log('Received message from RabbitMQ:', messageContent);

                    // Process the message
                    await bloodPressureService.addEHRRecord(
                        messageContent.PatientUserId,
                        messageContent.Id,
                        messageContent.Provider,
                        messageContent.Model,
                        messageContent.AppName
                    );

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

export async function consumeUpdateBloodPressureEHRFromQueue(bloodPressureService:BloodPressureService): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = getBackgroundRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'update_blood_pressure_ehr_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    // Parse the message
                    const messageContent = JSON.parse(message.content.toString());

                    //console.log('Received message from RabbitMQ:', messageContent);

                    // Process the message
                    await bloodPressureService.addEHRRecord(
                        messageContent.PatientUserId,
                        messageContent.Id,
                        messageContent.Provider,
                        messageContent.Model,
                        messageContent.AppName
                    );

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

export async function consumeDeleteBloodPressureEHRFromQueue(): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = getBackgroundRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'delete_blood_pressure_ehr_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    // Parse the message
                    const messageContent = JSON.parse(message.content.toString());

                    //console.log('Received message from RabbitMQ:', messageContent);

                    const ehrVitalService = new EHRVitalService();
                    ehrVitalService.deleteVitalEHRRecord(messageContent);

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

export async function consumeAddBodyHeightEHRFromQueue(bodyHeightService:BodyHeightService): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = getBackgroundRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'add_body_height_ehr_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    // Parse the message
                    const messageContent = JSON.parse(message.content.toString());

                    //console.log('Received message from RabbitMQ:', messageContent);

                    // Process the message
                    bodyHeightService.addEHRRecord(
                        messageContent.PatientUserId,
                        messageContent.Id,
                        messageContent.Provider,
                        messageContent.Model,
                        messageContent.AppName
                    );

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

export async function consumeUpdateBodyHeightEHRFromQueue(bodyHeightService:BodyHeightService): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = getBackgroundRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'update_body_height_ehr_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    // Parse the message
                    const messageContent = JSON.parse(message.content.toString());

                    //console.log('Received message from RabbitMQ:', messageContent);

                    // Process the message
                    await bodyHeightService.addEHRRecord(
                        messageContent.PatientUserId,
                        messageContent.Id,
                        messageContent.Provider,
                        messageContent.Model,
                        messageContent.AppName
                    );

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

export async function consumeDeleteBodyHeightEHRFromQueue(): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = getBackgroundRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'delete_body_height_ehr_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    // Parse the message
                    const messageContent = JSON.parse(message.content.toString());

                    //console.log('Received message from RabbitMQ:', messageContent);

                    const ehrVitalService = new EHRVitalService();
                    ehrVitalService.deleteVitalEHRRecord(messageContent);

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

export async function consumeAnswerQuestionListEHRFromQueue(assessmentService:AssessmentService): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = getBackgroundRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'answer_question_list_ehr_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    // Parse the message
                    const messageContent = JSON.parse(message.content.toString());

                    //console.log('Received message from RabbitMQ:', messageContent);

                    // Process the message
                    await assessmentService.addEHRRecord(
                        messageContent.AR,
                        messageContent.Assessment,
                        messageContent.ArParent,
                        messageContent.AppName
                    );
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

export async function consumeAddDailyAssessmentEHRFromQueue(dailyAssessmentService:DailyAssessmentService): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = getBackgroundRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'add_daily_assessement_ehr_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    // Parse the message
                    const messageContent = JSON.parse(message.content.toString());

                    //console.log('Received message from RabbitMQ:', messageContent);

                    // Process the message
                    dailyAssessmentService.addEHRRecord(
                        messageContent.PatientUserId,
                        messageContent.Id,
                        messageContent.Provider,
                        messageContent.Model,
                        messageContent.AppName
                    );

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

export async function consumeAddLabRecordEHRFromQueue(labRecordService:LabRecordService): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = getBackgroundRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'add_lab_record_ehr_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    // Parse the message
                    const messageContent = JSON.parse(message.content.toString());

                    //console.log('Received message from RabbitMQ:', messageContent);

                    // Process the message
                    labRecordService.addEHRRecord(
                        messageContent.PatientUserId,
                        messageContent.LabRecord,
                        messageContent.Provider,
                        messageContent.Model,
                        messageContent.AppName
                    );

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
///

export async function consumeUpdateLabRecordEHRFromQueue(): Promise<void> {
    try {
        //const labRecordRepo = new ILabRecordRepo(); // Instantiate your LabRecordRepoClass here
        //const labRecordService = new LabRecordService(labRecordRepo); // Instantiate LabRecordService with LabRecordRepo

        // Create a channel from the connection
        const connection = getBackgroundRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'update_lab_record_ehr_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    // Parse the message
                    const messageContent = JSON.parse(message.content.toString());

                    //console.log('Received message from RabbitMQ:', messageContent);

                    // Process the message
                    // await labRecordService.addEHRRecord(
                    //     messageContent.PatientUserId,
                    //     messageContent.Id,
                    //     messageContent.Provider,
                    //     messageContent.Model,
                    //     messageContent.AppName
                    // );

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

export async function consumeDeleteLabRecordEHRFromQueue(): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = getBackgroundRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'delete_lab_record_ehr_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    // Parse the message
                    const messageContent = JSON.parse(message.content.toString());

                    //console.log('Received message from RabbitMQ:', messageContent);

                    const eHRLabService = new EHRLabService();
                    eHRLabService.deleteLabEHRRecord(messageContent);

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


export async function initializebgrabbitconsumer() {
    console.log('Waiting for messages in RabbitMQ queue...');
    //awards
    await consumeAddUpdatePatientFromQueue()
    await consumeDeletePatientFromQueue()
    await consumeAddBloodGlucoseFromQueue()
    await consumeUpdateBloodGlucoseFromQueue()
    await consumeAddBloodOxygenSaturationFromQueue()
    await consumeUpdateBloodOxygenSaturationFromQueue()
    await consumeAddBloodPressureFromQueue()
    await consumeUpdateBloodPressureFromQueue()
    await consumeAddBodyTemperatureFromQueue()
    await consumeUpdateBodyTemperatureFromQueue()
    await consumeAddBodyWeightFromQueue()
    await consumeUpdateBodyWeightFromQueue()
    await consumeAddPulseFromQueue()
    await consumeUpdatePulseFromQueue()
    await consumeMarkListAsTakenMedicationFactsFromQueue()
    await consumeMarkListAsMissedMedicationFactsFromQueue()
    await consumeMarkAsTakenMedicationFactsFromQueue()
    await consumeMarkAsMissedMedicationFactsFromQueue()
    await consumeAddSleepFromQueue()
    await consumeAddMedicationFromQueue()
    await consumeAddPhysicalActivityFromQueue()
    await consumeUpdatePhysicalActivityFromQueue()
    await consumeAddFoodConsumptionFromQueue()
    await consumeUpdateFoodConsumptionFromQueue()
    // EHR 
    // await consumeAddBloodGlucoseEHRFromQueue()
    // await consumeUpdateBloodGlucoseEHRFromQueue()
    // await consumeDeleteBloodGlucoseEHRFromQueue()
    // await consumeAddOxygenSaturationEHRFromQueue()
    // await consumeUpdateOxygenSaturationEHRFromQueue()
    // await consumeDeleteBloodOxygenSaturationEHRFromQueue()
    // await consumeAddBloodPressureEHRFromQueue()
    // await consumeUpdateBloodPressureEHRFromQueue()
    // await consumeDeleteBloodPressureEHRFromQueue()
    // await consumeAddBodyHeightEHRFromQueue()
    // await consumeUpdateBodyHeightEHRFromQueue()
    // await consumeDeleteBodyHeightEHRFromQueue()
    // await consumeAnswerQuestionListEHRFromQueue()
    // await consumeAddDailyAssessmentEHRFromQueue()
    // await consumeAddLabRecordEHRFromQueue()
    // await consumeUpdateLabRecordEHRFromQueue()
    // await consumeDeleteLabRecordEHRFromQueue()
}