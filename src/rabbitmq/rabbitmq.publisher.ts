import { uuid } from '../../src/domain.types/miscellaneous/system.types';
import { getRabbitMQConnection } from '../rabbitmq/rabbitmq.connection';
import * as amqp from 'amqplib';
import { EHRStaticRecordDomainModel } from '../../src.bg.worker/src.bg/modules/ehr.analytics/ehr.analytics.domain.model';
import { AssessmentService } from '../../src/services/clinical/assessment/assessment.service';
//../../src/services/clinical/assessment/assessment.service';
// Function to publish message to RabbitMQ queue

export async function publishMarkListAsTakenMedicationFactToQueue(
    message: any): Promise<void> {
    try {
        const connection = getRabbitMQConnection();

        // Create a channel from the connection
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'mark_list_as_taken_medication_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Convert the RecordDate to a timestamp
        if (message.RecordDate instanceof Date) {
            message.RecordDate = message.RecordDate.getTime();
        }

        // Convert the message to a buffer
        const messageBuffer = Buffer.from(JSON.stringify(message));

        // Publish the message to the queue
        await channel.sendToQueue(queueName, messageBuffer, { persistent: true });

        console.log('Message published to RabbitMQ queue');

        // Close the channel
        await channel.close();
    } catch (error) {
        console.error('Error publishing message to RabbitMQ:', error);
        throw error;
    }
}

export async function publishMarkListAsMissedMedicationFactToQueue(
    message: any): Promise<void> {
    try {
        const connection = getRabbitMQConnection();

        // Create a channel from the connection
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'mark_list_as_missed_medication_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Convert the RecordDate to a timestamp
        if (message.RecordDate instanceof Date) {
            message.RecordDate = message.RecordDate.getTime();
        }

        // Convert the message to a buffer
        const messageBuffer = Buffer.from(JSON.stringify(message));

        // Publish the message to the queue
        await channel.sendToQueue(queueName, messageBuffer, { persistent: true });

        console.log('Message published to RabbitMQ queue');

        // Close the channel
        await channel.close();
    } catch (error) {
        console.error('Error publishing message to RabbitMQ:', error);
        throw error;
    }
}

export async function publishMarkAsTakenMedicationFactToQueue(
    message: any): Promise<void> {
    try {
        const connection = getRabbitMQConnection();

        // Create a channel from the connection
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'mark_as_taken_medication_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Convert the RecordDate to a timestamp
        if (message.RecordDate instanceof Date) {
            message.RecordDate = message.RecordDate.getTime();
        }

        // Convert the message to a buffer
        const messageBuffer = Buffer.from(JSON.stringify(message));

        // Publish the message to the queue
        await channel.sendToQueue(queueName, messageBuffer, { persistent: true });

        console.log('Message published to RabbitMQ queue');

        // Close the channel
        await channel.close();
    } catch (error) {
        console.error('Error publishing message to RabbitMQ:', error);
        throw error;
    }
}

export async function publishMarkAsMissedMedicationFactToQueue(
    message: any): Promise<void> {
    try {
        const connection = getRabbitMQConnection();

        // Create a channel from the connection
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'mark_as_missed_medication_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Convert the RecordDate to a timestamp
        if (message.RecordDate instanceof Date) {
            message.RecordDate = message.RecordDate.getTime();
        }

        // Convert the message to a buffer
        const messageBuffer = Buffer.from(JSON.stringify(message));

        // Publish the message to the queue
        await channel.sendToQueue(queueName, messageBuffer, { persistent: true });

        console.log('Message published to RabbitMQ queue');

        // Close the channel
        await channel.close();
    } catch (error) {
        console.error('Error publishing message to RabbitMQ:', error);
        throw error;
    }
}

export async function publishAddUpdatePatientToQueue(
    patientUserId: uuid,
    details: EHRStaticRecordDomainModel,
    appName?: string,): Promise<void> {
    try {
        const connection = getRabbitMQConnection();

        // Create a channel from the connection
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'add_patient_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        const message = {
            patientUserId, details, appName
        }

        // Convert the message to a buffer
        const messageBuffer = Buffer.from(JSON.stringify(message));

        // Publish the message to the queue
        await channel.sendToQueue(queueName, messageBuffer, { persistent: true });

        console.log('Message published to RabbitMQ queue');

        // Close the channel
        await channel.close();
    } catch (error) {
        console.error('Error publishing message to RabbitMQ:', error);
        throw error;
    }
}

