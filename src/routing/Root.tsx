import React, { ReactElement, useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory, History } from 'history';
import { HelmetProvider } from 'react-helmet-async';
import store from 'store';
import Direction from 'app/molecules/Direction';
import { ROOT } from 'configs/routeNames';
import { BackTop } from 'antd';
import { useTranslation } from 'react-i18next';
import Pages from './Pages';
import LayoutWrapper from '../app/molecules/layout';
import 'styles/index.less';

const history: History = createBrowserHistory();

const App = (): ReactElement => {
  const { i18n } = useTranslation();
  useEffect(() => {
    const regex = /^en-*/g;
    if (regex.test(i18n.language)) {
      i18n.changeLanguage('en');
    }
  }, []);
  return (
    <Provider store={store}>
      <HelmetProvider>
        <Router history={history}>
          <BrowserRouter>
            <Direction>
              <LayoutWrapper>
                <Switch>
                  <Route path={ROOT} component={Pages} />
                </Switch>
              </LayoutWrapper>
            </Direction>
            <BackTop />
          </BrowserRouter>
        </Router>
      </HelmetProvider>
    </Provider>
  );
};
export default App;
