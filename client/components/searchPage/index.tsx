import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import SearchBarOnTop from '../searchBarOnTop';
import styles from './index.module.less';

interface Props {
  onClickLeft: () => void;
  history?: any; // tslint:disable-line
}

interface State {
  hot: string [];
}
@withRouter
export default class SearchPage extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      hot: [ '儿童医疗保险', '申根签证保险', '户外运动', '老人保险', '省心赔' ],
    };
  }

  public onSubmit = (value) => {
    const url = this.getUrl(value);
    this.props.history.push(url);
  }

  public getUrl = (value) => {
    return `/products?search_type=keyword&key=${encodeURI(value)}`;
  }

  public render() {
    return (
      <div className={styles.searchPage}>
        <SearchBarOnTop
          onClickLeft={this.props.onClickLeft}
          onSubmit={this.onSubmit}
        />
        <dl className={styles.searchPage__hot}>
          <dt className={styles.searchPage__hot_title}>热门</dt>
          <dd className={styles.searchPage__hot_item}>
            {this.state.hot.map((item) => {
              return(
                <Link to={this.getUrl(item)} key={item}>{item}</Link>
              );
            })}
          </dd>
        </dl>
      </div>
    );
  }
}