export async function publishDeletePatientToQueue(
    userId: string): Promise<void> {
    try {
        const connection = getRabbitMQConnection();

        // Create a channel from the connection
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'delete_patient_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        const message = userId;

        // Convert the message to a buffer
        const messageBuffer = Buffer.from(JSON.stringify(message));

        // Publish the message to the queue
        await channel.sendToQueue(queueName, messageBuffer, { persistent: true });

        console.log('Message published to RabbitMQ queue');

        // Close the channel
        await channel.close();
    } catch (error) {
        console.error('Error publishing message to RabbitMQ:', error);
        throw error;
    }
}

export async function publishAddBodyGlucoseToQueue(
    message: any): Promise<void> {
    try {
        const connection = getRabbitMQConnection();

        // Create a channel from the connection
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'add_body_glucose_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Convert the RecordDate to a timestamp
        if (message.RecordDate instanceof Date) {
            message.RecordDate = message.RecordDate.getTime();
        }
        // Convert the message to a buffer
        const messageBuffer = Buffer.from(JSON.stringify(message));

        // Publish the message to the queue
        await channel.sendToQueue(queueName, messageBuffer, { persistent: true });

        console.log('Message published to RabbitMQ queue');

        // Close the channel
        await channel.close();
    } catch (error) {
        console.error('Error publishing message to RabbitMQ:', error);
        throw error;
    }
}

export async function publishUpdateBodyGlucoseToQueue(
    message: any): Promise<void> {
    try {
        const connection = getRabbitMQConnection();

        // Create a channel from the connection
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'update_body_glucose_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Convert the RecordDate to a timestamp
        if (message.RecordDate instanceof Date) {
            message.RecordDate = message.RecordDate.getTime();
        }
        // Convert the message to a buffer
        const messageBuffer = Buffer.from(JSON.stringify(message));

        // Publish the message to the queue
        await channel.sendToQueue(queueName, messageBuffer, { persistent: true });

        console.log('Message published to RabbitMQ queue');

        // Close the channel
        await channel.close();
    } catch (error) {
        console.error('Error publishing message to RabbitMQ:', error);
        throw error;
    }
}

export async function publishAddBloodOxygenSaturationToQueue(
    message: any): Promise<void> {
    try {
        const connection = getRabbitMQConnection();

        // Create a channel from the connection
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'add_blood_oxygen_saturation_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Convert the RecordDate to a timestamp
        if (message.RecordDate instanceof Date) {
            message.RecordDate = message.RecordDate.getTime();
        }
        // Convert the message to a buffer
        const messageBuffer = Buffer.from(JSON.stringify(message));

        // Publish the message to the queue
        await channel.sendToQueue(queueName, messageBuffer, { persistent: true });

        console.log('Message published to RabbitMQ queue');

        // Close the channel
        await channel.close();
    } catch (error) {
        console.error('Error publishing message to RabbitMQ:', error);
        throw error;
    }
}

export async function publishUpdateBloodOxygenSaturationToQueue(
    message: any): Promise<void> {
    try {
        const connection = getRabbitMQConnection();

        // Create a channel from the connection
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'update_blood_oxygen_saturation_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Convert the RecordDate to a timestamp
        if (message.RecordDate instanceof Date) {
            message.RecordDate = message.RecordDate.getTime();
        }
        // Convert the message to a buffer
        const messageBuffer = Buffer.from(JSON.stringify(message));

        // Publish the message to the queue
        await channel.sendToQueue(queueName, messageBuffer, { persistent: true });

        console.log('Message published to RabbitMQ queue');

        // Close the channel
        await channel.close();
    } catch (error) {
        console.error('Error publishing message to RabbitMQ:', error);
        throw error;
    }
}

export async function publishAddBloodPressureToQueue(
    message: any): Promise<void> {
    try {
        const connection = getRabbitMQConnection();

        // Create a channel from the connection
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'add_blood_pressure_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Convert the RecordDate to a timestamp
        if (message.RecordDate instanceof Date) {
            message.RecordDate = message.RecordDate.getTime();
        }
        // Convert the message to a buffer
        const messageBuffer = Buffer.from(JSON.stringify(message));

        // Publish the message to the queue
        await channel.sendToQueue(queueName, messageBuffer, { persistent: true });

        console.log('Message published to RabbitMQ queue');

        // Close the channel
        await channel.close();
    } catch (error) {
        console.error('Error publishing message to RabbitMQ:', error);
        throw error;
    }
}

