import { ServiceBroker } from 'moleculer';
import config from '../moleculer.config';

const broker = new ServiceBroker(config);

broker.loadServices();

export default broker;
