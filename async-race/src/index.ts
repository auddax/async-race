import App from './components/app/app';
import View from './types/enums';
import './resources/css/styles.scss';

const app: App = new App();
app.render(View.GARAGE);
app.listen();