export async function publishUpdateBloodPressureToQueue(
    message: any): Promise<void> {
    try {
        const connection = getRabbitMQConnection();

        // Create a channel from the connection
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'update_blood_pressure_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Convert the RecordDate to a timestamp
        if (message.RecordDate instanceof Date) {
            message.RecordDate = message.RecordDate.getTime();
        }
        // Convert the message to a buffer
        const messageBuffer = Buffer.from(JSON.stringify(message));

        // Publish the message to the queue
        await channel.sendToQueue(queueName, messageBuffer, { persistent: true });

        console.log('Message published to RabbitMQ queue');

        // Close the channel
        await channel.close();
    } catch (error) {
        console.error('Error publishing message to RabbitMQ:', error);
        throw error;
    }
}

export async function publishAddBodyTemperatureToQueue(
    message: any): Promise<void> {
    try {
        const connection = getRabbitMQConnection();

        // Create a channel from the connection
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'add_body_temperature_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Convert the RecordDate to a timestamp
        if (message.RecordDate instanceof Date) {
            message.RecordDate = message.RecordDate.getTime();
        }
        // Convert the message to a buffer
        const messageBuffer = Buffer.from(JSON.stringify(message));

        // Publish the message to the queue
        await channel.sendToQueue(queueName, messageBuffer, { persistent: true });

        console.log('Message published to RabbitMQ queue');

        // Close the channel
        await channel.close();
    } catch (error) {
        console.error('Error publishing message to RabbitMQ:', error);
        throw error;
    }
}

export async function publishUpdateBodyTemperatureToQueue(
    message: any): Promise<void> {
    try {
        const connection = getRabbitMQConnection();

        // Create a channel from the connection
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'update_body_temperature_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Convert the RecordDate to a timestamp
        if (message.RecordDate instanceof Date) {
            message.RecordDate = message.RecordDate.getTime();
        }
        // Convert the message to a buffer
        const messageBuffer = Buffer.from(JSON.stringify(message));

        // Publish the message to the queue
        await channel.sendToQueue(queueName, messageBuffer, { persistent: true });

        console.log('Message published to RabbitMQ queue');

        // Close the channel
        await channel.close();
    } catch (error) {
        console.error('Error publishing message to RabbitMQ:', error);
        throw error;
    }
}

export async function publishAddBodyWeightToQueue(
    message: any): Promise<void> {
    try {
        const connection = getRabbitMQConnection();

        // Create a channel from the connection
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'add_body_weight_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Convert the RecordDate to a timestamp
        if (message.RecordDate instanceof Date) {
            message.RecordDate = message.RecordDate.getTime();
        }
        // Convert the message to a buffer
        const messageBuffer = Buffer.from(JSON.stringify(message));

        // Publish the message to the queue
        await channel.sendToQueue(queueName, messageBuffer, { persistent: true });

        console.log('Message published to RabbitMQ queue');

        // Close the channel
        await channel.close();
    } catch (error) {
        console.error('Error publishing message to RabbitMQ:', error);
        throw error;
    }
}

export async function publishUpdateBodyWeightToQueue(
    message: any): Promise<void> {
    try {
        const connection = getRabbitMQConnection();

        // Create a channel from the connection
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'update_body_weight_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Convert the RecordDate to a timestamp
        if (message.RecordDate instanceof Date) {
            message.RecordDate = message.RecordDate.getTime();
        }
        // Convert the message to a buffer
        const messageBuffer = Buffer.from(JSON.stringify(message));

        // Publish the message to the queue
        await channel.sendToQueue(queueName, messageBuffer, { persistent: true });

        console.log('Message published to RabbitMQ queue');

        // Close the channel
        await channel.close();
    } catch (error) {
        console.error('Error publishing message to RabbitMQ:', error);
        throw error;
    }
}

export async function publishAddPulseToQueue(
    message: any): Promise<void> {
    try {
        const connection = getRabbitMQConnection();

        // Create a channel from the connection
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'add_pulse_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Convert the RecordDate to a timestamp
        if (message.RecordDate instanceof Date) {
            message.RecordDate = message.RecordDate.getTime();
        }
        // Convert the message to a buffer
        const messageBuffer = Buffer.from(JSON.stringify(message));

        // Publish the message to the queue
        await channel.sendToQueue(queueName, messageBuffer, { persistent: true });

        console.log('Message published to RabbitMQ queue');

        // Close the channel
        await channel.close();
    } catch (error) {
        console.error('Error publishing message to RabbitMQ:', error);
        throw error;
    }
}

