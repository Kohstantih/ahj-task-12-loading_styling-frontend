import CommunicationServer from './CommunicationServer';
import ControlNews from './ControlNews';
import InformMessage from './InformMassage';
import NewsWidjet from './NewsWidget';

const container = document.querySelector('.container');
const informBox = document.querySelector('.inform_box');
const port = 'https://loading-styling-backend-pgpi.onrender.com';

const widget = new NewsWidjet(container);
const communicator = new CommunicationServer(port);
const inform = new InformMessage(informBox);
const controller = new ControlNews(widget, communicator, inform);

controller.activation();

if (navigator.serviceWorker) {
  window.addEventListener('load', async () => {
    try {
      if (navigator.serviceWorker) {
        await navigator.serviceWorker.register(
          '/sw.js',
        );
      }
    } catch (e) {
      console.log(e);
    }
  });
}
