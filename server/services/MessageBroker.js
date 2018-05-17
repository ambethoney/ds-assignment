const amqp = require('amqplib');

const SendEmail = require('./SendEmail');

class MessageBroker {
  constructor(routingKey) {
    this.routingKey = routingKey;
    this.pubChannel = null;
    this.readChannel = null;
    this.offlinePubQueue = [];
    this.processMsg = this.processMsg.bind(this);
  }

  /**
  * Starts our connection to CloudAMPQ service
  *
  */
  async start() {
    try {
      const conn = await amqp.connect(process.env.CLOUDAMQP_URL);
      this.amqpConn = conn;
      console.log('[AMQP] connected');
      await this.successfulConnect();
    } catch (err) {
      if (err.message !== 'Connection closing') {
        console.error('[AMQP] conn error', err.message);
      }
    }
  }

  async successfulConnect() {
    await this.startPublisher();
    await this.startConsumer();
  }

  /**
  * Confirm our channel is alive, starts publisher
  *
  */
  async startPublisher() {
    console.log('Publisher has started');
    try {
      this.pubChannel = await this.amqpConn.createConfirmChannel();
    } catch (err) {
      console.log(err.message);
      this.closeOnErr(err);
    }
  }

  /**
  * Publish to queues using RabbitMQ topic exchange routing rules
  *
  * @param  {string} exchange   Using a '' (empty string) sends message
  * directly to the queue named by routingKey
  * @param  {string} routingKey Our queue
  * @param  {string} content    Our message
  */
  async publish(exchange, routingKey, content) {
    const formattedData = Buffer.from(JSON.stringify(content));
    try {
      await this.pubChannel.publish(exchange, this.routingKey, formattedData, { persistent: true });
    } catch (err) {
      console.error('[AMQP] publish', err.message);
      this.offlinePubQueue.push([exchange, this.routingKey, formattedData]);
    }
  }

  /**
  * Connects to our channel, waits for incoming messages
  *
  */
  async startConsumer() {
    console.log('Consumer has started');
    try {
      this.readChannel = await this.amqpConn.createConfirmChannel();
      this.readChannel.prefetch(1);
      const connectQueue = await this.readChannel.assertQueue(this.routingKey, { durable: true });
      const readMsg = await this.readChannel.consume(this.routingKey, this.processMsg, { noAck: false });
    } catch (err) {
      console.log(err.message);
      this.closeOnErr(err);
    }
  }

  /**
  * Receives next message from queue, acknowledge our message
  * (if the queue is in existance), and pass message to our SendEmail func
  *
  * @param  {obj} readMsg  Next message from the queue
  */
  async processMsg(readMsg) {
    await SendEmail(readMsg, (connectQueue) => {
      try {
        if (connectQueue) {
          this.readChannel.ack(readMsg);
        } else {
          this.readChannel.reject(readMsg, true);
        }
      } catch (err) {
        console.log(err.message);
        this.closeOnErr(err);
      }
    });
  }

  /**
  * Escape hatch - closes channel on error
  *
  * @param  {string} err    Error
  */
  closeOnErr(err) {
    if (!err) return false;
    console.error('[AMQP] error', err);
    this.amqpConn.close();
    return true;
  }
}

module.exports = MessageBroker;