export async function publishUpdatePulseToQueue(
    message: any): Promise<void> {
    try {
        const connection = getRabbitMQConnection();

        // Create a channel from the connection
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'update_pulse_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Convert the RecordDate to a timestamp
        if (message.RecordDate instanceof Date) {
            message.RecordDate = message.RecordDate.getTime();
        }
        // Convert the message to a buffer
        const messageBuffer = Buffer.from(JSON.stringify(message));

        // Publish the message to the queue
        await channel.sendToQueue(queueName, messageBuffer, { persistent: true });

        console.log('Message published to RabbitMQ queue');

        // Close the channel
        await channel.close();
    } catch (error) {
        console.error('Error publishing message to RabbitMQ:', error);
        throw error;
    }
}

export async function publishAddSleepToQueue(
    message: any): Promise<void> {
    try {
        const connection = getRabbitMQConnection();

        // Create a channel from the connection
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'add_sleep_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Convert the RecordDate to a timestamp
        if (message.RecordDate instanceof Date) {
            message.RecordDate = message.RecordDate.getTime();
        }
        // Convert the message to a buffer
        const messageBuffer = Buffer.from(JSON.stringify(message));

        // Publish the message to the queue
        await channel.sendToQueue(queueName, messageBuffer, { persistent: true });

        console.log('Message published to RabbitMQ queue');

        // Close the channel
        await channel.close();
    } catch (error) {
        console.error('Error publishing message to RabbitMQ:', error);
        throw error;
    }
}

export async function publishAddMedicationToQueue(
    message: any): Promise<void> {
    try {
        const connection = getRabbitMQConnection();

        // Create a channel from the connection
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'add_medication_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Convert the RecordDate to a timestamp
        if (message.RecordDate instanceof Date) {
            message.RecordDate = message.RecordDate.getTime();
        }
        // Convert the message to a buffer
        const messageBuffer = Buffer.from(JSON.stringify(message));

        // Publish the message to the queue
        await channel.sendToQueue(queueName, messageBuffer, { persistent: true });

        console.log('Message published to RabbitMQ queue');

        // Close the channel
        await channel.close();
    } catch (error) {
        console.error('Error publishing message to RabbitMQ:', error);
        throw error;
    }
}

export async function publishAddPhysicalActivityToQueue(
    message: any): Promise<void> {
    try {
        const connection = getRabbitMQConnection();

        // Create a channel from the connection
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'add_physical_activity_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Convert the RecordDate to a timestamp
        if (message.RecordDate instanceof Date) {
            message.RecordDate = message.RecordDate.getTime();
        }
        // Convert the message to a buffer
        const messageBuffer = Buffer.from(JSON.stringify(message));

        // Publish the message to the queue
        await channel.sendToQueue(queueName, messageBuffer, { persistent: true });

        console.log('Message published to RabbitMQ queue');

        // Close the channel
        await channel.close();
    } catch (error) {
        console.error('Error publishing message to RabbitMQ:', error);
        throw error;
    }
}

export async function publishUpdatePhysicalActivityToQueue(
    message: any): Promise<void> {
    try {
        const connection = getRabbitMQConnection();

        // Create a channel from the connection
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'update_physical_activity_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Convert the RecordDate to a timestamp
        if (message.RecordDate instanceof Date) {
            message.RecordDate = message.RecordDate.getTime();
        }
        // Convert the message to a buffer
        const messageBuffer = Buffer.from(JSON.stringify(message));

        // Publish the message to the queue
        await channel.sendToQueue(queueName, messageBuffer, { persistent: true });

        console.log('Message published to RabbitMQ queue');

        // Close the channel
        await channel.close();
    } catch (error) {
        console.error('Error publishing message to RabbitMQ:', error);
        throw error;
    }
}

export async function publishAddFoodConsumptionToQueue(
    message: any): Promise<void> {
    try {
        const connection = getRabbitMQConnection();

        // Create a channel from the connection
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'add_food_consumption_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Convert the RecordDate to a timestamp
        if (message.RecordDate instanceof Date) {
            message.RecordDate = message.RecordDate.getTime();
        }
        // Convert the message to a buffer
        const messageBuffer = Buffer.from(JSON.stringify(message));

        // Publish the message to the queue
        await channel.sendToQueue(queueName, messageBuffer, { persistent: true });

        console.log('Message published to RabbitMQ queue');

        // Close the channel
        await channel.close();
    } catch (error) {
        console.error('Error publishing message to RabbitMQ:', error);
        throw error;
    }
}

export async function publishUpdateFoodConsumptionToQueue(
    message: any): Promise<void> {
    try {
        const connection = getRabbitMQConnection();

        // Create a channel from the connection
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'update_food_consumption_queue'; // Make sure it matches your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Convert the RecordDate to a timestamp
        if (message.RecordDate instanceof Date) {
            message.RecordDate = message.RecordDate.getTime();
        }
        // Convert the message to a buffer
        const messageBuffer = Buffer.from(JSON.stringify(message));

        // Publish the message to the queue
        await channel.sendToQueue(queueName, messageBuffer, { persistent: true });

        console.log('Message published to RabbitMQ queue');

        // Close the channel
        await channel.close();
    } catch (error) {
        console.error('Error publishing message to RabbitMQ:', error);
        throw error;
    }
}

// EHR Vital Service 

export async function publishAddBloodGlucoseEHRToQueue(message: any): Promise<void> {
    try {
        const connection = getRabbitMQConnection();

        // Create a channel from the connection
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'add_blood_glucose_ehr_queue'; // Update with your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Convert the message to a buffer
        const messageBuffer = Buffer.from(JSON.stringify(message));

        // Publish the message to the queue
        await channel.sendToQueue(queueName, messageBuffer, { persistent: true });

        //console.log('EHR Message published to RabbitMQ queue');

        // Close the channel
        await channel.close();
        await connection.close(); // Close the connection after use
    } catch (error) {
        console.error('Error publishing EHR message to RabbitMQ:', error);
        throw error;
    }
}

export async function publishUpdateBloodGlucoseEHRToQueue(message: any): Promise<void> {
    try {
        const connection = getRabbitMQConnection();

        // Create a channel from the connection
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'update_blood_glucode_ehr_queue'; // Update with your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Convert the message to a buffer
        const messageBuffer = Buffer.from(JSON.stringify(message));

        // Publish the message to the queue
        await channel.sendToQueue(queueName, messageBuffer, { persistent: true });

        //console.log('EHR Message published to RabbitMQ queue');

        // Close the channel
        await channel.close();
        await connection.close(); // Close the connection after use
    } catch (error) {
        console.error('Error publishing EHR message to RabbitMQ:', error);
        throw error;
    }
}

export async function publishDeleteBloodGlucoseEHRToQueue(message: any): Promise<void> {
    try {
        const connection = getRabbitMQConnection();

        // Create a channel from the connection
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'delete_blood_glucose_ehr_queue'; // Update with your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Convert the message to a buffer
        const messageBuffer = Buffer.from(JSON.stringify(message));

        // Publish the message to the queue
        await channel.sendToQueue(queueName, messageBuffer, { persistent: true });

        //console.log('EHR Message published to RabbitMQ queue');

        // Close the channel
        await channel.close();
        await connection.close(); // Close the connection after use
    } catch (error) {
        console.error('Error publishing EHR message to RabbitMQ:', error);
        throw error;
    }
}

export async function publishAddOxygenSaturationEHRToQueue(message: any): Promise<void> {
    try {
        const connection = getRabbitMQConnection();

        // Create a channel from the connection
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'add_oxygen_saturation_ehr_queue'; // Update with your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Convert the message to a buffer
        const messageBuffer = Buffer.from(JSON.stringify(message));

        // Publish the message to the queue
        await channel.sendToQueue(queueName, messageBuffer, { persistent: true });

        //console.log('EHR Message published to RabbitMQ queue');

        // Close the channel
        await channel.close();
        await connection.close(); // Close the connection after use
    } catch (error) {
        console.error('Error publishing EHR message to RabbitMQ:', error);
        throw error;
    }
}

export async function publishUpdateOxygenSaturationEHRToQueue(message: any): Promise<void> {
    try {
        const connection = getRabbitMQConnection();

        // Create a channel from the connection
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'update_oxygen_saturation_ehr_queue'; // Update with your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Convert the message to a buffer
        const messageBuffer = Buffer.from(JSON.stringify(message));

        // Publish the message to the queue
        await channel.sendToQueue(queueName, messageBuffer, { persistent: true });

        //console.log('EHR Message published to RabbitMQ queue');

        // Close the channel
        await channel.close();
        await connection.close(); // Close the connection after use
    } catch (error) {
        console.error('Error publishing EHR message to RabbitMQ:', error);
        throw error;
    }
}

export async function publishDeleteBloodOxygenSaturationEHRToQueue(message: any): Promise<void> {
    try {
        const connection = getRabbitMQConnection();

        // Create a channel from the connection
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'delete_blood_oxygen_saturation_ehr_queue'; // Update with your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Convert the message to a buffer
        const messageBuffer = Buffer.from(JSON.stringify(message));

        // Publish the message to the queue
        await channel.sendToQueue(queueName, messageBuffer, { persistent: true });

        //console.log('EHR Message published to RabbitMQ queue');

        // Close the channel
        await channel.close();
        await connection.close(); // Close the connection after use
    } catch (error) {
        console.error('Error publishing EHR message to RabbitMQ:', error);
        throw error;
    }
}

export async function publishAddBloodPressureEHRToQueue(message: any): Promise<void> {
    try {
        const connection = getRabbitMQConnection();

        // Create a channel from the connection
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'add_blood_pressure_ehr_queue'; // Update with your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Convert the message to a buffer
        const messageBuffer = Buffer.from(JSON.stringify(message));

        // Publish the message to the queue
        await channel.sendToQueue(queueName, messageBuffer, { persistent: true });

        //console.log('EHR Message published to RabbitMQ queue');

        // Close the channel
        await channel.close();
        await connection.close(); // Close the connection after use
    } catch (error) {
        console.error('Error publishing EHR message to RabbitMQ:', error);
        throw error;
    }
}

export async function publishUpdateBloodPressureEHRToQueue(message: any): Promise<void> {
    try {
        const connection = getRabbitMQConnection();

        // Create a channel from the connection
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'update_blood_pressure_ehr_queue'; // Update with your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Convert the message to a buffer
        const messageBuffer = Buffer.from(JSON.stringify(message));

        // Publish the message to the queue
        await channel.sendToQueue(queueName, messageBuffer, { persistent: true });

        //console.log('EHR Message published to RabbitMQ queue');

        // Close the channel
        await channel.close();
        await connection.close(); // Close the connection after use
    } catch (error) {
        console.error('Error publishing EHR message to RabbitMQ:', error);
        throw error;
    }
}

export async function publishDeleteBloodPressureEHRToQueue(message: any): Promise<void> {
    try {
        const connection = getRabbitMQConnection();

        // Create a channel from the connection
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'delete_blood_pressure_ehr_queue'; // Update with your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Convert the message to a buffer
        const messageBuffer = Buffer.from(JSON.stringify(message));

        // Publish the message to the queue
        await channel.sendToQueue(queueName, messageBuffer, { persistent: true });

        //console.log('EHR Message published to RabbitMQ queue');

        // Close the channel
        await channel.close();
        await connection.close(); // Close the connection after use
    } catch (error) {
        console.error('Error publishing EHR message to RabbitMQ:', error);
        throw error;
    }
}

export async function publishAddBodyHeightEHRToQueue(message: any): Promise<void> {
    try {
        const connection = getRabbitMQConnection();

        // Create a channel from the connection
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'add_body_height_ehr_queue'; // Update with your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Convert the message to a buffer
        const messageBuffer = Buffer.from(JSON.stringify(message));

        // Publish the message to the queue
        await channel.sendToQueue(queueName, messageBuffer, { persistent: true });

        //console.log('EHR Message published to RabbitMQ queue');

        // Close the channel
        await channel.close();
        await connection.close(); // Close the connection after use
    } catch (error) {
        console.error('Error publishing EHR message to RabbitMQ:', error);
        throw error;
    }
}

export async function publishUpdateBodyHeightEHRToQueue(message: any): Promise<void> {
    try {
        const connection = getRabbitMQConnection();

        // Create a channel from the connection
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'update_body_height_ehr_queue'; // Update with your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Convert the message to a buffer
        const messageBuffer = Buffer.from(JSON.stringify(message));

        // Publish the message to the queue
        await channel.sendToQueue(queueName, messageBuffer, { persistent: true });

        //console.log('EHR Message published to RabbitMQ queue');

        // Close the channel
        await channel.close();
        await connection.close(); // Close the connection after use
    } catch (error) {
        console.error('Error publishing EHR message to RabbitMQ:', error);
        throw error;
    }
}

export async function publishDeleteBodyHeightEHRToQueue(message: any): Promise<void> {
    try {
        const connection = getRabbitMQConnection();

        // Create a channel from the connection
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'delete_body_height_ehr_queue'; // Update with your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Convert the message to a buffer
        const messageBuffer = Buffer.from(JSON.stringify(message));

        // Publish the message to the queue
        await channel.sendToQueue(queueName, messageBuffer, { persistent: true });

        //console.log('EHR Message published to RabbitMQ queue');

        // Close the channel
        await channel.close();
        await connection.close(); // Close the connection after use
    } catch (error) {
        console.error('Error publishing EHR message to RabbitMQ:', error);
        throw error;
    }
}

export async function publishAnswerQuestionListEHRToQueue(message: any): Promise<void> {
    try {
        const connection = getRabbitMQConnection();

        // Create a channel from the connection
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'answer_question_list_ehr_queue'; // Update with your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Convert the message to a buffer
        const messageBuffer = Buffer.from(JSON.stringify(message));

        // Publish the message to the queue
        await channel.sendToQueue(queueName, messageBuffer, { persistent: true });

        //console.log('EHR Message published to RabbitMQ queue');

        // Close the channel
        await channel.close();
        await connection.close(); // Close the connection after use
    } catch (error) {
        console.error('Error publishing EHR message to RabbitMQ:', error);
        throw error;
    }
}

export async function publishAddDailyAssessmentEHRToQueue(message: any): Promise<void> {
    try {
        const connection = getRabbitMQConnection();

        // Create a channel from the connection
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'add_daily_assessement_ehr_queue'; // Update with your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Convert the message to a buffer
        const messageBuffer = Buffer.from(JSON.stringify(message));

        // Publish the message to the queue
        await channel.sendToQueue(queueName, messageBuffer, { persistent: true });

        //console.log('EHR Message published to RabbitMQ queue');

        // Close the channel
        await channel.close();
        await connection.close(); // Close the connection after use
    } catch (error) {
        console.error('Error publishing EHR message to RabbitMQ:', error);
        throw error;
    }
}

export async function publishAddLabRecordEHRToQueue(message: any): Promise<void> {
    try {
        const connection = getRabbitMQConnection();

        // Create a channel from the connection
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'add_lab_record_ehr_queue'; // Update with your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Convert the message to a buffer
        const messageBuffer = Buffer.from(JSON.stringify(message));

        // Publish the message to the queue
        await channel.sendToQueue(queueName, messageBuffer, { persistent: true });

        //console.log('EHR Message published to RabbitMQ queue');

        // Close the channel
        await channel.close();
        await connection.close(); // Close the connection after use
    } catch (error) {
        console.error('Error publishing EHR message to RabbitMQ:', error);
        throw error;
    }
}

export async function publishUpdateLabRecordEHRToQueue(message: any): Promise<void> {
    try {
        const connection = getRabbitMQConnection();

        // Create a channel from the connection
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'update_lab_record_ehr_queue'; // Update with your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Convert the message to a buffer
        const messageBuffer = Buffer.from(JSON.stringify(message));

        // Publish the message to the queue
        await channel.sendToQueue(queueName, messageBuffer, { persistent: true });

        //console.log('EHR Message published to RabbitMQ queue');

        // Close the channel
        await channel.close();
        await connection.close(); // Close the connection after use
    } catch (error) {
        console.error('Error publishing EHR message to RabbitMQ:', error);
        throw error;
    }
}

export async function publishDeleteLabRecordEHRToQueue(message: any): Promise<void> {
    try {
        const connection = getRabbitMQConnection();

        // Create a channel from the connection
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'delete_lab_record_ehr_queue'; // Update with your queue name

        // Assert the queue to make sure it exists, otherwise create it
        await channel.assertQueue(queueName, { durable: true });

        // Convert the message to a buffer
        const messageBuffer = Buffer.from(JSON.stringify(message));

        // Publish the message to the queue
        await channel.sendToQueue(queueName, messageBuffer, { persistent: true });

        //console.log('EHR Message published to RabbitMQ queue');

        // Close the channel
        await channel.close();
        await connection.close(); // Close the connection after use
    } catch (error) {
        console.error('Error publishing EHR message to RabbitMQ:', error);
        throw error;
    }
}